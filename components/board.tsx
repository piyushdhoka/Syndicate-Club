"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, Users, Calendar, Code, Linkedin } from "lucide-react"
import { useSupabaseData } from "@/hooks/use-supabase-data"
import { motion } from "framer-motion"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

const shimmer = "relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent"

const cardHoverEffect = "group relative before:absolute before:inset-0 before:rounded-lg before:p-[1px] before:bg-gradient-to-r before:from-primary/5 before:via-secondary/5 before:to-primary/5 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300"

const ShimmerCard = ({ className }: { className?: string }) => (
  <Card className={cn("bg-gradient-to-br from-secondary/10 to-primary/5 border border-border/5", className)}>
    <CardContent className="p-6">
      <div className={cn("w-full h-full space-y-4", shimmer)}>
        <div className="h-8 w-3/4 rounded-md bg-muted/10" />
        <div className="h-4 w-1/2 rounded-md bg-muted/10" />
        <div className="h-4 w-full rounded-md bg-muted/10" />
        <div className="h-4 w-2/3 rounded-md bg-muted/10" />
      </div>
    </CardContent>
  </Card>
)

const ShimmerMemberCard = () => (
  <Card className="bg-gradient-to-br from-secondary/10 to-primary/5 border border-border/5">
    <CardContent className="p-6">
      <div className="flex items-center space-x-4 mb-4">
        <div className={cn("relative w-16 h-16 rounded-full overflow-hidden", shimmer)}>
          <div className="w-full h-full bg-muted/10" />
        </div>
        <div className="space-y-2 flex-1">
          <div className={cn("h-5 w-2/3 rounded-md bg-muted/10", shimmer)} />
          <div className={cn("h-4 w-1/2 rounded-md bg-muted/10", shimmer)} />
        </div>
      </div>
      <div className="space-y-2">
        <div className={cn("h-4 w-full rounded-md bg-muted/10", shimmer)} />
        <div className={cn("h-4 w-5/6 rounded-md bg-muted/10", shimmer)} />
        <div className={cn("h-4 w-4/6 rounded-md bg-muted/10", shimmer)} />
      </div>
    </CardContent>
  </Card>
)

const MemberCarousel = ({ members }: { members: any[] }): JSX.Element => {
  const { theme } = useTheme()
  const colors = [
    '30, 58, 138',  // Deep blue base
    '59, 130, 246', // Blue variation
    '30, 58, 138',
    '59, 130, 246',
    '30, 58, 138',
    '59, 130, 246',
    '30, 58, 138',
    '59, 130, 246',
    '30, 58, 138',
    '59, 130, 246'
  ]

  const getLinkedInUrl = (url: string) => {
    if (!url || url === "#") return "#"
    
    // Remove any existing linkedin.com/in/ prefix
    let username = url.replace(/^https?:\/\/(www\.)?linkedin\.com\/in\//, "")
    
    // Remove @ symbol and any extra slashes
    username = username.replace(/^@/, "").replace(/^\/+|\/+$/g, "")
    
    // If it's already a full URL, extract just the username
    if (username.includes("linkedin.com")) {
      username = username.split("/").pop() || username
    }
    
    // Ensure we have a valid username
    if (!username) return "#"
    
    // Construct the proper LinkedIn URL
    return `https://www.linkedin.com/in/${username}`
  }

  return (
    <div className="relative w-full h-[600px] overflow-hidden -mt-24">
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className="relative w-[220px] h-[300px]"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'perspective(1200px) rotateX(-8deg)',
            animation: 'rotating 30s linear infinite'
          }}
        >
          {members.map((member, index) => {
            const linkedinUrl = getLinkedInUrl(member.linkedin || "")
            const githubUrl = member.github || "#"
            
            return (
              <div
                key={member.id}
                className="absolute inset-0 rounded-xl overflow-hidden border"
                style={{
                  borderColor: `rgba(${colors[index % colors.length]}, 0.05)`,
                  transform: `rotateY(${(360 / members.length) * index}deg) translateZ(280px)`,
                  background: `linear-gradient(135deg, rgba(${colors[index % colors.length]}, 0.02) 0%, rgba(${colors[index % colors.length]}, 0.01) 100%)`,
                  boxShadow: `0 0 10px rgba(${colors[index % colors.length]}, 0.02)`
                }}
              >
                <div className="relative w-full h-full p-4 flex flex-col items-center bg-gradient-to-br from-secondary/5 to-primary/5">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 border border-primary/5">
                    <img
                      src={
                        member.github 
                          ? `https://github.com/${member.github.split("/").pop()?.replace(/^@/, "")}.png`
                          : "/placeholder.svg"
                      }
                      alt={member.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <div className="text-center mb-6">
                    <h3 className="text-base font-semibold text-foreground">
                      {member.name}
                    </h3>
                    <p className="text-xs text-foreground/70">
                      {member.role}
                    </p>
                  </div>
                  <div className="flex gap-4">
                    {githubUrl !== "#" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="hover:bg-primary/5 transition-colors duration-300 h-10 w-10 p-0 text-foreground/70 hover:text-foreground"
                        asChild
                      >
                        <a
                          href={githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name}'s GitHub profile`}
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      </Button>
                    )}
                    {linkedinUrl !== "#" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="hover:bg-primary/5 transition-colors duration-300 h-10 w-10 p-0 text-foreground/70 hover:text-foreground"
                        asChild
                      >
                        <a
                          href={linkedinUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name}'s LinkedIn profile`}
                        >
                          <Linkedin className="w-5 h-5" />
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
  )
}

const Board = (): JSX.Element => {
  const { members: boardMembers, loading } = useSupabaseData()
  const [hasAnimated, setHasAnimated] = useState(false)
  const { theme } = useTheme()

  const stats = [
    { label: "Total Members", value: 8, icon: Users },
    { label: "Events/Hackathons Participated", value: 45, icon: Calendar },
    { label: "Projects Completed", value: 5, icon: Code },
    { label: "Established", value: 2023, icon: Calendar },
  ]

  function AnimatedCounter({ value, duration = 2000 }: { value: number; duration?: number }) {
    const [count, setCount] = useState(0)
    const [isVisible, setIsVisible] = useState(false)
    const ref = useRef<HTMLSpanElement>(null)

    useEffect(() => {
      if (hasAnimated) {
        setCount(value)
        return
      }

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true)
            setHasAnimated(true)
          }
        },
        { threshold: 0.1 },
      )

      if (ref.current) {
        observer.observe(ref.current)
      }

      return () => observer.disconnect()
    }, [isVisible, hasAnimated, value])

    useEffect(() => {
      if (!isVisible || hasAnimated) return

      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / duration, 1)
        setCount(Math.floor(progress * value))

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }, [isVisible, value, duration, hasAnimated])

    return <span ref={ref}>{count}</span>
  }

  if (loading) {
    return (
      <section id="board" className="relative py-16 sm:py-20 md:py-24 overflow-hidden bg-background">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -left-40 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-secondary/5 rounded-full blur-[100px]" />
          <div className="absolute top-60 -right-40 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-primary/5 rounded-full blur-[100px]" />
          <div className="absolute -bottom-40 left-1/2 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-secondary/5 rounded-full blur-[100px]" />
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
              Our Leadership Team
            </h2>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">Loading team members...</p>
          </div>

          {/* Stats Section Shimmer */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[...Array(4)].map((_, index) => (
              <ShimmerCard key={index} className="text-center" />
            ))}
          </div>

          {/* Board Members Shimmer */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <ShimmerMemberCard key={index} />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="board" className="relative py-16 sm:py-20 md:py-24 overflow-hidden bg-background">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-secondary/5 rounded-full blur-[100px]" />
        <div className="absolute top-60 -right-40 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 left-1/2 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
            Our Leadership Team
          </h2>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            Meet the passionate individuals who drive Syndicate forward and make our community thrive.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className={cardHoverEffect}>
              <Card className="relative bg-gradient-to-br from-secondary/10 to-primary/5 border border-border/5 hover:border-border/10 transition-all duration-300 group-hover:scale-[0.98]">
                <CardContent className="p-6">
                  <stat.icon className="w-8 h-8 text-primary/70 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-foreground mb-2">
                    <AnimatedCounter value={stat.value} />
                  </div>
                  <p className="text-sm text-foreground/70">{stat.label}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Board Members Carousel */}
        <div className="relative">
          <style jsx global>{`
            @keyframes rotating {
              from {
                transform: perspective(1200px) rotateX(-8deg) rotateY(0);
              }
              to {
                transform: perspective(1200px) rotateX(-8deg) rotateY(1turn);
              }
            }

            @media (prefers-reduced-motion: reduce) {
              .rotating {
                animation: none;
              }
            }
          `}</style>
          <MemberCarousel members={boardMembers || []} />
        </div>
      </div>
    </section>
  )
}

export default Board