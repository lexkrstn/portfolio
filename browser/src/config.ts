const https = !!parseInt(process.env.HTTPS, 10);
const scheme = `http${https ? 's' : ''}`;
const domain = process.env.DOMAIN || 'localhost';
const port = parseInt(process.env.PORT, 10);

export default {
  accessTokenLife: 7 * 24 * 60 * 60,
  accessTokenName: 'accessToken',
  apiUrl: `${process.env.API_URL || 'http://localhost:3000'}/api/v1`,
  basePath: '/',
  contact: {
    email: 'lexkrstn@gmail.com',
  },
  debug: ['dev', 'development'].includes(process.env.NODE_ENV),
  prefetchTimeout: 5000,
  url: `${scheme}://${domain}${port === 80 || port === 443 ? '' : `:${port}`}`,
};
