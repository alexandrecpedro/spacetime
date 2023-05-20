/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', `${process.env.NEXT_PUBLIC_URL}`],
  },
}

module.exports = nextConfig
