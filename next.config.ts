import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        // https://ecommerce.routemisr.com/api/v1/products
        protocol: "https",
        hostname: "ecommerce.routemisr.com",
        pathname: "/**",
        search: "",
      },
    ],
  },
  reactCompiler: true,
};

export default nextConfig;
