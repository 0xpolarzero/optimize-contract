import { type FC, useMemo } from 'react';

import { SourceUnit } from '@solidity-parser/parser/dist/src/ast-types';
import { ExternalLink } from 'lucide-react';

import { patterns } from '@/lib/constants/patterns';

import { Button, CodeBlock } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type RecPatternsProps = {
  input: string;
  parsed: SourceUnit;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const RecPatterns: FC<RecPatternsProps> = ({ input, parsed }) => {
  const recommendations = useMemo(() => {
    return patterns.map((pattern) => pattern(input, parsed)).flat();
  }, [input, parsed]);

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Other recommendations</h3>
      {recommendations.map((rec, index) => (
        <div key={index} className="flex flex-col space-y-2">
          <div className="flex items-start justify-between space-x-4">
            <h3 className="text-md font-medium text-gray-11">{rec.message}</h3>
            <Button
              className="whitespace-nowrap"
              size="sm"
              variant="secondary"
              intent="primary"
              href={rec.link}
              rightIcon={<ExternalLink />}
              newTab
            >
              {rec.action || 'Learn more'}
            </Button>
          </div>
          <CodeBlock
            language="solidity"
            startLine={rec.startLine - 1}
            highlightLines={rec.highlightedLines}
          >
            {rec.code}
          </CodeBlock>
        </div>
      ))}
    </div>
  );
};

RecPatterns.displayName = 'RecPatterns';

export default RecPatterns;
