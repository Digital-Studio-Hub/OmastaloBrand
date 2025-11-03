import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SEO } from "@/components/SEO";
import { Calendar, Loader2, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import type { BlogPost } from "@shared/schema";
import { format } from "date-fns";
import studentsImage from "@assets/stock_images/university_students__a3823dac.jpg";
import conferenceImage from "@assets/stock_images/academic_conference__c73df436.jpg";
import booksImage from "@assets/stock_images/education_books_math_f4e40b15.jpg";

const defaultImages: Record<string, string> = {
  mathematics: studentsImage,
  statistics: conferenceImage,
  "life-orientation": booksImage,
};

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = ["all", "mathematics", "statistics", "life-orientation"];

  const { data: posts = [], isLoading } = useQuery<BlogPost[]>({
    queryKey: ["/api/blog-posts", { status: "published" }],
  });

  const filteredPosts =
    activeCategory === "all"
      ? posts
      : posts.filter((post) => post.category === activeCategory);

  return (
    <div className="min-h-screen pt-20">
      <SEO
        title="Insights & Research | Omastalo Blog"
        description="Read the latest articles and insights from Dr. Kgarimetsa on Mathematics, Statistics, Life Orientation, and academic excellence."
        keywords="educational blog, mathematics insights, statistics research, academic thought leadership, life orientation resources"
        url="https://www.omastalo.co.za/blog"
      />
      <section className="py-24 bg-gradient-to-br from-background to-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl mb-6">
            Insights & Research
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Expert perspectives on mathematics, statistics, life orientation, and educational
            excellence
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                onClick={() => setActiveCategory(category)}
                data-testid={`button-category-${category}`}
                className="capitalize"
              >
                {category === "life-orientation" ? "Life Orientation" : category}
              </Button>
            ))}
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="h-10 w-10 animate-spin text-primary" data-testid="loader-blog-posts" />
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-muted-foreground" data-testid="text-no-posts">
                No blog posts found. Check back soon for new content!
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => {
                const imageUrl = post.coverImage || defaultImages[post.category] || studentsImage;
                const publishDate = post.publishedAt ? format(new Date(post.publishedAt), "MMMM d, yyyy") : "";
                
                return (
                  <Card
                    key={post.id}
                    className="overflow-hidden hover-elevate transition-all duration-300 hover:shadow-lg flex flex-col"
                    data-testid={`card-blog-post-${post.id}`}
                  >
                    <div className="relative h-48">
                      <img
                        src={imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                      <Badge className="absolute top-4 left-4 capitalize">
                        {post.category === "life-orientation" ? "Life Orientation" : post.category}
                      </Badge>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="font-heading font-semibold text-xl mb-3 line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">{post.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        {publishDate && (
                          <>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>{publishDate}</span>
                            </div>
                            <span>•</span>
                          </>
                        )}
                        <span>{post.readTime} min read</span>
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <Button variant="outline" className="w-full" data-testid={`button-read-${post.id}`}>
                          Read Article <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-bold text-3xl mb-6">Subscribe to Our Newsletter</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Get the latest insights, research, and educational resources delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-md border border-input bg-background"
              data-testid="input-newsletter-email"
            />
            <Button data-testid="button-subscribe">Subscribe</Button>
          </div>
        </div>
      </section>
    </div>
  );
}
