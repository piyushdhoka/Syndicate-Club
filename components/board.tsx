"use client"

import { useEffect, useRef, useState, useCallback, useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Users, Calendar, Code, Linkedin, ExternalLink, Play, Pause } from "lucide-react"
import { useSupabaseData } from "@/hooks/use-supabase-data"
import { motion, AnimatePresence } from "framer-motion"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

// Types
interface Member {
  id: string
  name: string
  role: string
  bio: string
  image: string
  linkedin: string
  github: string
  created_at?: string
  updated_at?: string
}

interface Stat {
  label: string
  value: number
  icon: React.ComponentType<{ className?: string }>
  description?: string
}

// Enhanced shimmer animation
const shimmer = "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent"

// Improved card hover effects
const cardHoverEffect = `
  group relative 
  before:absolute before:inset-0 before:rounded-lg before:p-[1px] 
  before:bg-gradient-to-r before:from-primary/20 before:via-secondary/20 before:to-primary/20 
  before:opacity-0 hover:before:opacity-100 
  before:transition-all before:duration-500
  hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10
  transition-all duration-300
`

// Enhanced loading components
const ShimmerCard = ({ className }: { className?: string }) => (
  <Card className={cn("bg-gradient-to-br from-secondary/10 to-primary/5 border border-border/5", className)}>
    <CardContent className="p-6">
      <div className={cn("w-full h-full space-y-4", shimmer)}>
        <div className="h-8 w-3/4 rounded-md bg-gradient-to-r from-muted/20 to-muted/10" />
        <div className="h-4 w-1/2 rounded-md bg-gradient-to-r from-muted/15 to-muted/5" />
        <div className="h-4 w-full rounded-md bg-gradient-to-r from-muted/20 to-muted/10" />
        <div className="h-4 w-2/3 rounded-md bg-gradient-to-r from-muted/15 to-muted/5" />
      </div>
    </CardContent>
  </Card>
)

const ShimmerMemberCard = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3 }}
  >
    <Card className="bg-gradient-to-br from-secondary/10 to-primary/5 border border-border/5">
      <CardContent className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className={cn("relative w-16 h-16 rounded-full overflow-hidden", shimmer)}>
            <div className="w-full h-full bg-gradient-to-br from-muted/20 to-muted/10 rounded-full" />
          </div>
          <div className="space-y-2 flex-1">
            <div className={cn("h-5 w-2/3 rounded-md bg-gradient-to-r from-muted/20 to-muted/10", shimmer)} />
            <div className={cn("h-4 w-1/2 rounded-md bg-gradient-to-r from-muted/15 to-muted/5", shimmer)} />
          </div>
        </div>
        <div className="space-y-2">
          <div className={cn("h-4 w-full rounded-md bg-gradient-to-r from-muted/20 to-muted/10", shimmer)} />
          <div className={cn("h-4 w-5/6 rounded-md bg-gradient-to-r from-muted/15 to-muted/5", shimmer)} />
          <div className={cn("h-4 w-4/6 rounded-md bg-gradient-to-r from-muted/10 to-muted/5", shimmer)} />
        </div>
      </CardContent>
    </Card>
  </motion.div>
)

// Enhanced member carousel with better UX
const MemberCarousel = ({ members }: { members: Member[] }): JSX.Element => {
  const [isPaused, setIsPaused] = useState(false)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [autoPaused, setAutoPaused] = useState(false)
  const carouselRef = useRef<HTMLDivElement>(null)

  // Pause animation when tab is inactive or carousel is offscreen
  useEffect(() => {
    // Page Visibility API
    const handleVisibility = () => {
      setAutoPaused(document.hidden)
    }
    document.addEventListener('visibilitychange', handleVisibility)

    // Intersection Observer
    let observer: IntersectionObserver | null = null
    if (carouselRef.current) {
      observer = new window.IntersectionObserver(
        ([entry]) => {
          setAutoPaused((prev) => document.hidden || !entry.isIntersecting)
        },
        { threshold: 0.1 }
      )
      observer.observe(carouselRef.current)
    }
    return () => {
      document.removeEventListener('visibilitychange', handleVisibility)
      if (observer && carouselRef.current) observer.unobserve(carouselRef.current)
    }
  }, [])

  // JS-driven rotation state for frame rate limiting
  const [rotation, setRotation] = useState(0)
  useEffect(() => {
    if (isPaused || autoPaused) return
    let frame: number
    let lastTime = performance.now()
    const fps = 20
    const duration = 30_000 // 30s for a full rotation
    const step = 360 / (duration / (1000 / fps))
    const animate = (now: number) => {
      if (now - lastTime >= 1000 / fps) {
        setRotation((prev) => (prev + step) % 360)
        lastTime = now
      }
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frame)
  }, [isPaused, autoPaused])

  // Early return if no members
  if (!members || members.length === 0) {
    return (
      <div className="relative w-full">
        <div className="text-center py-12">
          <p className="text-foreground/60">No team members available.</p>
        </div>
      </div>
    )
  }

  const colors = useMemo(() => [
    '30, 58, 138',   // Deep blue
    '59, 130, 246',  // Blue
    '147, 51, 234',  // Purple
    '236, 72, 153',  // Pink
    '239, 68, 68',   // Red
    '245, 158, 11',  // Amber
    '34, 197, 94',   // Green
    '20, 184, 166',  // Teal
    '99, 102, 241',  // Indigo
    '168, 85, 247',  // Violet
  ], [])

  const getLinkedInUrl = useCallback((url: string) => {
    if (!url || url === "#") return "#"
    
    let username = url.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")
    username = username.replace(/^@/, "").replace(/^\/+|\/+$/g, "")
    
    if (username.includes("linkedin.com")) {
      username = username.split("/").pop() || username
    }
    
    if (!username) return "#"
    return `https://www.linkedin.com/in/${username}`
  }, [])

  const getGitHubUrl = useCallback((url: string) => {
    if (!url || url === "#") return "#"
    
    if (url.startsWith("http")) return url
    
    const username = url.replace(/^@/, "")
    return `https://github.com/${username}`
  }, [])

  // Debounced hover handler
  const hoverTimeout = useRef<NodeJS.Timeout | null>(null)
  const handleMouseEnter = (index: number) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
    hoverTimeout.current = setTimeout(() => setHoveredIndex(index), 30)
  }
  const handleMouseLeave = () => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current)
    hoverTimeout.current = setTimeout(() => setHoveredIndex(null), 30)
  }

  return (
    <div className="relative w-full">
      {/* Enhanced Carousel Controls */}
      <div className="absolute top-4 right-4 z-20 flex gap-2">
        <Button
          size="sm"
          variant="outline"
          className="bg-background/90 backdrop-blur-md border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-300"
          onClick={() => setIsPaused(!isPaused)}
          aria-label={isPaused ? "Resume carousel" : "Pause carousel"}
        >
          {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
        </Button>
      </div>

      {/* Enhanced 3D Carousel */}
      <div className="relative w-full h-[680px] overflow-hidden -mt-12 mb-12">
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            ref={carouselRef}
            className={cn(
              "relative w-[240px] h-[320px] carousel-3d",
              (isPaused || autoPaused) && "paused",
              hoveredIndex !== null && "hovered"
            )}
            style={{
              transformStyle: 'preserve-3d',
              transform: `perspective(1200px) rotateX(-8deg) rotateY(${rotation}deg)`,
            }}
          >
            {members.map((member, index) => {
              const linkedinUrl = getLinkedInUrl(member.linkedin)
              const githubUrl = getGitHubUrl(member.github)
              const colorIndex = index % colors.length
              const isHovered = hoveredIndex === index
              
              // Safe calculation for rotation angle
              const rotationAngle = members.length > 0 ? (360 / members.length) * index : 0
              
              return (
                <div
                  key={member.id}
                  className={cn(
                    "absolute inset-0 rounded-xl overflow-hidden border cursor-pointer transition-all duration-300 backdrop-blur-[2px] hover:backdrop-blur-[1px]",
                    isHovered && "scale-105 z-10"
                  )}
                  style={{
                    borderColor: `rgba(${colors[colorIndex]}, ${isHovered ? 0.3 : 0.1})`,
                    transform: `rotateY(${rotationAngle}deg) translateZ(300px)`,
                    background: `linear-gradient(135deg, 
                      rgba(${colors[colorIndex]}, ${isHovered ? 0.08 : 0.05}) 0%, 
                      rgba(${colors[colorIndex]}, ${isHovered ? 0.05 : 0.02}) 100%)`,
                    boxShadow: `0 4px 20px rgba(${colors[colorIndex]}, ${isHovered ? 0.2 : 0.1})`
                  }}
                  onClick={() => setSelectedMember(member)}
                  onMouseEnter={() => handleMouseEnter(index)}
                  onMouseLeave={handleMouseLeave}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setSelectedMember(member)
                    }
                  }}
                  aria-label={`View ${member.name}'s profile`}
                >
                  <div className="relative w-full h-full p-4 flex flex-col items-center bg-gradient-to-br from-secondary/5 to-primary/5 hover:from-secondary/8 hover:to-primary/8 transition-all duration-300">
                    <div className={cn(
                      "relative w-24 h-24 rounded-full overflow-hidden mb-4 border-2 transition-all duration-300",
                      isHovered ? "border-primary/30 scale-110" : "border-primary/10"
                    )}>
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg";
                        }}
                      />
                    </div>
                    <div className="text-center mb-6">
                      <h3 className={cn(
                        "text-base font-semibold text-foreground mb-1 transition-all duration-300",
                        isHovered && "text-lg"
                      )}>
                        {member.name}
                      </h3>
                      <p className={cn(
                        "text-xs text-foreground/70 mb-2 transition-all duration-300",
                        isHovered && "text-sm"
                      )}>
                        {member.role}
                      </p>
                      {member.bio && (
                        <p className="text-xs text-foreground/60 line-clamp-2">
                          {member.bio}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-3 mt-auto">
                      {githubUrl !== "#" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover:bg-primary/10 transition-colors duration-300 h-8 w-8 p-0 text-foreground/70 hover:text-foreground"
                          asChild
                        >
                          <a
                            href={githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name}'s GitHub profile`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                      {linkedinUrl !== "#" && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="hover:bg-primary/10 transition-colors duration-300 h-8 w-8 p-0 text-foreground/70 hover:text-foreground"
                          asChild
                        >
                          <a
                            href={linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${member.name}'s LinkedIn profile`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Member Detail Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-background border border-border rounded-lg p-6 max-w-md w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={selectedMember.image || "/placeholder.svg"}
                  alt={selectedMember.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-semibold">{selectedMember.name}</h3>
                  <p className="text-foreground/70">{selectedMember.role}</p>
                </div>
              </div>
              
              {selectedMember.bio && (
                <p className="text-sm text-foreground/80 mb-4">{selectedMember.bio}</p>
              )}
              
              <div className="flex gap-2">
                {getGitHubUrl(selectedMember.github) !== "#" && (
                  <Button asChild size="sm">
                    <a
                      href={getGitHubUrl(selectedMember.github)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Github className="w-4 h-4" />
                      GitHub
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                )}
                {getLinkedInUrl(selectedMember.linkedin) !== "#" && (
                  <Button asChild size="sm" variant="outline">
                    <a
                      href={getLinkedInUrl(selectedMember.linkedin)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Linkedin className="w-4 h-4" />
                      LinkedIn
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Enhanced Styles */}
      <style jsx global>{`
        .carousel-3d {
          will-change: transform;
        }

        .carousel-3d.paused,
        .carousel-3d.hovered {
        }

        @media (prefers-reduced-motion: reduce) {
          .carousel-3d {
          }
        }
      `}</style>
    </div>
  )
}

// Enhanced animated counter with better performance
const AnimatedCounter = ({ value, duration = 2000 }: { value: number; duration?: number }) => {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (hasAnimated) {
      setCount(value)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          
          let startTime: number
          const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime
            const progress = Math.min((currentTime - startTime) / duration, 1)
            
            // Easing function for smoother animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4)
            setCount(Math.floor(easeOutQuart * value))

            if (progress < 1) {
              requestAnimationFrame(animate)
            }
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [value, duration, hasAnimated])

  return <span ref={ref}>{count.toLocaleString()}</span>
}

// Main Board component
const Board = (): JSX.Element => {
  const { members: boardMembers, loading, error } = useSupabaseData()

  const stats: Stat[] = useMemo(() => [
    { 
      label: "Total Members", 
      value: boardMembers?.length || 8, 
      icon: Users,
      description: "Active team members"
    },
    { 
      label: "Events Participated", 
      value: 45, 
      icon: Calendar,
      description: "Hackathons & workshops"
    },
    { 
      label: "Projects Completed", 
      value: 12, 
      icon: Code,
      description: "Successful deliveries"
    },
    { 
      label: "Years Active", 
      value: new Date().getFullYear() - 2023 + 1, 
      icon: Calendar,
      description: "Since establishment"
    },
  ], [boardMembers])

  // Error state
  if (error) {
    return (
      <section id="board" className="relative py-16 sm:py-20 md:py-24 overflow-hidden bg-background">
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
              Our Leadership Team
            </h2>
            <p className="text-lg text-foreground/60">
              Unable to load team members. Please try again later.
            </p>
          </div>
        </div>
      </section>
    )
  }

  // Loading state
  if (loading) {
    return (
      <section id="board" className="relative py-16 sm:py-20 md:py-24 overflow-hidden bg-background">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute top-60 -right-40 w-96 h-96 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute -bottom-40 left-1/2 w-96 h-96 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-full blur-[120px] animate-pulse" />
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
              Our Leadership Team
            </h2>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
              Loading our amazing team members...
            </p>
          </motion.div>

          {/* Stats Section Shimmer */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[...Array(4)].map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <ShimmerCard className="text-center" />
              </motion.div>
            ))}
          </div>

          {/* Loading message for carousel */}
          <div className="text-center">
            <motion.div
              className="inline-flex items-center gap-2 text-foreground/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="w-4 h-4 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
              Preparing team showcase...
            </motion.div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="board" className="relative pt-16 pb-12 sm:pt-20 sm:pb-16 md:pt-24 md:pb-20 overflow-hidden bg-background">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-full blur-[120px]" />
        <div className="absolute top-60 -right-40 w-96 h-96 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 left-1/2 w-96 h-96 bg-gradient-to-r from-secondary/10 to-primary/10 rounded-full blur-[120px]" />
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
            Our Leadership Team
          </h2>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Meet the passionate individuals who drive Syndicate forward and make our community thrive through innovation and collaboration.
          </p>
        </motion.div>

        {/* Enhanced Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className={cardHoverEffect}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="relative bg-gradient-to-br from-secondary/10 to-primary/5 border border-border/5 hover:border-border/20 transition-all duration-500 group-hover:scale-[1.02] backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <div className="relative mb-4">
                    <div className="absolute inset-0 bg-primary/5 rounded-full blur-xl scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <stat.icon className="relative w-8 h-8 text-primary/70 group-hover:text-primary mx-auto transition-colors duration-300" />
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2 group-hover:scale-110 transition-transform duration-300">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <p className="text-sm font-medium text-foreground/70 mb-1">{stat.label}</p>
                  {stat.description && (
                    <p className="text-xs text-foreground/50">{stat.description}</p>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Board Members Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold text-foreground mb-2">
              Meet Our Team
            </h3>
            <p className="text-foreground/60 text-sm">
              Hover to pause • Click to learn more
            </p>
          </div>
          <MemberCarousel members={boardMembers || []} />
        </motion.div>
      </div>
    </section>
  )
}

export default Board