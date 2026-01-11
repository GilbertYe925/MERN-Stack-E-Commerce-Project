import nodemailer from 'nodemailer';

// Validate email configuration
const validateEmailConfig = () => {
    // For standard SMTP (Gmail, Outlook, Resend, SendGrid, custom SMTP)
    const required = ['SMTP_USER', 'SMTP_PASS'];
    const missing = required.filter(key => !process.env[key]);
    
    if (missing.length > 0) {
        throw new Error(`Missing required email configuration: ${missing.join(', ')}`);
    }
};

// Create transporter based on environment
const createTransporter = () => {
    // Standard SMTP configuration (works for Gmail, Outlook, Resend, SendGrid, custom SMTP)
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || 'smtp.gmail.com',
        port: parseInt(process.env.SMTP_PORT || '587'),
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
        // Production best practices
        pool: true, // Use connection pooling for better performance
        maxConnections: 5,
        maxMessages: 100,
        rateDelta: 1000, // Rate limit protection
        rateLimit: 14, // Max 14 emails per second
    });
};

const sendEmail = async (to: string, subject: string, html: string, text?: string) => {
    try {
        // Validate configuration
        validateEmailConfig();

        // Create transporter
        const transporter = createTransporter();

        // Verify connection (only in development for debugging)
        if (process.env.NODE_ENV !== 'production') {
            await transporter.verify();
            console.log('Email server connection verified');
        }

        const mailOptions = {
            from: process.env.SMTP_FROM || process.env.SMTP_USER,
            to,
            subject,
            html,
            text: text || html.replace(/<[^>]*>/g, ''), // Strip HTML for plain text version
            // Production headers
            headers: {
                'X-Priority': '1',
                'X-MSMail-Priority': 'High',
            },
        };

        const info = await transporter.sendMail(mailOptions);
        
        // Log email ID in production (not full info for security)
        if (process.env.NODE_ENV === 'production') {
            console.log(`Email sent successfully to ${to} [Message ID: ${info.messageId}]`);
        }
        
        return info;
    } catch (error: any) {
        // Enhanced error logging
        console.error('Error sending email:', {
            to,
            subject,
            error: error.message,
            code: error.code,
            responseCode: error.responseCode,
        });
        
        // Don't expose sensitive error details in production
        if (process.env.NODE_ENV === 'production') {
            throw new Error('Failed to send email. Please try again later.');
        }
        
        throw error;
    }
};

export default sendEmail;
