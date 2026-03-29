import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ParticleBackground } from '../components/ParticleBackground';
import { AdPlaceholder } from '../components/AdPlaceholder';
import { Github, Sparkles, Shield, Zap, ArrowRight, Globe, Layers, Share2 } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-onyx text-slate-200 selection:bg-purple-500/30">
      <ParticleBackground />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-onyx/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight text-white">OmniFlow<span className="text-indigo-400">.click</span></span>
          </div>
          <div className="flex items-center gap-6">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <Link to="/omni-publisher" className="px-4 py-2 bg-white text-black rounded-full text-sm font-bold hover:bg-slate-200 transition-all">
              Ouvrir le Studio
            </Link>
          </div>
        </div>
      </nav>

      <main className="pt-32 pb-20 px-6">
        {/* Hero Section */}
        <section className="max-w-5xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest"
          >
            <Sparkles className="w-3 h-3" />
            Open Source & Privacy First
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold tracking-tight text-white leading-[1.1]"
          >
            Propulsez votre contenu partout. <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              En un clic. Gratuitement.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            L'alternative Open Source aux outils de programmation coûteux. 
            Gardez le contrôle total de vos données et automatisez votre présence sociale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link 
              to="/omni-publisher" 
              className="glow-button group relative px-8 py-4 bg-indigo-600 rounded-2xl font-bold text-white flex items-center gap-2 hover:bg-indigo-500 transition-all shadow-2xl shadow-indigo-600/40"
            >
              Ouvrir le Studio (C'est Gratuit)
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-slate-300 hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <Github className="w-5 h-5" />
              Star on GitHub
            </a>
          </motion.div>
        </section>

        {/* Ad Leaderboard */}
        <div className="max-w-7xl mx-auto mt-24">
          <AdPlaceholder type="TOP" />
        </div>

        {/* Features Grid */}
        <section className="max-w-7xl mx-auto mt-32 grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Zap className="w-6 h-6 text-yellow-400" />,
              title: "Vitesse Éclair",
              description: "Adaptez un post unique pour 5+ réseaux sociaux en moins de 10 secondes grâce à l'IA Gemini."
            },
            {
              icon: <Shield className="w-6 h-6 text-green-400" />,
              title: "Privacy First",
              description: "Vos tokens OAuth sont stockés localement. Aucune donnée ne transite par nos serveurs."
            },
            {
              icon: <Globe className="w-6 h-6 text-blue-400" />,
              title: "Multi-Plateforme",
              description: "TikTok, Instagram, LinkedIn, X, Threads... Publiez partout depuis une seule interface."
            }
          ].map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-studio p-8 space-y-4"
            >
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white">{feature.title}</h3>
              <p className="text-slate-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </section>

        {/* Studio Preview Mockup */}
        <section className="max-w-7xl mx-auto mt-40 relative">
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-3xl opacity-50 -z-10" />
          <div className="glass-studio p-4 md:p-8 overflow-hidden">
            <div className="flex items-center gap-2 mb-6 border-b border-white/5 pb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/50" />
              <div className="ml-4 px-3 py-1 rounded-md bg-white/5 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                OmniFlow Studio v1.0
              </div>
            </div>
            <div className="grid md:grid-cols-12 gap-6">
              <div className="md:col-span-3 space-y-4">
                <div className="h-8 w-full bg-white/5 rounded-lg animate-pulse" />
                <div className="h-32 w-full bg-white/5 rounded-lg animate-pulse" />
                <div className="h-32 w-full bg-white/5 rounded-lg animate-pulse" />
              </div>
              <div className="md:col-span-9 space-y-6">
                <div className="h-40 w-full bg-white/5 rounded-xl animate-pulse" />
                <div className="grid grid-cols-3 gap-4">
                  <div className="h-48 bg-white/5 rounded-xl animate-pulse" />
                  <div className="h-48 bg-white/5 rounded-xl animate-pulse" />
                  <div className="h-48 bg-white/5 rounded-xl animate-pulse" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-40 border-t border-white/5 py-20 px-6 bg-onyx/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div className="col-span-2 space-y-6">
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-indigo-500 fill-indigo-500" />
              <span className="font-display text-2xl font-bold text-white tracking-tight">OmniFlow</span>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed">
              Propulsé par la communauté. Aucun serveur, aucune donnée collectée. 
              Le futur de la gestion de contenu est Open Source.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                <Globe className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">Projet</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="https://github.com" className="hover:text-white transition-colors">GitHub Repository</a></li>
              <li><Link to="/omni-publisher" className="hover:text-white transition-colors">Studio Demo</Link></li>
              <li><a href="/LICENSE" className="hover:text-white transition-colors">MIT License</a></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white uppercase tracking-widest">Légal</h4>
            <ul className="space-y-2 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li className="text-[10px] text-slate-600 italic">Local Storage Only</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 text-center text-slate-600 text-xs">
          © 2026 OmniFlow.click. Built with ❤️ for the open web.
        </div>
      </footer>
    </div>
  );
};
