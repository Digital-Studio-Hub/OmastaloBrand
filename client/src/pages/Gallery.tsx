import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Link } from "wouter";

// Graduation Celebration Images
import gallery01 from "@assets/gallery-graduation-family-01.jpg";
import gallery02 from "@assets/gallery-family-celebration-02.jpg";
import gallery03 from "@assets/gallery-speaker-presentation-03.jpg";
import gallery04 from "@assets/gallery-professional-address-04.jpg";
import gallery05 from "@assets/gallery-attendees-formal-05.jpg";
import gallery06 from "@assets/gallery-celebration-attendee-06.jpg";
import gallery07 from "@assets/gallery-graduation-family-regalia-07.jpg";
import gallery08 from "@assets/gallery-networking-event-08.jpg";
import gallery09 from "@assets/gallery-formal-reception-09.jpg";
import gallery10 from "@assets/gallery-academic-gathering-10.jpg";
import gallery11 from "@assets/gallery-attendees-community-11.jpg";
import gallery12 from "@assets/gallery-professional-networking-12.jpg";
import gallery13 from "@assets/gallery-family-multigenerational-13.jpg";
import gallery14 from "@assets/gallery-group-celebration-14.jpg";
import gallery15 from "@assets/gallery-professional-couple-15.jpg";
import gallery16 from "@assets/gallery-graduation-achievement-16.jpg";
import gallery17 from "@assets/gallery-couple-portrait-17.jpg";
import gallery18 from "@assets/gallery-graduation-family-pride-18.jpg";
import gallery19 from "@assets/gallery-platform-celebration-19.jpg";
import gallery20 from "@assets/gallery-graduation-banner-20.jpg";

export default function Gallery() {
  const galleryItems = [
    {
      image: gallery01,
      title: "Dr. Kgarimetsa's Graduation Celebration",
      category: "Graduation",
      description: "Celebrating academic achievement with family - a proud moment of accomplishment",
    },
    {
      image: gallery03,
      title: "Academic Leadership Presentation",
      category: "Speaking",
      description: "Dr. Kgarimetsa delivering an inspiring academic address",
    },
    {
      image: gallery20,
      title: "Graduation Milestone Achievement",
      category: "Celebration",
      description: "Commemorating Dr. Michael Kgarimetsa's doctoral achievement",
    },
    {
      image: gallery02,
      title: "Family Support & Celebration",
      category: "Family",
      description: "Sharing this momentous occasion with loved ones",
    },
    {
      image: gallery07,
      title: "Academic Regalia Ceremony",
      category: "Graduation",
      description: "Family pride on graduation day - celebrating together",
    },
    {
      image: gallery09,
      title: "Formal Graduation Reception",
      category: "Reception",
      description: "Elegant celebration honoring academic excellence",
    },
    {
      image: gallery08,
      title: "Academic Networking Event",
      category: "Networking",
      description: "Building connections with fellow academics and professionals",
    },
    {
      image: gallery04,
      title: "Professional Development Session",
      category: "Professional",
      description: "Engaging with colleagues in professional discourse",
    },
    {
      image: gallery05,
      title: "Distinguished Guests",
      category: "Community",
      description: "Academic community gathering to celebrate achievement",
    },
    {
      image: gallery06,
      title: "Celebration Attendee",
      category: "Community",
      description: "Honored guests joining the graduation celebration",
    },
    {
      image: gallery17,
      title: "Partnership & Support",
      category: "Family",
      description: "Celebrating success with life partner",
    },
    {
      image: gallery15,
      title: "Professional Networking",
      category: "Networking",
      description: "Building academic and professional relationships",
    },
    {
      image: gallery16,
      title: "Academic Achievement Recognition",
      category: "Graduation",
      description: "Formal recognition with academic mentors and family",
    },
    {
      image: gallery13,
      title: "Multigenerational Celebration",
      category: "Family",
      description: "Three generations celebrating academic success together",
    },
    {
      image: gallery10,
      title: "Formal Reception Gathering",
      category: "Reception",
      description: "Academic colleagues and family celebrating together",
    },
    {
      image: gallery11,
      title: "Academic Community Support",
      category: "Community",
      description: "Colleagues attending the graduation ceremony",
    },
    {
      image: gallery12,
      title: "Professional Attendees",
      category: "Community",
      description: "Academic professionals gathering for the celebration",
    },
    {
      image: gallery14,
      title: "Academic Family Gathering",
      category: "Family",
      description: "Extended family celebrating doctoral achievement",
    },
    {
      image: gallery18,
      title: "Proud Graduate with Family",
      category: "Graduation",
      description: "Family support throughout the academic journey",
    },
    {
      image: gallery19,
      title: "Graduation Platform Celebration",
      category: "Graduation",
      description: "Special moment with academic colleagues on graduation day",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <SEO
        title="Gallery | Dr. Kgarimetsa's Journey - Omastalo"
        description="Explore highlights from Dr. Michael Kgarimetsa's graduation celebration, academic events, and professional milestones with OMASTALO."
        url="https://www.omastalo.co.za/gallery"
      />
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl mb-6">
            Gallery
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Celebrating milestones, achievements, and memorable moments from Dr. Michael Kgarimetsa's 
            academic journey and OMASTALO's educational events.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {galleryItems.map((item, index) => (
              <Card
                key={index}
                className="overflow-hidden hover-elevate transition-all duration-300 group"
                data-testid={`card-gallery-${index}`}
              >
                <div className="relative h-64 overflow-hidden bg-muted">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <Badge className="absolute top-4 left-4 shadow-md" data-testid={`badge-category-${index}`}>
                    {item.category}
                  </Badge>
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-semibold text-lg mb-2" data-testid={`text-title-${index}`}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-description-${index}`}>
                    {item.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-20 bg-muted/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-semibold text-2xl md:text-3xl mb-4">
            Be Part of Our Story
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join us at our upcoming events and workshops. Experience firsthand the transformative power 
            of quality education and professional mentorship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="default" data-testid="link-events">
              <Link href="/events">View Upcoming Events</Link>
            </Button>
            <Button asChild variant="outline" data-testid="link-contact">
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
