const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: []
    // If you use `MDXProvider`, uncomment the following line.
    // providerImportSource: "@mdx-js/react",
  }
});
const ENV = 'undefined' !== typeof window ? window.ENV : process.env.ENV;

module.exports = withMDX({
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  reactStrictMode: true,
  optimizeFonts: false,
  trailingSlash: false,
  async rewrites() {
    return [
      {
        source: '/ipfs/:id*',
        destination: ENV === 'dev' ? 'https://xproxyapi-fyhqtmmq7q-uc.a.run.app/ipfs/:id*' : 'https://contter.mypinata.cloud/ipfs/:id*'
      },
      {
        source: '/s3/:id*',
        destination: 'https://dutosyxgruo37.cloudfront.net/:id*'
      },
      {
        source: '/create',
        destination: ENV === 'dev' ? 'http://localhost:4173/' : ''
      },
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
        source: '/asset/:id/details',
        destination: '/asset/:id'
      },
      {
        source: '/asset/:id/activity',
        destination: '/asset/:id'
      }
    ];
  }
});
