const https = !!parseInt(process.env.HTTPS, 10);
const scheme = `http${https ? 's' : ''}`;
const port = parseInt(process.env.PORT, 10);

export default {
  accessTokenLife: 7 * 24 * 60 * 60,
  accessTokenName: 'accessToken',
  apiUrl: `${process.env.API_URL}/api/v1`,
  debug: ['dev', 'development'].includes(process.env.NODE_ENV),
  prefetchTimeout: 5000,
  url: `${scheme}://${process.env.DOMAIN}${port === 80 ? '' : ':' + port}`,
};
