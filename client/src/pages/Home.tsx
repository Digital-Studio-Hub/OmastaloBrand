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
      icon: Users,
      title: "Youth Development",
      description: "Career guidance, mentorship, and skills development programmes for unemployed youth.",
    },
    {
      icon: Heart,
      title: "Community Empowerment",
      description: "Food relief, health awareness, and social support programmes for vulnerable households.",
    },
    {
      icon: GraduationCap,
      title: "Education & Capacity Building",
      description: "Educational programmes and leadership development for community transformation.",
    },
  ];

  const events = [
    {
      title: "Youth Career Guidance Workshop",
      date: "March 15, 2026",
      category: "Workshop",
      location: "Tshwane",
    },
    {
      title: "Community Food Relief Programme",
      date: "Ongoing",
      category: "Community Service",
      location: "Tshwane",
    },
    {
      title: "Leadership & Mentorship Training",
      date: "April 20, 2026",
      category: "Training",
      location: "Tshwane",
    },
  ];

  const blogPosts = [
    {
      title: "Empowering Communities Through Service",
      category: "Community Impact",
      excerpt: "Insights from Dr. Kgarimetsa on building stronger communities through dedicated public service and transformative programmes.",
      image: researchImage,
    },
    {
      title: "Celebrating Community Transformation",
      category: "Achievement",
      excerpt: "Reflecting on the journey of Omastalo Organisation and the lives transformed through community development initiatives.",
      image: celebrationImage,
    },
  ];

  const stats = [
    { number: "1000+", label: "Lives Impacted" },
    { number: "50+", label: "Community Programmes" },
    { number: "15+", label: "Years of Service" },
    { number: "100%", label: "Community Focused" },
  ];

  return (
    <div className="min-h-screen">
      <SEO
        title="Omastalo Organisation | Community Empowerment & Social Development"
        description="Welcome to Omastalo Organisation — founded by Dr. Michael Kgarimetsa. Dedicated to empowering communities through impactful programmes addressing poverty, youth development, and social transformation across Tshwane."
        keywords="Omastalo Organisation, Dr. Michael Kgarimetsa, community development, social transformation, youth development, poverty alleviation, public service, South Africa"
        url="https://www.omastalo.co.za"
      />
      <section className="relative min-h-[80vh] flex items-center bg-gradient-to-br from-background to-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="text-primary font-heading font-semibold text-sm tracking-wide mb-4">
                OMASTALO ORGANISATION
              </div>
              <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl leading-tight mb-6">
                Welcome Message from the Founder
              </h1>
              <p className="text-lg text-muted-foreground mb-6 max-w-xl leading-relaxed">
                Welcome to Omastalo Organisation, a vehicle for hope dedicated to empowering communities across Tshwane and beyond. I am Dr. Michael Kgarimetsa, the Founder of this Organisation. Born in Manamakgotheng, Modderkuil, my journey has been one of perseverance, faith, and passion for public service, social development, and transforming lives.
              </p>
              <p className="text-lg text-muted-foreground mb-6 max-w-xl leading-relaxed">
                Our mission at Omastalo Organisation is to deliver impactful programmes that address poverty, youth development, health awareness, and social transformation. This website serves as a digital home for our community initiatives, programmes, upcoming events, and stories of impact.
              </p>
              <p className="text-lg text-muted-foreground italic mb-8 max-w-xl leading-relaxed">
                I warmly welcome you to explore, connect, and be part of our journey.
              </p>
              <p className="text-base font-heading font-semibold text-foreground mb-8">
                — Dr. Michael Kgarimetsa, Founder
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
                A Leading Community Development Organisation
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Omastalo Organisation is a community-driven organisation dedicated to social development, empowerment, and transformation. Founded by Dr. Michael Kgarimetsa, the Organisation delivers impactful programmes in education, food relief, career guidance, mentorship, and capacity building, changing communities one household at a time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading font-semibold text-3xl sm:text-4xl mb-4">Community Development Programmes</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Delivering impactful programmes that empower communities and transform lives
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
