import Link from "next/link";
import { Container } from "../ui/Container";
import { Button } from "../ui/Button";
import { FOOTER_LINKS } from "@/constants/navigation";
import { SITE_CONFIG } from "@/constants/site";
import { ArrowRight, Link as LinkIcon, MessageCircle, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-surface-100 border-t border-border-dim pt-20 pb-10">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <Link href="/" className="text-2xl font-display font-bold tracking-tight text-text-high">
              INVINSIBLE<span className="text-accent-orange">.</span>
            </Link>
            <p className="text-text-low text-sm leading-relaxed max-w-xs">
              {SITE_CONFIG.description}
            </p>
            
            <div className="mt-4">
              <h4 className="text-sm font-medium text-text-high mb-3">Subscribe to our newsletter</h4>
              <form className="flex gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-obsidian border border-border-dim rounded-lg px-4 py-2 text-sm text-text-high focus:outline-none focus:border-border-glow w-full transition-colors"
                />
                <Button size="sm" type="submit" icon={<ArrowRight size={16} />}>
                  Subscribe
                </Button>
              </form>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="text-sm font-medium text-text-high mb-6 uppercase tracking-wider">Services</h4>
              <ul className="flex flex-col gap-4">
                {FOOTER_LINKS.services.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-text-low hover:text-text-high transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-text-high mb-6 uppercase tracking-wider">Industries</h4>
              <ul className="flex flex-col gap-4">
                {FOOTER_LINKS.industries.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-text-low hover:text-text-high transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-medium text-text-high mb-6 uppercase tracking-wider">Company</h4>
              <ul className="flex flex-col gap-4">
                {FOOTER_LINKS.company.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-sm text-text-low hover:text-text-high transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border-dim flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-xs text-text-low">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          
          <div className="flex items-center gap-4 text-text-low">
            <a href={SITE_CONFIG.social.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-text-high transition-colors">
              <MessageCircle size={18} />
              <span className="sr-only">Twitter</span>
            </a>
            <a href={SITE_CONFIG.social.linkedIn} target="_blank" rel="noopener noreferrer" className="hover:text-text-high transition-colors">
              <LinkIcon size={18} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href={SITE_CONFIG.social.github} target="_blank" rel="noopener noreferrer" className="hover:text-text-high transition-colors">
              <Globe size={18} />
              <span className="sr-only">GitHub</span>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
