import { Card } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { Award, BookOpen, Users, Target } from "lucide-react";
import ownerImage from "@assets/Owner_1764666236223.jpg";

export default function About() {
  const milestones = [
    {
      year: "2010",
      title: "Community Impact Begins",
      description: "Started grassroots initiatives addressing poverty and youth unemployment in Tshwane",
    },
    {
      year: "2015",
      title: "Founded Omastalo Organisation",
      description: "Established the organisation to deliver impactful community development programmes",
    },
    {
      year: "2020",
      title: "Expanded Reach",
      description: "Launched comprehensive food relief, career guidance, and mentorship programs",
    },
    {
      year: "2025",
      title: "Earned Doctor of Business Administration",
      description: "Completed DBA to strengthen organisational leadership and strategic operations",
    },
  ];

  const values = [
    {
      icon: Award,
      title: "Excellence in Service",
      description: "Committed to the highest standards in community development and programme delivery",
    },
    {
      icon: Target,
      title: "Integrity and Accountability",
      description: "Upholding ethical principles and transparent governance in all community activities",
    },
    {
      icon: BookOpen,
      title: "Empowerment and Education",
      description: "Building capacity through education, mentorship, and skills development programmes",
    },
    {
      icon: Users,
      title: "Community Collaboration",
      description: "Fostering partnerships with government, churches, and local stakeholders for greater impact",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <SEO
        title="About Omastalo Organisation | Dr. Michael Kgarimetsa - Founder"
        description="Learn about Dr. Michael Kgarimetsa, Founder of Omastalo Organisation. A highly accomplished leader dedicated to community empowerment, social development, and organisational excellence across Tshwane and beyond."
        keywords="Dr. Michael Kgarimetsa biography, Omastalo Organisation, community development, social transformation, youth development, public service, South Africa"
        url="https://www.omastalo.co.za/about"
      />
      <section
        className="relative py-24 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(13, 27, 42, 0.7), rgba(13, 27, 42, 0.7)), url(${ownerImage})`,
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl mb-6">
            About Dr. Michael Kgarimetsa
          </h1>
          <p className="text-xl leading-relaxed">
            Founder of Omastalo Organisation
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={ownerImage}
                alt="Dr. Michael Kgarimetsa"
                className="rounded-lg shadow-xl w-full"
                loading="lazy"
              />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-3xl mb-6">Biography of Dr. Michael Kgarimetsa</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Dr. Michael Kgarimetsa is a highly accomplished South African leader, academic, and community-driven strategist known for his unwavering commitment to public service, social development, and organisational excellence. As the Founder of Omastalo Organisation, he has dedicated his life to empowering communities across Tshwane and beyond through impactful programmes that address poverty, youth development, health awareness, and social transformation.
                </p>
                <p>
                  With over 15 years of professional experience, Dr. Kgarimetsa has built a distinguished career in Supply Chain Management, Logistics, Public Administration, Research, and Data Analytics. He holds a Doctor of Business Administration (DBA), complementing a solid background in inventory management and strategic operations. His expertise spans both the public and private sectors, making him a respected figure in leadership, governance, and community engagement.
                </p>
                <p>
                  Driven by a passion for progress and accountability, Dr. Kgarimetsa founded Omastalo Organisation as a response to socio-economic challenges affecting vulnerable households, unemployed youth, and disadvantaged communities. Under his leadership, the organisation has become a vehicle for hope—delivering programmes in education, food relief, career guidance, mentorship, and capacity building. His hands-on approach and strong networks with government departments, churches, local leaders, and stakeholders amplify the organisation's reach and impact.
                </p>
                <p>
                  Beyond organisational leadership, Dr. Kgarimetsa is known as a mentor, motivator, and public speaker whose voice inspires resilience, dignity, and personal growth. His work continues to amplify the importance of servant leadership, ethical governance, and community upliftment.
                </p>
                <p>
                  Driven by integrity and compassion, Dr. Michael Kgarimetsa remains committed to expanding Omastalo's footprint and transforming it into one of South Africa's leading development organisations. His life's mission is simple yet powerful: to change communities, one household at a time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-semibold text-3xl sm:text-4xl mb-4">
              Career Milestones
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A journey of academic excellence and educational innovation
            </p>
          </div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary hidden md:block"></div>
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row gap-8 items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                  data-testid={`milestone-${index}`}
                >
                  <div className="flex-1">
                    <Card className="p-6 hover-elevate transition-all duration-300">
                      <div className="font-heading font-bold text-2xl text-primary mb-2">
                        {milestone.year}
                      </div>
                      <h3 className="font-heading font-semibold text-xl mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-muted-foreground">{milestone.description}</p>
                    </Card>
                  </div>
                  <div className="hidden md:block w-8 h-8 rounded-full bg-primary border-4 border-background z-10 flex-shrink-0"></div>
                  <div className="flex-1 hidden md:block"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-semibold text-3xl sm:text-4xl mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Omastalo Organisation is dedicated to community empowerment, social development, and transformative leadership. We focus on delivering impactful programmes that address poverty, youth development, and capacity building across Tshwane and beyond.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card
                key={index}
                className="p-8 text-center hover-elevate transition-all duration-300"
                data-testid={`value-${index}`}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-3">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 md:p-12 bg-primary text-primary-foreground">
            <h2 className="font-heading font-bold text-3xl mb-4 text-center">
              Professional Affiliations
            </h2>
            <div className="space-y-3 text-center">
              <p className="text-lg">Member, South African Mathematical Society</p>
              <p className="text-lg">Fellow, Educational Leadership Association</p>
              <p className="text-lg">Advisory Board, Mathematics Education Foundation</p>
              <p className="text-lg">Certified Academic Mentor & Coach</p>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
