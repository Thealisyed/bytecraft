"use client"

import { X } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
}

export function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const [formData, setFormData] = useState({
    FNAME: "",
    LNAME: "",
    EMAIL: "",
    MMERGE7: "",
    MMERGE8: "",
  })

  useEffect(() => {
    let jqueryScript: HTMLScriptElement | null = null
    let mailchimpScript: HTMLScriptElement | null = null
    let initScript: HTMLScriptElement | null = null

    const loadScripts = async () => {
      try {
        // Load jQuery first
        jqueryScript = document.createElement("script")
        jqueryScript.src = "https://code.jquery.com/jquery-3.7.1.min.js"
        jqueryScript.async = false
        document.body.appendChild(jqueryScript)

        // Wait for jQuery to load
        await new Promise((resolve, reject) => {
          jqueryScript!.onload = resolve
          jqueryScript!.onerror = reject
        })

        // Load Mailchimp script after jQuery
        mailchimpScript = document.createElement("script")
        mailchimpScript.src = "//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js"
        mailchimpScript.async = false
        document.body.appendChild(mailchimpScript)

        // Wait for Mailchimp script to load
        await new Promise((resolve, reject) => {
          mailchimpScript!.onload = resolve
          mailchimpScript!.onerror = reject
        })

        // Initialize Mailchimp form after both scripts are loaded
        initScript = document.createElement("script")
        initScript.textContent = `
          (function($) {
            window.fnames = new Array(); 
            window.ftypes = new Array();
            fnames[1]='FNAME';ftypes[1]='text';
            fnames[2]='LNAME';ftypes[2]='text';
            fnames[0]='EMAIL';ftypes[0]='email';
            fnames[7]='MMERGE7';ftypes[7]='dropdown';
            fnames[8]='MMERGE8';ftypes[8]='dropdown';
            fnames[3]='ADDRESS';ftypes[3]='address';
            fnames[4]='PHONE';ftypes[4]='phone';
            fnames[5]='BIRTHDAY';ftypes[5]='birthday';
            fnames[6]='COMPANY';ftypes[6]='text';
          }(jQuery));
          var $mcj = jQuery.noConflict(true);
        `
        document.body.appendChild(initScript)
      } catch (error) {
        console.error("Error loading scripts:", error)
      }
    }

    loadScripts()

    return () => {
      if (jqueryScript) document.body.removeChild(jqueryScript)
      if (mailchimpScript) document.body.removeChild(mailchimpScript)
      if (initScript) document.body.removeChild(initScript)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative z-50 w-full max-w-2xl overflow-hidden rounded-xl bg-white p-6 shadow-2xl"
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900"
        >
          <X className="h-5 w-5" />
        </button>

        <div id="mc_embed_signup" className="w-full">
          <form
            action="https://fosis.us14.list-manage.com/subscribe/post?u=af3a351941dfc53fc90869bd3&amp;id=786024f329&amp;f_id=005db7e5f0"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            className="validate"
            target="_blank"
          >
            <div id="mc_embed_signup_scroll">
              <h2 className="mb-4 text-2xl font-bold text-gray-900">Summer Hackathon Interest Form</h2>
              <div className="mb-4 text-sm text-gray-500">
                <span className="text-red-500">*</span> indicates required
              </div>
              
              <div className="space-y-4">
                <div className="mc-field-group">
                  <label htmlFor="mce-FNAME" className="block text-sm font-medium text-gray-700">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="FNAME"
                    className="required text mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 text-gray-900"
                    id="mce-FNAME"
                    required
                    value={formData.FNAME}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mc-field-group">
                  <label htmlFor="mce-LNAME" className="block text-sm font-medium text-gray-700">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="LNAME"
                    className="required text mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 text-gray-900"
                    id="mce-LNAME"
                    required
                    value={formData.LNAME}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mc-field-group">
                  <label htmlFor="mce-EMAIL" className="block text-sm font-medium text-gray-700">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="EMAIL"
                    className="required email mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 text-gray-900"
                    id="mce-EMAIL"
                    required
                    value={formData.EMAIL}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="mc-field-group">
                  <label htmlFor="mce-MMERGE7" className="block text-sm font-medium text-gray-700">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="MMERGE7"
                    className="required mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 text-gray-900"
                    id="mce-MMERGE7"
                    required
                    value={formData.MMERGE7}
                    onChange={handleInputChange}
                  >
                    <option value=""></option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>

                <div className="mc-field-group">
                  <label htmlFor="mce-MMERGE8" className="block text-sm font-medium text-gray-700">
                    Which best describes you? <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="MMERGE8"
                    className="required mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 text-gray-900"
                    id="mce-MMERGE8"
                    required
                    value={formData.MMERGE8}
                    onChange={handleInputChange}
                  >
                    <option value=""></option>
                    <option value="University student">University student</option>
                    <option value="Recent graduate">Recent graduate</option>
                    <option value="Working professional">Working professional</option>
                  </select>
                </div>
              </div>

              <div id="mce-responses" className="clear foot">
                <div className="response" id="mce-error-response" style={{ display: "none" }}></div>
                <div className="response" id="mce-success-response" style={{ display: "none" }}></div>
              </div>

              <div aria-hidden="true" style={{ position: "absolute", left: "-5000px" }}>
                <input
                  type="text"
                  name="b_af3a351941dfc53fc90869bd3_786024f329"
                  tabIndex={-1}
                  defaultValue=""
                />
              </div>

              <div className="mt-6">
                <input
                  type="submit"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  className="w-full rounded-md bg-gradient-to-r from-purple-600 to-cyan-600 px-4 py-2 text-white shadow-lg hover:from-purple-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  value="Subscribe"
                />
              </div>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  )
} 