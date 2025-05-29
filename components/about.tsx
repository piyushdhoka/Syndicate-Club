"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowRight, Users, Code, Rocket, Target, Award, Eye } from "lucide-react"
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

const FeatureCard = ({ icon: Icon, title, description, delay }: { 
  icon: any, 
  title: string, 
  description: string,
  delay: number 
}) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { theme } = useTheme()

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={{ duration: 0.5, delay }}
      className={`group relative bg-gradient-to-br ${
        theme === 'dark' 
          ? 'from-background-dark/40 to-background-dark/20' 
          : 'from-background-light/80 to-background-light/60'
      } backdrop-blur-xl rounded-2xl p-6 border ${
        theme === 'dark'
          ? 'border-gradient-from/20 hover:border-gradient-from/40'
          : 'border-primary/30 hover:border-primary/50'
      } transition-all duration-300`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${
        theme === 'dark'
          ? 'from-blue-500/5 to-blue-600/5'
          : 'from-blue-500/10 to-blue-600/10'
      } rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      <div className="relative z-10">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4 transform group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className={`text-xl font-bold mb-2 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {title}
        </h3>
        <p className={`${
          theme === 'dark' ? 'text-white/60 group-hover:text-white/80' : 'text-gray-600 group-hover:text-gray-800'
        } transition-colors duration-300`}>
          {description}
        </p>
      </div>
    </motion.div>
  )
}

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], [0, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const { theme } = useTheme()

  return (
    <section id="about" className={`relative py-16 sm:py-20 md:py-24 overflow-hidden ${
      theme === 'dark' ? 'bg-background-dark' : 'bg-background-light'
    }`}>
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          style={{ y, opacity }}
          className={`absolute -top-40 -left-40 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 ${
            theme === 'dark' ? 'bg-gradient-from/10' : 'bg-primary/5'
          } rounded-full blur-3xl`}
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]), opacity }}
          className={`absolute top-60 -right-40 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 ${
            theme === 'dark' ? 'bg-gradient-via/10' : 'bg-primary/5'
          } rounded-full blur-3xl`}
        />
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]), opacity }}
          className={`absolute -bottom-40 left-1/2 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 ${
            theme === 'dark' ? 'bg-gradient-to/10' : 'bg-primary/5'
          } rounded-full blur-3xl`}
        />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center mb-12 sm:mb-16"
        >
          <motion.h2 
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 bg-clip-text text-transparent"
          >
            Empowering the Next Generation of Tech Leaders
          </motion.h2>
          <motion.p 
            variants={fadeInUp}
            className={`text-base sm:text-lg ${
              theme === 'dark' ? 'text-white/80' : 'text-gray-700'
            } max-w-2xl mx-auto`}
          >
            SYNDICATE is more than just a tech community - we're a movement dedicated to fostering innovation, leadership, and excellence in technology across campuses.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16"
        >
          <FeatureCard
            icon={Users}
            title="Community First"
            description="Join a vibrant network of tech enthusiasts, innovators, and future leaders."
            delay={0.1}
          />
          <FeatureCard
            icon={Code}
            title="Hands-on Learning"
            description="Get practical experience through workshops, hackathons, and real-world projects."
            delay={0.2}
          />
          <FeatureCard
            icon={Rocket}
            title="Innovation Hub"
            description="Transform your ideas into reality with our resources and mentorship."
            delay={0.3}
          />
          <FeatureCard
            icon={Target}
            title="Career Growth"
            description="Access exclusive opportunities and guidance for your tech career."
            delay={0.4}
          />
          <FeatureCard
            icon={Award}
            title="Leadership Development"
            description="Build essential leadership skills through hands-on experience."
            delay={0.5}
          />
          <FeatureCard
            icon={ArrowRight}
            title="Future Ready"
            description="Stay ahead with cutting-edge technologies and industry insights."
            delay={0.6}
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto">
          {/* Mission */}
          <motion.div
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUp}
            className="relative group"
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${
              theme === 'dark' ? 'from-blue-500/20 to-blue-600/20' : 'from-blue-500/10 to-blue-600/10'
            } rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500`} />
            <div className={`relative bg-gradient-to-br ${
              theme === 'dark' ? 'from-background-dark/40 to-background-dark/20' : 'from-background-light/80 to-background-light/60'
            } backdrop-blur-xl rounded-2xl p-6 sm:p-8 border ${
              theme === 'dark' ? 'border-gradient-from/20 group-hover:border-gradient-from/40' : 'border-primary/30 group-hover:border-primary/50'
            } transition-all duration-300 h-[300px]`}>
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-gradient-from via-gradient-via to-gradient-to flex items-center justify-center mr-4 transform group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-foreground-dark" />
                </div>
                <h3 className={`text-xl sm:text-2xl font-bold ${
                  theme === 'dark' ? 'text-foreground-dark' : 'text-foreground-light'
                }`}>
                  Our Mission
                </h3>
              </div>
              <ul className={`${
                theme === 'dark' ? 'text-foreground-dark/80' : 'text-foreground-light/80'
              } leading-relaxed text-sm sm:text-base space-y-3`}>
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
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={fadeInUp}
            className="relative group"
          >
            <div className={`absolute inset-0 bg-gradient-to-r ${
              theme === 'dark' ? 'from-blue-500/20 to-blue-600/20' : 'from-blue-500/10 to-blue-600/10'
            } rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500`} />
            <div className={`relative bg-gradient-to-br ${
              theme === 'dark' ? 'from-background-dark/40 to-background-dark/20' : 'from-background-light/80 to-background-light/60'
            } backdrop-blur-xl rounded-2xl p-6 sm:p-8 border ${
              theme === 'dark' ? 'border-gradient-from/20 group-hover:border-gradient-from/40' : 'border-primary/30 group-hover:border-primary/50'
            } transition-all duration-300 h-[300px]`}>
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br from-gradient-from via-gradient-via to-gradient-to flex items-center justify-center mr-4 transform group-hover:scale-110 transition-transform duration-300">
                  <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-foreground-dark" />
                </div>
                <h3 className={`text-xl sm:text-2xl font-bold ${
                  theme === 'dark' ? 'text-foreground-dark' : 'text-foreground-light'
                }`}>
                  Our Vision
                </h3>
              </div>
              <ul className={`${
                theme === 'dark' ? 'text-foreground-dark/80' : 'text-foreground-light/80'
              } leading-relaxed text-sm sm:text-base space-y-3`}>
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
