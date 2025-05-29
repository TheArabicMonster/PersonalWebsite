#!/bin/bash

echo "🔧 Configuration du déploiement automatique Git"

VPS_IP="57.129.65.94"
VPS_USER="ubuntu"
VPS_PASSWORD="LeC0usC0usDeBigDudin"

echo "📡 Configuration du repository Git sur le VPS..."

# Créer le script de configuration à exécuter sur le VPS
cat > /tmp/vps-git-setup.sh << 'EOF'
#!/bin/bash

# Créer le repository bare sur le VPS
sudo mkdir -p /var/repo/mateenk.git
cd /var/repo/mateenk.git
sudo git init --bare
sudo chown -R ubuntu:ubuntu /var/repo/mateenk.git

# Créer le hook post-receive
cat > hooks/post-receive << 'HOOK_EOF'
#!/bin/bash

echo "🚀 Déploiement automatique démarré..."

# Variables
REPO_DIR="/var/repo/mateenk.git"
WORK_DIR="/var/www/mateenk.ch"
TEMP_DIR="/tmp/deploy-$(date +%s)"

# Créer un dossier temporaire pour le checkout
mkdir -p $TEMP_DIR
cd $TEMP_DIR

# Checkout du code depuis le repository
git --git-dir=$REPO_DIR --work-tree=$TEMP_DIR checkout -f

echo "📦 Build du projet..."

# Build du projet
npm ci --production=false
npm run build

echo "🔄 Mise à jour du site..."

# Arrêter l'application
pm2 stop mateen-portfolio 2>/dev/null || true

# Backup de l'ancien .env
sudo cp $WORK_DIR/.env /tmp/.env.backup 2>/dev/null || true

# Copier les nouveaux fichiers
sudo rm -rf $WORK_DIR/*
sudo cp -r dist/* $WORK_DIR/
sudo cp ecosystem.config.js $WORK_DIR/
sudo cp package.json $WORK_DIR/

# Restaurer le .env
sudo cp /tmp/.env.backup $WORK_DIR/.env 2>/dev/null || true

# Corriger les permissions
sudo chown -R ubuntu:ubuntu $WORK_DIR/

# Installer les dépendances de production
cd $WORK_DIR
npm install --omit=dev

# Redémarrer l'application
pm2 start ecosystem.config.js --env production
pm2 save

# Nettoyer
rm -rf $TEMP_DIR

echo "✅ Déploiement terminé avec succès!"
echo "🌐 Site mis à jour sur: http://57.129.65.94"

HOOK_EOF

# Rendre le hook exécutable
chmod +x hooks/post-receive

echo "✅ Repository Git configuré sur le VPS"
echo "📍 Repository: /var/repo/mateenk.git"
EOF

# Transférer et exécuter le script sur le VPS
sshpass -p "$VPS_PASSWORD" scp /tmp/vps-git-setup.sh $VPS_USER@$VPS_IP:/tmp/
sshpass -p "$VPS_PASSWORD" ssh $VPS_USER@$VPS_IP "chmod +x /tmp/vps-git-setup.sh && /tmp/vps-git-setup.sh"

echo "🔗 Ajout du remote Git..."

# Ajouter le remote git sur votre machine locale
git remote remove production 2>/dev/null || true
git remote add production ubuntu@$VPS_IP:/var/repo/mateenk.git

echo "✅ Configuration terminée!"
echo ""
echo "🚀 Utilisation:"
echo "   git push production main    # Déploie automatiquement"
echo ""
echo "📋 Pour configurer la clé SSH (optionnel mais recommandé):"
echo "   ssh-keygen -t rsa -b 4096 -C 'deploy@mateenk.ch'"
echo "   ssh-copy-id ubuntu@$VPS_IP"

# Nettoyer
rm -f /tmp/vps-git-setup.sh
