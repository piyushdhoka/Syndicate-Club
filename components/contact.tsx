"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, Phone, MapPin, Github, Linkedin } from "lucide-react"

const AnimatedButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <button 
      onClick={onClick}
      className="relative w-full max-w-md h-[50px] rounded-xl overflow-hidden shadow-[0_0.625em_1em_0_rgba(30,143,255,0.35)] transition-all duration-600 ease-[cubic-bezier(.16,1,.3,1)] hover:shadow-[0_0.625em_1em_0_rgba(33,220,98,0.35)] active:scale-95"
    >
      <div className="absolute inset-0 transition-transform duration-600 ease-[cubic-bezier(.16,1,.3,1)] hover:-translate-y-[50px]">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-between px-6">
          <span className="text-white text-lg font-bold tracking-wider">Apply to Join</span>
          <span className="text-white text-lg font-bold">:)</span>
        </div>
        <div className="absolute inset-0 translate-y-[50px] bg-gradient-to-r from-green-500 to-green-700 flex items-center justify-between px-6">
          <span className="text-white text-lg font-bold tracking-wider">Thanks</span>
          <span className="text-white text-lg font-bold">:D</span>
        </div>
      </div>
    </button>
  )
}

export default function Contact() {
  const handleJoinUs = () => {
    const subject = encodeURIComponent("Join SYNDICATE - New Member Inquiry")
    const body = encodeURIComponent(`Hello SYNDICATE Team,\n\nI am interested in joining SYNDICATE and would like to learn more about how I can get involved with your community.\n\nBest regards,\n[Your Name]`)
    const isMobile = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent)
    if (isMobile) {
      const mailtoLink = `mailto:syndicatex.25@gmail.com?subject=${subject}&body=${body}`
      window.open(mailtoLink, "_blank")
    } else {
      const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=syndicatex.25@gmail.com&su=${subject}&body=${body}`
      window.open(gmailLink, "_blank")
    }
  }

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-4 bg-gradient-to-r from-blue-500 to-blue-700 bg-clip-text text-transparent leading-tight">
            Become a SYNDICATE Campus Leader
          </h2>
          <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
            Take your first step toward leadership, growth, and impact in technology. Join a network of ambitious students and make a difference on your campus.
          </p>
        </div>
        {/* Steps Timeline */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
          {/* Step 1 */}
          <div className="flex flex-col items-center text-center flex-1">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white text-2xl font-bold mb-3 shadow-lg">1</div>
            <div className="font-semibold text-base mb-1">Submit Your Application</div>
            <div className="text-sm text-foreground/60">Tell us about your passion and vision for tech leadership.</div>
          </div>
          {/* Step 2 */}
          <div className="hidden md:block w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"></div>
          {/* Step 3 */}
          <div className="flex flex-col items-center text-center flex-1">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white text-2xl font-bold mb-3 shadow-lg">2</div>
            <div className="font-semibold text-base mb-1">Interview & Selection</div>
            <div className="text-sm text-foreground/60">Engage in a friendly conversation with our team.</div>
          </div>
          {/* Step 4 */}
          <div className="hidden md:block w-12 h-1 bg-gradient-to-r from-blue-500 to-blue-700 rounded-full"></div>
          {/* Step 5 */}
          <div className="flex flex-col items-center text-center flex-1">
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-600 text-white text-2xl font-bold mb-3 shadow-lg">3</div>
            <div className="font-semibold text-base mb-1">Lead & Inspire</div>
            <div className="text-sm text-foreground/60">Become a Campus Ambassador and drive innovation at your college.</div>
          </div>
        </div>
        {/* Call to Action Button */}
        <div className="flex justify-center items-center mt-12">
          <div className="w-full max-w-sm">
            <AnimatedButton onClick={handleJoinUs} />
          </div>
        </div>
      </div>
    </section>
  )
}
