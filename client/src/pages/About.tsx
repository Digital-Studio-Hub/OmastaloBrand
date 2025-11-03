import { Card } from "@/components/ui/card";
import { SEO } from "@/components/SEO";
import { Award, BookOpen, Users, Target } from "lucide-react";
import professorImage from "@assets/stock_images/professional_african_6667cdef.jpg";
import classroomImage from "@assets/stock_images/university_students__a3823dac.jpg";

export default function About() {
  const milestones = [
    {
      year: "2010",
      title: "Doctorate in Mathematics Education",
      description: "Completed PhD focusing on innovative teaching methodologies",
    },
    {
      year: "2012",
      title: "Founded OMASTALO",
      description: "Established the organization to promote excellence in education",
    },
    {
      year: "2015",
      title: "National Recognition",
      description: "Received award for outstanding contribution to mathematics education",
    },
    {
      year: "2020",
      title: "Expanded Programs",
      description: "Launched comprehensive leadership development initiatives",
    },
  ];

  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to the highest standards in education and mentorship",
    },
    {
      icon: BookOpen,
      title: "Knowledge",
      description: "Fostering continuous learning and intellectual growth",
    },
    {
      icon: Users,
      title: "Community",
      description: "Building strong networks of educators and learners",
    },
    {
      icon: Target,
      title: "Impact",
      description: "Creating lasting positive change in education",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <SEO
        title="About Dr. Michael Kgarimetsa | Omastalo Founder & Academic Leader"
        description="Learn more about Dr. Michael Kgarimetsa, founder of Omastalo — an academic organization dedicated to Mathematics, Statistics, and Life Orientation excellence."
        keywords="Dr. Michael Kgarimetsa biography, academic leader South Africa, mathematics educator, statistics expert, life orientation mentor"
        url="https://www.omastalo.co.za/about"
      />
      <section
        className="relative py-24 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(13, 27, 42, 0.7), rgba(13, 27, 42, 0.7)), url(${classroomImage})`,
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl mb-6">
            About Dr. Michael Kgarimetsa
          </h1>
          <p className="text-xl leading-relaxed">
            Academic Leader, Educator, and Mentor Dedicated to Excellence
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={professorImage}
                alt="Dr. Michael Kgarimetsa"
                className="rounded-lg shadow-xl w-full"
                loading="lazy"
              />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-3xl mb-6">Biography</h2>
              <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                <p>
                  Dr. Michael Kgarimetsa is a distinguished academic professional with over 15 years
                  of experience in mathematics education, statistical analysis, and educational
                  leadership. His passion for empowering learners has made him a sought-after mentor
                  and speaker across South Africa.
                </p>
                <p>
                  With a doctorate in Mathematics Education, Dr. Kgarimetsa has dedicated his career
                  to developing innovative teaching methodologies that make complex concepts
                  accessible to all learners. His work has impacted hundreds of students, educators,
                  and institutions.
                </p>
                <p>
                  As the founder of OMASTALO, Dr. Kgarimetsa continues to advance the fields of
                  mathematics, statistics, and life orientation through comprehensive educational
                  programs, workshops, and personal mentorship.
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
              Mission & Values
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              OMASTALO is committed to advancing education in mathematics, statistics, and life
              orientation through excellence, innovation, and dedication to learner success.
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
