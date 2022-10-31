interface GlobalConfig {
  api: {
    internalUrl: string;
    externalUrl: string;
  };
  staticUrl: string;
  contactEmail: string;
}

function getSsrConfig(): GlobalConfig {
  const sslEnabled = process.env.SSL_KEY && process.env.SSL_CERT;
  const schema = `http${sslEnabled ? 's' : ''}://`;
  return {
    api: {
      internalUrl: process.env.API_INTERNAL_URL || `${schema}localhost:3000`,
      externalUrl: process.env.API_EXTERNAL_URL || `${schema}localhost:3000`,
    },
    staticUrl: process.env.STATIC_URL || '',
    contactEmail: process.env.CONTACT_EMAIL,
  };
}

const isBrowser = typeof window !== 'undefined';

const globalConfig = isBrowser
  ? (window as any).__CONFIG__ as GlobalConfig // eslint-disable-line no-underscore-dangle
  : getSsrConfig();

export default {
  apiUrl: `${globalConfig.api[isBrowser ? 'externalUrl' : 'internalUrl']}/api/v1`,
  staticUrl: globalConfig.staticUrl,
  basePath: '/',
  contact: {
    email: globalConfig.contactEmail || 'l3xkrstn@gmail.com',
    linkedIn: 'https://www.linkedin.com/in/alexander-korostin/',
    github: 'https://github.com/lexkrstn',
  },
};
