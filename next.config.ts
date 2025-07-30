import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  eslint: {
    // Advertencia: Esto permite que la aplicación se construya incluso si tu
    // código tiene errores de ESLint.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Advertencia: Esto permite que la aplicación se construya incluso si tu
    // código tiene errores de TypeScript.
    ignoreBuildErrors: true,
  },
  
};

export default nextConfig;
