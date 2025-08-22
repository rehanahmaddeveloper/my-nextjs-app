/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',               // static export
  images: { unoptimized: true },  // next/image ko static banata hai
  // trailingSlash: true,         // optional, agar URLs ke end me / chahiye
};

export default nextConfig;
