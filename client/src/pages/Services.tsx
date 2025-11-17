import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";
import {
  GraduationCap,
  BarChart3,
  Heart,
  Users,
  CheckCircle,
  TrendingUp,
  Target,
  Lightbulb,
} from "lucide-react";
import mentorshipImage from "@assets/gallery-professional-address-04.jpg";
import workshopImage from "@assets/gallery-networking-event-08.jpg";

export default function Services() {
  const services = [
    {
      icon: GraduationCap,
      title: "Mathematics Education",
      description:
        "Comprehensive mathematics tutoring and educational consultation for students at all levels, from basic arithmetic to advanced calculus and beyond.",
      benefits: [
        "Personalized learning plans",
        "Exam preparation strategies",
        "Concept clarification and reinforcement",
        "Problem-solving techniques",
        "Mathematical modeling applications",
      ],
    },
    {
      icon: BarChart3,
      title: "Statistics Coaching",
      description:
        "Expert guidance in statistical analysis, data interpretation, and research methodology for students, researchers, and professionals.",
      benefits: [
        "Statistical software training (SPSS, R, Python)",
        "Research design consultation",
        "Data analysis and interpretation",
        "Hypothesis testing guidance",
        "Academic paper support",
      ],
    },
    {
      icon: Heart,
      title: "Life Orientation Mentorship",
      description:
        "Personal development programs focused on building character, leadership skills, and life management competencies.",
      benefits: [
        "Goal setting and achievement",
        "Career guidance and planning",
        "Study skills development",
        "Time management strategies",
        "Personal growth coaching",
      ],
    },
    {
      icon: Users,
      title: "Leadership Development Workshops",
      description:
        "Interactive training programs designed to cultivate leadership qualities and teamwork skills in educators and students.",
      benefits: [
        "Team building activities",
        "Communication skills training",
        "Conflict resolution techniques",
        "Strategic thinking development",
        "Public speaking confidence",
      ],
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <SEO
        title="Academic Services | Mentorship, Education, & Consulting by Omastalo"
        description="Discover Omastalo's educational and consulting services — from academic mentorship to statistical consulting and personal growth programs."
        keywords="academic consulting, mentorship South Africa, education training, statistics and data analysis, life orientation workshops, teaching and learning support"
        url="https://www.omastalo.co.za/services"
      />
      <section className="py-24 bg-gradient-to-br from-background to-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl mb-6">
            Academic Services & Consulting
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Professional educational services tailored to empower learners, educators, and
            institutions across South Africa
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={index}
                className={`grid lg:grid-cols-2 gap-12 items-start ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
                data-testid={`service-${index}`}
              >
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <Card className="p-8">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                      <service.icon className="h-10 w-10 text-primary" />
                    </div>
                    <h2 className="font-heading font-bold text-3xl mb-4">{service.title}</h2>
                    <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                      {service.description}
                    </p>
                    <Link href="/contact">
                      <Button size="lg" data-testid={`button-book-${index}`}>
                        Book This Service
                      </Button>
                    </Link>
                  </Card>
                </div>
                <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                  <h3 className="font-heading font-semibold text-xl mb-4">Key Benefits</h3>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit, bIndex) => (
                      <li
                        key={bIndex}
                        className="flex items-start gap-3"
                        data-testid={`benefit-${index}-${bIndex}`}
                      >
                        <CheckCircle className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-semibold text-3xl sm:text-4xl mb-4">
              Additional Services
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Expanding our offerings to serve your educational needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8">
              <Lightbulb className="h-12 w-12 text-primary mb-4" />
              <h3 className="font-heading font-semibold text-2xl mb-3">
                Educational Consultation
              </h3>
              <p className="text-muted-foreground mb-4">
                Professional academic support and guidance for students, teachers, and educational
                institutions seeking to enhance their programs and outcomes.
              </p>
              <Link href="/contact">
                <Button variant="outline" data-testid="button-consult">
                  Get Consultation
                </Button>
              </Link>
            </Card>
            <Card className="p-8">
              <Target className="h-12 w-12 text-primary mb-4" />
              <h3 className="font-heading font-semibold text-2xl mb-3">
                Motivational Speaking
              </h3>
              <p className="text-muted-foreground mb-4">
                Inspiring talks and presentations on education, leadership, and personal success
                for conferences, schools, and corporate events.
              </p>
              <Link href="/contact">
                <Button variant="outline" data-testid="button-speaking">
                  Book a Speaker
                </Button>
              </Link>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 md:p-12 bg-muted/50 border-2 border-dashed">
            <div className="text-center">
              <Badge className="mb-4">Coming Soon</Badge>
              <h2 className="font-heading font-bold text-3xl mb-4">
                Marriage Officiation Services
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Dr. Kgarimetsa will soon offer certified marriage officiation services, promoting
                love, unity, and purpose. This service will combine professional expertise with
                personal care to create meaningful wedding ceremonies.
              </p>
            </div>
          </Card>
        </div>
      </section>

      <section
        className="py-20 relative bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(13, 27, 42, 0.85), rgba(13, 27, 42, 0.85)), url(${workshopImage})`,
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-6">
            Ready to Excel in Your Studies?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Contact us today to discuss how our services can help you achieve your academic goals
          </p>
          <Link href="/contact">
            <Button size="lg" data-testid="button-contact-cta">
              Get Started
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
