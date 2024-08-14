/** @type {import('next').NextConfig} */
 
const nextConfig = {
    experimental: {
      ppr: 'incremental',
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'www.iconpacks.net' || '**',
          port: '',
        },
      ],
    },
  };
   
  export default nextConfig;