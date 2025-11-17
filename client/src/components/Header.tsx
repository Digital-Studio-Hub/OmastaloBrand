import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoMain from "@assets/Main Omastalo Logo_1762188177406.png";

export function Header() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/events", label: "Events" },
    { href: "/blog", label: "Blog" },
    { href: "/gallery", label: "Gallery" },
    { href: "/resources", label: "Resources" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md"
          : "bg-background"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/">
            <div
              className="flex items-center hover-elevate active-elevate-2 rounded-md -ml-2 p-2 cursor-pointer"
              data-testid="link-home-logo"
            >
              <img src={logoMain} alt="Omastalo" className="h-16 w-auto" />
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <div
                  data-testid={`link-nav-${link.label.toLowerCase()}`}
                  className={`px-4 py-2 text-sm font-medium transition-colors rounded-md hover-elevate active-elevate-2 cursor-pointer ${
                    location === link.href ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.label}
                </div>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/contact">
              <Button data-testid="button-contact" variant="default">
                Contact
              </Button>
            </Link>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <nav className="flex flex-col py-4 px-4 gap-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}>
                <div
                  data-testid={`link-mobile-${link.label.toLowerCase()}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-3 text-base font-medium rounded-md hover-elevate active-elevate-2 cursor-pointer ${
                    location === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-foreground"
                  }`}
                >
                  {link.label}
                </div>
              </Link>
            ))}
            <Link href="/contact">
              <Button
                data-testid="button-mobile-contact"
                variant="default"
                className="w-full mt-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
