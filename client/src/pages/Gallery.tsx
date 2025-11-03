import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";
import conferenceImage from "@assets/stock_images/academic_conference__c73df436.jpg";
import studentsImage from "@assets/stock_images/university_students__a3823dac.jpg";
import mentorshipImage from "@assets/stock_images/professional_mentors_d11d97f7.jpg";
import workshopImage from "@assets/stock_images/diverse_group_worksh_d41dcabb.jpg";
import professorImage from "@assets/stock_images/professional_african_6667cdef.jpg";
import booksImage from "@assets/stock_images/education_books_math_f4e40b15.jpg";

export default function Gallery() {
  const galleryItems = [
    {
      image: conferenceImage,
      title: "Academic Conference 2024",
      category: "Conference",
      description: "National Mathematics Education Conference in Johannesburg",
    },
    {
      image: studentsImage,
      title: "Student Workshop",
      category: "Workshop",
      description: "Interactive statistics workshop with university students",
    },
    {
      image: mentorshipImage,
      title: "Mentorship Session",
      category: "Mentorship",
      description: "One-on-one academic mentorship and guidance",
    },
    {
      image: workshopImage,
      title: "Leadership Training",
      category: "Training",
      description: "Leadership development workshop for educators",
    },
    {
      image: professorImage,
      title: "Classroom Lecture",
      category: "Education",
      description: "Mathematics education lecture series",
    },
    {
      image: booksImage,
      title: "Research Resources",
      category: "Resources",
      description: "Educational materials and academic resources",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <SEO
        title="Gallery | Events & Workshops - Omastalo"
        description="Explore highlights from Omastalo's lectures, workshops, and events."
        url="https://www.omastalo.co.za/gallery"
      />
      <section className="py-24 bg-gradient-to-br from-background to-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl mb-6">Gallery</h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Highlights from OMASTALO's lectures, workshops, and educational events
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item, index) => (
              <Card
                key={index}
                className="overflow-hidden hover-elevate transition-all duration-300 hover:shadow-lg group"
                data-testid={`card-gallery-${index}`}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <Badge className="absolute top-4 left-4">{item.category}</Badge>
                </div>
                <div className="p-6">
                  <h3 className="font-heading font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
