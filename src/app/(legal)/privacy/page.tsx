"use client";

import { motion, Variants } from "motion/react";
import Navbar from "@/components/Navbar";
import { ShieldCheck, Lock, Eye, UserCheck, Mail, Zap } from "lucide-react";

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen text-slate-200 font-sans relative">
      <Navbar />
      
      <main className="max-w-4xl mx-auto pt-48 pb-32 px-6 space-y-16 relative z-10">
        <motion.header 
          initial="hidden"
          animate="visible"
          variants={revealVariants}
          className="text-center space-y-8"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass-card border-white/10 backdrop-blur-xl">
            <ShieldCheck className="w-4 h-4 text-accent" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Security Protocol v3.0</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-black text-white tracking-tighter leading-none">
            Privacy <span className="shiny-text">Policy.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 font-medium text-xl leading-relaxed">
            Last updated: March 30, 2026. Your data security is the core of OneFlow&apos;s engine.
          </p>
        </motion.header>

        <motion.article 
          initial="hidden"
          animate="visible"
          variants={revealVariants}
          className="glass-card p-12 md:p-20 rounded-[60px] border border-white/5 space-y-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent-hover/5 -z-10" />
          
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Lock className="w-5 h-5 text-accent" />
              </div>
              <h2 className="text-2xl font-display font-black text-white uppercase tracking-widest">1. Data Collection</h2>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              OneFlow collects information necessary to provide its multi-publishing services. 
              This includes authentication data via official OAuth2 handshakes for TikTok, YouTube, Meta, X, and LinkedIn. 
              <span className="text-white"> We never store your passwords.</span>
            </p>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Eye className="w-5 h-5 text-accent" />
              </div>
              <h2 className="text-2xl font-display font-black text-white uppercase tracking-widest">2. Data Usage</h2>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              Your data is used exclusively to enable the publication of your content on the platforms you have connected. 
              We do not sell or share your personal data with third parties for advertising purposes.
            </p>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-purple-400" />
              </div>
              <h2 className="text-2xl font-display font-black text-white uppercase tracking-widest">3. Security Infrastructure</h2>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              We implement technical and organizational security measures to protect your data against unauthorized access, 
              alteration, or destruction. The use of official APIs ensures an optimal level of security.
            </p>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                <UserCheck className="w-5 h-5 text-green-400" />
              </div>
              <h2 className="text-2xl font-display font-black text-white uppercase tracking-widest">4. Your Global Rights</h2>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              In accordance with GDPR and global privacy standards, you have the right to access, rectify, and delete your data. 
              You can revoke access to your social accounts at any time via OneFlow settings or directly on the respective platforms.
            </p>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-500/10 flex items-center justify-center">
                <Mail className="w-5 h-5 text-slate-400" />
              </div>
              <h2 className="text-2xl font-display font-black text-white uppercase tracking-widest">5. Contact Support</h2>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              For any questions regarding our privacy policy, contact us at: <span className="text-accent font-bold">support@oneflow.site</span>
            </p>
          </section>
        </motion.article>
      </main>
    </div>
  );
}
