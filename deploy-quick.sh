#!/bin/bash

echo "🚀 Déploiement rapide sur mateenk.ch"

# Vérifier s'il y a des changements non commités
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Changements détectés, commit automatique..."
    git add .
    git commit -m "Auto-deploy: $(date '+%Y-%m-%d %H:%M:%S')"
fi

echo "📤 Push vers production..."
git push production main

echo "✅ Déploiement lancé!"
echo "🌐 Votre site sera mis à jour dans quelques secondes sur http://57.129.65.94"
