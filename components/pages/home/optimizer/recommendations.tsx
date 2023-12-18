import { type FC, useEffect, useMemo, useState } from 'react';

import { RecommendedContract } from '@/lib/types/library';
import { findRecommendation_libraryToLibrary } from '@/lib/utils';

import Instructions from '@/components/pages/home/optimizer/instructions';
import { CodeBlock } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type RecommendationsProps = {
  input: string;
};

type UpdatedLine = {
  value: string;
  highlight: number;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const Recommendations: FC<RecommendationsProps> = ({ input }) => {
  const lines = useMemo(
    () => input.match(/^import\s+((\{[^}]*\}\s+from\s+)?".+?")\s*;?$/gm),
    [input],
  );

  const [updatedLines, setUpdatedLines] = useState<UpdatedLine[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendedContract[]>([]);

  const [updatedCount, setUpdatedCount] = useState<number>(0);

  useEffect(() => {
    const processLines = () => {
      if (!lines) {
        setUpdatedLines([]);
        setRecommendations([]);
        setUpdatedCount(0);
        return;
      }

      const rec: RecommendedContract[] = [];

      const processed = lines.map((line) => {
        const recommended = findRecommendation_libraryToLibrary(line);
        if (!recommended) return { value: line, highlight: 0 };

        rec.push(recommended);
        return [
          { value: line, highlight: -1 },
          { value: recommended.import, highlight: 1 },
        ];
      });

      setUpdatedLines(processed.flat());
      setRecommendations(rec);
      setUpdatedCount(rec.length);
    };

    processLines();
  }, [lines]);

  if (input === '') return null;

  if (!updatedCount) {
    return <div className="text-gray-11">No recommendations to show</div>;
  }

  return (
    <div className="flex flex-col space-y-2">
      <h2 className="text-xl font-semibold leading-tight tracking-tight text-gray-12 md:text-2xl">
        Recommendations
      </h2>
      {/* imports count */}
      <span className="text-gray-11">
        1. Update {updatedCount} import{updatedCount > 1 ? 's' : ''}
      </span>
      {/* updated code */}
      <CodeBlock
        language="solidity"
        showLineNumbers={false}
        highlightLinesDiffPlus={updatedLines.map((line, i) => (line.highlight === 1 ? i + 1 : 0))}
        highlightLinesDiffMinus={updatedLines.map((line, i) => (line.highlight === -1 ? i + 1 : 0))}
      >
        {updatedLines.map((line) => line.value).join('\n')}
      </CodeBlock>
      {/* instructions */}
      <Instructions recommendations={recommendations} />
    </div>
  );
};

Recommendations.displayName = 'Recommendations';

export default Recommendations;
