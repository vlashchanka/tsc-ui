import proxy from 'http2-proxy';

/** @type {import("snowpack").SnowpackUserConfig } */
export default {
  mount: {
    public: { url: '/', static: true },
    src: { url: '/dist' },
  },
  plugins: [
    '@prefresh/snowpack',
    '@snowpack/plugin-dotenv',
    [
      '@snowpack/plugin-typescript',
    ],
  ],
  routes: [
    /* Get messages from development server: */
    {"match": "routes", "src": "/messages", dest: (req, res) => {
        return proxy.web(req, res, {
          hostname: 'localhost',
          port: 3000,
        });
      },},
    /* Enable an SPA Fallback in development: */
    {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    "bundle": true,
    "minify": true,
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
};
