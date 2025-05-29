#!/bin/bash

echo "🔗 Configuration du webhook de déploiement"

# Créer un endpoint webhook sur le VPS
cat > webhook-server.js << 'EOF'
const express = require('express');
const { exec } = require('child_process');
const crypto = require('crypto');

const app = express();
const PORT = 3001;
const SECRET = 'mateenk-deploy-secret-2025';

app.use(express.json());

// Endpoint webhook
app.post('/deploy', (req, res) => {
    console.log('🔔 Webhook reçu:', new Date().toISOString());
    
    // Vérification simple du secret (optionnel)
    const signature = req.headers['x-hub-signature-256'];
    if (signature) {
        const hmac = crypto.createHmac('sha256', SECRET);
        const digest = 'sha256=' + hmac.update(JSON.stringify(req.body)).digest('hex');
        
        if (signature !== digest) {
            return res.status(401).send('Unauthorized');
        }
    }
    
    console.log('🚀 Démarrage du déploiement...');
    
    // Script de déploiement
    const deployScript = `
        cd /var/www/mateenk.ch &&
        git pull origin main &&
        npm install --omit=dev &&
        npm run build &&
        pm2 restart mateen-portfolio &&
        echo "✅ Déploiement terminé!"
    `;
    
    exec(deployScript, (error, stdout, stderr) => {
        if (error) {
            console.error('❌ Erreur de déploiement:', error);
            return res.status(500).json({ 
                status: 'error', 
                message: error.message 
            });
        }
        
        console.log('✅ Déploiement réussi:', stdout);
        res.json({ 
            status: 'success', 
            message: 'Deployment completed',
            output: stdout 
        });
    });
});

// Status endpoint
app.get('/status', (req, res) => {
    res.json({ 
        status: 'active', 
        timestamp: new Date().toISOString(),
        server: 'mateenk.ch webhook'
    });
});

app.listen(PORT, () => {
    console.log(`🎣 Webhook server running on port ${PORT}`);
    console.log(`📡 Endpoint: http://localhost:${PORT}/deploy`);
});
EOF

echo "📡 Serveur webhook créé"
