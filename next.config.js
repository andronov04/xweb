module.exports = {
  reactStrictMode: true,
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
        source: '/:id/assets',
        destination: '/:id'
      }
    ];
  }
};
