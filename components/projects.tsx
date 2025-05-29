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
      <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-blue-600 bg-clip-text text-transparent">
              Our Projects
            </h2>
            <p className="text-lg text-foreground/80 max-w-3xl mx-auto">Loading projects...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-blue-600 bg-clip-text text-transparent">
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
              className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
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
                    <Badge key={techIndex} variant="secondary" className="text-xs">
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
