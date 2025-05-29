"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ChevronDown, Code, Users, Lightbulb, Rocket, ArrowRight, Sparkles } from "lucide-react"
import { motion } from "framer-motion"

const DrawCircleText = () => {
  return (
    <div className="relative">
      <span className="relative">
        Innovate
        <svg
          viewBox="0 0 286 73"
          fill="none"
          className="absolute -left-2 -right-2 -top-2 bottom-0 translate-y-1"
        >
          <motion.path
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{
              duration: 1.25,
              ease: "easeInOut",
            }}
            d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
            stroke="#FACC15"
            strokeWidth="3"
          />
        </svg>
      </span>
      <span className="mx-2">.</span>
      <span className="relative">
        Collaborate
        <svg
          viewBox="0 0 286 73"
          fill="none"
          className="absolute -left-2 -right-2 -top-2 bottom-0 translate-y-1"
        >
          <motion.path
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{
              duration: 1.25,
              ease: "easeInOut",
              delay: 0.5,
            }}
            d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
            stroke="#FACC15"
            strokeWidth="3"
          />
        </svg>
      </span>
      <span className="mx-2">.</span>
      <span className="relative">
        Excel
        <svg
          viewBox="0 0 286 73"
          fill="none"
          className="absolute -left-2 -right-2 -top-2 bottom-0 translate-y-1"
        >
          <motion.path
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{
              duration: 1.25,
              ease: "easeInOut",
              delay: 1,
            }}
            d="M142.293 1C106.854 16.8908 6.08202 7.17705 1.23654 43.3756C-2.10604 68.3466 29.5633 73.2652 122.688 71.7518C215.814 70.2384 316.298 70.689 275.761 38.0785C230.14 1.37835 97.0503 24.4575 52.9384 1"
            stroke="#FACC15"
            strokeWidth="3"
          />
        </svg>
      </span>
    </div>
  )
}

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [currentText, setCurrentText] = useState(0)

  const dynamicTexts = [
    "Pioneering AI/ML Innovation Beyond Boundaries",
    "Building Intelligent Systems for Tomorrow",
    "Connecting Theory with Smart Technology",
    "Cultivating Future Tech Leaders",
  ]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % dynamicTexts.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const features = [
    { icon: Code, text: "Cutting-edge Projects", delay: "0s" },
    { icon: Users, text: "Collaborative Community", delay: "0.2s" },
    { icon: Lightbulb, text: "Innovation Hub", delay: "0.4s" },
    { icon: Rocket, text: "Career Growth", delay: "0.6s" },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-20">
      {/* Aurora/Gradient Waves Animated Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="aurora1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="aurora2" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.3" />
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
        className="absolute w-72 h-72 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-full blur-3xl transition-transform duration-1000 ease-out"
        style={{
          transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          left: "10%",
          top: "20%",
        }}
      />
      <div
        className="absolute w-48 h-48 bg-gradient-to-r from-blue-400/8 to-blue-700/8 rounded-full blur-2xl transition-transform duration-700 ease-out"
        style={{
          transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`,
          right: "15%",
          bottom: "25%",
        }}
      />

      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
        {/* Enhanced Welcome Badge */}
        <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-950/50 dark:to-blue-900/50 border border-blue-200/60 dark:border-blue-800/60 rounded-full px-6 py-3 mb-8 animate-fade-in shadow-lg backdrop-blur-sm hover:shadow-xl hover:scale-105 transition-all duration-300 group">
          <div className="relative">
            <Sparkles className="w-5 h-5 text-blue-600 dark:text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <span className="text-sm font-semibold bg-gradient-to-r from-blue-700 to-blue-600 dark:from-blue-300 dark:to-blue-400 bg-clip-text text-transparent">
            Empowering Future Innovators
          </span>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 text-foreground leading-tight">
          <span className="block mb-2">Innovate. Collaborate. Excel.</span>
        </h1>

        {/* Dynamic Subtitle */}
        <div className="h-12 mb-8 relative">
          <div className="dynamic-text-container">
            <motion.p
              key={currentText}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 15,
                duration: 0.3
              }}
              className="text-lg sm:text-xl font-medium"
            >
              {dynamicTexts[currentText]}
            </motion.p>
          </div>
        </div>

        {/* Description */}
        <p className="text-lg text-foreground/70 mb-10 max-w-3xl mx-auto leading-relaxed">
          Join a community of passionate technologists, collaborate on real-world projects, and develop the skills to lead in tomorrow's tech landscape.
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center space-x-2 bg-background/70 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2 hover:bg-background/90 hover:scale-105 transition-all duration-300 cursor-default shadow-sm"
              style={{ animationDelay: feature.delay }}
            >
              <feature.icon className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-foreground/80">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <Button
            size="lg"
            onClick={() => scrollToSection("#contact")}
            className="group text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <span className="mr-2">Join Our Community</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollToSection("#about")}
            className="group text-lg px-8 py-4 border-2 border-blue-600/30 hover:border-blue-600 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-950/30 transform hover:scale-105 transition-all duration-300"
          >
            <span className="mr-2">Learn More</span>
            <Lightbulb className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div className="animate-bounce">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm text-foreground/50 font-medium">Explore below</span>
            <ChevronDown className="w-6 h-6 text-foreground/50" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-glow {
          0% {
            box-shadow: 0 0 0 rgba(59, 130, 246, 0.4);
          }
          50% {
            box-shadow: 0 0 15px rgba(59, 130, 246, 0.6);
          }
          100% {
            box-shadow: 0 0 0 rgba(59, 130, 246, 0.4);
          }
        }

        :global(.dark) @keyframes pulse-glow {
          0% {
            box-shadow: 0 0 0 rgba(96, 165, 250, 0.3);
          }
          50% {
            box-shadow: 0 0 15px rgba(96, 165, 250, 0.5);
          }
          100% {
            box-shadow: 0 0 0 rgba(96, 165, 250, 0.3);
          }
        }

        .dynamic-text-container {
          position: relative;
          padding: 8px 25px;
          background: #ffffff;
          font-size: 15px;
          font-weight: 500;
          color: #3b82f6;
          border: 2px solid #3b82f6;
          border-radius: 6px;
          box-shadow: 0 0 0 rgba(59, 130, 246, 0.2);
          transition: all 0.3s ease-in-out;
          cursor: pointer;
          display: inline-block;
          margin: 10px;
          animation: pulse-glow 2s infinite ease-in-out;
        }

        .dynamic-text-container:hover {
          background: #3b82f6;
          color: #ffffff;
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.4);
        }

        :global(.dark) .dynamic-text-container {
          background: #1e293b;
          color: #60a5fa;
          border-color: #60a5fa;
          box-shadow: 0 0 0 rgba(96, 165, 250, 0.2);
        }

        :global(.dark) .dynamic-text-container:hover {
          background: #60a5fa;
          color: #1e293b;
          box-shadow: 0 0 15px rgba(96, 165, 250, 0.4);
        }
      `}</style>
    </section>
  )
}
