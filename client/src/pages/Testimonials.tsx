import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SEO } from "@/components/SEO";
import { Star } from "lucide-react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Mokoena",
      role: "University Student",
      initials: "SM",
      content:
        "Dr. Kgarimetsa's mentorship transformed my understanding of statistics. His patient teaching style and real-world examples made complex concepts accessible. I couldn't have completed my research project without his guidance.",
      rating: 5,
    },
    {
      name: "Thabo Ndlovu",
      role: "High School Teacher",
      initials: "TN",
      content:
        "The mathematics workshop I attended was exceptional. Dr. Kgarimetsa shared innovative teaching strategies that I've successfully implemented in my classroom. My students' engagement has increased significantly.",
      rating: 5,
    },
    {
      name: "Lerato Mabaso",
      role: "Postgraduate Researcher",
      initials: "LM",
      content:
        "Outstanding statistical consultation services! Dr. Kgarimetsa helped me refine my research methodology and interpret my data correctly. His expertise was invaluable to my thesis completion.",
      rating: 5,
    },
    {
      name: "David Khumalo",
      role: "Education Administrator",
      initials: "DK",
      content:
        "We engaged OMASTALO for leadership development training at our institution. The program exceeded expectations, providing practical tools and inspiring our team to excel in their roles.",
      rating: 5,
    },
    {
      name: "Nomsa Sibiya",
      role: "Grade 12 Student",
      initials: "NS",
      content:
        "The life orientation mentorship program helped me develop clarity about my career goals and build confidence in my abilities. Dr. Kgarimetsa is an inspiring mentor who genuinely cares about student success.",
      rating: 5,
    },
    {
      name: "Michael van der Merwe",
      role: "University Lecturer",
      initials: "MV",
      content:
        "Professional and insightful! Dr. Kgarimetsa's approach to mathematics education is refreshing. His workshops provide evidence-based strategies that improve teaching effectiveness.",
      rating: 5,
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <SEO
        title="Testimonials | Student Success Stories - Omastalo"
        description="What students and professionals say about Omastalo's mentorship and academic impact."
        url="https://www.omastalo.co.za/testimonials"
      />
      <section className="py-24 bg-gradient-to-br from-background to-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl mb-6">
            Testimonials
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            What students and professionals say about OMASTALO's mentorship and academic impact
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-6 hover-elevate transition-all duration-300 hover:shadow-lg"
                data-testid={`card-testimonial-${index}`}
              >
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-heading font-semibold">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
