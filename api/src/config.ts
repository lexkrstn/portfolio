const TEST = process.env.NODE_ENV === 'test';

function makeDatabaseConfig() {
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

const getConfig = () => ({
  host: process.env.API_HOST || '0.0.0.0',
  port: parseInt(process.env.API_PORT, 10) || 3000,
  cache: {
    ttl: parseInt(process.env.CACHE_TTL, 10) || 60 * 60 * 24, // seconds
  },
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

export type Config = ReturnType<typeof getConfig>;
export type MailerConfig = Config['mailer'];
export type DatabaseConfig = Config['database'];
export type ContactConfig = Config['contact'];

export default getConfig;
