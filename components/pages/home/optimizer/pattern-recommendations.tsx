import { type FC, useEffect, useState } from 'react';

import { ExternalLink } from 'lucide-react';

import { PatternMatch } from '@/lib/types/code';
import { findPatternMatches } from '@/lib/utils/findRecommendation';

import { Button, CodeBlock } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type PatternRecommendationsProps = {
  input: string;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const PatternRecommendations: FC<PatternRecommendationsProps> = ({ input }) => {
  const [recommendations, setRecommendations] = useState<PatternMatch[]>([]);

  useEffect(() => {
    const matches = findPatternMatches(input);
    setRecommendations(matches);
  }, [input]);

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Other recommendations</h3>
      {recommendations.map((rec, index) => (
        <div key={index} className="flex flex-col space-y-2">
          <div className="flex items-center justify-between space-x-2">
            <h3 className="text-md font-medium text-gray-11">{rec.pattern.message}</h3>
            <Button
              size="sm"
              variant="secondary"
              intent="primary"
              href={rec.pattern.link}
              rightIcon={<ExternalLink />}
              newTab
            >
              Open alternative
            </Button>
          </div>
          <CodeBlock language="solidity" startLine={rec.startLine - 1} highlightLines={[1]}>
            {rec.code}
          </CodeBlock>
        </div>
      ))}
    </div>
  );
};

PatternRecommendations.displayName = 'PatternRecommendations';

export default PatternRecommendations;
