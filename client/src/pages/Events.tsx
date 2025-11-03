import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Users, Clock } from "lucide-react";
import conferenceImage from "@assets/stock_images/academic_conference__c73df436.jpg";

export default function Events() {
  const upcomingEvents = [
    {
      title: "Advanced Statistics Workshop",
      date: "March 15, 2025",
      time: "09:00 - 16:00",
      location: "Online via Zoom",
      category: "Workshop",
      capacity: "50 participants",
      description:
        "Comprehensive workshop covering advanced statistical methods, data analysis techniques, and practical applications using modern software tools.",
    },
    {
      title: "Mathematics Excellence Seminar",
      date: "April 2, 2025",
      time: "10:00 - 14:00",
      location: "Johannesburg Conference Centre",
      category: "Seminar",
      capacity: "100 participants",
      description:
        "Join leading educators and students for an inspiring seminar on mathematical excellence, problem-solving strategies, and academic success.",
    },
    {
      title: "Leadership Development Program",
      date: "April 20, 2025",
      time: "08:00 - 17:00",
      location: "Cape Town",
      category: "Training",
      capacity: "30 participants",
      description:
        "Intensive one-day program focused on developing leadership skills, effective communication, and strategic thinking for educators and students.",
    },
    {
      title: "Life Orientation Mentorship Session",
      date: "May 5, 2025",
      time: "14:00 - 16:00",
      location: "Online via Zoom",
      category: "Mentorship",
      capacity: "25 participants",
      description:
        "Interactive mentorship session covering personal development, goal setting, and life management skills for academic and career success.",
    },
  ];

  const pastEvents = [
    {
      title: "Statistics in Research Symposium",
      date: "January 20, 2025",
      location: "Pretoria",
      category: "Symposium",
      attendees: "85 participants",
    },
    {
      title: "Mathematics Teaching Excellence Workshop",
      date: "December 10, 2024",
      location: "Durban",
      category: "Workshop",
      attendees: "60 participants",
    },
    {
      title: "Educational Leadership Conference",
      date: "November 15, 2024",
      location: "Johannesburg",
      category: "Conference",
      attendees: "120 participants",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <SEO
        title="Academic Events & Workshops | Omastalo"
        description="Stay updated on Omastalo's upcoming academic events, lectures, and public speaking engagements. RSVP and join our community of learners."
        keywords="academic events, education workshops, public lectures South Africa, mentorship seminars, Omastalo events"
        url="https://www.omastalo.co.za/events"
      />
      <section
        className="py-24 relative bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(13, 27, 42, 0.7), rgba(13, 27, 42, 0.7)), url(${conferenceImage})`,
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl mb-6">
            Academic Events & Workshops
          </h1>
          <p className="text-xl leading-relaxed">
            Join our community of learners at upcoming seminars, workshops, and training programs
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12">
              <TabsTrigger value="upcoming" data-testid="tab-upcoming">
                Upcoming Events
              </TabsTrigger>
              <TabsTrigger value="past" data-testid="tab-past">
                Past Events
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming">
              <div className="grid md:grid-cols-2 gap-8">
                {upcomingEvents.map((event, index) => (
                  <Card
                    key={index}
                    className="p-6 border-l-4 border-l-primary hover-elevate transition-all duration-300 hover:shadow-lg"
                    data-testid={`card-upcoming-event-${index}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <Badge data-testid={`badge-category-${index}`}>{event.category}</Badge>
                    </div>
                    <h3 className="font-heading font-bold text-xl mb-4">{event.title}</h3>
                    <p className="text-muted-foreground mb-6">{event.description}</p>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-3 text-sm">
                        <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{event.location}</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Users className="h-5 w-5 text-primary flex-shrink-0" />
                        <span className="text-muted-foreground">{event.capacity}</span>
                      </div>
                    </div>
                    <Button className="w-full" data-testid={`button-register-${index}`}>
                      Register Now
                    </Button>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="past">
              <div className="grid md:grid-cols-3 gap-8">
                {pastEvents.map((event, index) => (
                  <Card
                    key={index}
                    className="p-6 hover-elevate transition-all duration-300"
                    data-testid={`card-past-event-${index}`}
                  >
                    <Badge className="mb-3">{event.category}</Badge>
                    <h3 className="font-heading font-semibold text-lg mb-4">{event.title}</h3>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-primary" />
                        <span>{event.attendees}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl sm:text-4xl mb-6">
            Want to Host an Event?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            Interested in organizing a workshop, seminar, or training session with Dr. Kgarimetsa?
            We can customize programs to meet your institution's specific needs.
          </p>
          <Button size="lg" data-testid="button-contact-events">
            Contact Us
          </Button>
        </div>
      </section>
    </div>
  );
}
