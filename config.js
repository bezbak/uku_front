const target = process.env.NEXT_PUBLIC_NODE_TARGET || 'development';

const configs = {
  development: {
    // apiUrl: 'http://uku.kg/api/v1/',
    apiUrl: "http://api.uku.kg/api/v1/",
    target,
  },
  staging: {
    // apiUrl: 'http://uku.kg/api/v1/',
    apiUrl: "http://api.uku.kg/api/v1/",
    target,
  },
  production: {
    // apiUrl: 'http://uku.kg/api/v1/',
    apiUrl: "http://api.uku.kg/api/v1/",
    target,
  },
};

export default configs[target] || configs.development;
