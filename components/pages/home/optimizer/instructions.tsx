import Link from 'next/link';
import { type FC, useMemo } from 'react';

import { Check, ExternalLink, Github } from 'lucide-react';

import { LIBRARY_INFOS } from '@/lib/constants/library-infos';
import { RecommendedContract, RecommendedLibrary } from '@/lib/types/library';

import CategoryTag, { Category } from '@/components/templates/category-tag';
import FeatureDisplay from '@/components/templates/feature-display';
import { Badge, Button, Tooltip } from '@/components/ui';

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
          const library = LIBRARY_INFOS[libraryName as RecommendedLibrary];

          return (
            <div key={libraryName} className="flex flex-col space-y-2">
              <FeatureDisplay
                className="col-span-2 w-full"
                name={library.name}
                description={library.description || ''}
                symbol={<Github />}
                button={
                  <Button
                    size="sm"
                    variant="secondary"
                    intent="primary"
                    href={library.url}
                    rightIcon={<ExternalLink />}
                    newTab
                  >
                    Open on GitHub
                  </Button>
                }
                tags={[
                  <CategoryTag
                    key={library.author.name}
                    size="md"
                    category={library.author.name as Category}
                    url={library.author.url}
                  />,
                ]}
              >
                <div className="flex h-full flex-col space-y-4 p-4 text-[0.92rem]">
                  {library.audit ? (
                    <div className="flex items-center space-x-2 text-sm text-gray-11">
                      <Badge variant="secondary" intent="success">
                        <Tooltip content={library.audit.authors.join(', ')}>
                          <Link
                            className="flex items-center space-x-2 hover:underline"
                            href={library.audit.url}
                            rel="noopener noreferrer"
                            target="_blank"
                          >
                            <Check size={16} />
                            <span>Audited</span>
                          </Link>
                        </Tooltip>
                      </Badge>
                    </div>
                  ) : null}
                  <div className="text-gray-12">{library.instructions || ''}</div>
                  <div className="flex flex-grow flex-col space-y-1 text-sm text-gray-11">
                    {recs.map((rec, i) => (
                      <div key={i}>
                        <Link
                          className="font-medium underline"
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
              </FeatureDisplay>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Instructions.displayName = 'Instructions';

export default Instructions;
