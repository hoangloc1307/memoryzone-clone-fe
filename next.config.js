/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    backEndUrl: 'http://localhost:3005/api/v1',
  },
}

module.exports = nextConfig
