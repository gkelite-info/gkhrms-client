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
<<<<<<< Updated upstream
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
=======
        source: "/accountant",
        destination: "/accountantmanager",
        permanent: true,
      },
      {
        source: "/accountant/:path*",
        destination: "/accountantmanager/:path*",
        permanent: true,
      },
      {
        source: "/accountantmanager/transaction",
        destination: "/accountantmanager/transactions",
        permanent: true,
      },
      {
        source: "/accountantmanager/expense",
        destination: "/accountantmanager/expenses",
        permanent: true,
      },
      {
        source: "/accountantmanager/payment",
        destination: "/accountantmanager/payments",
        permanent: true,
      },
      {
        source: "/accountantmanager/reimbursement",
        destination: "/accountantmanager/reimbursements",
        permanent: true,
      },
      {
        source: "/accountantmanager/report",
        destination: "/accountantmanager/reports",
>>>>>>> Stashed changes
        permanent: true,
      },
    ]
  },
<<<<<<< Updated upstream
=======
  async rewrites() {
    return [
      {
        source: "/accountant%20manager/:path*",
        destination: "/accountantmanager/:path*",
      },
      {
        source: "/accountant-manager/:path*",
        destination: "/accountantmanager/:path*",
      },
    ]
  },
>>>>>>> Stashed changes
}

export default nextConfig
