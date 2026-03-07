import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		domains: ["cdn.dummyjson.com", "dummyjson.com"],
	},

	sassOptions: {
		includePaths: ["./src/styles"],
	},

	output: "standalone",
};

export default nextConfig;
