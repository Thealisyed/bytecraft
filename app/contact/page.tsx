"use client"

import Link from "next/link"
import { ArrowLeft, Github, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function ContactPage() {
  const [isMounted, setIsMounted] = useState(false)
  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-black overflow-hidden">
      {/* Background gradient orbs - optimize for mobile */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-900/20 blur-[100px] opacity-50" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-cyan-900/20 blur-[120px] opacity-50" />
      </div>

      {/* Optimize particle effect for mobile */}
      <div className="fixed inset-0 bg-grid-white/[0.02] pointer-events-none" style={{ 
        backgroundSize: typeof window !== "undefined" && window.innerWidth < 768 ? '32px 32px' : '64px 64px' 
      }} />

      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-lg supports-[backdrop-filter]:bg-black/20">
        <motion.div
          className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="flex gap-2 items-center text-xl font-bold text-white">
            <div className="relative w-6 h-6 flex items-center justify-center">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-sm"
                animate={{
                  rotate: [0, 90, 180, 270, 360],
                }}
                transition={{
                  duration: 10,
                  ease: "linear",
                  repeat: Number.POSITIVE_INFINITY,
                }}
              />
              <div className="absolute inset-0.5 bg-black rounded-sm flex items-center justify-center">
                <span className="text-xs text-white font-mono">HF</span>
              </div>
            </div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400 font-display">
              HackFest
            </span>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-6">
              <Link
                href="/#about"
                className="text-sm font-medium text-gray-300 transition-all hover:text-white relative group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/#register"
                className="text-sm font-medium text-gray-300 transition-all hover:text-white relative group"
              >
                Register
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="/contact" className="text-sm font-medium text-white transition-all relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400"></span>
              </Link>
            </nav>
          </div>
        </motion.div>
      </header>

      <main className="flex-1 perspective">
        <section className="w-full py-6 md:py-12 lg:py-16 relative overflow-hidden">
          <motion.div
            className="container px-4 md:px-6 lg:px-8 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col items-center justify-center space-y-8 text-center">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <Link href="/" className="inline-flex items-center text-purple-400 hover:text-purple-300 mb-8 group">
                  <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Back to Home
                </Link>
              </motion.div>

              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h1 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-white font-display">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                    Contact Us
                  </span>
                </h1>
                <p className="max-w-[600px] text-gray-300 md:text-xl/relaxed mx-auto">
                  Have questions about HackFest 2025? Reach out to us through these channels.
                </p>
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 w-full max-w-3xl">
                <motion.div
                  className="contact-card group"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={!prefersReducedMotion ? { y: -10, scale: 1.02 } : {}}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-green-300/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-900/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src="/whatsapp.svg"
                      alt="WhatsApp"
                      width={50}
                      height={50}
                      className="h-12 w-12"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white">WhatsApp</h3>
                  <p className="text-gray-400 text-lg">Connect with us on WhatsApp for quick responses</p>
                  <Button 
                    className="mt-6 bg-green-600 hover:bg-green-700 text-white group-hover:scale-105 transition-transform duration-300"
                    asChild
                  >
                    <a href="https://wa.me/353830597518" target="_blank" rel="noopener noreferrer">
                      Open WhatsApp
                    </a>
                  </Button>
                </motion.div>

                <motion.div
                  className="contact-card group"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={!prefersReducedMotion ? { y: -10, scale: 1.02 } : {}}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-300/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-900/20 mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Mail className="h-12 w-12 text-cyan-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Email</h3>
                  <p className="text-gray-400 text-lg">Send us an email with your questions or feedback</p>
                  <p className="text-cyan-400 font-mono text-xl mt-4">ali.syed@fosis.org.uk</p>
                  <Button 
                    className="mt-6 bg-cyan-600 hover:bg-cyan-700 text-white group-hover:scale-105 transition-transform duration-300"
                    onClick={() => {
                      navigator.clipboard.writeText('ali.syed@fosis.org.uk');
                      toast.success('Email copied to clipboard', {
                        duration: 2000,
                        position: 'bottom-center',
                        style: {
                          background: '#1a1a1a',
                          color: '#fff',
                          border: '1px solid #333',
                        },
                      });
                    }}
                  >
                    Copy Email
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
          </div>
        </section>
      </main>

      <motion.footer
        className="w-full border-t border-white/10 py-6 md:py-0 bg-black relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} HackFest. All rights reserved.</p>
        </div>
      </motion.footer>
    </div>
  )
}
