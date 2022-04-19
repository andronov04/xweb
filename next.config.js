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
      // {
      //   source: '/:id/assets',
      //   destination: '/:id'
      // }
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
