/** @type {import("snowpack").SnowpackUserConfig } */

import proxy from 'http2-proxy';

export default {
  mount: {
    // directory name: 'build directory'
    public: '/',
    src: '/dist',
  },
  plugins: [
    '@snowpack/plugin-svelte',
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
    // "bundle": true,
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
