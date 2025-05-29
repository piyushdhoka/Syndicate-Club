"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Lock,
  Plus,
  Edit,
  Trash2,
  Github,
  Linkedin,
  ExternalLink,
  Settings,
  Eye,
  EyeOff,
  AlertCircle,
  Wifi,
  WifiOff,
  Database,
} from "lucide-react"
import {
  memberService,
  projectService,
  adminService,
  hashPassword,
  verifyPassword,
  isSupabaseAvailable,
  type Member,
  type Project,
} from "@/lib/supabase"
import { useSupabaseData } from "@/hooks/use-supabase-data"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Password management
  const [showPasswordSettings, setShowPasswordSettings] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  // Form states
  const [editingMember, setEditingMember] = useState<Member | null>(null)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [memberForm, setMemberForm] = useState<Omit<Member, "id" | "created_at" | "updated_at">>({
    name: "",
    role: "",
    bio: "",
    linkedin: "",
    github: "",
    image: "/placeholder.svg"
  })
  const [projectForm, setProjectForm] = useState({
    title: "",
    description: "",
    techStack: "",
    github: "",
    demo: "",
    image: "",
  })
  const [localMembers, setLocalMembers] = useState<Member[]>([])

  const { projects, loading: dataLoading, error: dataError, connectionStatus, refreshData } = useSupabaseData()

  const showMessage = (message: string, type: "success" | "error") => {
    if (type === "success") {
      setSuccess(message)
      setError(null)
    } else {
      setError(message)
      setSuccess(null)
    }

    setTimeout(() => {
      setSuccess(null)
      setError(null)
    }, 3000)
  }

  const handleLogin = async () => {
    try {
      setLoading(true)
      const settings = await adminService.getSettings()

      if (!settings) {
        const defaultHash = hashPassword("admin123")
        await adminService.updatePassword(defaultHash)

        if (verifyPassword(password, defaultHash)) {
          setIsAuthenticated(true)
          setPassword("")
          showMessage("Welcome!", "success")
          setShowPasswordSettings(true)
        } else {
          showMessage("Incorrect password!", "error")
        }
      } else {
        if (verifyPassword(password, settings.password_hash)) {
          setIsAuthenticated(true)
          setPassword("")
          showMessage("Login successful!", "success")
        } else {
          showMessage("Incorrect password!", "error")
        }
      }
    } catch (err) {
      showMessage("Login failed. Please try again.", "error")
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      showMessage("Passwords do not match!", "error")
      return
    }

    if (newPassword.length < 6) {
      showMessage("Password must be at least 6 characters long!", "error")
      return
    }

    try {
      setLoading(true)
      const newHash = hashPassword(newPassword)
      await adminService.updatePassword(newHash)

      setNewPassword("")
      setConfirmPassword("")
      setShowPasswordSettings(false)
      showMessage("Password updated successfully!", "success")
    } catch (err) {
      showMessage("Failed to update password. Please try again.", "error")
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setIsOpen(false)
    setShowPasswordSettings(false)
    setNewPassword("")
    setConfirmPassword("")
  }

  const formatLinkedInUrl = (url: string) => {
    if (!url) return "#"
    if (url === "#") return "#"
    
    // If it's already a full URL, return as is
    if (url.startsWith("http://") || url.startsWith("https://")) {
      return url
    }
    
    // If it's just a username, format it
    if (!url.includes("linkedin.com")) {
      return `https://linkedin.com/in/${url.replace(/^@/, "")}`
    }
    
    return url
  }

  const saveMember = async () => {
    try {
      setLoading(true)

      const formattedMemberData = {
        ...memberForm,
        linkedin: formatLinkedInUrl(memberForm.linkedin)
      }

      if (editingMember) {
        await memberService.update(editingMember.id, formattedMemberData)
        showMessage("Member updated successfully!", "success")
      } else {
        await memberService.create(formattedMemberData)
        showMessage("Member added successfully!", "success")
      }

      refreshData()
      resetMemberForm()
    } catch (err) {
      showMessage("Failed to save member. Please try again.", "error")
    } finally {
      setLoading(false)
    }
  }

  const deleteMember = async (id: string) => {
    if (!confirm("Are you sure you want to delete this member?")) return

    try {
      setLoading(true)
      await memberService.delete(id)
      refreshData()
      showMessage("Member deleted successfully!", "success")
    } catch (err) {
      showMessage("Failed to delete member. Please try again.", "error")
    } finally {
      setLoading(false)
    }
  }

  const editMember = (member: Member) => {
    setEditingMember(member)
    setMemberForm({
      name: member.name,
      role: member.role,
      bio: member.bio,
      linkedin: member.linkedin,
      github: member.github,
      image: member.image || "/placeholder.svg",
    })
  }

  const resetMemberForm = () => {
    setEditingMember(null)
    setMemberForm({
      name: "",
      role: "",
      bio: "",
      linkedin: "",
      github: "",
      image: "/placeholder.svg",
    })
  }

  // Project management functions
  const saveProject = async () => {
    try {
      setLoading(true)

      // Validate required fields
      if (!projectForm.title || !projectForm.description || !projectForm.techStack) {
        showMessage("Title, description, and tech stack are required!", "error")
        return
      }

      // Create project data with proper structure
      const projectData = {
        title: projectForm.title,
        description: projectForm.description,
        tech_stack: projectForm.techStack.split(",").map((tech) => tech.trim()).filter(Boolean),
        github: projectForm.github || "",
        demo: projectForm.demo || "",
        image: projectForm.image || "/placeholder.svg?height=200&width=400"
      }

      if (editingProject) {
        const result = await projectService.update(editingProject.id, projectData)
        if (!result) throw new Error("Failed to update project")
        showMessage("Project updated successfully!", "success")
      } else {
        const result = await projectService.create(projectData)
        if (!result) throw new Error("Failed to create project")
        showMessage("Project added successfully!", "success")
      }

      // Refresh data and reset form
      await refreshData()
      resetProjectForm()
    } catch (err) {
      console.error("Error saving project:", err)
      showMessage(err instanceof Error ? err.message : "Failed to save project. Please try again.", "error")
    } finally {
      setLoading(false)
    }
  }

  const deleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return

    try {
      setLoading(true)
      await projectService.delete(id)
      await refreshData()
      showMessage("Project deleted successfully!", "success")
    } catch (err) {
      console.error("Error deleting project:", err)
      showMessage("Failed to delete project. Please try again.", "error")
    } finally {
      setLoading(false)
    }
  }

  const editProject = (project: Project) => {
    setEditingProject(project)
    setProjectForm({
      title: project.title,
      description: project.description,
      techStack: Array.isArray(project.tech_stack) ? project.tech_stack.join(", ") : project.tech_stack,
      github: project.github || "",
      demo: project.demo || "",
      image: project.image || "",
    })
  }

  const resetProjectForm = () => {
    setEditingProject(null)
    setProjectForm({
      title: "",
      description: "",
      techStack: "",
      github: "",
      demo: "",
      image: "",
    })
  }

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case "connected":
        return <Wifi className="w-4 h-4 text-green-500" />
      case "disconnected":
        return <WifiOff className="w-4 h-4 text-orange-500" />
      default:
        return <Database className="w-4 h-4 text-yellow-500 animate-pulse" />
    }
  }

  const getConnectionText = () => {
    switch (connectionStatus) {
      case "connected":
        return "Connected to Supabase"
      case "disconnected":
        return isSupabaseAvailable() ? "Offline mode" : "Local storage only"
      default:
        return "Checking connection..."
    }
  }

  const fetchMembers = async () => {
    if (!supabase) {
      toast.error("Database connection not available")
      return
    }

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("members")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) throw error
      if (data) setLocalMembers(data)
    } catch (error) {
      console.error("Error fetching members:", error)
      toast.error("Failed to fetch members")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMembers()
  }, [])

  const handleAddMember = async () => {
    if (!memberForm.name || !memberForm.role) {
      toast.error("Name and role are required")
      return
    }

    if (!supabase) {
      toast.error("Database connection not available")
      return
    }

    setLoading(true)
    try {
      const { data, error } = await supabase
        .from("members")
        .insert([memberForm])
        .select()

      if (error) throw error

      toast.success("Member added successfully")
      setMemberForm({
        name: "",
        role: "",
        bio: "",
        linkedin: "",
        github: "",
        image: "/placeholder.svg"
      })
      fetchMembers()
    } catch (error) {
      console.error("Error adding member:", error)
      toast.error("Failed to add member")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          variant="ghost"
          className="group rounded-full shadow-lg bg-background/80 backdrop-blur-sm border border-border hover:bg-background/90 hover:scale-110 hover:shadow-xl transition-all duration-300"
          aria-label="Admin Panel"
        >
          <Lock className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span>Admin Panel</span>
              <div className="flex items-center space-x-1" title={getConnectionText()}>
                {getConnectionIcon()}
                <span className="text-xs text-muted-foreground">{getConnectionText()}</span>
              </div>
            </div>
            {isAuthenticated && (
              <Button onClick={() => setShowPasswordSettings(!showPasswordSettings)} variant="outline" size="sm">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
            )}
          </DialogTitle>
        </DialogHeader>

        {/* Messages */}
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="border-green-500 text-green-700 bg-green-50 dark:bg-green-950 dark:text-green-300">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{success}</AlertDescription>
          </Alert>
        )}

        {dataError && (
          <Alert>
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Note: {dataError}</AlertDescription>
          </Alert>
        )}

        {!isAuthenticated ? (
          <div className="space-y-4">
            <Label htmlFor="admin-password">Enter Admin Password</Label>
            <div className="relative">
              <Input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                onKeyPress={(e) => e.key === "Enter" && handleLogin()}
                disabled={loading}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            <Button onClick={handleLogin} className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Welcome, Admin!</h3>
              <Button onClick={handleLogout} variant="outline">
                Logout
              </Button>
            </div>

            {showPasswordSettings && (
              <Card className="border-blue-200 bg-blue-50 dark:bg-blue-950 dark:border-blue-800">
                <CardHeader>
                  <CardTitle className="text-lg">Change Password</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password (min 6 characters)"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      disabled={loading}
                    />
                  </div>
                  <div className="flex space-x-2">
                    <Button onClick={handlePasswordChange} disabled={loading}>
                      {loading ? "Updating..." : "Update Password"}
                    </Button>
                    <Button onClick={() => setShowPasswordSettings(false)} variant="outline">
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            <Tabs defaultValue="members" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="members">Manage Members ({localMembers.length})</TabsTrigger>
                <TabsTrigger value="projects">Manage Projects ({projects.length})</TabsTrigger>
              </TabsList>

              <TabsContent value="members" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {editingMember ? "Edit Member" : "Add New Member"}
                      {editingMember && (
                        <Button onClick={resetMemberForm} variant="outline" size="sm">
                          Cancel
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="member-name">Name *</Label>
                        <Input
                          id="member-name"
                          value={memberForm.name}
                          onChange={(e) => setMemberForm({ ...memberForm, name: e.target.value })}
                          placeholder="Member name"
                          disabled={loading}
                        />
                      </div>
                      <div>
                        <Label htmlFor="member-role">Role *</Label>
                        <Input
                          id="member-role"
                          value={memberForm.role}
                          onChange={(e) => setMemberForm({ ...memberForm, role: e.target.value })}
                          placeholder="Member role"
                          disabled={loading}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="member-bio">Bio</Label>
                      <Textarea
                        id="member-bio"
                        value={memberForm.bio}
                        onChange={(e) => setMemberForm({ ...memberForm, bio: e.target.value })}
                        placeholder="Member bio"
                        disabled={loading}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="member-linkedin">LinkedIn URL</Label>
                        <Input
                          id="member-linkedin"
                          value={memberForm.linkedin}
                          onChange={(e) => setMemberForm({ ...memberForm, linkedin: e.target.value })}
                          placeholder="username or full URL"
                          disabled={loading}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Enter username (e.g., johndoe) or full URL
                        </p>
                      </div>
                      <div>
                        <Label htmlFor="member-github">GitHub URL *</Label>
                        <Input
                          id="member-github"
                          value={memberForm.github}
                          onChange={(e) => setMemberForm({ ...memberForm, github: e.target.value })}
                          placeholder="https://github.com/username"
                          disabled={loading}
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          Profile picture will be automatically fetched from GitHub
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={saveMember}
                      className="w-full"
                      disabled={loading || !memberForm.name || !memberForm.role}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {loading ? "Saving..." : editingMember ? "Update Member" : "Add Member"}
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Current Members</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {dataLoading ? (
                      <div className="text-center py-4">Loading members...</div>
                    ) : (
                      <div className="space-y-4">
                        {localMembers.map((member) => (
                          <div
                            key={member.id}
                            className="flex items-center justify-between p-1 border rounded-lg hover:shadow-md transition-shadow duration-200"
                          >
                            <div className="flex items-center space-x-1">
                              <img
                                src={member.image || "/placeholder.svg"}
                                alt={member.name}
                                className="w-6 h-6 rounded-full object-cover"
                              />
                              <div>
                                <h4 className="font-semibold text-xs">{member.name}</h4>
                                <p className="text-[10px] text-muted-foreground">{member.role}</p>
                                <div className="flex space-x-0.5 mt-0.5">
                                  {member.linkedin && member.linkedin !== "#" && (
                                    <a
                                      href={member.linkedin}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="hover:scale-110 transition-transform duration-200"
                                    >
                                      <Linkedin className="w-2.5 h-2.5 text-blue-600" />
                                    </a>
                                  )}
                                  {member.github && member.github !== "#" && (
                                    <a
                                      href={member.github}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="hover:scale-110 transition-transform duration-200"
                                    >
                                      <Github className="w-2.5 h-2.5" />
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-0.5">
                              <Button
                                onClick={() => editMember(member)}
                                size="sm"
                                variant="outline"
                                disabled={loading}
                                className="hover:scale-105 transition-transform duration-200 px-1 py-0.5 text-[10px]"
                              >
                                <Edit className="w-2.5 h-2.5" />
                              </Button>
                              <Button
                                onClick={() => deleteMember(member.id)}
                                size="sm"
                                variant="destructive"
                                disabled={loading}
                                className="hover:scale-105 transition-transform duration-200 px-1 py-0.5 text-[10px]"
                              >
                                <Trash2 className="w-2.5 h-2.5" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="projects" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      {editingProject ? "Edit Project" : "Add New Project"}
                      {editingProject && (
                        <Button onClick={resetProjectForm} variant="outline" size="sm">
                          Cancel
                        </Button>
                      )}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="project-title">Title *</Label>
                      <Input
                        id="project-title"
                        value={projectForm.title}
                        onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })}
                        placeholder="Project title"
                        disabled={loading}
                      />
                    </div>
                    <div>
                      <Label htmlFor="project-description">Description *</Label>
                      <Textarea
                        id="project-description"
                        value={projectForm.description}
                        onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })}
                        placeholder="Project description"
                        disabled={loading}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="project-tech">Tech Stack (comma-separated) *</Label>
                        <Input
                          id="project-tech"
                          value={projectForm.techStack}
                          onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })}
                          placeholder="React, Node.js, MongoDB"
                          disabled={loading}
                        />
                      </div>
                      <div>
                        <Label htmlFor="project-image">Image URL</Label>
                        <Input
                          id="project-image"
                          value={projectForm.image}
                          onChange={(e) => setProjectForm({ ...projectForm, image: e.target.value })}
                          placeholder="https://example.com/image.jpg"
                          disabled={loading}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="project-github">GitHub URL</Label>
                        <Input
                          id="project-github"
                          value={projectForm.github}
                          onChange={(e) => setProjectForm({ ...projectForm, github: e.target.value })}
                          placeholder="https://github.com/user/repo"
                          disabled={loading}
                        />
                      </div>
                      <div>
                        <Label htmlFor="project-demo">Demo URL</Label>
                        <Input
                          id="project-demo"
                          value={projectForm.demo}
                          onChange={(e) => setProjectForm({ ...projectForm, demo: e.target.value })}
                          placeholder="https://demo.example.com"
                          disabled={loading}
                        />
                      </div>
                    </div>
                    <Button
                      onClick={saveProject}
                      className="w-full"
                      disabled={loading || !projectForm.title || !projectForm.description || !projectForm.techStack}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      {loading ? "Saving..." : editingProject ? "Update Project" : "Add Project"}
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Current Projects</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {dataLoading ? (
                      <div className="text-center py-4">Loading projects...</div>
                    ) : (
                      <div className="space-y-4">
                        {projects.map((project) => (
                          <div
                            key={project.id}
                            className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow duration-200"
                          >
                            <div className="flex items-center space-x-4">
                              <img
                                src={project.image || "/placeholder.svg"}
                                alt={project.title}
                                className="w-16 h-12 rounded object-cover"
                              />
                              <div>
                                <h4 className="font-semibold">{project.title}</h4>
                                <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {project.tech_stack.slice(0, 3).map((tech, index) => (
                                    <Badge key={index} variant="secondary" className="text-xs">
                                      {tech}
                                    </Badge>
                                  ))}
                                  {project.tech_stack.length > 3 && (
                                    <Badge variant="secondary" className="text-xs">
                                      +{project.tech_stack.length - 3}
                                    </Badge>
                                  )}
                                </div>
                                <div className="flex space-x-2 mt-2">
                                  {project.github && project.github !== "#" && (
                                    <a
                                      href={project.github}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="hover:scale-110 transition-transform duration-200"
                                    >
                                      <Github className="w-4 h-4" />
                                    </a>
                                  )}
                                  {project.demo && project.demo !== "#" && (
                                    <a
                                      href={project.demo}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="hover:scale-110 transition-transform duration-200"
                                    >
                                      <ExternalLink className="w-4 h-4" />
                                    </a>
                                  )}
                                </div>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              <Button
                                onClick={() => editProject(project)}
                                size="sm"
                                variant="outline"
                                disabled={loading}
                                className="hover:scale-105 transition-transform duration-200"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                onClick={() => deleteProject(project.id)}
                                size="sm"
                                variant="destructive"
                                disabled={loading}
                                className="hover:scale-105 transition-transform duration-200"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
