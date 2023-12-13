import type { FC } from 'react';

import { ExternalLink, Github } from 'lucide-react';

import FeatureDisplayMinimal from '@/components/templates/feature-display-minimal';
import { Button } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type FeaturedRepoFeatureProps = {
  name: string;
  description: string;
  details: string;
  url: string;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const FeaturedRepoFeature: FC<FeaturedRepoFeatureProps> = ({ name, description, details, url }) => {
  return (
    <FeatureDisplayMinimal
      className="col-span-2 w-full bg-gray-2 min-[960px]:col-span-4"
      name={name}
      description={description}
      details={details}
      symbol={<Github />}
      button={
        <Button
          size="sm"
          variant="secondary"
          intent="primary"
          rightIcon={<ExternalLink />}
          href={url}
          newTab
        >
          Open on GitHub
        </Button>
      }
      allowWrap
    />
  );
};

FeaturedRepoFeature.displayName = 'FeaturedRepoFeature';

export default FeaturedRepoFeature;
