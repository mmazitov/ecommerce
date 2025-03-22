import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	/* config options here */
	images: {
		remotePatterns: [
			{ hostname: 'images.unsplash.com' },
			{ hostname: 'lh3.googleusercontent.com' },
		],
	},
	experimental: {},
};

export default nextConfig;
