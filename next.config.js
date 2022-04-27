module.exports = {
  reactStrictMode: true,
  optimizeFonts: false,
  async rewrites() {
    return [
      {
        source: '/:id/owned',
        destination: '/:id'
      },
      {
        source: '/:id/sales',
        destination: '/:id'
      },
      {
        source: '/:id/activity',
        destination: '/:id'
      },

      {
        source: '/pkh/:id/owned',
        destination: '/pkh/:id/'
      },
      {
        source: '/pkh/:id/sales',
        destination: '/pkh/:id/'
      },
      {
        source: '/pkh/:id/activity',
        destination: '/pkh/:id/'
      },

      {
        source: '/token/:id/assets',
        destination: '/token/:id'
      },
      {
        source: '/token/:id/activity',
        destination: '/token/:id'
      },
      {
        source: '/asset/:id/tokens',
        destination: '/asset/:id'
      },
      {
        source: '/asset/:id/activity',
        destination: '/asset/:id'
      }
    ];
  }
};
