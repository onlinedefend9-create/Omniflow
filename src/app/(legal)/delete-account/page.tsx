"use client";

import { motion, Variants } from "motion/react";
import Navbar from "@/components/Navbar";
import { Trash2, UserX, Database, Clock, ShieldCheck, ExternalLink, Zap } from "lucide-react";

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export default function DeleteAccountPage() {
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
            <UserX className="w-4 h-4 text-red-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-red-400">Data Deletion Protocol</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-black text-white tracking-tighter leading-none">
            Delete <span className="shiny-text">Account.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 font-medium text-xl leading-relaxed">
            Last updated: March 30, 2026. Complete transparency on your data removal process.
          </p>
        </motion.header>

        <motion.article 
          initial="hidden"
          animate="visible"
          variants={revealVariants}
          className="glass-card p-12 md:p-20 rounded-[60px] border border-white/5 space-y-16 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-onyx -z-10" />
          
          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-400" />
              </div>
              <h2 className="text-2xl font-display font-black text-white uppercase tracking-widest">1. How to Delete Your Account</h2>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              To delete your OneFlow account and all associated data, you can do so directly from your profile settings in the Dashboard. 
              If you no longer have access to the Dashboard, contact us at <span className="text-white">support@oneflow.site</span> with the email address associated with your account.
            </p>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                <Database className="w-5 h-5 text-indigo-400" />
              </div>
              <h2 className="text-2xl font-display font-black text-white uppercase tracking-widest">2. Data Removed</h2>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              Upon account deletion, we erase from our servers:
            </p>
            <ul className="grid md:grid-cols-2 gap-4 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
              <li className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5"><Zap className="w-4 h-4 text-sky-blue" /> OAuth2 Access Tokens</li>
              <li className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5"><Zap className="w-4 h-4 text-sky-blue" /> Profile Information</li>
              <li className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5"><Zap className="w-4 h-4 text-sky-blue" /> Publication History</li>
              <li className="flex items-center gap-3 p-4 bg-white/5 rounded-2xl border border-white/5"><Zap className="w-4 h-4 text-sky-blue" /> Custom Preferences</li>
            </ul>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-purple-400" />
              </div>
              <h2 className="text-2xl font-display font-black text-white uppercase tracking-widest">3. Deletion Timeline</h2>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              Deletion is immediate for active data. Some data may remain in our secure backups for a maximum period of 30 days before being permanently purged.
            </p>
          </section>

          <section className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-green-400" />
              </div>
              <h2 className="text-2xl font-display font-black text-white uppercase tracking-widest">4. Revoking Third-Party Access</h2>
            </div>
            <p className="text-slate-400 text-lg leading-relaxed font-medium">
              In addition to deleting your OneFlow account, we recommend revoking OneFlow application access directly on your social accounts:
            </p>
            <div className="grid md:grid-cols-2 gap-4 pt-4">
              {[
                { name: "Google / YouTube", url: "https://myaccount.google.com/permissions" },
                { name: "Meta / Facebook / Instagram", url: "https://www.facebook.com/settings?tab=applications" },
                { name: "X (Twitter)", url: "https://twitter.com/settings/connected_apps" },
                { name: "LinkedIn", url: "https://www.linkedin.com/psettings/permitted-applications" },
                { name: "TikTok", url: "https://www.tiktok.com/setting/security" }
              ].map((platform, i) => (
                <a 
                  key={i}
                  href={platform.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/10 hover:bg-white/10 transition-all group"
                >
                  <span className="text-sm font-bold text-white">{platform.name}</span>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-sky-blue transition-colors" />
                </a>
              ))}
            </div>
          </section>
        </motion.article>
      </main>
    </div>
  );
}
