# 🌐 PRUDHOMME - Version Web

Application web complète qui reproduit toutes les fonctionnalités de l'app mobile Flutter.

## 🚀 Démarrage Rapide (Mode Test)

Le site s'ouvre **directement sur la page de conversation** sans authentification requise!

```bash
cd "/Users/alvinkuyo/Downloads/PRUDHOMME/site web"
npm run dev
```

Puis ouvrez **http://localhost:3000** - vous êtes automatiquement redirigé vers `/chat`.

### Mode Test Activé

- ✅ **Aucune authentification requise**
- ✅ **Redirection automatique vers /chat**
- ✅ **Documents stockés en localStorage** (pas de base de données nécessaire)
- ✅ **Tout fonctionne sans Firebase configuré**
- ⚠️ Les documents sont sauvegardés dans le navigateur et seront perdus si vous videz le cache

### Pour activer l'authentification normale

Décommentez les lignes marquées `// MODE TEST` dans:
- `app/page.tsx` (ligne 9-11)
- `app/chat/page.tsx` (lignes 31-36, 143-144, 103-122)
- `app/documents/page.tsx` (lignes 24-29, 101-106)

## 📋 Fonctionnalités Implémentées

### ✅ Authentification
- Connexion / Inscription avec Firebase Auth
- Google Sign-In
- Gestion de session
- Profil utilisateur

### ✅ Chat IA Juridique
- Interface de chat en temps réel
- Intégration API Anthropic Claude
- **Prompts identiques à l'app mobile** (collecte intelligente + génération expert)
- Détection automatique du type de document
- Historique des conversations
- Animation d'écriture (typewriter effect)

### ✅ Génération de Documents
- Génération PDF avec jsPDF
- Documents avec placeholders {{NOM_EXPEDITEUR}}, etc.
- Sauvegarde automatique dans "Mes Documents"
- Téléchargement PDF

### ✅ Mes Documents
- Liste de tous les documents générés
- Bouton **"Remplir"** → Formulaire intelligent adaptatif
- Bouton **"Télécharger"** → Télécharge le PDF
- Bouton VERT **"Finalisation par avocat - 99,99€"**
- Badges de statut (pending / in_review / completed)

### ✅ Formulaire Intelligent de Placeholders
- Détection automatique des placeholders dans le document
- Champs adaptatifs selon le type (email, téléphone, code postal)
- Validation intelligente
- Icônes et organisation par sections (Expéditeur / Destinataire)
- Génération d'un nouveau PDF rempli

### ✅ Révision par Avocat (Paiement)
- **Stripe Checkout** pour paiement de 99,99€
- Dialog de confirmation professionnelle
- Soumission du document au portail avocat
- Suivi du statut de révision
- Remboursement si avocat refuse

### ✅ Reconnaissance Vocale
- Bouton microphone dans le chat
- Dictée vocale en français
- Transcription en temps réel
- Support Web Speech API

## 🗂️ Structure du Projet

```
site web/
├── app/                          # Pages Next.js 14 (App Router)
│   ├── layout.tsx                # Layout principal
│   ├── page.tsx                  # Page d'accueil
│   ├── globals.css               # Styles globaux Tailwind
│   ├── auth/
│   │   ├── login/page.tsx        # Page de connexion
│   │   └── register/page.tsx     # Page d'inscription
│   ├── chat/page.tsx             # Page de chat IA
│   ├── documents/page.tsx        # Page "Mes Documents"
│   └── profile/page.tsx          # Page de profil
│
├── components/                   # Composants réutilisables
│   ├── Navbar.tsx                # Barre de navigation
│   ├── Footer.tsx                # Pied de page
│   ├── chat/
│   │   ├── ChatInterface.tsx     # Interface de chat
│   │   ├── MessageBubble.tsx     # Bulle de message
│   │   └── MicrophoneButton.tsx  # Bouton micro avec reconnaissance vocale
│   ├── documents/
│   │   ├── DocumentCard.tsx      # Carte de document
│   │   ├── PlaceholderFormDialog.tsx  # Formulaire intelligent
│   │   └── LawyerReviewDialog.tsx     # Dialog révision avocat
│   └── common/
│       ├── Button.tsx
│       ├── Input.tsx
│       └── Loader.tsx
│
├── lib/                          # Logique métier et utilitaires
│   ├── firebase.ts               # Configuration Firebase
│   ├── services/
│   │   ├── anthropicService.ts   # Service API Anthropic
│   │   ├── documentService.ts    # Génération PDF et gestion documents
│   │   ├── lawyerReviewService.ts # Service révision avocat
│   │   └── stripeService.ts      # Service paiement Stripe
│   ├── contexts/
│   │   ├── AuthContext.tsx       # Context d'authentification
│   │   └── DocumentsContext.tsx  # Context documents
│   ├── hooks/
│   │   ├── useAuth.ts            # Hook d'authentification
│   │   ├── useDocuments.ts       # Hook documents
│   │   └── useSpeechRecognition.ts # Hook reconnaissance vocale
│   └── utils/
│       ├── prompts.ts            # Prompts IA (identiques à l'app mobile)
│       └── pdfGenerator.ts       # Génération PDF
│
├── public/                       # Assets statiques
│   ├── images/
│   ├── icons/
│   └── logos/
│
├── package.json                  # Dépendances
├── tsconfig.json                 # Configuration TypeScript
├── tailwind.config.js            # Configuration Tailwind
├── next.config.js                # Configuration Next.js
└── .env.local.example            # Variables d'environnement (exemple)
```

## 🚀 Installation

### 1. Installer les dépendances

```bash
cd "site web"
npm install
```

### 2. Configurer les variables d'environnement

Créer un fichier `.env.local` à la racine :

```env
# Firebase
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Anthropic
NEXT_PUBLIC_ANTHROPIC_API_KEY=sk-ant-api03-YOUR_KEY

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY
STRIPE_SECRET_KEY=sk_test_YOUR_KEY

# Portail Avocat
NEXT_PUBLIC_LAWYER_PORTAL_URL=https://your-portal-url.com/api
```

### 3. Lancer le serveur de développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## 📦 Technologies Utilisées

- **Next.js 14** - Framework React avec App Router
- **TypeScript** - Typage statique
- **Tailwind CSS** - Styles utilitaires
- **Firebase** - Authentification et base de données
- **Anthropic Claude API** - Intelligence artificielle juridique
- **jsPDF** - Génération de PDF côté client
- **Stripe** - Paiement pour révision avocat (alternative à In-App Purchase iOS)
- **Web Speech API** - Reconnaissance vocale
- **Zustand** - Gestion d'état légère

## 🎯 Différences avec l'App Mobile

### ✅ Identique
- Prompts IA (collecte + génération) - **100% identiques**
- Flow de génération de documents
- Formulaire intelligent de placeholders
- Système de révision avocat
- Interface utilisateur (reproduite fidèlement)

### 🔄 Adaptations Web
- **Paiement** : Stripe au lieu de In-App Purchase Apple
- **Stockage** : Firebase Firestore au lieu de SharedPreferences local
- **PDF** : jsPDF (client-side) au lieu de la librairie Flutter PDF
- **Reconnaissance vocale** : Web Speech API au lieu de speech_to_text
- **Navigation** : Next.js App Router au lieu de Flutter Navigator

## 💳 Paiement Stripe (Révision Avocat)

### Configuration Stripe

1. **Créer un compte** sur [stripe.com](https://stripe.com)

2. **Créer un produit** :
   - Nom : "Finalisation par Avocat Professionnel"
   - Prix : 99,99€
   - Type : Paiement unique (one-time payment)

3. **Récupérer les clés** :
   - Publishable key → `.env.local`
   - Secret key → `.env.local`

### Flow de paiement

1. Utilisateur clique sur "Finalisation par avocat - 99,99€"
2. Dialog de confirmation s'affiche
3. Clic sur "Acheter" → Redirection vers Stripe Checkout
4. Paiement validé → Webhook Stripe notifie le backend
5. Document envoyé au portail avocat
6. Statut mis à jour : "En attente de révision"

### Webhooks Stripe

Créer un endpoint `/api/webhooks/stripe` pour écouter :
- `checkout.session.completed` - Paiement réussi
- `charge.refunded` - Remboursement (si avocat refuse)

## 🔐 Sécurité

### Règles Firebase Security

```javascript
// Firestore Security Rules
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }

    // Documents collection
    match /documents/{documentId} {
      allow read, write: if request.auth != null && resource.data.userId == request.auth.uid;
    }
  }
}
```

### Protection API

- Clés API dans variables d'environnement (jamais exposées côté client)
- Appels API Anthropic via route API Next.js (`/api/chat`) pour cacher la clé
- Validation des tokens Firebase côté serveur
- HTTPS obligatoire en production

## 🌍 Déploiement

### Option 1 : Vercel (Recommandé - Next.js)

```bash
npm install -g vercel
vercel login
vercel
```

- Gratuit jusqu'à 100GB de bande passante
- HTTPS automatique
- Déploiement instantané
- Variables d'environnement dans le dashboard

### Option 2 : Netlify

```bash
npm run build
netlify deploy --prod
```

### Option 3 : Serveur personnel (VPS)

```bash
npm run build
npm start
```

Avec Nginx reverse proxy + PM2 pour la gestion de processus.

## 📱 Responsive Design

L'interface s'adapte à tous les écrans :
- **Mobile** : Navigation bottom bar
- **Tablet** : Sidebar pliable
- **Desktop** : Sidebar toujours visible

## 🧪 Tests

### Tests unitaires

```bash
npm run test
```

### Tests E2E (Playwright)

```bash
npx playwright test
```

## 🔄 Synchronisation avec l'App Mobile

Si l'utilisateur utilise à la fois l'app mobile et le web :
- Les documents sont synchronisés via Firebase
- L'authentification est partagée
- L'historique de chat est centralisé

## 📞 Support et Maintenance

### Logs et Monitoring

- **Vercel Analytics** pour les métriques web
- **Firebase Console** pour les erreurs auth
- **Stripe Dashboard** pour les paiements
- **Sentry** (optionnel) pour le tracking d'erreurs

### Mises à jour

1. App mobile : Via App Store / Google Play
2. Web : Déploiement automatique sur commit Git (Vercel)

## 🎨 Personnalisation

### Couleurs

Modifier dans `tailwind.config.js` :

```javascript
theme: {
  extend: {
    colors: {
      primary: '#1976D2',    // Bleu principal
      secondary: '#424242',  // Gris
      accent: '#FFC107',     // Jaune
    },
  },
}
```

### Logo

Remplacer les fichiers dans `public/logos/`

## 🚨 Points Critiques

1. **NEVER exposer les clés API** côté client (utiliser routes API Next.js)
2. **Toujours valider** les inputs utilisateur
3. **Chiffrer** les données sensibles avant stockage
4. **RGPD** : Permettre suppression des données
5. **Rate limiting** sur les appels API (éviter abus)

## 📚 Ressources

- [Next.js Documentation](https://nextjs.org/docs)
- [Firebase Web SDK](https://firebase.google.com/docs/web/setup)
- [Stripe Checkout](https://stripe.com/docs/payments/checkout)
- [Anthropic API](https://docs.anthropic.com/)
- [Tailwind CSS](https://tailwindcss.com/docs)

---

## 💡 Prochaines Étapes

1. **Installer les dépendances** : `npm install`
2. **Configurer Firebase** : Créer projet + copier config
3. **Configurer Stripe** : Créer produit + copier clés
4. **Lancer en dev** : `npm run dev`
5. **Tester toutes les fonctionnalités**
6. **Déployer sur Vercel** : `vercel`

---

**Version** : 1.0.0
**Dernière mise à jour** : Janvier 2026
**Auteur** : PRUDHOMME Team
