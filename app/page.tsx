"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Hero from "@/components/hero"
import About from "@/components/about"
import Board from "@/components/board"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import BackToTop from "@/components/back-to-top"
import { ThemeProvider } from "@/components/theme-provider"
import AdminPanel from "@/components/admin-panel"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <main>
          <Hero />
          <About />
          <Projects />
          <Board />
          <Contact />
        </main>
        <Footer />
        <div className="flex justify-center mt-2 mb-6">
          <AdminPanel />
        </div>
        <BackToTop />
      </div>
    </ThemeProvider>
  )
}
