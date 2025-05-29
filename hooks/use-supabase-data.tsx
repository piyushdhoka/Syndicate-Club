"use client"

import { useState, useEffect } from "react"
import {
  memberService,
  projectService,
  testSupabaseConnection,
  isSupabaseAvailable,
  type Member,
  type Project,
} from "@/lib/supabase"

export function useSupabaseData() {
  const [members, setMembers] = useState<Member[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [connectionStatus, setConnectionStatus] = useState<"connected" | "disconnected" | "checking">("checking")
  const [initialized, setInitialized] = useState(false)

  const loadData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Test connection first
      if (isSupabaseAvailable()) {
        setConnectionStatus("checking")
        const isConnected = await testSupabaseConnection()
        setConnectionStatus(isConnected ? "connected" : "disconnected")
      } else {
        setConnectionStatus("disconnected")
      }

      // Load data regardless of connection status (fallback to localStorage)
      const [membersData, projectsData] = await Promise.all([memberService.getAll(), projectService.getAll()])

      setMembers(membersData)
      setProjects(projectsData)
    } catch (err) {
      console.error("Error loading data:", err)
      setError(err instanceof Error ? err.message : "Failed to load data")

      // Fallback to default data
      setMembers(memberService.getDefaultMembers())
      setProjects(projectService.getDefaultProjects())
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const refreshData = () => {
    loadData()
  }

  return {
    members,
    projects,
    loading,
    error,
    connectionStatus,
    refreshData,
  }
}
