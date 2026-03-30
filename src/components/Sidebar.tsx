"use client"

import * as React from "react"
import { motion } from "motion/react"
import { 
  Youtube, 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin, 
  Send, 
  Menu,
  Home,
  Settings,
  Music
} from "lucide-react"
import Link from "next/link"

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Google / YouTube", href: "/dashboard/google", icon: Youtube },
  { name: "Meta (FB & IG)", href: "/dashboard/meta", icon: Facebook },
  { name: "TikTok", href: "/dashboard/tiktok", icon: Music },
  { name: "X (Twitter)", href: "/dashboard/x", icon: Twitter },
  { name: "LinkedIn", href: "/dashboard/linkedin", icon: Linkedin },
  { name: "Telegram", href: "/dashboard/telegram", icon: Send },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = React.useState(false)

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 280 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="h-screen bg-[#09090b] border-r border-[rgba(255,255,255,0.1)] flex flex-col py-6 sticky top-0"
    >
      <div className="flex items-center justify-between px-6 mb-10">
        {!isCollapsed && (
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-xl font-display font-bold text-white"
          >
            OneFlow
          </motion.span>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white hover:text-[#FF007F] transition-colors duration-200 focus:outline-none"
        >
          <Menu size={24} strokeWidth={1.5} />
        </button>
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {navItems.map((item) => (
          <Link 
            key={item.name} 
            href={item.href}
            className="flex items-center px-2 py-3 rounded-lg text-white hover:text-[#FF007F] hover:bg-[rgba(255,255,255,0.05)] transition-all duration-200 group"
          >
            <item.icon 
              size={24} 
              strokeWidth={1.5} 
              className="flex-shrink-0 group-hover:text-[#FF007F] transition-colors duration-200" 
            />
            {!isCollapsed && (
              <motion.span 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="ml-4 font-medium whitespace-nowrap"
              >
                {item.name}
              </motion.span>
            )}
          </Link>
        ))}
      </nav>
    </motion.aside>
  )
}
