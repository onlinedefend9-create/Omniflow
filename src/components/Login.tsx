"use client"

import * as React from "react"
import { motion } from "motion/react"
import { Card } from "./ui/Card"
import { Button } from "./ui/Button"
import { Youtube, Facebook, Music, Twitter, Linkedin } from "lucide-react"

import { signIn } from "next-auth/react"

const providers = [
  { id: "google", name: "Google", icon: Youtube },
  { id: "facebook", name: "Meta", icon: Facebook },
  { id: "tiktok", name: "TikTok", icon: Music },
  { id: "twitter", name: "twitter", icon: Twitter }, // NextAuth uses 'twitter' for X
  { id: "linkedin", name: "LinkedIn", icon: Linkedin },
]

export function Login() {
  const handleLogin = (providerId: string) => {
    signIn(providerId, { callbackUrl: "/dashboard" });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#09090b] p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-2">
            <h1 className="text-3xl font-display font-bold text-white">
              Welcome to <span className="text-[#FF007F]">OneFlow</span>
            </h1>
            <p className="text-gray-400">
              Connect your accounts to start publishing everywhere.
            </p>
          </div>

          <div className="w-full space-y-4">
            {providers.map((provider, index) => (
              <motion.div
                key={provider.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.3 }}
              >
                <Button
                  variant="outline"
                  className="w-full flex items-center justify-center space-x-3 py-6"
                  onClick={() => handleLogin(provider.id)}
                >
                  <provider.icon size={20} strokeWidth={1.5} />
                  <span>Continue with {provider.name}</span>
                </Button>
              </motion.div>
            ))}
          </div>

          <p className="text-xs text-gray-500 mt-8">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </p>
        </Card>
      </motion.div>
    </div>
  )
}
