const sslEnabled = process.env.SSL_KEY && process.env.SSL_CERT;
const schema = `http${sslEnabled ? 's' : ''}://`;

export default {
  site: {
    name: 'Portfolio',
  },
  host: process.env.SSR_HOST || '0.0.0.0',
  port: parseInt(process.env.SSR_PORT, 10) || 8080,
  ssl: {
    enabled: sslEnabled,
    keyPath: process.env.SSL_KEY,
    certPath: process.env.SSL_CERT,
  },
  api: {
    internalUrl: process.env.API_INTERNAL_URL || `${schema}localhost:3000`,
    externalUrl: process.env.API_EXTERNAL_URL || `${schema}localhost:3000`,
  },
  browser: {
    usesConfigs: [
      'api.internalUrl',
      'api.externalUrl',
    ],
  },
};
