"use client"

import { useState, useEffect } from "react"

interface Member {
  id: string
  name: string
  role: string
  bio: string
  image: string
  linkedin: string
  github: string
}

interface Project {
  id: string
  title: string
  description: string
  techStack: string[]
  github: string
  demo: string
  image: string
}

export function useAdminData() {
  const [members, setMembers] = useState<Member[]>([])
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    // Load members
    const savedMembers = localStorage.getItem("syndicateMembers")
    if (savedMembers) {
      setMembers(JSON.parse(savedMembers))
    }

    // Load projects
    const savedProjects = localStorage.getItem("syndicateProjects")
    if (savedProjects) {
      setProjects(JSON.parse(savedProjects))
    }

    // Listen for storage changes
    const handleStorageChange = () => {
      const updatedMembers = localStorage.getItem("syndicateMembers")
      const updatedProjects = localStorage.getItem("syndicateProjects")

      if (updatedMembers) {
        setMembers(JSON.parse(updatedMembers))
      }
      if (updatedProjects) {
        setProjects(JSON.parse(updatedProjects))
      }
    }

    window.addEventListener("storage", handleStorageChange)

    // Custom event for same-tab updates
    window.addEventListener("adminDataUpdate", handleStorageChange)

    return () => {
      window.removeEventListener("storage", handleStorageChange)
      window.removeEventListener("adminDataUpdate", handleStorageChange)
    }
  }, [])

  return { members, projects }
}
