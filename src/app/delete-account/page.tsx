"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, ArrowLeft, AlertTriangle, Loader2, CheckCircle } from "lucide-react";

export default function DeleteAccount() {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    // Simulation de suppression
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsDeleting(false);
    setIsDeleted(true);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 p-6 md:p-20">
      <div className="max-w-3xl mx-auto space-y-12">
        <Link href="/" className="inline-flex items-center gap-2 text-[#38bdf8] hover:text-[#38bdf8]/80 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Retour au Dashboard
        </Link>

        <header className="space-y-4">
          <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
            <Trash2 className="w-6 h-6 text-red-500" />
          </div>
          <h1 className="text-4xl font-bold text-white">Supprimer mon compte</h1>
          <p className="text-slate-500">Demande de suppression définitive des données.</p>
        </header>

        <section className="bg-red-500/5 border border-red-500/10 rounded-2xl p-8 space-y-6">
          {isDeleted ? (
            <div className="text-center space-y-4 py-8">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              <h2 className="text-2xl font-bold text-white">Demande enregistrée</h2>
              <p className="text-slate-400">
                Votre compte et toutes les données associées seront supprimés sous 48 heures. 
                Vous allez être déconnecté.
              </p>
              <Link href="/" className="inline-block px-8 py-3 bg-white/5 rounded-xl font-bold hover:bg-white/10 transition-all">
                Retour à l'accueil
              </Link>
            </div>
          ) : (
            <>
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-6 h-6 text-red-500 shrink-0 mt-1" />
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-white">Action Irréversible</h2>
                  <p className="text-slate-400 leading-relaxed">
                    La suppression de votre compte OmniFlow entraînera la perte immédiate et définitive de :
                  </p>
                  <ul className="list-disc pl-6 space-y-1 text-slate-500 text-sm">
                    <li>Tous vos tokens d'accès aux réseaux sociaux.</li>
                    <li>Votre historique de publication.</li>
                    <li>Vos préférences et configurations personnalisées.</li>
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="w-full sm:w-auto px-8 py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-500 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Suppression...
                    </>
                  ) : (
                    "Confirmer la suppression"
                  )}
                </button>
                <Link href="/" className="w-full sm:w-auto px-8 py-4 bg-white/5 rounded-xl font-bold text-center hover:bg-white/10 transition-all">
                  Annuler
                </Link>
              </div>
            </>
          )}
        </section>

        <div className="prose prose-invert max-w-none text-sm text-slate-500">
          <p>
            Note : La suppression de votre compte OmniFlow ne révoque pas automatiquement les permissions sur les plateformes tierces (Google, Meta, etc.). 
            Nous vous recommandons de révoquer manuellement l'accès dans les paramètres de sécurité de chaque plateforme pour une sécurité maximale.
          </p>
        </div>
      </div>
    </div>
  );
}
