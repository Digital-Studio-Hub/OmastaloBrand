import { Link } from "wouter";
import { Mail, MapPin, Phone } from "lucide-react";
import logoWhite from "@assets/White Omastalo Logo_1762188177408.png";
import lekkerLogo from "@assets/lekkerlogo_1762187437543.png";
import lekkerBadge from "@assets/Level 1_1762187427303.png";

export function Footer() {
  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/events", label: "Events" },
    { href: "/contact", label: "Contact" },
  ];

  const resourceLinks = [
    { href: "/blog", label: "Blog" },
    { href: "/resources", label: "Resources" },
    { href: "/testimonials", label: "Testimonials" },
    { href: "/gallery", label: "Gallery" },
    { href: "/faq", label: "FAQ" },
  ];

  return (
    <footer className="bg-[#0D1B2A] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <img src={logoWhite} alt="Omastalo Organisation" className="h-24 w-auto mb-4" />
            <p className="text-sm text-gray-300 leading-relaxed">
              Omastalo Organisation
            </p>
            <p className="text-sm text-gray-400 mt-2 italic">
              Empowering communities, transforming lives, one household at a time.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <div
                      data-testid={`link-footer-${link.label.toLowerCase()}`}
                      className="text-sm text-gray-300 hover:text-primary transition-colors cursor-pointer"
                    >
                      {link.label}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <div
                      data-testid={`link-footer-${link.label.toLowerCase()}`}
                      className="text-sm text-gray-300 hover:text-primary transition-colors cursor-pointer"
                    >
                      {link.label}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <Mail className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:info@omastalo.co.za"
                  className="hover:text-primary transition-colors"
                >
                  info@omastalo.co.za
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <Phone className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>+27 83 951 7552</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-gray-300">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <span>Tshwane, South Africa</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 py-8">
          <div className="flex flex-col items-center gap-4">
            <a
              href="https://lekker.network/the-lekker-network-verified"
              target="_blank"
              rel="noopener noreferrer"
              data-testid="link-lekker-badge"
              className="hover-elevate active-elevate-2 rounded-md"
            >
              <img
                src={lekkerBadge}
                alt="Lekker Network Level 1 Verified"
                className="h-24 w-auto"
              />
            </a>
            <div className="flex flex-col items-center gap-2">
              <a
                href="https://lekker.network/"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="link-lekker-logo"
                className="hover-elevate active-elevate-2 rounded-md"
              >
                <img
                  src={lekkerLogo}
                  alt="Lekker Network"
                  className="h-8 w-auto"
                />
              </a>
              <p className="text-sm text-gray-400">Powered by Lekker Network</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <div>
              <p>© 2025 Omastalo Organisation. All rights reserved.</p>
              <p className="text-xs mt-1">Website developed for community empowerment and social development. Designed under the leadership of Dr. Michael Kgarimetsa.</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/privacy">
                <div
                  data-testid="link-privacy"
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Privacy Policy
                </div>
              </Link>
              <span>|</span>
              <Link href="/terms">
                <div
                  data-testid="link-terms"
                  className="hover:text-primary transition-colors cursor-pointer"
                >
                  Terms of Service
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
