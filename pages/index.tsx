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
          url: 'optimize_contracts_url',
          site_name: 'optimize_contracts',
          images: [
            {
              url: 'optimize_contracts_url/api/og/page?title=optimize_contracts&description=optimize_contracts_description.',
              width: 1200,
              height: 630,
              alt: 'optimize_contracts open-graph image',
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
