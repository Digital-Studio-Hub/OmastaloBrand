import { Card } from "@/components/ui/card";
import { SEO } from "@/components/SEO";

export default function Privacy() {
  return (
    <div className="min-h-screen pt-20">
      <SEO
        title="Privacy Policy - Omastalo"
        description="Information on how Omastalo protects your data and communication."
        url="https://www.omastalo.co.za/privacy"
      />
      <section className="py-24 bg-gradient-to-br from-background to-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            How OMASTALO protects your data and communication
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              <p className="text-sm text-muted-foreground mb-8">
                Last updated: January 2025
              </p>

              <h2 className="font-heading font-semibold text-2xl mb-4">
                1. Information We Collect
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We collect information you provide directly to us, such as when you fill out our
                contact form, register for events, or communicate with us via email. This may
                include your name, email address, phone number, and any information included in
                your messages.
              </p>

              <h2 className="font-heading font-semibold text-2xl mb-4">
                2. How We Use Your Information
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We use the information we collect to:
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>Respond to your inquiries and provide requested services</li>
                <li>Send you information about our programs and events</li>
                <li>Improve our website and services</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="font-heading font-semibold text-2xl mb-4">3. Information Sharing</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We do not sell, trade, or otherwise transfer your personal information to third
                parties. We may share information with trusted service providers who assist us in
                operating our website or conducting our business, provided they agree to keep this
                information confidential.
              </p>

              <h2 className="font-heading font-semibold text-2xl mb-4">4. Data Security</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We implement appropriate security measures to protect your personal information.
                However, no method of transmission over the internet is 100% secure, and we cannot
                guarantee absolute security.
              </p>

              <h2 className="font-heading font-semibold text-2xl mb-4">5. Cookies</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Our website may use cookies to enhance user experience. You can choose to have your
                computer warn you each time a cookie is being sent, or you can choose to turn off
                all cookies through your browser settings.
              </p>

              <h2 className="font-heading font-semibold text-2xl mb-4">6. Your Rights</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                You have the right to access, correct, or delete your personal information. You may
                also opt out of receiving marketing communications from us at any time.
              </p>

              <h2 className="font-heading font-semibold text-2xl mb-4">
                7. Changes to This Policy
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any
                changes by posting the new policy on this page with an updated revision date.
              </p>

              <h2 className="font-heading font-semibold text-2xl mb-4">8. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                If you have questions about this Privacy Policy, please contact us at
                info@omastalo.co.za.
              </p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
