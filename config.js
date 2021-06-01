const target = process.env.NEXT_PUBLIC_NODE_TARGET || 'development';

const configs = {
  development: {
    apiUrl: 'http://167.71.67.196/api/v1/',
    target,
  },
  staging: {
    apiUrl: 'http://167.71.67.196/api/v1/',
    target,
  },
  production: {
    apiUrl: 'http://167.71.67.196/api/v1/',
    target,
  },
};

export default configs[target] || configs.development;
