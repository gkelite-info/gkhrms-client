import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/financemanger/:path*",
        destination: "/financemanager/:path*",
        permanent: true,
      },
      {
        source: "/financemanger",
        destination: "/financemanager/finance",
        permanent: true,
      },
      {
        source: "/finance/attendance/:path*",
        destination: "/financemanager/attendance/:path*",
        permanent: true,
      },
      {
        source: "/finance/attendance",
        destination: "/financemanager/attendance",
        permanent: true,
      },
      {
        source: "/finance/finance/:path*",
        destination: "/financemanager/finance/:path*",
        permanent: true,
      },
      {
        source: "/finance/finance",
        destination: "/financemanager/finance",
        permanent: true,
      },
      {
        source: "/finance",
        destination: "/financemanager/finance",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
