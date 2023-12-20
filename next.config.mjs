import createMDX from '@next/mdx';
import rehypeMdxCodeProps from 'rehype-mdx-code-props';
import webpack from 'webpack';

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [rehypeMdxCodeProps],
    providerImportSource: '@mdx-js/react',
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: false,
  webpack5: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  webpack: (config) => {
    config.resolve.fallback = { fs: false, net: false, tls: false, path: false };
    config.plugins.push(new webpack.DefinePlugin({ BROWSER: true }));
    return config;
  },
};

export default withMDX(nextConfig);
