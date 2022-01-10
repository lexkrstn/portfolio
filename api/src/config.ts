export interface ContactConfig {
  email: string;
  subject: string;
}

export interface DatabaseConfig {
  host: string;
  port: number;
}

export interface MailerConfig {
  host: string,
  port: number,
  secure: boolean,
  auth: {
    user: string,
    pass: string,
  },
}

export interface Config {
  port: number;
  contact: ContactConfig,
  database: DatabaseConfig;
  mailer: MailerConfig
}

export default (): Config => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  contact: {
    email: process.env.CONTACT_EMAIL || 'lexkrstn@gmail.com',
    subject: 'A message from portfolio visitor',
  },
  database: {
    host: process.env.DATABASE_HOST,
    port: parseInt(process.env.DATABASE_PORT, 10) || 5432,
  },
  mailer: {
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false, // true for 465, false for 587
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  },
});
