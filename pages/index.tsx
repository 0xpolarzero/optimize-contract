import type { NextPage } from 'next';

import { NextSeo } from 'next-seo';

import BaseLayout from '@/components/layouts/base';
import ContainerLayout from '@/components/layouts/container';
import WebsiteHeader from '@/components/pages/home/header';
import Optimizer from '@/components/pages/home/optimizer';

// -----------------------------------------------------------------------------
// Page
// -----------------------------------------------------------------------------

const HomePage: NextPage = () => {
  return (
    <>
      <NextSeo
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: 'optimize_dependencies_url',
          site_name: 'optimize_dependencies',
          images: [
            {
              url: '/static/og-images/home.png',
              width: 1200,
              height: 630,
              alt: 'optimize_dependencies open-graph image',
            },
          ],
        }}
        twitter={{
          handle: '@0xpolarzero',
        }}
      />

      <BaseLayout subtitle="Home" pageSlug="/">
        <ContainerLayout className="flex flex-col space-y-4">
          <WebsiteHeader />
          <Optimizer />
        </ContainerLayout>
      </BaseLayout>
    </>
  );
};

export default HomePage;
