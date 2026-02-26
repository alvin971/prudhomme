/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // swcMinify est maintenant activé par défaut dans Next.js 16
  // Configuration Turbopack (vide = utilise les valeurs par défaut)
  turbopack: {},
}

module.exports = nextConfig
