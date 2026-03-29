"use client";

import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 p-6 md:p-20">
      <div className="max-w-3xl mx-auto space-y-12">
        <Link href="/" className="inline-flex items-center gap-2 text-[#38bdf8] hover:text-[#38bdf8]/80 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Retour au Dashboard
        </Link>

        <header className="space-y-4">
          <div className="w-12 h-12 rounded-xl bg-[#38bdf8]/10 flex items-center justify-center">
            <Shield className="w-6 h-6 text-[#38bdf8]" />
          </div>
          <h1 className="text-4xl font-bold text-white">Politique de Confidentialité</h1>
          <p className="text-slate-500 italic">Dernière mise à jour : 29 Mars 2026</p>
        </header>

        <section className="space-y-8 prose prose-invert max-w-none">
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white border-b border-white/5 pb-2">1. Collecte des Données</h2>
            <p className="leading-relaxed">
              OmniFlow est conçu avec une approche "Privacy-First". Nous collectons uniquement les informations strictement nécessaires au fonctionnement du service de multi-publication :
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Informations de profil public via OAuth (Nom, Email, Photo).</li>
              <li>Tokens d'accès temporaires pour publier en votre nom sur les réseaux sélectionnés.</li>
              <li>Contenus (textes, images, vidéos) que vous choisissez de propager.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white border-b border-white/5 pb-2">2. Utilisation des APIs Tierces</h2>
            <p className="leading-relaxed">
              Notre application utilise les services d'API officiels de Google (YouTube), Meta (Facebook, Instagram, Threads), TikTok, LinkedIn, X et Telegram. 
              En utilisant OmniFlow, vous acceptez également d'être lié par les conditions d'utilisation de ces plateformes respectives.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white border-b border-white/5 pb-2">3. Sécurité et Chiffrement</h2>
            <p className="leading-relaxed">
              Vos tokens d'accès sont chiffrés au repos et ne sont jamais partagés avec des tiers. Nous n'utilisons pas vos données pour l'entraînement de modèles d'IA tiers sans votre consentement explicite.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white border-b border-white/5 pb-2">4. Vos Droits</h2>
            <p className="leading-relaxed">
              Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Vous pouvez révoquer l'accès d'OmniFlow à tout moment via les paramètres de sécurité de vos réseaux sociaux respectifs.
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
