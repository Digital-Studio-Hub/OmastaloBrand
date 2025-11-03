import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Users, Clock, Loader2 } from "lucide-react";
import { RSVPDialog } from "@/components/RSVPDialog";
import type { Event } from "@shared/schema";
import { format, isPast, isFuture } from "date-fns";
import conferenceImage from "@assets/stock_images/academic_conference__c73df436.jpg";

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [rsvpDialogOpen, setRsvpDialogOpen] = useState(false);

  const { data: events = [], isLoading, isError } = useQuery<Event[]>({
    queryKey: ["/api/events"],
  });

  const upcomingEventsList = events.filter((event) => isFuture(new Date(event.eventDate)));
  const pastEventsList = events.filter((event) => isPast(new Date(event.eventDate)));

  const handleRegister = (event: Event) => {
    setSelectedEvent(event);
    setRsvpDialogOpen(true);
  };

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
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="h-10 w-10 animate-spin text-primary" data-testid="loader-events" />
                </div>
              ) : isError ? (
                <div className="text-center py-20">
                  <p className="text-xl text-destructive mb-4" data-testid="text-error-events">
                    Failed to load events. Please try again later.
                  </p>
                </div>
              ) : upcomingEventsList.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-xl text-muted-foreground" data-testid="text-no-upcoming-events">
                    No upcoming events scheduled. Check back soon!
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-8">
                  {upcomingEventsList.map((event) => {
                    const eventDate = new Date(event.eventDate);
                    return (
                      <Card
                        key={event.id}
                        className="p-6 border-l-4 border-l-primary hover-elevate transition-all duration-300 hover:shadow-lg"
                        data-testid={`card-upcoming-event-${event.id}`}
                      >
                        <div className="flex items-start justify-between mb-4">
                          <Badge data-testid={`badge-category-${event.id}`}>{event.category}</Badge>
                        </div>
                        <h3 className="font-heading font-bold text-xl mb-4">{event.title}</h3>
                        <p className="text-muted-foreground mb-6">{event.description}</p>
                        <div className="space-y-3 mb-6">
                          <div className="flex items-center gap-3 text-sm">
                            <Calendar className="h-5 w-5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">
                              {format(eventDate, "MMMM d, yyyy")}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <Clock className="h-5 w-5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">
                              {format(eventDate, "HH:mm")}
                            </span>
                          </div>
                          <div className="flex items-center gap-3 text-sm">
                            <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{event.location}</span>
                          </div>
                          {event.capacity && (
                            <div className="flex items-center gap-3 text-sm">
                              <Users className="h-5 w-5 text-primary flex-shrink-0" />
                              <span className="text-muted-foreground">{event.capacity} participants</span>
                            </div>
                          )}
                        </div>
                        <Button
                          className="w-full"
                          onClick={() => handleRegister(event)}
                          data-testid={`button-register-${event.id}`}
                        >
                          Register Now
                        </Button>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>

            <TabsContent value="past">
              {isLoading ? (
                <div className="flex justify-center items-center py-20">
                  <Loader2 className="h-10 w-10 animate-spin text-primary" />
                </div>
              ) : isError ? (
                <div className="text-center py-20">
                  <p className="text-xl text-destructive" data-testid="text-error-past-events">
                    Failed to load events. Please try again later.
                  </p>
                </div>
              ) : pastEventsList.length === 0 ? (
                <div className="text-center py-20">
                  <p className="text-xl text-muted-foreground" data-testid="text-no-past-events">
                    No past events to display.
                  </p>
                </div>
              ) : (
                <div className="grid md:grid-cols-3 gap-8">
                  {pastEventsList.map((event) => (
                    <Card
                      key={event.id}
                      className="p-6 hover-elevate transition-all duration-300"
                      data-testid={`card-past-event-${event.id}`}
                    >
                      <Badge className="mb-3">{event.category}</Badge>
                      <h3 className="font-heading font-semibold text-lg mb-4">{event.title}</h3>
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span>{format(new Date(event.eventDate), "MMMM d, yyyy")}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-primary" />
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
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

      <RSVPDialog event={selectedEvent} open={rsvpDialogOpen} onOpenChange={setRsvpDialogOpen} />
    </div>
  );
}
