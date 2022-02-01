interface GlobalConfig {
  api: {
    internalUrl: string,
    externalUrl: string,
  },
}

function getSsrConfig(): GlobalConfig {
  const sslEnabled = process.env.SSL_KEY && process.env.SSL_CERT;
  const schema = `http${sslEnabled ? 's' : ''}://`;
  return {
    api: {
      internalUrl: process.env.API_INTERNAL_URL || `${schema}localhost:3000`,
      externalUrl: process.env.API_EXTERNAL_URL || `${schema}localhost:3000`,
    },
  };
}

const isBrowser = typeof window !== 'undefined';

const globalConfig = isBrowser
  ? (window as any).__CONFIG__ as GlobalConfig // eslint-disable-line no-underscore-dangle
  : getSsrConfig();

export default {
  apiUrl: `${globalConfig.api[isBrowser ? 'externalUrl' : 'internalUrl']}/api/v1`,
  basePath: '/',
  contact: {
    email: 'lexkrstn@gmail.com',
  },
};
