"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight, Users, Code, Rocket, Target, Award } from "lucide-react"
import { useTheme } from "next-themes"

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

interface FeatureCardProps {
  icon: any
  title: string
  description: string
}

const features = [
  {
    icon: Users,
    title: "Community First",
    description: "Join a vibrant network of tech enthusiasts, innovators, and future leaders."
  },
  {
    icon: Code,
    title: "Hands-on Learning",
    description: "Get practical experience through workshops, hackathons, and real-world projects."
  },
  {
    icon: Rocket,
    title: "Innovation Hub",
    description: "Transform your ideas into reality with our resources and mentorship."
  },
  {
    icon: Target,
    title: "Career Growth",
    description: "Access exclusive opportunities and guidance for your tech career."
  },
  {
    icon: Award,
    title: "Leadership Development",
    description: "Build essential leadership skills through hands-on experience."
  },
  {
    icon: ArrowRight,
    title: "Future Ready",
    description: "Stay ahead with cutting-edge technologies and industry insights."
  }
]

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => (
  <div className="group relative">
    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-secondary/5 via-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    <div className="relative p-6 rounded-xl border border-border/5 hover:border-border/10 transition-all duration-300 group-hover:scale-[0.98]">
      <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center mb-4">
        <Icon className="w-6 h-6 text-primary/70" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-foreground/70">{description}</p>
    </div>
  </div>
)

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const { theme } = useTheme()

  return (
    <section id="about" className="relative py-16 sm:py-20 md:py-24 overflow-hidden bg-background">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          style={{ y, opacity }}
          className="absolute -top-40 -left-40 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-secondary/5 rounded-full blur-[100px]"
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]), opacity }}
          className="absolute top-60 -right-40 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-primary/5 rounded-full blur-[100px]"
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]), opacity }}
          className="absolute -bottom-40 left-1/2 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-secondary/5 rounded-full blur-[100px]"
        />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
            Empowering the Next Generation of Tech Leaders
          </h2>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            We are a community of passionate developers, designers, and tech enthusiasts dedicated to fostering innovation and leadership in technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <FeatureCard {...feature} />
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto mt-16">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="group relative"
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-secondary/5 via-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative p-6 rounded-xl border border-border/5 hover:border-border/10 transition-all duration-300 group-hover:scale-[0.98]">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-primary/70" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Our Mission
                </h3>
              </div>
              <ul className="text-foreground/70 leading-relaxed space-y-3">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Create a vibrant ecosystem for students to explore and grow in technology
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Organize community events to foster learning and collaboration
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Empower the next generation of tech leaders to make meaningful impact
                </li>
              </ul>
            </div>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative"
          >
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-secondary/5 via-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="relative p-6 rounded-xl border border-border/5 hover:border-border/10 transition-all duration-300 group-hover:scale-[0.98]">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-lg bg-primary/5 flex items-center justify-center mr-4">
                  <Rocket className="w-6 h-6 text-primary/70" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">
                  Our Vision
                </h3>
              </div>
              <ul className="text-foreground/70 leading-relaxed space-y-3">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Create opportunities for every student to become a tech leader
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Foster innovation and collaboration across campuses
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Build a community that shapes the future of technology
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  Create lasting impact in the digital world
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
