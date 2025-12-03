import { storage } from "./storage";
import type { Event, Rsvp, EmailLog } from "@shared/schema";

const MAX_RETRIES = 3;
const INITIAL_DELAY_MS = 1000;
const OWNER_EMAIL = "info@omastalo.co.za";

interface EmailPayload {
  from: { address: string };
  to: { email_address: { address: string } }[];
  subject: string;
  htmlbody: string;
}

function generateRegistrationRef(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `OMT-${timestamp}-${random}`;
}

function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function sendEmailWithRetry(
  payload: EmailPayload,
  emailLogId: number,
  attempt: number = 1
): Promise<{ success: boolean; error?: string }> {
  const ZEPTO_API_KEY = process.env.ZEPTOMAIL_API_KEY;
  
  if (!ZEPTO_API_KEY) {
    const error = "ZeptoMail API key not configured";
    console.error(`[EMAIL] ${error}`);
    await storage.updateEmailLog(emailLogId, {
      status: "failed",
      errorMessage: error,
      attempts: attempt,
      lastAttemptAt: new Date(),
    });
    return { success: false, error };
  }

  try {
    console.log(`[EMAIL] Attempt ${attempt}/${MAX_RETRIES} sending to: ${payload.to[0].email_address.address}`);
    
    await storage.updateEmailLog(emailLogId, {
      attempts: attempt,
      lastAttemptAt: new Date(),
    });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000);
    
    const response = await fetch("https://api.zeptomail.com/v1.1/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Zoho-enczapikey ${ZEPTO_API_KEY}`,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    if (response.ok) {
      console.log(`[EMAIL] Successfully sent to: ${payload.to[0].email_address.address}`);
      await storage.updateEmailLog(emailLogId, {
        status: "sent",
        sentAt: new Date(),
        attempts: attempt,
        lastAttemptAt: new Date(),
      });
      return { success: true };
    }

    const errorText = await response.text();
    console.error(`[EMAIL] Failed (status ${response.status}): ${errorText}`);

    if (attempt < MAX_RETRIES) {
      const delayMs = INITIAL_DELAY_MS * Math.pow(2, attempt - 1);
      console.log(`[EMAIL] Retrying in ${delayMs}ms...`);
      await sleep(delayMs);
      return sendEmailWithRetry(payload, emailLogId, attempt + 1);
    }

    await storage.updateEmailLog(emailLogId, {
      status: "failed",
      errorMessage: `HTTP ${response.status}: ${errorText}`,
      attempts: attempt,
      lastAttemptAt: new Date(),
    });
    return { success: false, error: errorText };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    console.error(`[EMAIL] Error: ${errorMessage}`);

    if (attempt < MAX_RETRIES) {
      const delayMs = INITIAL_DELAY_MS * Math.pow(2, attempt - 1);
      console.log(`[EMAIL] Retrying in ${delayMs}ms...`);
      await sleep(delayMs);
      return sendEmailWithRetry(payload, emailLogId, attempt + 1);
    }

    await storage.updateEmailLog(emailLogId, {
      status: "failed",
      errorMessage,
      attempts: attempt,
      lastAttemptAt: new Date(),
    });
    return { success: false, error: errorMessage };
  }
}

function generateConfirmationEmailHtml(
  rsvp: Rsvp,
  event: Event,
  isOwnerCopy: boolean = false
): string {
  const eventDate = new Date(event.eventDate);
  const formattedDate = eventDate.toLocaleDateString('en-ZA', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const formattedTime = eventDate.toLocaleTimeString('en-ZA', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  const headerText = isOwnerCopy 
    ? `New Event Registration - ${rsvp.registrationRef}`
    : `Booking Confirmation - ${rsvp.registrationRef}`;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${headerText}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #f5f5f5;">
    <tr>
      <td style="padding: 20px 10px;">
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background-color: #0D1B2A; padding: 30px 40px; text-align: center;">
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: 1px;">OMASTALO</h1>
              <p style="margin: 8px 0 0 0; font-size: 13px; color: #C9A227; text-transform: uppercase; letter-spacing: 2px;">
                Organisation for Community Development
              </p>
            </td>
          </tr>

          <!-- Confirmation Banner -->
          <tr>
            <td style="background-color: #C9A227; padding: 20px 40px; text-align: center;">
              <h2 style="margin: 0; font-size: 20px; color: #0D1B2A; font-weight: 600;">
                ${isOwnerCopy ? 'New Registration Received' : 'Registration Confirmed'}
              </h2>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">
              ${isOwnerCopy ? `
              <p style="margin: 0 0 20px 0; font-size: 16px; color: #333; line-height: 1.6;">
                A new registration has been received for <strong>${event.title}</strong>.
              </p>
              ` : `
              <p style="margin: 0 0 20px 0; font-size: 16px; color: #333; line-height: 1.6;">
                Dear <strong>${rsvp.name}</strong>,
              </p>
              <p style="margin: 0 0 20px 0; font-size: 16px; color: #333; line-height: 1.6;">
                Thank you for registering! Your booking for <strong>${event.title}</strong> has been confirmed.
              </p>
              `}

              <!-- Registration Reference Box -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 25px 0;">
                <tr>
                  <td style="background-color: #f8f9fa; border: 2px solid #C9A227; border-radius: 8px; padding: 20px; text-align: center;">
                    <p style="margin: 0 0 5px 0; font-size: 12px; color: #666; text-transform: uppercase; letter-spacing: 1px;">
                      Registration Reference
                    </p>
                    <p style="margin: 0; font-size: 24px; font-weight: 700; color: #0D1B2A; letter-spacing: 2px;">
                      ${rsvp.registrationRef}
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Event Details -->
              <h3 style="margin: 30px 0 15px 0; font-size: 18px; color: #0D1B2A; border-bottom: 2px solid #C9A227; padding-bottom: 10px;">
                Event Details
              </h3>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                    <strong style="color: #666; display: inline-block; width: 100px;">Event:</strong>
                    <span style="color: #333;">${event.title}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                    <strong style="color: #666; display: inline-block; width: 100px;">Date:</strong>
                    <span style="color: #333;">${formattedDate}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                    <strong style="color: #666; display: inline-block; width: 100px;">Time:</strong>
                    <span style="color: #333;">${formattedTime}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                    <strong style="color: #666; display: inline-block; width: 100px;">Location:</strong>
                    <span style="color: #333;">${event.location}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                    <strong style="color: #666; display: inline-block; width: 100px;">Category:</strong>
                    <span style="color: #333;">${event.category}</span>
                  </td>
                </tr>
              </table>

              <!-- Attendee Details -->
              <h3 style="margin: 30px 0 15px 0; font-size: 18px; color: #0D1B2A; border-bottom: 2px solid #C9A227; padding-bottom: 10px;">
                ${isOwnerCopy ? 'Registrant Details' : 'Your Details'}
              </h3>
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                    <strong style="color: #666; display: inline-block; width: 100px;">Name:</strong>
                    <span style="color: #333;">${rsvp.name}</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                    <strong style="color: #666; display: inline-block; width: 100px;">Email:</strong>
                    <span style="color: #333;">${rsvp.email}</span>
                  </td>
                </tr>
                ${rsvp.phone ? `
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                    <strong style="color: #666; display: inline-block; width: 100px;">Phone:</strong>
                    <span style="color: #333;">${rsvp.phone}</span>
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                    <strong style="color: #666; display: inline-block; width: 100px;">Attendees:</strong>
                    <span style="color: #333;">${rsvp.attendees} person(s)</span>
                  </td>
                </tr>
                ${rsvp.message ? `
                <tr>
                  <td style="padding: 10px 0;">
                    <strong style="color: #666; display: block; margin-bottom: 5px;">Special Requests:</strong>
                    <span style="color: #333; display: block; background-color: #f8f9fa; padding: 10px; border-radius: 4px;">${rsvp.message}</span>
                  </td>
                </tr>
                ` : ''}
              </table>

              ${!isOwnerCopy ? `
              <!-- Next Steps -->
              <h3 style="margin: 30px 0 15px 0; font-size: 18px; color: #0D1B2A; border-bottom: 2px solid #C9A227; padding-bottom: 10px;">
                Next Steps
              </h3>
              <ul style="margin: 0; padding: 0 0 0 20px; color: #333; line-height: 1.8;">
                <li>Please save your registration reference: <strong>${rsvp.registrationRef}</strong></li>
                <li>Arrive 15 minutes before the event start time</li>
                <li>Bring a valid ID for check-in</li>
                <li>For any changes, contact us at info@omastalo.co.za</li>
              </ul>
              ` : ''}

              <!-- CTA Button -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin: 30px 0;">
                <tr>
                  <td style="text-align: center;">
                    <a href="https://www.omastalo.co.za/events" 
                       style="display: inline-block; background-color: #C9A227; color: #0D1B2A; text-decoration: none; padding: 14px 30px; border-radius: 6px; font-weight: 600; font-size: 14px;">
                      View All Events
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #0D1B2A; padding: 30px 40px; text-align: center;">
              <p style="margin: 0 0 10px 0; font-size: 14px; color: #ffffff;">
                <strong>Omastalo Organisation</strong>
              </p>
              <p style="margin: 0 0 5px 0; font-size: 13px; color: #aaa;">
                Email: info@omastalo.co.za
              </p>
              <p style="margin: 0 0 5px 0; font-size: 13px; color: #aaa;">
                Website: www.omastalo.co.za
              </p>
              <p style="margin: 20px 0 0 0; font-size: 12px; color: #666;">
                &copy; ${new Date().getFullYear()} Omastalo Organisation. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

export interface SendRegistrationEmailsResult {
  registrantEmailSent: boolean;
  ownerEmailSent: boolean;
  errors: string[];
}

export async function sendRegistrationEmails(
  rsvp: Rsvp,
  event: Event
): Promise<SendRegistrationEmailsResult> {
  const ZEPTO_FROM_EMAIL = process.env.ZEPTOMAIL_FROM_EMAIL;
  const result: SendRegistrationEmailsResult = {
    registrantEmailSent: false,
    ownerEmailSent: false,
    errors: [],
  };

  if (!ZEPTO_FROM_EMAIL) {
    const error = "ZeptoMail from email not configured";
    console.error(`[EMAIL] ${error}`);
    result.errors.push(error);
    return result;
  }

  const registrantSubject = `Booking Confirmation: ${event.title} - Ref: ${rsvp.registrationRef}`;
  const ownerSubject = `New Registration: ${event.title} - ${rsvp.name} (${rsvp.registrationRef})`;

  console.log(`[REGISTRATION] Processing emails for registration ${rsvp.registrationRef}`);

  const registrantEmailLog = await storage.createEmailLog({
    rsvpId: rsvp.id,
    recipientEmail: rsvp.email,
    emailType: "registration_confirmation",
    subject: registrantSubject,
    status: "pending",
  });

  const ownerEmailLog = await storage.createEmailLog({
    rsvpId: rsvp.id,
    recipientEmail: OWNER_EMAIL,
    emailType: "registration_owner_copy",
    subject: ownerSubject,
    status: "pending",
  });

  const registrantPayload: EmailPayload = {
    from: { address: ZEPTO_FROM_EMAIL },
    to: [{ email_address: { address: rsvp.email } }],
    subject: registrantSubject,
    htmlbody: generateConfirmationEmailHtml(rsvp, event, false),
  };

  const ownerPayload: EmailPayload = {
    from: { address: ZEPTO_FROM_EMAIL },
    to: [{ email_address: { address: OWNER_EMAIL } }],
    subject: ownerSubject,
    htmlbody: generateConfirmationEmailHtml(rsvp, event, true),
  };

  const [registrantResult, ownerResult] = await Promise.all([
    sendEmailWithRetry(registrantPayload, registrantEmailLog.id),
    sendEmailWithRetry(ownerPayload, ownerEmailLog.id),
  ]);

  result.registrantEmailSent = registrantResult.success;
  result.ownerEmailSent = ownerResult.success;

  if (!registrantResult.success && registrantResult.error) {
    result.errors.push(`Registrant email: ${registrantResult.error}`);
  }
  if (!ownerResult.success && ownerResult.error) {
    result.errors.push(`Owner email: ${ownerResult.error}`);
  }

  console.log(`[REGISTRATION] Email results for ${rsvp.registrationRef}:`, {
    registrantEmailSent: result.registrantEmailSent,
    ownerEmailSent: result.ownerEmailSent,
    errors: result.errors,
  });

  return result;
}

export { generateRegistrationRef };
