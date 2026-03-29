"use client";

import Link from "next/link";
import { Layers, ArrowLeft } from "lucide-react";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 p-6 md:p-20">
      <div className="max-w-3xl mx-auto space-y-12">
        <Link href="/" className="inline-flex items-center gap-2 text-[#38bdf8] hover:text-[#38bdf8]/80 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Retour au Dashboard
        </Link>

        <header className="space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#38bdf8]/10 flex items-center justify-center">
            <Layers className="w-6 h-6 text-[#38bdf8]" />
          </div>
          <h1 className="text-4xl font-bold text-white">Conditions d'Utilisation</h1>
          <p className="text-slate-500 italic">Dernière mise à jour : 29 Mars 2026</p>
        </header>

        <section className="space-y-8 prose prose-invert max-w-none">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white border-b border-white/5 pb-2">1. Acceptation des Conditions</h2>
            <p className="leading-relaxed">
              En accédant à OmniFlow, vous acceptez d'être lié par ces conditions d'utilisation et par toutes les lois et réglementations applicables. 
              Si vous n'êtes pas d'accord avec l'une de ces conditions, il vous est interdit d'utiliser ou d'accéder à ce site.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white border-b border-white/5 pb-2">2. Utilisation Autorisée</h2>
            <p className="leading-relaxed">
              OmniFlow est un outil de multi-publication. Vous êtes seul responsable du contenu que vous publiez via notre plateforme. 
              Vous vous engagez à ne pas utiliser OmniFlow pour diffuser du contenu illégal, haineux, ou violant les droits de propriété intellectuelle de tiers.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white border-b border-white/5 pb-2">3. Limitation de Responsabilité</h2>
            <p className="leading-relaxed">
              OmniFlow est fourni "en l'état". Nous ne donnons aucune garantie, expresse ou implicite, et déclinons par la présente toute autre garantie, y compris, sans s'y limiter, les garanties implicites ou les conditions de qualité marchande ou d'adéquation à un usage particulier.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white border-b border-white/5 pb-2">4. Modifications</h2>
            <p className="leading-relaxed">
              Nous nous réservons le droit de modifier ces conditions à tout moment sans préavis. En utilisant ce site web, vous acceptez d'être lié par la version alors en vigueur de ces conditions d'utilisation.
            </p>
          </div>
        </section>

        <footer className="pt-12 border-t border-white/5 text-center text-slate-600 text-xs">
          © 2026 OmniFlow Studio - Tous droits réservés.
        </footer>
      </div>
    </div>
  );
}
