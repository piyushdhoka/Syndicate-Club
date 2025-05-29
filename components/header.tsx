"use client"

import { useState, useEffect } from "react"
import { Menu, Moon, Sun, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"

const navItems = [
  { name: "About", href: "#about" },
  { name: "Board", href: "#board" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isVisible, setIsVisible] = useState(true)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsScrolled(currentScrollY > 50)
      
      // Hide header when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
      setLastScrollY(currentScrollY)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/98 shadow-sm backdrop-blur-sm" : "bg-transparent"
        } ${isVisible ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center group cursor-pointer">
              <div className="relative">
                <img
                  src="/syndicate-logo.png"
                  alt="Syndicate Logo"
                  className="w-10 h-10 rounded-full mr-3 group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                  Syndicate
                </h1>
                <p className="text-xs text-foreground/60 -mt-1">Tech Club</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="relative px-4 py-2 text-foreground/80 hover:text-foreground transition-colors duration-200 font-medium group"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-blue-600 group-hover:w-full group-hover:left-0 transition-all duration-300"></span>
                </button>
              ))}

              {/* Theme Toggle */}
              <div className="ml-4 pl-4 border-l border-border/50">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="hover:bg-blue-50 dark:hover:bg-blue-950/50 transition-colors duration-200"
                >
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="hover:bg-blue-50 dark:hover:bg-blue-950/50"
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="hover:bg-blue-50 dark:hover:bg-blue-950/50"
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                <span className="sr-only">Toggle menu</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="fixed top-16 right-0 w-64 h-fit bg-background/98 border border-border rounded-l-2xl shadow-xl">
            <nav className="flex flex-col p-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className="text-left text-lg font-medium text-foreground/80 hover:text-foreground hover:translate-x-2 transition-all duration-200 py-2 px-4 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950/30"
                >
                  {item.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
