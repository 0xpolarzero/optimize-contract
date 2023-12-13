import Link from 'next/link';
import { type FC, useMemo } from 'react';

import { LIBRARIES } from '@/lib/constants/libraries';
import { RecommendedContract, RecommendedLibrary } from '@/lib/types/library';

import FeaturedRepoFeature from '@/components/templates/featured-repo';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type InstructionsProps = {
  recommendations: RecommendedContract[];
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const Instructions: FC<InstructionsProps> = ({ recommendations }) => {
  const librariesWithRecommendations = useMemo(() => {
    const grouped: Record<string, RecommendedContract[]> = {};

    recommendations.forEach((rec) => {
      const libName = rec.library;
      if (!grouped[libName]) {
        grouped[libName] = [];
      }
      grouped[libName].push(rec);
    });

    return grouped;
  }, [recommendations]);

  if (!librariesWithRecommendations) return null;

  return (
    <div className="flex flex-col space-y-4 pt-2">
      <p className="text-gray-11">2. Add the following to your contract:</p>
      <div className="flex flex-col space-y-2">
        {Object.entries(librariesWithRecommendations).map(([libraryName, recs]) => {
          const library = LIBRARIES[libraryName as RecommendedLibrary];
          console.log('items', recs);
          return (
            <div key={libraryName} className="flex flex-col space-y-2">
              <FeaturedRepoFeature
                name={library.name}
                description={library.instructions || ''}
                details={library.description || ''}
                url={library.url}
              />
              <div className="ml-4 flex flex-col space-y-1 text-sm text-gray-11">
                {recs.map((rec, i) => (
                  <div key={i}>
                    <Link
                      className="underline"
                      href={rec.url}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      {rec.name}
                    </Link>
                    : {rec.description}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Instructions.displayName = 'Instructions';

export default Instructions;
