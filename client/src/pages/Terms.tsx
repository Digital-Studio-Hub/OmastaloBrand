import { Card } from "@/components/ui/card";
import { SEO } from "@/components/SEO";

export default function Terms() {
  return (
    <div className="min-h-screen pt-20">
      <SEO
        title="Terms of Service - Omastalo"
        description="Legal terms and usage policies for Omastalo's website and services."
        url="https://www.omastalo.co.za/terms"
      />
      <section className="py-24 bg-gradient-to-br from-background to-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl mb-6">
            Terms of Service
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Legal terms and usage policies for OMASTALO's website and services
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

              <h2 className="font-heading font-semibold text-2xl mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                By accessing and using the OMASTALO website (www.omastalo.co.za), you accept and
                agree to be bound by these Terms of Service. If you do not agree to these terms,
                please do not use our website or services.
              </p>

              <h2 className="font-heading font-semibold text-2xl mb-4">2. Services Provided</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                OMASTALO provides educational services including mathematics education, statistics
                coaching, life orientation mentorship, workshops, and academic consultation. All
                services are subject to availability and prior arrangement.
              </p>

              <h2 className="font-heading font-semibold text-2xl mb-4">
                3. Intellectual Property
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                All content on this website, including text, graphics, logos, and educational
                materials, is the property of OMASTALO and protected by copyright laws.
                Unauthorized use or reproduction is prohibited.
              </p>

              <h2 className="font-heading font-semibold text-2xl mb-4">
                4. User Responsibilities
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Users agree to provide accurate information when contacting us or registering for
                services. You are responsible for maintaining the confidentiality of any account
                information and for all activities that occur under your account.
              </p>

              <h2 className="font-heading font-semibold text-2xl mb-4">
                5. Payment and Refunds
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Payment terms will be agreed upon before service delivery. Refund policies vary by
                service type and will be communicated at the time of booking.
              </p>

              <h2 className="font-heading font-semibold text-2xl mb-4">
                6. Limitation of Liability
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                OMASTALO provides educational services to the best of our ability. However, we
                cannot guarantee specific academic outcomes. Our liability is limited to the fees
                paid for the specific service in question.
              </p>

              <h2 className="font-heading font-semibold text-2xl mb-4">
                7. Changes to Terms
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                We reserve the right to modify these terms at any time. Changes will be posted on
                this page with an updated revision date.
              </p>

              <h2 className="font-heading font-semibold text-2xl mb-4">8. Contact Information</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about these Terms of Service, please contact us at
                info@omastalo.co.za.
              </p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
