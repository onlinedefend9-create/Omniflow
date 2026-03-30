"use client";

import { motion, Variants } from "motion/react";
import Navbar from "@/components/Navbar";
import { FileText, CheckCircle2, ShieldAlert, Scale, RefreshCw, Zap } from "lucide-react";

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export default function TermsPage() {
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
            <FileText className="w-4 h-4 text-sky-blue" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-blue">Global Service Agreement</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-black text-white tracking-tighter leading-none">
            Terms of <span className="shiny-text">Service.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 font-medium text-xl leading-relaxed">
            Last updated: March 30, 2026. The legal framework for your global content stream.
          </p>
        </motion.header>

        <motion.article 
          initial="hidden"
          animate="visible"
          variants={revealVariants}
          className="glass-card p-12 md:p-20 rounded-[60px] border border-white/5 space-y-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-sky-blue/5 via-transparent to-indigo-600/5 -z-10" />
          
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-sky-blue/10 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-sky-blue" />
              </div>
              <h2 className="text-2xl font-display font-black text-white uppercase tracking-widest">1. Acceptance of Terms</h2>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              By accessing OneFlow, you agree to be bound by these terms of service and to comply with all applicable laws and regulations. 
              If you do not accept these terms, you must not use this site.
            </p>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                <Zap className="w-5 h-5 text-indigo-400" />
              </div>
              <h2 className="text-2xl font-display font-black text-white uppercase tracking-widest">2. Service Usage</h2>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              OneFlow is a social multi-publishing tool. You are responsible for the content you publish via our platform. 
              You must comply with the terms of service of each connected social network (TikTok, YouTube, Meta, X, LinkedIn).
            </p>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <ShieldAlert className="w-5 h-5 text-purple-400" />
              </div>
              <h2 className="text-2xl font-display font-black text-white uppercase tracking-widest">3. Accounts & Security</h2>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              Access to OneFlow is via third-party accounts. You are responsible for the security of your accounts and any activity performed under your OneFlow session. 
              We reserve the right to suspend any account in case of abusive or fraudulent use.
            </p>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                <Scale className="w-5 h-5 text-red-400" />
              </div>
              <h2 className="text-2xl font-display font-black text-white uppercase tracking-widest">4. Limitation of Liability</h2>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              OneFlow shall not be held liable for any direct or indirect damages resulting from the use or inability to use the service, 
              or from any content published via the platform. We do not guarantee uninterrupted access to the service.
            </p>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-500/10 flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-slate-400" />
              </div>
              <h2 className="text-2xl font-display font-black text-white uppercase tracking-widest">5. Modifications</h2>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              We reserve the right to modify these terms at any time. Changes will take effect upon publication on this page. 
              Your continued use of the service after such modifications constitutes your acceptance of the new terms.
            </p>
          </section>
        </motion.article>
      </main>
    </div>
  );
}
