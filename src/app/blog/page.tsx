"use client";

import { motion, Variants } from "motion/react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { ArrowRight, Calendar, User, Sparkles, Zap, Globe } from "lucide-react";
import { cn } from "@/lib/utils";

const revealVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

// Simulated getPosts() function
const getPosts = () => {
  return [
    {
      title: "How to Boost Your TikTok Reach in 2026",
      slug: "boost-reach-tiktok-2026",
      excerpt: "Discover the latest strategies to break through on TikTok and maximize your views with multi-publishing.",
      date: "March 28, 2026",
      author: "Alex OneFlow",
      image: "https://picsum.photos/seed/tiktok/800/400",
      category: "Strategy"
    },
    {
      title: "The Importance of Multi-Publishing for Creators",
      slug: "importance-multi-publication",
      excerpt: "Why distributing your content across multiple platforms has become essential for survival as a creator.",
      date: "March 25, 2026",
      author: "Sarah Digital",
      image: "https://picsum.photos/seed/social/800/400",
      category: "Growth"
    },
    {
      title: "YouTube Shorts vs Instagram Reels: Which to Choose?",
      slug: "shorts-vs-reels-2026",
      excerpt: "A comparative analysis of the two leading short-form video formats and how OneFlow helps you dominate both.",
      date: "March 22, 2026",
      author: "Marc Tech",
      image: "https://picsum.photos/seed/video/800/400",
      category: "Analysis"
    }
  ];
};

export default function BlogPage() {
  const posts = getPosts();

  return (
    <div className="min-h-screen text-slate-200 font-sans relative">
      <Navbar />
      
      <main className="max-w-7xl mx-auto pt-48 pb-32 px-6 space-y-24 relative z-10">
        <motion.header 
          initial="hidden"
          animate="visible"
          variants={revealVariants}
          className="text-center space-y-8"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full glass-card border-white/10 backdrop-blur-xl">
            <Sparkles className="w-4 h-4 text-sky-blue" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-sky-blue">Global Growth Guides</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-display font-black text-white tracking-tighter leading-none">
            The <span className="shiny-text">Stream.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 font-medium text-xl leading-relaxed">
            Insights, strategies, and news to master multi-publishing and fuel your global social presence.
          </p>
        </motion.header>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post, i) => (
            <motion.article 
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-[48px] overflow-hidden border border-white/5 flex flex-col group hover:border-sky-blue/20 transition-all duration-700"
            >
              <div className="aspect-video w-full overflow-hidden relative">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-onyx/90 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                <div className="absolute top-6 left-6 px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 text-[8px] font-black uppercase tracking-widest text-white">
                  {post.category}
                </div>
              </div>
              <div className="p-10 space-y-8 flex-grow flex flex-col">
                <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-sky-blue" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-sky-blue" />
                    {post.author}
                  </div>
                </div>
                <h2 className="text-3xl font-display font-black text-white group-hover:text-sky-blue transition-colors leading-tight">
                  {post.title}
                </h2>
                <p className="text-slate-400 text-base leading-relaxed flex-grow font-medium">
                  {post.excerpt}
                </p>
                <Link 
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-sky-blue hover:text-white transition-all group/link"
                >
                  Read Full Guide
                  <ArrowRight className="w-5 h-5 transition-transform group-hover/link:translate-x-2" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </main>
    </div>
  );
}
