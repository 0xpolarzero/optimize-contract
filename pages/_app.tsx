import type { AppProps } from 'next/app';
import { Fira_Code, Inter } from 'next/font/google';
import { type FC } from 'react';

import { Analytics } from '@vercel/analytics/react';
import clsx from 'clsx';
import { DefaultSeo } from 'next-seo';

import '@/styles/globals.css';

import { Toaster } from '@/components/ui';

// -----------------------------------------------------------------------------
// Fonts
// -----------------------------------------------------------------------------

const inter = Inter({
  variable: '--inter-font',
  subsets: ['latin'],
});

const firaCode = Fira_Code({
  variable: '--fira-code-font',
  subsets: ['latin'],
});

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const DESCRIPTION = 'optimize_deps_description';

  return (
    <>
      <DefaultSeo
        titleTemplate="%s | optimize_deps"
        defaultTitle="optimize_deps"
        description={DESCRIPTION}
        canonical="optimize_deps_url"
        themeColor="#000"
        openGraph={{
          type: 'website',
          locale: 'en_US',
          description: DESCRIPTION,
          url: 'optimize_deps_url',
          site_name: 'optimize_deps',
        }}
        twitter={{
          handle: '@0xpolarzero',
          site: '@0xpolarzero',
          cardType: 'summary_large_image',
        }}
        additionalLinkTags={[
          {
            rel: 'shortcut icon',
            href: '/images/favicon.ico',
          },
          {
            rel: 'apple-touch-icon',
            href: '/images/apple-touch-icon.png',
            sizes: '180x180',
          },
          {
            rel: 'manifest',
            href: '/manifest.json',
          },
        ]}
      />

      <style jsx global>{`
        html {
          font-family: ${inter.style.fontFamily};
        }
      `}</style>

      <div>
        <main className={clsx(inter.variable, firaCode.variable)}>
          <Component {...pageProps} />
        </main>
        <Toaster />
      </div>

      <Analytics />
    </>
  );
};

export default App;
