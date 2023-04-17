/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    backEndUrl: 'http://localhost:3005/api/v1',
    TINYMCE_KEY: 'f89y6lku83m7s1nwjt0kmz08ksq3e95fiv6qd2gbw16i4aiz',
  },
}

module.exports = nextConfig
