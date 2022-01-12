const TEST = process.env.NODE_ENV === 'test';

export interface ContactConfig {
  email: string;
  subject: string;
}

export interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  name: string;
  uri: string;
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

function makeDatabaseConfig(): DatabaseConfig {
  const defaultPort = 27017;
  const host = process.env.DATABASE_HOST || 'localhost';
  const port = parseInt(process.env.DATABASE_PORT, 10) || defaultPort;
  const user = process.env.DATABASE_USER || '';
  const password = process.env.DATABASE_PASSWORD || '';
  const userPassword = user && password ? `${user}:${password}@` : '';
  const portPostfix = port !== defaultPort ? `:${port}` : '';
  const uri = `mongodb://${userPassword}${host}${portPostfix}`;
  const name = process.env.DATABASE_NAME || (TEST ? 'portfolio_test' : 'portfolio');
  return { host, port, user, password, name, uri };
}

export default (): Config => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  contact: {
    email: process.env.CONTACT_EMAIL || 'lexkrstn@gmail.com',
    subject: 'A message from portfolio visitor',
  },
  database: makeDatabaseConfig(),
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
