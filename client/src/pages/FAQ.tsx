import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { SEO } from "@/components/SEO";

export default function FAQ() {
  const faqs = [
    {
      question: "What services does OMASTALO offer?",
      answer:
        "OMASTALO provides comprehensive educational services including mathematics education, statistics coaching, life orientation mentorship, leadership development workshops, educational consultation, and motivational speaking. We also plan to offer marriage officiation services in the future.",
    },
    {
      question: "Who can benefit from OMASTALO's programs?",
      answer:
        "Our programs are designed for students at all levels (high school to postgraduate), educators, researchers, and professionals seeking to enhance their knowledge in mathematics, statistics, or life orientation. We also work with institutions looking to improve their educational programs.",
    },
    {
      question: "How can I book Dr. Kgarimetsa for an event or workshop?",
      answer:
        "You can contact us through our contact form, email (info@omastalo.co.za), or phone. Please provide details about your event, including the date, location, expected number of participants, and the type of session you're interested in.",
    },
    {
      question: "Are the services available online or only in-person?",
      answer:
        "We offer both online and in-person sessions depending on the type of service and your preference. Many of our workshops, mentorship sessions, and consultations can be conducted via Zoom or other video conferencing platforms.",
    },
    {
      question: "What are the fees for OMASTALO's services?",
      answer:
        "Fees vary depending on the type of service, duration, and format (individual vs. group, online vs. in-person). Please contact us for a detailed quote tailored to your specific needs.",
    },
    {
      question: "How long are typical mentorship or tutoring sessions?",
      answer:
        "Individual sessions typically range from 60 to 90 minutes. Workshop durations vary from half-day (4 hours) to full-day (8 hours) programs. We can customize session lengths based on your requirements.",
    },
    {
      question: "Can OMASTALO help with research methodology and statistical analysis?",
      answer:
        "Yes! We provide expert guidance in research design, statistical analysis, data interpretation, and use of statistical software (SPSS, R, Python). This service is particularly valuable for postgraduate students and researchers.",
    },
    {
      question: "What qualifications does Dr. Kgarimetsa have?",
      answer:
        "Dr. Michael Kgarimetsa holds a doctorate in Mathematics Education and has over 15 years of experience in teaching, research, and educational leadership. He is a member of the South African Mathematical Society and holds certifications in academic mentoring and coaching.",
    },
    {
      question: "How can I access the free resources on your website?",
      answer:
        "Navigate to the Resources page where you'll find downloadable study guides, templates, and reference materials. Simply click the download button on any resource to save it to your device.",
    },
    {
      question: "Does OMASTALO offer group discounts for workshops?",
      answer:
        "Yes, we offer special rates for group bookings and institutional partnerships. Contact us with details about your group size and requirements for a customized quote.",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <SEO
        title="FAQ | Frequently Asked Questions - Omastalo"
        description="Frequently asked questions about Omastalo's academic and mentorship services."
        url="https://www.omastalo.co.za/faq"
      />
      <section className="py-24 bg-gradient-to-br from-background to-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Find answers to common questions about OMASTALO's services and programs
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} data-testid={`faq-${index}`}>
                  <AccordionTrigger className="text-left font-heading font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>
        </div>
      </section>
    </div>
  );
}
