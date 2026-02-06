module.exports = {
    apps: [
      {
        name: "portfolio-api-prod",
        script: './dist/api.js',
        cwd: ".",
        instances: 1,
        exec_mode: "cluster",
        max_memory_restart: "200M",
        env: {
          API_PORT: 3201,
          API_HOST: "127.0.0.1",
          NODE_ENV: "production",
        },
      },
      {
        name: "portfolio-ssr-prod",
        script: './dist/ssr.js',
        cwd: ".",
        instances: 1,
        exec_mode: "cluster",
        max_memory_restart: "200M",
        env: {
          API_INTERNAL_URL: "http://127.0.0.1:3201",
          API_EXTERNAL_URL: "https://akorostin.com",
          STATIC_URL: "https://static.akorostin.com",
          NODE_ENV: "production",
        },
      },
    ],
  };