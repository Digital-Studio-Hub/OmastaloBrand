import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { SEO } from "@/components/SEO";
import { FileText, Download, BookOpen, Calculator, TrendingUp, Search } from "lucide-react";

export default function Resources() {
  const resources = [
    {
      title: "Mathematics Study Guide - Grade 12",
      type: "PDF",
      size: "2.4 MB",
      category: "Mathematics",
      description: "Comprehensive guide covering all Grade 12 mathematics topics with examples",
      icon: Calculator,
    },
    {
      title: "Statistical Analysis Handbook",
      type: "PDF",
      size: "3.1 MB",
      category: "Statistics",
      description: "Step-by-step guide to conducting statistical analysis for research",
      icon: TrendingUp,
    },
    {
      title: "Life Orientation Portfolio Template",
      type: "DOCX",
      size: "850 KB",
      category: "Life Orientation",
      description: "Ready-to-use template for life orientation portfolios and assessments",
      icon: FileText,
    },
    {
      title: "Mathematical Formulas Reference Sheet",
      type: "PDF",
      size: "1.2 MB",
      category: "Mathematics",
      description: "Quick reference guide with essential formulas and equations",
      icon: Calculator,
    },
    {
      title: "Research Methodology Framework",
      type: "PDF",
      size: "2.8 MB",
      category: "Statistics",
      description: "Framework for designing and executing academic research projects",
      icon: BookOpen,
    },
    {
      title: "Study Skills & Time Management Guide",
      type: "PDF",
      size: "1.5 MB",
      category: "Life Orientation",
      description: "Practical strategies for effective studying and time management",
      icon: FileText,
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      <SEO
        title="Academic Resources & Downloads | Omastalo"
        description="Access free academic materials, guides, and research papers in Mathematics, Statistics, and Life Orientation."
        keywords="educational resources, downloadable study guides, research papers, academic materials, Omastalo resources"
        url="https://www.omastalo.co.za/resources"
      />
      <section className="py-24 bg-gradient-to-br from-background to-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl mb-6">
            Academic Resources
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Free educational materials, guides, and research papers to support your learning journey
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search resources..."
                className="pl-10 h-12"
                data-testid="input-search-resources"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resources.map((resource, index) => (
              <Card
                key={index}
                className="p-6 hover-elevate transition-all duration-300 hover:shadow-lg flex flex-col"
                data-testid={`card-resource-${index}`}
              >
                <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <resource.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge variant="secondary">{resource.category}</Badge>
                  <span className="text-xs text-muted-foreground">
                    {resource.type} • {resource.size}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-lg mb-2">{resource.title}</h3>
                <p className="text-sm text-muted-foreground mb-4 flex-1">
                  {resource.description}
                </p>
                <Button variant="outline" className="w-full" data-testid={`button-download-${index}`}>
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-8 md:p-12 text-center">
            <BookOpen className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="font-heading font-bold text-3xl mb-4">Need Specific Resources?</h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Can't find what you're looking for? Contact us to request specific educational
              materials or custom resources for your learning needs.
            </p>
            <Button size="lg" data-testid="button-request-resources">
              Request Resources
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
}
