"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Code, Users, Lightbulb, Rocket, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect"
import { FlipWords } from "@/components/ui/flip-words"

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const words = [
    {
      text: "Solution",
    },
    {
      text: "For",
    },
    {
      text: "What",
    },
    {
      text: "Matters",
      className: "text-primary",
    },
  ]

  const flipWords = ["solutions", "dreams", "futures", "innovation"]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const features = [
    { icon: Code, text: "Cutting-edge Projects" },
    { icon: Users, text: "Collaborative Community" },
    { icon: Lightbulb, text: "Innovation Hub" },
    { icon: Rocket, text: "Career Growth" },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Aurora/Gradient Waves Animated Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="aurora1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.7" />
              <stop offset="100%" stopColor="hsl(var(--secondary))" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="aurora2" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--accent))" stopOpacity="0.5" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path>
            <animate attributeName="d" dur="12s" repeatCount="indefinite"
              values="M0,400 Q360,300 720,400 T1440,400 V600 H0Z;
                      M0,350 Q360,450 720,350 T1440,350 V600 H0Z;
                      M0,400 Q360,300 720,400 T1440,400 V600 H0Z" />
          </path>
          <path fill="url(#aurora1)">
            <animate attributeName="d" dur="16s" repeatCount="indefinite"
              values="M0,420 Q360,320 720,420 T1440,420 V600 H0Z;
                      M0,370 Q360,470 720,370 T1440,370 V600 H0Z;
                      M0,420 Q360,320 720,420 T1440,420 V600 H0Z" />
          </path>
          <path fill="url(#aurora2)">
            <animate attributeName="d" dur="20s" repeatCount="indefinite"
              values="M0,440 Q360,340 720,440 T1440,440 V600 H0Z;
                      M0,390 Q360,490 720,390 T1440,390 V600 H0Z;
                      M0,440 Q360,340 720,440 T1440,440 V600 H0Z" />
          </path>
        </svg>
      </div>

      {/* Floating Shapes with Mouse Interaction */}
      <div
        className="absolute w-72 h-72 bg-gradient-to-r from-blue-900/20 to-blue-800/20 rounded-full blur-3xl transition-transform duration-1000 ease-out"
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          left: "10%",
          top: "20%",
        }}
      />
      <div
        className="absolute w-48 h-48 bg-gradient-to-r from-blue-800/15 to-blue-900/15 rounded-full blur-2xl transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`,
          right: "15%",
          bottom: "25%",
        }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center py-16">
          {/* Main Heading with Typewriter Effect */}
          <div className="w-full max-w-4xl mx-auto flex justify-center">
            <TypewriterEffectSmooth 
              words={words} 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center flex items-center justify-center" 
            />
          </div>

          {/* Dynamic Subtitle */}
          <div className="w-full max-w-3xl mx-auto mt-4">
            <div className="text-xl sm:text-2xl font-medium text-center text-foreground/80">
              Coding <FlipWords words={flipWords} /> together
            </div>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto mt-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-2 bg-blue-900/30 backdrop-blur-sm border border-blue-700/20 rounded-full px-4 py-2 hover:bg-blue-800/40 hover:scale-105 transition-all duration-300 cursor-default"
              >
                <feature.icon className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-medium text-blue-100">{feature.text}</span>
              </motion.div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center mt-8">
            <Button
              size="lg"
              onClick={() => scrollToSection("#contact")}
              className="group text-lg px-8 py-5 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <span className="mr-2">Join Our Community</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection("#about")}
              className="group text-lg px-8 py-5 border-2 border-blue-400/30 hover:border-blue-400 hover:bg-blue-900/30 hover:text-white transform hover:scale-105 transition-all duration-300"
            >
              <span className="mr-2">Learn More</span>
              <Lightbulb className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
            </Button>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col items-center space-y-2 mt-6"
          >
            <span className="text-sm text-foreground/50 font-medium">Explore below</span>
            <ChevronDown className="w-6 h-6 text-foreground/50 animate-bounce" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
