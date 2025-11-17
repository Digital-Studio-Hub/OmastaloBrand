import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";
import {
  GraduationCap,
  BarChart3,
  Heart,
  Users,
  Calendar,
  ArrowRight,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import heroImage from "@assets/gallery-graduation-achievement-16.jpg";
import conferenceImage from "@assets/stock_images/academic_conference__c73df436.jpg";
import studentsImage from "@assets/stock_images/university_students__a3823dac.jpg";
import mentorshipImage from "@assets/stock_images/professional_mentors_d11d97f7.jpg";
import researchImage from "@assets/gallery-speaker-presentation-03.jpg";
import celebrationImage from "@assets/gallery-group-celebration-14.jpg";

export default function Home() {
  const services = [
    {
      icon: GraduationCap,
      title: "Mathematics Education",
      description: "Expert guidance in mathematical concepts and problem-solving techniques.",
    },
    {
      icon: BarChart3,
      title: "Statistics Coaching",
      description: "Comprehensive statistical analysis and data interpretation training.",
    },
    {
      icon: Heart,
      title: "Life Orientation",
      description: "Personal development and leadership mentorship programs.",
    },
  ];

  const events = [
    {
      title: "Advanced Statistics Workshop",
      date: "March 15, 2025",
      category: "Workshop",
      location: "Online",
    },
    {
      title: "Mathematics Excellence Seminar",
      date: "April 2, 2025",
      category: "Seminar",
      location: "Johannesburg",
    },
    {
      title: "Leadership Development Program",
      date: "April 20, 2025",
      category: "Training",
      location: "Cape Town",
    },
  ];

  const blogPosts = [
    {
      title: "Research Excellence in Academia",
      category: "Research",
      excerpt: "Insights from Dr. Kgarimetsa on building a successful research career and contributing to academic knowledge.",
      image: researchImage,
    },
    {
      title: "Celebrating Academic Milestones",
      category: "Achievement",
      excerpt: "Reflecting on the journey to doctoral achievement and the importance of community support in academic success.",
      image: celebrationImage,
    },
  ];

  const stats = [
    { number: "500+", label: "Students Mentored" },
    { number: "50+", label: "Events Hosted" },
    { number: "15+", label: "Years Experience" },
    { number: "100%", label: "Dedication" },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Omastalo Research Institute | Academic Excellence & Innovation"
        description="Welcome to Omastolo Research Institute — led by Dr. Michael Kgarimetsa. A premier academic institution dedicated to research, innovation, and education. Connecting researchers, students, and professionals."
        keywords="Omastolo Research Institute, Dr. Michael Kgarimetsa, academic research, innovation, education, research publications, academic programs, South Africa"
        url="https://www.omastalo.co.za"
      />
      <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-background to-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="text-primary font-heading font-semibold text-sm tracking-wide mb-4">
                OMASTALO RESEARCH INSTITUTE
              </div>
              <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
                Welcome Message from the CEO
              </h1>
              <p className="text-lg text-muted-foreground mb-6 max-w-xl leading-relaxed">
                Welcome to Omastalo Research Institute, a hub of academic excellence, innovation, and transformative knowledge. I am Dr. Michael Kgarimetsa, the Founder and CEO of this Institute. Born in Manamakgotheng, Modderkuil, my journey has been one of perseverance, faith, and passion for advancing research and empowering scholars to create solutions that matter.
              </p>
              <p className="text-lg text-muted-foreground mb-6 max-w-xl leading-relaxed">
                Our mission at Omastolo Research Institute is to develop a platform that connects researchers, students, and professionals in sharing knowledge and innovation. This website serves as a digital home for our research initiatives, academic programs, upcoming events, and community impact stories.
              </p>
              <p className="text-lg text-muted-foreground italic mb-8 max-w-xl leading-relaxed">
                I warmly welcome you to explore, connect, and be part of our journey.
              </p>
              <p className="text-base font-heading font-semibold text-foreground mb-8">
                — Dr. Michael Kgarimetsa, CEO and Founder
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" data-testid="button-book-event" className="w-full sm:w-auto">
                  <Link href="/contact">Book an Event</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  data-testid="button-learn-more"
                  className="w-full sm:w-auto"
                >
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src={heroImage}
                alt="Dr. Michael Kgarimetsa - Doctorate Graduation Achievement"
                className="rounded-lg shadow-2xl w-full h-auto"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={researchImage}
                alt="Dr. Kgarimetsa presenting research"
                className="rounded-lg shadow-xl w-full h-auto"
                loading="lazy"
              />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-3xl sm:text-4xl mb-6">
                A Premier Academic Institution
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Omastalo Research Institute is a premier academic institution dedicated to research, innovation, and education. Founded by Dr. Michael Kgarimetsa, the Institute focuses on bridging the gap between theoretical knowledge and practical implementation through groundbreaking studies and collaborations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-semibold text-3xl sm:text-4xl mb-4">Research & Academic Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Connecting researchers, students, and professionals in sharing knowledge and innovation
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="p-8 hover-elevate transition-all duration-300 hover:shadow-lg"
                data-testid={`card-service-${index}`}
              >
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                  <service.icon className="h-10 w-10 text-primary" />
                </div>
                <h3 className="font-heading font-semibold text-xl mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <Link href="/services" className="inline-flex items-center gap-2 text-primary font-medium hover-elevate active-elevate-2 rounded-md py-1 -ml-1 px-1">
                  Learn More <ArrowRight className="h-4 w-4" />
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-heading font-semibold text-3xl sm:text-4xl mb-2">
                Upcoming Events
              </h2>
              <p className="text-lg text-muted-foreground">
                Join us for upcoming seminars and workshops
              </p>
            </div>
            <Button asChild variant="outline" data-testid="button-view-all-events">
              <Link href="/events">View All</Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <Card
                key={index}
                className="p-6 border-l-4 border-l-primary hover-elevate transition-all duration-300 hover:shadow-lg"
                data-testid={`card-event-${index}`}
              >
                <Badge className="mb-3" data-testid={`badge-event-category-${index}`}>
                  {event.category}
                </Badge>
                <h3 className="font-heading font-semibold text-lg mb-3">{event.title}</h3>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span>{event.location}</span>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline" data-testid={`button-register-${index}`}>
                  Register
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-semibold text-3xl sm:text-4xl mb-4">
              Latest Insights
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our latest articles and research
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {blogPosts.map((post, index) => (
              <Card
                key={index}
                className="overflow-hidden hover-elevate transition-all duration-300 hover:shadow-lg"
                data-testid={`card-blog-${index}`}
              >
                <div className="relative h-48">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <Badge className="absolute top-4 left-4">{post.category}</Badge>
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-semibold text-xl mb-2">{post.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                  <Link href="/blog" className="inline-flex items-center gap-2 text-primary font-medium hover-elevate active-elevate-2 rounded-md py-1 -ml-1 px-1">
                    Read More <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center" data-testid={`stat-${index}`}>
                <div className="font-heading font-bold text-4xl md:text-5xl text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="py-20 relative bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(13, 27, 42, 0.85), rgba(13, 27, 42, 0.85)), url(${mentorshipImage})`,
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-6">
            Ready to Transform Your Learning Journey?
          </h2>
          <p className="text-xl mb-8 text-gray-200">
            Get in touch to discuss how we can help you achieve academic excellence
          </p>
          <Button asChild size="lg" data-testid="button-get-in-touch">
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
