import type { NavItem } from "@/types";

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      { label: "RPA & CRM Automation", href: "/services/intelligent-automation" },
      { label: "Web Development", href: "/services/website-design" },
      { label: "Custom ERP", href: "/services/product-enterprise-engineering" },
      { label: "Mobile Apps", href: "/services/mobile-engineering" },
      { label: "AI & ML", href: "/services/ai-intelligent-systems" },
      { label: "Legacy Modernization", href: "/services/modernization-migration" },
    ],
  },
  {
    label: "Portfolio",
    href: "/portfolio",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Blog",
    href: "/blog",
  },
  {
    label: "Careers",
    href: "/careers",
  },
];

export const FOOTER_LINKS = {
  services: [
    { label: "RPA Automation", href: "/services/intelligent-automation" },
    { label: "Web Development", href: "/services/website-design" },
    { label: "ERP Development", href: "/services/product-enterprise-engineering" },
    { label: "Mobile Apps", href: "/services/mobile-engineering" },
    { label: "AI & ML", href: "/services/ai-intelligent-systems" },
    { label: "Legacy Migration", href: "/services/modernization-migration" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  industries: [
    { label: "Education", href: "/about#industries" },
    { label: "Healthcare", href: "/about#industries" },
    { label: "Finance", href: "/about#industries" },
    { label: "Retail & E-commerce", href: "/about#industries" },
    { label: "Manufacturing", href: "/about#industries" },
  ],
} as const;
