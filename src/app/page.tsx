"use client";

import { motion, Variants } from "motion/react";
import { 
  Zap, 
  Share2, 
  Globe, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight,
  CheckCircle2,
  Twitter,
  Youtube,
  Instagram,
  Facebook,
  Linkedin,
  Music2,
  MessageSquare,
  BarChart3,
  RefreshCcw,
  Layers
} from "lucide-react";
import Navbar from "@/components/Navbar";
import { cn } from "@/lib/utils";
import Link from "next/link";

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const platforms = [
  { icon: Music2, name: "TikTok", delay: 0 },
  { icon: Youtube, name: "YouTube", delay: 0.1 },
  { icon: Instagram, name: "Instagram", delay: 0.2 },
  { icon: Facebook, name: "Facebook", delay: 0.3 },
  { icon: Twitter, name: "X", delay: 0.4 },
  { icon: Linkedin, name: "LinkedIn", delay: 0.5 },
  { icon: MessageSquare, name: "Threads", delay: 0.6 }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen text-slate-200 font-sans selection:bg-sky-blue/30 relative">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-48 pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center space-y-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass-card border-white/10 backdrop-blur-xl"
          >
            <Zap className="w-4 h-4 text-sky-blue fill-sky-blue" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-blue">Engineered for Global Impact</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="text-7xl md:text-9xl font-display font-black tracking-tighter text-white leading-[0.85]"
          >
            One Flow.<br />
            <span className="shiny-text">Global Impact.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="max-w-3xl mx-auto text-xl md:text-2xl text-slate-400 font-medium leading-relaxed"
          >
            The high-performance engine for creators to dominate <br className="hidden md:block" />
            TikTok, YouTube, and Meta in one click.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
          >
            <Link 
              href="/dashboard"
              className="px-12 py-6 bg-white text-onyx rounded-2xl font-display font-black text-xl flex items-center gap-4 hover:bg-sky-blue hover:text-white transition-all shadow-2xl shadow-white/10"
            >
              Open Studio
              <ArrowRight className="w-6 h-6" />
            </Link>
            <a 
              href="#features"
              className="px-12 py-6 glass-card glass-card-hover rounded-2xl font-display font-black text-xl text-white border-white/10 flex items-center justify-center"
            >
              Watch Demo
            </a>
          </motion.div>

          {/* Floating Platform Icons */}
          <div className="pt-32 grid grid-cols-4 md:grid-cols-7 gap-8 md:gap-12 opacity-30">
            {platforms.map((p, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + p.delay }}
                className="flex flex-col items-center gap-4 float-icon"
                style={{ animationDelay: `${i * 0.5}s` }}
              >
                <p.icon className="w-10 h-10" />
                <span className="text-[10px] font-black uppercase tracking-widest hidden md:block">{p.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By Marquee */}
      <section className="py-20 border-y border-white/5 bg-onyx/50 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 mb-10">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-600 text-center">Fueling the world's top creators</p>
        </div>
        <div className="flex gap-20 animate-marquee whitespace-nowrap">
          {[...platforms, ...platforms].map((p, i) => (
            <div key={i} className="flex items-center gap-4 opacity-20 hover:opacity-100 transition-opacity duration-500 cursor-default grayscale hover:grayscale-0">
              <p.icon className="w-8 h-8" />
              <span className="text-xl font-display font-black tracking-tighter text-white">{p.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Bento Grid Section */}
      <section id="features" className="py-40 px-6 relative">
        <div className="max-w-7xl mx-auto space-y-24">
          <motion.div 
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <h2 className="text-5xl md:text-7xl font-display font-black text-white tracking-tighter">
              Next-Gen <span className="text-gradient">Capabilities</span>
            </h2>
            <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs">SaaS 3.0 Infrastructure for Modern Creators</p>
          </motion.div>

          <div className="grid md:grid-cols-12 gap-8">
            {/* Main Feature */}
            <motion.div 
              variants={revealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:col-span-8 glass-card glass-card-hover p-16 rounded-[48px] space-y-10 relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-sky-blue/5 blur-[120px] rounded-full -z-10 group-hover:bg-sky-blue/10 transition-all duration-700" />
              <div className="w-20 h-20 rounded-3xl bg-sky-blue/10 flex items-center justify-center">
                <Share2 className="w-10 h-10 text-sky-blue" />
              </div>
              <div className="space-y-6">
                <h3 className="text-4xl md:text-5xl font-display font-black text-white leading-none">One-Click Publishing</h3>
                <p className="text-slate-400 text-xl leading-relaxed max-w-2xl">
                  Broadcast your vision across TikTok, YouTube Shorts, Instagram Reels, and X simultaneously. 
                  Our engine handles the formatting, you handle the creativity.
                </p>
              </div>
              <div className="flex gap-4 pt-4">
                <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-500">Auto-Resize</div>
                <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-500">Smart Captions</div>
                <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-slate-500">Instant Sync</div>
              </div>
            </motion.div>

            {/* Smart Analytics */}
            <motion.div 
              variants={revealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:col-span-4 glass-card glass-card-hover p-12 rounded-[48px] space-y-8 group"
            >
              <div className="w-16 h-16 rounded-3xl bg-purple-500/10 flex items-center justify-center">
                <BarChart3 className="w-8 h-8 text-purple-500" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-display font-bold text-white">Smart Analytics</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Unified data streams from all connected platforms. Understand your global reach in real-time.
                </p>
              </div>
              <div className="h-32 w-full bg-white/5 rounded-3xl border border-white/5 flex items-end p-4 gap-2">
                {[40, 70, 45, 90, 65, 80].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    transition={{ delay: i * 0.1, duration: 1 }}
                    className="flex-1 bg-gradient-to-t from-purple-600 to-sky-blue rounded-t-lg"
                  />
                ))}
              </div>
            </motion.div>

            {/* Instant Sync */}
            <motion.div 
              variants={revealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:col-span-6 glass-card glass-card-hover p-12 rounded-[48px] space-y-8 group"
            >
              <div className="w-16 h-16 rounded-3xl bg-green-500/10 flex items-center justify-center">
                <RefreshCcw className="w-8 h-8 text-green-500" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-display font-bold text-white">Instant Sync</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Your content is optimized and synchronized across all platforms the moment you hit publish. 
                  Zero lag, maximum impact.
                </p>
              </div>
            </motion.div>

            {/* Global Reach */}
            <motion.div 
              variants={revealVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="md:col-span-6 glass-card glass-card-hover p-12 rounded-[48px] space-y-8 group"
            >
              <div className="w-16 h-16 rounded-3xl bg-indigo-500/10 flex items-center justify-center">
                <Globe className="w-8 h-8 text-indigo-500" />
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-display font-bold text-white">Global Reach</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Break borders. OneFlow's infrastructure is designed for worldwide content distribution 
                  with localized optimization.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Module Connector Preview */}
      <section className="py-40 px-6 bg-onyx/30">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <motion.div 
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-10"
          >
            <div className="space-y-4">
              <h2 className="text-5xl md:text-7xl font-display font-black text-white tracking-tighter leading-none">
                Connect on <span className="text-sky-blue">Demand.</span>
              </h2>
              <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs">Modular Social Integration</p>
            </div>
            <p className="text-xl text-slate-400 leading-relaxed">
              No complex setups. Connect your social identities as modular "Power Switches". 
              Activate or deactivate platforms instantly based on your campaign needs.
            </p>
            <div className="space-y-6">
              {[
                "Official OAuth2 Secure Handshakes",
                "Independent Account Management",
                "Real-time Connection Status"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-sky-blue/20 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-sky-blue" />
                  </div>
                  <span className="font-bold text-slate-300">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="relative">
            <div className="absolute inset-0 bg-sky-blue/20 blur-[120px] rounded-full -z-10" />
            <div className="glass-card p-12 rounded-[60px] border-white/10 grid grid-cols-2 gap-6">
              {platforms.slice(0, 4).map((p, i) => (
                <div key={i} className="p-8 rounded-[32px] bg-white/5 border border-white/10 flex flex-col items-center gap-6 group">
                  <p.icon className="w-10 h-10 text-slate-400 group-hover:text-sky-blue transition-colors" />
                  <div className="w-12 h-6 bg-slate-800 rounded-full relative p-1 cursor-pointer group-hover:bg-sky-blue/20 transition-all">
                    <motion.div 
                      animate={{ x: i % 2 === 0 ? 24 : 0 }}
                      className={cn(
                        "w-4 h-4 rounded-full transition-all",
                        i % 2 === 0 ? "bg-sky-blue power-switch-glow" : "bg-slate-600"
                      )}
                    />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{p.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            variants={revealVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="glass-card rounded-[80px] p-20 md:p-32 text-center space-y-12 relative overflow-hidden border-sky-blue/20"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-sky-blue/10 via-transparent to-indigo-600/10 -z-10" />
            <h2 className="text-6xl md:text-8xl font-display font-black text-white tracking-tighter leading-none">
              Ready to <span className="shiny-text">Ignite?</span>
            </h2>
            <p className="max-w-2xl mx-auto text-xl text-slate-400 font-medium">
              Join the elite creators scaling their global presence with OneFlow. 
              The engine is ready. Are you?
            </p>
            <Link 
              href="/dashboard"
              className="inline-flex px-16 py-8 bg-white text-onyx rounded-3xl font-display font-black text-2xl hover:bg-sky-blue hover:text-white transition-all transform hover:scale-105 shadow-2xl shadow-white/10"
            >
              Get Started Now
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-32 px-6 border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-16">
          <div className="col-span-2 space-y-8">
            <div className="flex items-center gap-4">
              <Zap className="w-10 h-10 text-sky-blue fill-sky-blue" />
              <span className="text-3xl font-display font-black tracking-tighter text-white">OneFlow</span>
            </div>
            <p className="text-slate-500 max-w-md text-lg leading-relaxed">
              The high-performance social multi-publisher for the SaaS 3.0 era. 
              Engineered for speed, security, and global impact.
            </p>
          </div>
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Resources</h4>
            <ul className="space-y-5 text-sm text-slate-500 font-bold uppercase tracking-widest">
              <li><Link href="/blog" className="hover:text-sky-blue transition-colors">Growth Guides</Link></li>
              <li><Link href="/contact" className="hover:text-sky-blue transition-colors">Support Hub</Link></li>
              <li><Link href="/dashboard" className="hover:text-sky-blue transition-colors">Studio Access</Link></li>
            </ul>
          </div>
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Legal</h4>
            <ul className="space-y-5 text-sm text-slate-500 font-bold uppercase tracking-widest">
              <li><Link href="/privacy" className="hover:text-sky-blue transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-sky-blue transition-colors">Terms of Service</Link></li>
              <li><Link href="/delete-account" className="hover:text-red-400 transition-colors">Data Deletion</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-32 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-800">© 2026 OneFlow Studio • Global Social Engine</p>
          <div className="flex gap-8">
            <Twitter className="w-6 h-6 text-slate-800 hover:text-sky-blue cursor-pointer transition-colors" />
            <Instagram className="w-6 h-6 text-slate-800 hover:text-pink-500 cursor-pointer transition-colors" />
            <Linkedin className="w-6 h-6 text-slate-800 hover:text-blue-600 cursor-pointer transition-colors" />
          </div>
        </div>
      </footer>
    </div>
  );
}
