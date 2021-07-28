const withPlugins = require('next-compose-plugins');
// const nextTranslate = require('next-translate');
const withImages = require('next-images')

const nextConfig = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.node = {
        fs: 'empty',
        net :'empty',
        // express: "empty"
      }
    }
    config.node = {
      fs: 'empty',
      net :'empty',
    };
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|jsx|ts|tsx)$/,
      },
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: {
                removeViewBox: false,
              },
            },
          },
        },
      ],
    });

    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/i,
      issuer: {
        test: /\.(css|scss)$/,
      },
      loader: 'url-loader',
      options: {
        limit: 8192,
        name: '[name].[ext]',
      },
    });

    return config
  },
};

// module.exports = withPlugins([nextTranslate], nextConfig);
module.exports = withPlugins([], nextConfig);
