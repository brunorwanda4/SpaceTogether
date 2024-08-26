import createNextIntlPlugin from 'next-intl/plugin';
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: [
          "images.pexels.com",
          "avatars.githubusercontent.com",
          "lh3.googleusercontent.com",
          "res.cloudinary.com",
          "img.daisyui.com",
        ],
    },
};
 
export default withNextIntl(nextConfig);