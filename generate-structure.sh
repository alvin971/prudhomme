#!/bin/bash

# Script de génération automatique de la structure du site web PRUDHOMME
# Exécuter avec: bash generate-structure.sh

echo "🚀 Génération de la structure du site web PRUDHOMME..."

# Créer les dossiers
mkdir -p app/chat
mkdir -p app/documents
mkdir -p app/auth/login
mkdir -p app/auth/register
mkdir -p app/profile
mkdir -p app/api/chat
mkdir -p app/api/webhooks
mkdir -p components/chat
mkdir -p components/documents
mkdir -p components/common
mkdir -p lib/services
mkdir -p lib/contexts
mkdir -p lib/hooks
mkdir -p lib/utils
mkdir -p public/images
mkdir -p public/icons
mkdir -p public/logos

echo "📁 Dossiers créés avec succès !"

# Note: Les fichiers TypeScript/React doivent être créés manuellement
# ou via un outil de génération de code pour éviter les erreurs de syntaxe

echo ""
echo "✅ Structure de base créée !"
echo ""
echo "📝 Prochaines étapes :"
echo "1. Installer les dépendances : npm install"
echo "2. Créer le fichier .env.local avec vos clés API"
echo "3. Consulter INSTALLATION_GUIDE.md pour les fichiers à créer"
echo "4. Lancer l'app : npm run dev"
echo ""
echo "🎯 Tous les prompts IA sont IDENTIQUES à l'app mobile Flutter !"
