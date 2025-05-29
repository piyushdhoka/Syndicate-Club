import { createClient } from "@supabase/supabase-js"

const supabaseUrl = 'https://djxwxvmkpgkdbjqwfwlu.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRqeHd4dm1rcGdrZGJqcXdmd2x1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgzNjY3MTIsImV4cCI6MjA2Mzk0MjcxMn0.je8Ikz6UrXC4qLNr4cIvtzMEenW117UCNo3jHtketmI'

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Check if Supabase is available
export const isSupabaseAvailable = () => {
  return supabase !== null
}

export interface Member {
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

export interface Project {
  id: string
  title: string
  description: string
  tech_stack: string[]
  github: string
  demo: string
  image: string
  created_at?: string
  updated_at?: string
}

export interface AdminSettings {
  id: string
  password_hash: string
  created_at?: string
  updated_at?: string
}

// Helper function to get GitHub profile picture
export const getGitHubProfilePicture = async (githubUrl: string): Promise<string> => {
  try {
    if (!githubUrl || githubUrl === "#") return "/placeholder.svg?height=300&width=300"

    const match = githubUrl.match(/github\.com\/([^/]+)/)
    if (!match) return "/placeholder.svg?height=300&width=300"

    const username = match[1]
    await new Promise((resolve) => setTimeout(resolve, 100)) // Rate limiting

    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Syndicate-X-Website",
      },
    })

    if (response.ok) {
      const userData = await response.json()
      return userData.avatar_url || "/placeholder.svg?height=300&width=300"
    }

    return "/placeholder.svg?height=300&width=300"
  } catch (error) {
    console.error("Error fetching GitHub profile picture:", error)
    return "/placeholder.svg?height=300&width=300"
  }
}

// Test Supabase connection
export const testSupabaseConnection = async (): Promise<boolean> => {
  if (!isSupabaseAvailable()) return false

  try {
    const { error } = await supabase!.from("members").select("id").limit(1)
    return !error
  } catch (error) {
    console.error("Connection test failed:", error)
    return false
  }
}

// Member service
export const memberService = {
  async getAll(): Promise<Member[]> {
    if (!isSupabaseAvailable()) {
      const saved = localStorage.getItem("syndicateMembers")
      return saved ? JSON.parse(saved) : this.getDefaultMembers()
    }

    try {
      const { data, error } = await supabase!.from("members").select("*").order("created_at", { ascending: true })

      if (error) throw error

      // Backup to localStorage
      localStorage.setItem("syndicateMembers", JSON.stringify(data || []))
      return data || []
    } catch (error) {
      console.error("Error fetching members:", error)
      const saved = localStorage.getItem("syndicateMembers")
      return saved ? JSON.parse(saved) : this.getDefaultMembers()
    }
  },

  getDefaultMembers(): Member[] {
    return [
      {
        id: "member-1",
        name: "Alex Chen",
        role: "President",
        bio: "Full-stack developer passionate about AI and machine learning.",
        image: "/placeholder.svg?height=300&width=300",
        linkedin: "https://linkedin.com/in/alexchen",
        github: "https://github.com/alexchen",
      },
      {
        id: "member-2",
        name: "Sarah Johnson",
        role: "Vice President",
        bio: "UI/UX designer with expertise in creating intuitive user experiences.",
        image: "/placeholder.svg?height=300&width=300",
        linkedin: "https://linkedin.com/in/sarahjohnson",
        github: "https://github.com/sarahjohnson",
      },
      {
        id: "member-3",
        name: "Michael Rodriguez",
        role: "Technical Lead",
        bio: "Backend engineer specializing in cloud architecture and DevOps.",
        image: "/placeholder.svg?height=300&width=300",
        linkedin: "https://linkedin.com/in/michaelrodriguez",
        github: "https://github.com/michaelrodriguez",
      },
      {
        id: "member-4",
        name: "Emily Davis",
        role: "Events Coordinator",
        bio: "Project manager with a passion for organizing tech meetups and workshops.",
        image: "/placeholder.svg?height=300&width=300",
        linkedin: "https://linkedin.com/in/emilydavis",
        github: "https://github.com/emilydavis",
      },
    ]
  },

  async create(member: Omit<Member, "id" | "created_at" | "updated_at">): Promise<Member> {
    const profilePicture = await getGitHubProfilePicture(member.github)

    const newMember = {
      ...member,
      image: profilePicture,
    }

    if (!isSupabaseAvailable()) {
      const id = Date.now().toString()
      const memberWithId = { id, ...newMember }
      const allMembers = await this.getAll()
      const updatedMembers = [...allMembers, memberWithId]
      localStorage.setItem("syndicateMembers", JSON.stringify(updatedMembers))
      return memberWithId
    }

    try {
      const { data, error } = await supabase!.from("members").insert([newMember]).select().single()

      if (error) throw error

      // Update localStorage backup
      const allMembers = await this.getAll()
      localStorage.setItem("syndicateMembers", JSON.stringify([...allMembers.filter((m) => m.id !== data.id), data]))

      return data
    } catch (error) {
      console.error("Error creating member:", error)
      // Fallback to localStorage
      const id = Date.now().toString()
      const memberWithId = { id, ...newMember }
      const allMembers = await this.getAll()
      const updatedMembers = [...allMembers, memberWithId]
      localStorage.setItem("syndicateMembers", JSON.stringify(updatedMembers))
      return memberWithId
    }
  },

  async update(id: string, member: Partial<Member>): Promise<Member> {
    if (member.github) {
      member.image = await getGitHubProfilePicture(member.github)
    }

    if (!isSupabaseAvailable()) {
      const allMembers = await this.getAll()
      const updatedMembers = allMembers.map((m) => (m.id === id ? { ...m, ...member } : m))
      localStorage.setItem("syndicateMembers", JSON.stringify(updatedMembers))
      return updatedMembers.find((m) => m.id === id)!
    }

    try {
      const { data, error } = await supabase!.from("members").update(member).eq("id", id).select().single()

      if (error) throw error

      // Update localStorage backup
      const allMembers = await this.getAll()
      const updatedMembers = allMembers.map((m) => (m.id === id ? data : m))
      localStorage.setItem("syndicateMembers", JSON.stringify(updatedMembers))

      return data
    } catch (error) {
      console.error("Error updating member:", error)
      // Fallback to localStorage
      const allMembers = await this.getAll()
      const updatedMembers = allMembers.map((m) => (m.id === id ? { ...m, ...member } : m))
      localStorage.setItem("syndicateMembers", JSON.stringify(updatedMembers))
      return updatedMembers.find((m) => m.id === id)!
    }
  },

  async delete(id: string): Promise<void> {
    if (!isSupabaseAvailable()) {
      const allMembers = await this.getAll()
      const filteredMembers = allMembers.filter((m) => m.id !== id)
      localStorage.setItem("syndicateMembers", JSON.stringify(filteredMembers))
      return
    }

    try {
      const { error } = await supabase!.from("members").delete().eq("id", id)
      if (error) throw error

      // Update localStorage backup
      const allMembers = await this.getAll()
      const filteredMembers = allMembers.filter((m) => m.id !== id)
      localStorage.setItem("syndicateMembers", JSON.stringify(filteredMembers))
    } catch (error) {
      console.error("Error deleting member:", error)
      // Fallback to localStorage
      const allMembers = await this.getAll()
      const filteredMembers = allMembers.filter((m) => m.id !== id)
      localStorage.setItem("syndicateMembers", JSON.stringify(filteredMembers))
    }
  },
}

// Project service
export const projectService = {
  async getAll(): Promise<Project[]> {
    if (!isSupabaseAvailable()) {
      const saved = localStorage.getItem("syndicateProjects")
      return saved ? JSON.parse(saved) : this.getDefaultProjects()
    }

    try {
      const { data, error } = await supabase!.from("projects").select("*").order("created_at", { ascending: false })

      if (error) throw error

      // Convert tech_stack to array if it's a string
      const projects = (data || []).map((project) => ({
        ...project,
        tech_stack: typeof project.tech_stack === 'string' ? JSON.parse(project.tech_stack) : project.tech_stack,
      }))

      // Backup to localStorage
      localStorage.setItem("syndicateProjects", JSON.stringify(projects))
      return projects
    } catch (error) {
      console.error("Error fetching projects:", error)
      const saved = localStorage.getItem("syndicateProjects")
      return saved ? JSON.parse(saved) : this.getDefaultProjects()
    }
  },

  getDefaultProjects(): Project[] {
    return [
      {
        id: "project-1",
        title: "AI-Powered Study Assistant",
        description:
          "An intelligent study companion that helps students organize their learning materials and provides personalized recommendations.",
        tech_stack: ["React", "Node.js", "OpenAI", "MongoDB"],
        github: "https://github.com/syndicatex/study-assistant",
        demo: "https://study-assistant.syndicatex.org",
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        id: "project-2",
        title: "Campus Event Management System",
        description:
          "A comprehensive platform for managing university events, from registration to feedback collection.",
        tech_stack: ["Next.js", "PostgreSQL", "Prisma", "Tailwind"],
        github: "https://github.com/syndicatex/event-management",
        demo: "https://events.syndicatex.org",
        image: "/placeholder.svg?height=200&width=400",
      },
      {
        id: "project-3",
        title: "Blockchain Voting Platform",
        description:
          "A secure and transparent voting system built on blockchain technology for student government elections.",
        tech_stack: ["Solidity", "Web3.js", "React", "Ethereum"],
        github: "https://github.com/syndicatex/blockchain-voting",
        demo: "https://voting.syndicatex.org",
        image: "/placeholder.svg?height=200&width=400",
      },
    ]
  },

  async create(project: Omit<Project, "id" | "created_at" | "updated_at">): Promise<Project> {
    if (!isSupabaseAvailable()) {
      throw new Error("Supabase is not available")
    }

    try {
      // Validate project data
      if (!project.title || !project.description || !Array.isArray(project.tech_stack)) {
        throw new Error("Invalid project data")
      }

      // Convert tech_stack array to JSON string for storage
      const projectData = {
        ...project,
        tech_stack: JSON.stringify(project.tech_stack),
      }

      const { data, error } = await supabase!.from("projects").insert([projectData]).select().single()

      if (error) {
        console.error("Supabase error:", error)
        throw new Error(error.message)
      }

      if (!data) {
        throw new Error("No data returned from Supabase")
      }

      // Convert back to array for consistency
      const returnData = {
        ...data,
        tech_stack: JSON.parse(data.tech_stack),
      }

      // Update localStorage backup
      const allProjects = await this.getAll()
      localStorage.setItem(
        "syndicateProjects",
        JSON.stringify([...allProjects.filter((p) => p.id !== returnData.id), returnData]),
      )

      return returnData
    } catch (error) {
      console.error("Error creating project:", error)
      throw error // Propagate error to UI
    }
  },

  async update(id: string, project: Partial<Project>): Promise<Project> {
    if (!isSupabaseAvailable()) {
      throw new Error("Supabase is not available")
    }

    try {
      // Validate project data
      if (project.tech_stack && !Array.isArray(project.tech_stack)) {
        throw new Error("Invalid tech_stack format")
      }

      // Convert tech_stack array to JSON string for storage
      const projectData = {
        ...project,
        tech_stack: project.tech_stack ? JSON.stringify(project.tech_stack) : undefined,
      }

      const { data, error } = await supabase!.from("projects").update(projectData).eq("id", id).select().single()

      if (error) {
        console.error("Supabase error:", error)
        throw new Error(error.message)
      }

      if (!data) {
        throw new Error("No data returned from Supabase")
      }

      // Convert back to array for consistency
      const returnData = {
        ...data,
        tech_stack: JSON.parse(data.tech_stack),
      }

      // Update localStorage backup
      const allProjects = await this.getAll()
      const updatedProjects = allProjects.map((p) => (p.id === id ? returnData : p))
      localStorage.setItem("syndicateProjects", JSON.stringify(updatedProjects))

      return returnData
    } catch (error) {
      console.error("Error updating project:", error)
      throw error // Propagate error to UI
    }
  },

  async delete(id: string): Promise<void> {
    if (!isSupabaseAvailable()) {
      throw new Error("Supabase is not available")
    }

    try {
      const { error } = await supabase!.from("projects").delete().eq("id", id)
      
      if (error) {
        console.error("Supabase error:", error)
        throw new Error(error.message)
      }

      // Update localStorage backup
      const allProjects = await this.getAll()
      const filteredProjects = allProjects.filter((p) => p.id !== id)
      localStorage.setItem("syndicateProjects", JSON.stringify(filteredProjects))
    } catch (error) {
      console.error("Error deleting project:", error)
      throw error // Propagate error to UI
    }
  },
}

// Admin service
export const adminService = {
  async getSettings(): Promise<AdminSettings | null> {
    if (!isSupabaseAvailable()) {
      const saved = localStorage.getItem("adminSettings")
      return saved ? JSON.parse(saved) : { id: "1", password_hash: hashPassword("admin123") }
    }

    try {
      const { data, error } = await supabase!.from("admin_settings").select("*").eq("id", "1").single()

      if (error && error.code !== "PGRST116") throw error
      return data
    } catch (error) {
      console.error("Error fetching admin settings:", error)
      const saved = localStorage.getItem("adminSettings")
      return saved ? JSON.parse(saved) : { id: "1", password_hash: hashPassword("admin123") }
    }
  },

  async updatePassword(newPasswordHash: string): Promise<void> {
    const settings = {
      id: "1",
      password_hash: newPasswordHash,
    }

    // Always save to localStorage
    localStorage.setItem("adminSettings", JSON.stringify(settings))

    if (!isSupabaseAvailable()) return

    try {
      const { error } = await supabase!.from("admin_settings").upsert([settings])

      if (error) throw error
    } catch (error) {
      console.error("Error updating password:", error)
      // Password is already saved to localStorage
    }
  },

  async verifyPassword(passwordHash: string): Promise<boolean> {
    try {
      const settings = await this.getSettings()
      return settings?.password_hash === passwordHash
    } catch (error) {
      console.error("Error verifying password:", error)
      return false
    }
  },
}

// Password utilities
export const hashPassword = (password: string): string => {
  return btoa(password + "syndicate-x-salt")
}

export const verifyPassword = (password: string, hash: string): boolean => {
  return btoa(password + "syndicate-x-salt") === hash
}
