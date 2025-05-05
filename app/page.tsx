"use client"

import Link from "next/link"
import { ArrowRight, Code, Cpu, Github, Rocket } from "lucide-react"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { RegistrationModal } from "@/components/registration-modal"

export default function HackathonLanding() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollY, setScrollY] = useState(0)
  const [isMounted, setIsMounted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Only run client-side code after component is mounted
  useEffect(() => {
    setIsMounted(true)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Calculate parallax effect based on mouse position
  const calcParallax = (depth = 10) => {
    if (!isMounted) return { x: 0, y: 0 }
    // Reduce parallax effect on mobile
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768
    const mobileDepth = depth * 2 // Reduce effect on mobile
    
    const x = (mousePosition.x - (typeof window !== "undefined" ? window.innerWidth / 2 : 0)) / (isMobile ? mobileDepth : depth)
    const y = (mousePosition.y - (typeof window !== "undefined" ? window.innerHeight / 2 : 0)) / (isMobile ? mobileDepth : depth)
    return { x, y }
  }

  // Add reduced motion check
  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <div className="flex min-h-screen flex-col bg-black overflow-hidden">
      {/* Background gradient orbs - optimize for mobile */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-purple-900/20 blur-[100px]"
          style={{
            transform: !prefersReducedMotion ? `translate(${calcParallax(30).x}px, ${calcParallax(30).y}px)` : 'none',
            opacity: isMounted ? 0.5 - scrollY * 0.0005 : 0.5,
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full bg-cyan-900/20 blur-[120px]"
          style={{
            transform: !prefersReducedMotion ? `translate(${calcParallax(40).x}px, ${calcParallax(40).y}px)` : 'none',
            opacity: isMounted ? 0.5 - scrollY * 0.0005 : 0.5,
          }}
        />
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
                href="#about"
                className="text-sm font-medium text-gray-300 transition-all hover:text-white relative group"
              >
                About
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="#register"
                className="text-sm font-medium text-gray-300 transition-all hover:text-white relative group"
              >
                Register
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-gray-300 transition-all hover:text-white relative group"
              >
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>
          </div>
        </motion.div>
      </header>

      <main className="flex-1 perspective">
        <section className="w-full py-6 md:py-8 lg:py-10 relative overflow-hidden">
          <motion.div
            className="container px-4 md:px-6 relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col items-center justify-center text-center">
              <motion.div
                className="space-y-3 max-w-4xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="inline-block rounded-full bg-gradient-to-r from-purple-500/20 to-cyan-500/20 px-4 py-1.5 text-sm font-medium text-white border border-white/10 mb-2"
                >
                  Coming June 2025
                </motion.div>

                <motion.h1
                  className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-display"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  <span className="gradient-text bg-gradient-to-r from-white via-purple-400 to-cyan-400">
                    Introducing HackFest 2025
                  </span>
                </motion.h1>

                <motion.p
                  className="text-xl md:text-2xl text-gray-300 max-w-[800px] mx-auto leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.5 }}
                >
                  Where innovation meets opportunity. <br />
                  <span className="hidden sm:inline">Transform your ideas into a successful startup with professional mentorship!</span>
                </motion.p>

                {/* Register button moved up here */}
                <motion.div
                  className="pt-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0 text-lg py-6 px-10 rounded-xl shadow-lg shadow-purple-500/20 transition-all hover:shadow-purple-500/40 hover:scale-105 font-medium"
                  >
                    Register Your Interest <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </motion.div>

                <motion.div
                  className="mt-4 px-4 py-2 rounded-lg bg-white/5 border border-white/10 max-w-[800px] mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.7 }}
                >
                  <p className="text-gray-300 text-sm">
                    <span className="text-purple-400 font-medium">Limited spots available!</span>{" "}
                    This exclusive hackathon is open to university students and graduates. Winners will receive professional mentorship to transform their ideas into successful startups. Register early to secure your spot!
                  </p>
                </motion.div>

                <motion.div
                  className="mt-4 px-6 py-4 rounded-lg bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/20 max-w-[800px] mx-auto relative overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.75 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 animate-pulse"></div>
                  <div className="relative">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-cyan-400 font-bold text-lg">🏆 High-Value Prize</span>
                      <span className="px-2 py-0.5 text-xs font-medium bg-cyan-500/20 text-cyan-300 rounded-full">Exclusive Opportunity</span>
                    </div>
                    <p className="text-gray-200 text-sm leading-relaxed">
                      Selected winners will receive professional mentorship to help bring their innovative ideas to life as successful startups. This is your chance to turn your vision into reality!
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  className="relative h-40 sm:h-48 w-full max-w-3xl mx-auto overflow-hidden rounded-xl border border-white/10 bg-black/50 p-4 shadow-[0_0_25px_rgba(139,92,246,0.3)] my-4 backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  style={{
                    transform: isMounted && !prefersReducedMotion
                      ? `perspective(1000px) rotateX(${scrollY * 0.01}deg) rotateY(${calcParallax(100).x * 0.05}deg)`
                      : "perspective(1000px) rotateX(0deg) rotateY(0deg)",
                  }}
                >
                  <div className="absolute inset-0 bg-grid-white/5" />
                  <div className="terminal-header flex w-full justify-start mb-2">
                    <div className="h-3 w-3 rounded-full bg-red-500 mr-2"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500 mr-2"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="relative flex h-full flex-col items-center justify-center gap-2 text-center">
                    <div className="code-animation font-mono text-sm text-green-400 mb-2 text-left w-full">
                      <div className="flex">
                        <span className="text-purple-400 mr-2">$</span>
                        <span className="text-green-400">init hackfest-2025</span>
                      </div>
                      <div className="mt-1">
                        <span className="text-cyan-400">Initializing</span>{" "}
                        <span className="text-white">HackFest 2025</span>...
                      </div>
                    </div>

                    <div className="mt-1">
                      <div className="flex items-center justify-center space-x-4">
                        <motion.div
                          animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                          className="text-2xl font-bold"
                        >
                          <span className="text-cyan-400 glow-cyan">{"{"}Hack</span>
                        </motion.div>
                        <motion.div
                          animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                          transition={{
                            duration: 2,
                            delay: 0.6,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                          }}
                          className="text-2xl font-bold"
                        >
                          <span className="text-purple-400 glow-purple">Build</span>
                        </motion.div>
                        <motion.div
                          animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
                          transition={{
                            duration: 2,
                            delay: 1.2,
                            repeat: Number.POSITIVE_INFINITY,
                            repeatType: "reverse",
                          }}
                          className="text-2xl font-bold"
                        >
                          <span className="text-pink-400 glow-pink">Win{"}"}</span>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
          </div>
        </section>

        <motion.section
          id="about"
          className="w-full py-12 md:py-16 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-950 to-black pointer-events-none" />

          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="inline-block rounded-lg bg-gradient-to-r from-purple-500/20 to-cyan-500/20 px-4 py-1.5 text-sm font-medium text-white border border-white/10">
                  About HackFest 2025
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-white font-display">
                  What to Expect
                </h2>
                <p className="max-w-[900px] text-gray-400 md:text-xl/relaxed lg:text-xl/relaxed xl:text-xl/relaxed">
                Get ready for an exciting, overnight hackathon at HackFest 2025 where developers and innovators come together to create groundbreaking solutions in a fast-paced, competitive environment.
                </p>
              </motion.div>
            </div>

            <div className="mx-auto grid max-w-5xl items-center gap-8 py-8 lg:grid-cols-3">
              <motion.div
                className="feature-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={!prefersReducedMotion ? { y: -8, scale: 1.02 } : {}}
              >
                <div className="feature-icon">
                  <Code className="h-6 w-6 text-purple-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">Code</h3>
                  <p className="text-gray-400">
                    Build innovative solutions using cutting-edge technologies and frameworks.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="feature-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={!prefersReducedMotion ? { y: -8, scale: 1.02 } : {}}
              >
                <div className="feature-icon">
                  <Cpu className="h-6 w-6 text-cyan-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">Learn</h3>
                  <p className="text-gray-400">Gain new skills, receive mentorship and collaborate with peers.</p>
                </div>
              </motion.div>

              <motion.div
                className="feature-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true, margin: "-100px" }}
                whileHover={!prefersReducedMotion ? { y: -8, scale: 1.02 } : {}}
              >
                <div className="feature-icon">
                  <Rocket className="h-6 w-6 text-pink-400" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-white">Win</h3>
                  <p className="text-gray-400">Compete for exciting prizes and recognition from industry leaders.</p>
                </div>
              </motion.div>
            </div>

            <motion.div
              className="mt-8 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="inline-flex items-center justify-center space-x-2 text-gray-400 border border-white/10 rounded-full px-4 py-2 bg-black/30 backdrop-blur-sm">
                <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span>More details coming soon</span>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="register"
          className="w-full py-12 md:py-16 relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-black pointer-events-none" />

          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div
                className="space-y-4"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight text-white font-display">
                  Register Your Interest
                </h2>
                <p className="max-w-[600px] text-gray-400 md:text-xl/relaxed lg:text-xl/relaxed xl:text-xl/relaxed">
                  Be the first to know when registration opens and receive updates about HackFest 2025.
                </p>
              </motion.div>

              <motion.div
                className="w-full max-w-md mt-6"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="relative group">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
                  <div className="relative p-6 rounded-lg bg-black/90 border border-white/10 shadow-2xl flex flex-col items-center">
                    <p className="text-white text-lg mb-6">
                      Fill out our quick form to stay updated about HackFest 2025
                    </p>
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white border-0 text-lg py-4 px-8 rounded-md shadow-lg shadow-purple-500/20 transition-all hover:shadow-purple-500/40 font-medium"
                      >
                        Open Registration Form <ArrowRight className="ml-2 h-5 w-5" />
                      </button>
                    </motion.div>
                    <p className="text-xs text-gray-500 text-center mt-4">
                      We'll ask for your name, email and a few other details to keep you updated.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="mt-8 flex flex-wrap justify-center gap-4 items-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="text-sm text-gray-500 flex items-center">
                  <span className="inline-block w-1 h-1 rounded-full bg-purple-500 mr-2"></span>
                  <span>No spam, ever.</span>
                </div>
                <div className="text-sm text-gray-500 flex items-center">
                  <span className="inline-block w-1 h-1 rounded-full bg-cyan-500 mr-2"></span>
                  <span>Unsubscribe anytime.</span>
                </div>
                <div className="text-sm text-gray-500 flex items-center">
                  <span className="inline-block w-1 h-1 rounded-full bg-pink-500 mr-2"></span>
                  <span>Your data is secure.</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>

      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <motion.footer
        className="w-full border-t border-white/10 py-6 md:py-0 bg-black relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} HackFest. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}
