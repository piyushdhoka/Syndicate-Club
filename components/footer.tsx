"use client"

import SocialIcons from "./social-icons"

const quickLinks = [
  { name: "About", href: "#about" },
  { name: "Board", href: "#board" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

export default function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Logo and Description */}
          <div>
            <div className="flex items-center mb-4">
              <img src="/syndicate-logo.png" alt="Syndicate Logo" className="w-8 h-8 rounded-full mr-3" />
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                Syndicate
              </h3>
            </div>
            <p className="text-foreground/70 mb-6 max-w-md">
              Empowering the next generation of technologists through innovation, collaboration, and excellence. Join
              our community and shape the future of technology.
            </p>
            <div className="flex items-center">
              <SocialIcons />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-foreground/70 hover:text-foreground hover:translate-x-2 transition-all duration-200 block"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-foreground/70 text-sm">
            © {new Date().getFullYear()} Syndicate. All rights reserved. Built with passion by our community.
          </p>
        </div>
      </div>
    </footer>
  )
}
