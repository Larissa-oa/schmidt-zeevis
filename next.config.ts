import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    disableStaticImages: true,
  },
  webpack: (config) => {
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|webp|avif|svg)$/i,
      type: "asset/resource",
      generator: {
        filename: "static/media/[name].[contenthash][ext]",
      },
    });

    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "@": path.resolve(__dirname, "src"),
      "react-router-dom": path.resolve(__dirname, "src/lib/react-router-dom.tsx"),
    };

    return config;
  },
};

export default nextConfig;
