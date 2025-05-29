"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import { useSupabaseData } from "@/hooks/use-supabase-data"

export default function Projects() {
  const { projects, loading } = useSupabaseData()

  if (loading) {
    return (
      <section id="projects" className="relative py-16 sm:py-20 md:py-24 overflow-hidden bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
              Our Projects
            </h2>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">Loading projects...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="relative py-16 sm:py-20 md:py-24 overflow-hidden bg-background">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-secondary/5 rounded-full blur-[100px]" />
        <div className="absolute top-60 -right-40 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute -bottom-40 left-1/2 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-secondary/5 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-secondary bg-clip-text text-transparent">
            Our Projects
          </h2>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto">
            Explore the innovative solutions we've built to solve real-world problems and push the boundaries of
            technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects?.map((project, index) => (
            <Card
              key={project.id}
              className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2 bg-gradient-to-br from-secondary/20 to-primary/10 backdrop-blur-sm border border-border/10 hover:border-border/20"
            >
              <div className="relative overflow-hidden">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex space-x-4">
                    {project.github && project.github !== "#" && (
                      <Button size="icon" variant="secondary" asChild>
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="w-5 h-5" />
                        </a>
                      </Button>
                    )}
                    {project.demo && project.demo !== "#" && (
                      <Button size="icon" variant="secondary" asChild>
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-foreground">{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech_stack.map((tech, techIndex) => (
                    <Badge key={techIndex} variant="secondary" className="text-xs bg-primary/10 text-primary-foreground">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
