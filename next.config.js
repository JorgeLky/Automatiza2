import('next').NextConfig

const nextConfig = {
  env: {
    NEXT_PUBLIC_API: process.env.NEXT_PUBLIC_API,
    SYSTEM_URL: process.env.SYSTEM_URL,
    plataform: process.env.plataform,
    client: process.env.client
  },
  compiler: {
    styledComponents: true,
  },
}

module.exports = nextConfig
