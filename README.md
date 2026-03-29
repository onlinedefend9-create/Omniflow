# 🚀 OmniPost - Studio de Contenu Omni-Canal

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**OmniPost** est un outil open-source conçu pour les créateurs de contenu qui souhaitent maximiser leur portée sans effort. Écrivez une légende "Master", uploadez un média, et laissez l'IA (Gemini) adapter votre contenu pour chaque réseau social (LinkedIn, TikTok, X, Instagram, etc.) en un seul clic.

---

## ✨ Features

- **One-Click Publish** : Adaptez et publiez instantanément sur LinkedIn, TikTok et X.
- **AI-Powered Variations** : Utilise Google Gemini pour réécrire vos posts selon les codes de chaque plateforme.
- **Privacy-First** : Vos tokens OAuth sont stockés localement dans votre navigateur. Aucune donnée sensible n'est conservée sur nos serveurs.
- **Open-Source & Modulaire** : Facile à cloner, à modifier et à déployer.
- **AdSense Ready** : Emplacements publicitaires intégrés pour monétiser votre propre instance.

---

## 🛠 Tech Stack

- **Frontend** : React 19, Vite, Tailwind CSS, Motion (Framer Motion).
- **Backend** : Node.js, Express (Proxy OAuth).
- **AI** : Google Gemini SDK (`@google/genai`).
- **State Management** : Zustand (avec persistance locale).

---

## 🚀 How to Setup

### 1. Cloner le projet
```bash
git clone https://github.com/votre-repo/omnipost.git
cd omnipost
```

### 2. Installer les dépendances
```bash
npm install
```

### 3. Configurer les variables d'environnement
Copiez le fichier `.env.example` vers `.env` et remplissez les clés nécessaires :
```bash
cp .env.example .env
```

**Variables requises :**
- `GEMINI_API_KEY` : Votre clé API Google AI Studio.
- `LINKEDIN_CLIENT_ID` / `LINKEDIN_CLIENT_SECRET` : Identifiants LinkedIn Dev.
- `TIKTOK_CLIENT_ID` / `TIKTOK_CLIENT_SECRET` : Identifiants TikTok Dev.
- `X_CLIENT_ID` / `X_CLIENT_SECRET` : Identifiants X (Twitter) Dev.
- `APP_URL` : L'URL de votre application (ex: `http://localhost:3000`).

### 4. Lancer en mode développement
```bash
npm run dev
```

---

## 🗺 Roadmap

- [ ] **Instagram Direct** : Publication directe sur le flux et les Reels.
- [ ] **YouTube Shorts** : Support pour l'upload de vidéos courtes.
- [ ] **Scheduling** : Planification des posts à l'avance.
- [ ] **Analytics Dashboard** : Suivi des performances multi-plateformes.

---

## 📄 License

Distribué sous la licence MIT. Voir `LICENSE` pour plus d'informations.

---

## 🤝 Contribuer

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une Issue ou une Pull Request.

---

*Fait avec ❤️ par la communauté OmniPost.*
