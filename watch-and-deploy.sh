#!/bin/bash

echo "👁️ Surveillance des changements de fichiers"
echo "📁 Dossier surveillé: $(pwd)"
echo "🔄 Appuyez sur Ctrl+C pour arrêter"

# Installer inotify-tools si nécessaire
if ! command -v inotifywait &> /dev/null; then
    echo "📦 Installation d'inotify-tools..."
    sudo apt install inotify-tools -y
fi

# Fonction de déploiement
deploy() {
    echo ""
    echo "🔄 Changements détectés à $(date '+%H:%M:%S')"
    echo "🚀 Déploiement automatique..."
    
    # Commit automatique
    git add .
    git commit -m "Auto-deploy: $(date '+%Y-%m-%d %H:%M:%S')" 2>/dev/null || true
    
    # Push vers production
    git push production main
    
    echo "✅ Déploiement lancé!"
    echo "👁️ Surveillance continue..."
}

# Surveillance des changements
inotifywait -m -r -e modify,create,delete,move \
    --exclude '(\.git|node_modules|dist|\.log|\.tmp)' \
    . | while read path action file; do
    
    # Ignorer les fichiers temporaires
    if [[ "$file" =~ \.(swp|tmp|log)$ ]]; then
        continue
    fi
    
    # Déployer après un délai pour éviter les déploiements multiples
    sleep 2
    deploy &
done
