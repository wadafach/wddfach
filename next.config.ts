import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* GitHub Pages serves static files only. */
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? (process.env.GITHUB_ACTIONS ? "/wddfach" : ""),
  assetPrefix:
    process.env.NEXT_PUBLIC_BASE_PATH
      ? `${process.env.NEXT_PUBLIC_BASE_PATH}/`
      : process.env.GITHUB_ACTIONS
        ? "/wddfach/"
        : undefined,
  trailingSlash: true,
  images: { unoptimized: true },
  cacheComponents: false,
  partialPrefetching: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
