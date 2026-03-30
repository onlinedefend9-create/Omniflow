"use client";

import { motion, Variants } from "motion/react";
import Navbar from "@/components/Navbar";
import { Send, Mail, MessageSquare, User, Globe, Zap, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

async function contactAction(formData: FormData) {
  // In a real app, this would be a server action.
  // For now, we'll just log it.
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");
  console.log("Contact Form Submission:", { name, email, message });
}

export default function ContactPage() {
  return (
    <div className="min-h-screen text-slate-200 font-sans relative overflow-hidden">
      <Navbar />

      {/* World Map Background Wrapper */}
      <div className="absolute inset-0 -z-10 opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 1000 500" preserveAspectRatio="xMidYMid slice">
          <path 
            fill="currentColor" 
            className="text-sky-blue"
            d="M150,100 Q200,50 250,100 T350,100 T450,150 T550,100 T650,150 T750,100 T850,150" 
            stroke="currentColor" 
            strokeWidth="0.5" 
            fillOpacity="0.1"
          />
          <circle cx="200" cy="150" r="2" fill="currentColor" className="animate-pulse" />
          <circle cx="450" cy="250" r="2" fill="currentColor" className="animate-pulse" style={{ animationDelay: "1s" }} />
          <circle cx="750" cy="180" r="2" fill="currentColor" className="animate-pulse" style={{ animationDelay: "2s" }} />
          <circle cx="300" cy="350" r="2" fill="currentColor" className="animate-pulse" style={{ animationDelay: "1.5s" }} />
          <circle cx="850" cy="400" r="2" fill="currentColor" className="animate-pulse" style={{ animationDelay: "0.5s" }} />
        </svg>
      </div>

      <main className="max-w-5xl mx-auto pt-48 pb-32 px-6 space-y-24 relative z-10">
        <motion.header 
          initial="hidden"
          animate="visible"
          variants={revealVariants}
          className="text-center space-y-8"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass-card border-white/10 backdrop-blur-xl">
            <Globe className="w-4 h-4 text-sky-blue" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-blue">Global Support Hub</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-black text-white tracking-tighter leading-none">
            Get in <span className="shiny-text">Touch.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 font-medium text-xl leading-relaxed">
            Have a question? A partnership proposal? Our team is ready to help you scale your global presence.
          </p>
        </motion.header>

        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Contact Form */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={revealVariants}
            className="lg:col-span-7 glass-card p-12 md:p-16 rounded-[60px] border border-white/5 space-y-12 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-sky-blue/5 via-transparent to-indigo-600/5 -z-10" />
            
            <form action={contactAction} className="space-y-10">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <label className="flex items-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
                    <User className="w-4 h-4 text-sky-blue" />
                    Full Name
                  </label>
                  <input 
                    name="name"
                    type="text" 
                    required
                    placeholder="Alex Sterling"
                    className="w-full px-8 py-6 bg-white/5 border border-white/10 rounded-3xl focus:ring-2 focus:ring-sky-blue focus:border-transparent outline-none text-white font-medium transition-all placeholder:text-slate-800"
                  />
                </div>
                <div className="space-y-4">
                  <label className="flex items-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
                    <Mail className="w-4 h-4 text-sky-blue" />
                    Email Address
                  </label>
                  <input 
                    name="email"
                    type="email" 
                    required
                    placeholder="alex@oneflow.site"
                    className="w-full px-8 py-6 bg-white/5 border border-white/10 rounded-3xl focus:ring-2 focus:ring-sky-blue focus:border-transparent outline-none text-white font-medium transition-all placeholder:text-slate-800"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <label className="flex items-center gap-3 text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">
                  <MessageSquare className="w-4 h-4 text-sky-blue" />
                  Your Message
                </label>
                <textarea 
                  name="message"
                  required
                  rows={6}
                  placeholder="How can we fuel your growth?"
                  className="w-full px-8 py-6 bg-white/5 border border-white/10 rounded-3xl focus:ring-2 focus:ring-sky-blue focus:border-transparent outline-none text-white font-medium transition-all resize-none placeholder:text-slate-800"
                />
              </div>

              <button 
                type="submit"
                className="w-full py-8 bg-gradient-to-r from-sky-blue to-indigo-600 text-white rounded-3xl font-display font-black text-2xl flex items-center justify-center gap-6 hover:shadow-[0_20px_50px_rgba(56,189,248,0.3)] transition-all transform hover:-translate-y-1 border border-white/20"
              >
                Send Message
                <Send className="w-7 h-7" />
              </button>
            </form>
          </motion.div>

          {/* Contact Info Sidebar */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={revealVariants}
            className="lg:col-span-5 space-y-8"
          >
            <div className="glass-card p-10 rounded-[48px] border border-white/5 space-y-8 group hover:border-sky-blue/20 transition-all">
              <div className="w-16 h-16 rounded-3xl bg-sky-blue/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-8 h-8 text-sky-blue" />
              </div>
              <div className="space-y-2">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Direct Email</h4>
                <p className="text-2xl font-display font-bold text-slate-300">support@oneflow.site</p>
              </div>
            </div>

            <div className="glass-card p-10 rounded-[48px] border border-white/5 space-y-8 group hover:border-indigo-500/20 transition-all">
              <div className="w-16 h-16 rounded-3xl bg-indigo-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageSquare className="w-8 h-8 text-indigo-400" />
              </div>
              <div className="space-y-2">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Live Support</h4>
                <p className="text-2xl font-display font-bold text-slate-300">Available 24/7</p>
              </div>
            </div>

            <div className="glass-card p-10 rounded-[48px] border border-white/5 space-y-8 group hover:border-purple-500/20 transition-all">
              <div className="w-16 h-16 rounded-3xl bg-purple-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Send className="w-8 h-8 text-purple-400" />
              </div>
              <div className="space-y-2">
                <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Telegram Hub</h4>
                <p className="text-2xl font-display font-bold text-slate-300">@OneFlowStudio</p>
              </div>
            </div>

            <div className="p-10 glass-card rounded-[48px] border-sky-blue/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6">
                <Sparkles className="w-6 h-6 text-sky-blue animate-pulse" />
              </div>
              <p className="text-sm text-slate-500 font-medium leading-relaxed italic">
                "We aim to respond to all global inquiries within 4 hours. Your growth is our priority."
              </p>
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
