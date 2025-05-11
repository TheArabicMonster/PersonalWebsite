import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config();

// Type pour les données du contact
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Créer un transporteur d'email réutilisable avec la configuration SMTP d'Infomaniak
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Fonction pour envoyer un email
export async function sendContactEmail(data: ContactFormData): Promise<void> {
  const { name, email, subject, message } = data;
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_TO,
    replyTo: email,
    subject: `Contact Website: ${subject}`,
    text: `
      Nom: ${name}
      Email: ${email}
      
      Message:
      ${message}
    `,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
        <h2>Nouveau message du site web</h2>
        <p><strong>Nom:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Sujet:</strong> ${subject}</p>
        <hr style="border: 1px solid #eee; margin: 15px 0;">
        <div>
          <strong>Message:</strong>
          <p style="white-space: pre-line;">${message}</p>
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email envoyé avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    throw error;
  }
}