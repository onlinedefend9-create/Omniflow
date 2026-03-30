"use client";

import { useSession, signOut } from "next-auth/react";
import { Zap, Layout, LogOut } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] glass-nav border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="w-12 h-12 bg-gradient-to-br from-sky-blue to-indigo-600 rounded-[14px] flex items-center justify-center shadow-2xl shadow-sky-blue/20 group-hover:scale-110 transition-all duration-500">
            <Zap className="w-7 h-7 text-white fill-white" />
          </div>
          <span className="text-2xl font-display font-black tracking-tighter text-white">
            One<span className="text-sky-blue">Flow</span>
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-12">
          <Link href="/blog" className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-sky-blue transition-all">Growth Guides</Link>
          <Link href="/contact" className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-sky-blue transition-all">Support</Link>
          <Link href="/privacy" className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 hover:text-sky-blue transition-all">Privacy</Link>
        </div>

        <div className="flex items-center gap-6 md:gap-10">
          <Link 
            href="/dashboard" 
            aria-label="Open OneFlow Studio"
            className="flex items-center gap-4 px-8 md:px-10 py-4 bg-white/5 hover:bg-sky-blue hover:text-onyx rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 border border-white/10 group shadow-xl shadow-black/20"
          >
            <Layout className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Studio
          </Link>

          {session && (
            <div className="flex items-center gap-6 pl-6 md:pl-10 border-l border-white/10">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-[10px] font-black text-white uppercase tracking-tight">{session.user?.name}</span>
                <span className="text-[8px] font-bold text-sky-blue uppercase tracking-widest">Global Hub Active</span>
              </div>
              <button 
                onClick={() => signOut()}
                aria-label="Sign Out"
                className="p-4 glass-card glass-card-hover rounded-2xl text-slate-400 hover:text-red-400 transition-all border border-white/5"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
