import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SEO } from "@/components/SEO";

// Academic Seminar & Workshop Images
import seminar1 from "@assets/stock_images/academic_seminar_wor_6b93650d.jpg";
import seminar2 from "@assets/stock_images/academic_seminar_wor_2deaee1d.jpg";
import seminar3 from "@assets/stock_images/academic_seminar_wor_68598bd3.jpg";
import seminar4 from "@assets/stock_images/academic_seminar_wor_ecee1ed7.jpg";
import seminar5 from "@assets/stock_images/academic_seminar_wor_fc189b1e.jpg";
import seminar6 from "@assets/stock_images/academic_seminar_wor_24c88a11.jpg";

// Professional Mentoring & Teaching Images
import mentoring1 from "@assets/stock_images/professional_mentori_7a8fa159.jpg";
import mentoring2 from "@assets/stock_images/professional_mentori_1023d24c.jpg";
import mentoring3 from "@assets/stock_images/professional_mentori_31eb784b.jpg";
import mentoring4 from "@assets/stock_images/professional_mentori_9d2a114f.jpg";
import mentoring5 from "@assets/stock_images/professional_mentori_bfaf3c5b.jpg";
import mentoring6 from "@assets/stock_images/professional_mentori_4bc9b2e7.jpg";

export default function Gallery() {
  const galleryItems = [
    {
      image: seminar1,
      title: "Academic Conference 2024",
      category: "Conference",
      description: "National Mathematics Education Conference bringing together educators and researchers",
    },
    {
      image: mentoring1,
      title: "Student Mentorship Session",
      category: "Mentorship",
      description: "One-on-one academic mentorship and career guidance for aspiring mathematicians",
    },
    {
      image: seminar2,
      title: "Statistics Workshop",
      category: "Workshop",
      description: "Interactive statistics workshop focused on practical data analysis techniques",
    },
    {
      image: mentoring2,
      title: "Classroom Lecture",
      category: "Education",
      description: "Engaging mathematics lecture with hands-on problem-solving activities",
    },
    {
      image: seminar3,
      title: "Leadership Training Seminar",
      category: "Training",
      description: "Professional development workshop for educators and academic leaders",
    },
    {
      image: mentoring3,
      title: "Research Collaboration",
      category: "Research",
      description: "Collaborative research session exploring advanced mathematical concepts",
    },
    {
      image: seminar4,
      title: "Life Orientation Workshop",
      category: "Workshop",
      description: "Comprehensive life skills development program for students and professionals",
    },
    {
      image: mentoring4,
      title: "Group Study Session",
      category: "Education",
      description: "Collaborative learning environment fostering academic excellence",
    },
    {
      image: seminar5,
      title: "Professional Development Seminar",
      category: "Seminar",
      description: "Career advancement strategies for academic and professional growth",
    },
    {
      image: mentoring5,
      title: "Individual Tutoring",
      category: "Mentorship",
      description: "Personalized academic support tailored to individual learning needs",
    },
    {
      image: seminar6,
      title: "Community Education Event",
      category: "Community",
      description: "Public education initiative bringing mathematics to the broader community",
    },
    {
      image: mentoring6,
      title: "Graduation Celebration",
      category: "Milestone",
      description: "Celebrating academic achievements and student success stories",
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <SEO
        title="Gallery | Events & Workshops - Omastalo"
        description="Explore highlights from Omastalo's academic lectures, workshops, mentorship sessions, and educational events featuring Dr. Michael Kgarimetsa."
        url="https://www.omastalo.co.za/gallery"
      />
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-background via-muted/30 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl mb-6">
            Gallery
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Highlights from OMASTALO's lectures, workshops, mentorship sessions, and educational events. 
            Witness our commitment to academic excellence and community impact.
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
            <a
              href="/events"
              className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground font-medium rounded-md hover-elevate active-elevate-2 transition-all"
              data-testid="link-events"
            >
              View Upcoming Events
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 border border-input bg-background font-medium rounded-md hover-elevate active-elevate-2 transition-all"
              data-testid="link-contact"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
