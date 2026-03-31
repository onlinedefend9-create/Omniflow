"use client";

import { useSession, signOut } from "next-auth/react";
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut, 
  Plus, 
  Youtube, 
  Facebook, 
  Music2,
  TrendingUp,
  Eye,
  MessageSquare,
  Share2,
  AlertCircle
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ConnectButtons } from "@/components/ConnectButtons";
import { MultiPostComposer } from "@/components/MultiPostComposer";
import { cn } from "@/lib/utils";

const MOCK_ACCOUNTS = [
  { id: "yt-1", platform: "YouTube", name: "Artist Channel", handle: "@artist_official", followers: "1.2M", icon: Youtube, color: "text-red-500" },
  { id: "fb-1", platform: "Facebook", name: "Artist Page", handle: "/artist.official", followers: "850K", icon: Facebook, color: "text-blue-500" },
  { id: "tk-1", platform: "TikTok", name: "Artist TikTok", handle: "@artist_tok", followers: "2.4M", icon: Music2, color: "text-pink-500" },
];

const MOCK_STATS = [
  { label: "Total Views", value: "4.8M", change: "+12.5%", icon: Eye },
  { label: "Engagement", value: "852K", change: "+8.2%", icon: MessageSquare },
  { label: "Shares", value: "124K", change: "+15.1%", icon: Share2 },
  { label: "Growth", value: "+24K", change: "+5.4%", icon: TrendingUp },
];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-white/20 border-t-white rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white selection:bg-white/10">
      {/* Sidebar Navigation */}
      <aside className="fixed left-0 top-0 bottom-0 w-20 lg:w-64 bg-zinc-950 border-r border-white/5 flex flex-col z-50">
        <div className="p-6 lg:p-8">
          <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white rounded-2xl flex items-center justify-center">
            <span className="text-black font-black text-xl lg:text-2xl italic tracking-tighter">OF</span>
          </div>
        </div>

        <nav className="flex-1 px-4 lg:px-6 space-y-2">
          {[
            { icon: LayoutDashboard, label: "Overview", active: true },
            { icon: BarChart3, label: "Analytics" },
            { icon: Users, label: "Audience" },
            { icon: Settings, label: "Settings" },
          ].map((item) => (
            <button
              key={item.label}
              className={cn(
                "w-full flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group",
                item.active ? "bg-white text-black" : "text-zinc-500 hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className="w-6 h-6" />
              <span className="hidden lg:block font-bold text-sm tracking-tight">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 lg:p-8 border-t border-white/5">
          {isAuthenticated ? (
            <button
              onClick={() => signOut()}
              className="w-full flex items-center gap-4 p-4 rounded-2xl text-red-500 hover:bg-red-500/10 transition-all duration-300 group"
            >
              <LogOut className="w-6 h-6" />
              <span className="hidden lg:block font-bold text-sm tracking-tight">Sign Out</span>
            </button>
          ) : (
            <div className="flex items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-full bg-zinc-800 animate-pulse" />
              <div className="hidden lg:block space-y-1">
                <div className="w-24 h-3 bg-zinc-800 rounded animate-pulse" />
                <div className="w-16 h-2 bg-zinc-800 rounded animate-pulse" />
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="pl-20 lg:pl-64 min-h-screen">
        <div className="max-w-[1600px] mx-auto p-6 lg:p-12 space-y-12">
          
          {/* Header Section */}
          <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
                  Live Dashboard
                </span>
              </div>
              <h1 className="text-5xl lg:text-7xl font-black italic tracking-tighter uppercase leading-none">
                {isAuthenticated ? `Welcome, ${session.user?.name?.split(' ')[0]}` : "Artist Mode"}
              </h1>
              <p className="text-zinc-500 max-w-xl font-medium leading-relaxed">
                {isAuthenticated 
                  ? "Your global social media performance is synchronized. Manage all platforms from one unified studio."
                  : "Experience the OneFlow dashboard with sample data. Connect your real accounts to start dominating."}
              </p>
            </div>

            {!isAuthenticated && (
              <div className="flex items-center gap-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl text-yellow-500 text-sm font-bold animate-in fade-in slide-in-from-right-4">
                <AlertCircle className="w-5 h-5" />
                <span>Artist Mode Active — Mock Data Displayed</span>
              </div>
            )}
          </header>

          {/* Stats Grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {MOCK_STATS.map((stat, i) => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                key={stat.label}
                className="p-8 bg-zinc-950 border border-white/5 rounded-[32px] space-y-4 hover:border-white/10 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 bg-white/5 rounded-xl group-hover:scale-110 transition-transform duration-500">
                    <stat.icon className="w-5 h-5 text-zinc-400" />
                  </div>
                  <span className="text-xs font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded-lg">
                    {stat.change}
                  </span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                    {stat.label}
                  </span>
                  <p className="text-3xl font-black italic tracking-tighter">
                    {stat.value}
                  </p>
                </div>
              </motion.div>
            ))}
          </section>

          {/* Multi-Post Composer */}
          <section className="max-w-4xl">
            <MultiPostComposer connectedAccountsCount={isAuthenticated ? 2 : 1} />
          </section>

          {/* Accounts Section */}
          <section className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black italic tracking-tighter uppercase">
                Connected Platforms
              </h2>
              <button className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-full font-bold text-sm hover:scale-105 transition-transform">
                <Plus className="w-4 h-4" />
                Add Platform
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="wait">
                {(isAuthenticated ? [] : MOCK_ACCOUNTS).map((account, i) => (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: i * 0.1 }}
                    key={account.id}
                    className="group relative p-8 bg-zinc-950 border border-white/5 rounded-[40px] overflow-hidden hover:border-white/10 transition-all duration-500"
                  >
                    <div className="relative z-10 flex flex-col h-full justify-between gap-8">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className={cn("p-4 bg-white/5 rounded-3xl inline-flex", account.color)}>
                            <account.icon className="w-8 h-8" />
                          </div>
                          <div>
                            <h3 className="text-xl font-black italic tracking-tighter uppercase">
                              {account.name}
                            </h3>
                            <p className="text-sm font-bold text-zinc-500">
                              {account.handle}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end">
                          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                            Followers
                          </span>
                          <span className="text-2xl font-black italic tracking-tighter">
                            {account.followers}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: "70%" }}
                            className="h-full bg-white"
                          />
                        </div>
                        <span className="text-[10px] font-black text-zinc-500">70%</span>
                      </div>
                    </div>

                    {/* Glassmorphism background effect */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 blur-[100px] -mr-32 -mt-32 rounded-full group-hover:bg-white/10 transition-colors duration-500" />
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Empty state / Connect Prompt */}
              {!isAuthenticated && (
                <div className="lg:col-span-3 p-12 bg-white/5 border border-dashed border-white/10 rounded-[40px] flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-20 h-20 bg-white/5 rounded-[32px] flex items-center justify-center">
                    <Plus className="w-10 h-10 text-zinc-500" />
                  </div>
                  <div className="max-w-md space-y-2">
                    <h3 className="text-2xl font-black italic tracking-tighter uppercase">
                      Connect Your Real Accounts
                    </h3>
                    <p className="text-zinc-500 font-medium">
                      Unlock real-time analytics, automated publishing, and audience insights for your social media empire.
                    </p>
                  </div>
                  <ConnectButtons />
                </div>
              )}
            </div>
          </section>

        </div>
      </main>
    </div>
  );
}
