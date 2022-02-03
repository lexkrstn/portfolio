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
  port?: number,
  secure: boolean,
  auth: {
    user: string,
    pass: string,
  },
  tls?: {
    ciphers: string,
  },
}

export interface Config {
  host: string;
  port: number;
  contact: ContactConfig,
  database: DatabaseConfig;
  mailer: MailerConfig
}

function makeDatabaseConfig(): DatabaseConfig {
  const defaultPort = 27017;
  const host = process.env.DB_HOST || 'localhost';
  const port = parseInt(process.env.DB_PORT, 10) || defaultPort;
  const user = process.env.DB_USER || '';
  const password = process.env.DB_PASSWORD || '';
  const userPassword = user && password ? `${user}:${password}@` : '';
  const portPostfix = port !== defaultPort ? `:${port}` : '';
  const uri = `mongodb://${userPassword}${host}${portPostfix}`;
  const name = process.env.DB_NAME || (TEST ? 'portfolio_test' : 'portfolio');
  return { host, port, user, password, name, uri };
}

export default (): Config => ({
  host: process.env.API_HOST || '0.0.0.0',
  port: parseInt(process.env.API_PORT, 10) || 3000,
  contact: {
    email: process.env.CONTACT_EMAIL || 'lexkrstn@gmail.com',
    subject: 'A message from portfolio visitor',
  },
  database: makeDatabaseConfig(),
  mailer: {
    host: 'smtp.gmail.com',
    secure: false, // true for 465, false for 587
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD,
    },
    tls: {
      ciphers: 'SSLv3',
    },
  },
});
