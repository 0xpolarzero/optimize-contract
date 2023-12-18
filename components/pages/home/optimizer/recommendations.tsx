import { type FC, useEffect, useMemo, useState } from 'react';

import { RecommendedContract } from '@/lib/types/library';
import { findRecommendation_libraryToLibrary } from '@/lib/utils';

import Instructions from '@/components/pages/home/optimizer/instructions';
import InfoTooltip from '@/components/templates/info-tooltip';
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

      let updated = 0;
      const processed = lines.flatMap((line) => {
        const recommended = findRecommendation_libraryToLibrary(line);
        if (!recommended || recommended.length === 0) return [{ value: line, highlight: 0 }];

        updated += 1;
        rec.push(...recommended);
        return [
          { value: line, highlight: -1 },
          ...(recommended.length === 1
            ? [{ value: recommended[0].import, highlight: 1 }]
            : recommended.map((r) => ({ value: r.import, highlight: 2 }))),
        ];
      });

      setUpdatedLines(processed);
      setRecommendations(rec);
      setUpdatedCount(updated);
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
      <div className="flex items-center space-x-2 text-gray-11">
        <span>
          1. Update {updatedCount} import{updatedCount > 1 ? 's' : ''}
        </span>
        <InfoTooltip
          content={
            <div className="grid grid-cols-[min-content_1fr] gap-x-2">
              <span>+</span>
              <span className="text-gray-8">add this contract</span>
              <span>-</span>
              <span className="text-gray-8">remove this contract</span>
              <span>±</span>
              <span className="text-gray-8">choose one of these contracts</span>
            </div>
          }
        />
      </div>
      {/* updated code */}
      <CodeBlock
        language="solidity"
        showLineNumbers={false}
        highlightLinesDiffPlus={updatedLines.map((line, i) => (line.highlight === 1 ? i + 1 : 0))}
        highlightLinesDiffMinus={updatedLines.map((line, i) => (line.highlight === -1 ? i + 1 : 0))}
        highlightLinesDiffMultiple={updatedLines.map((line, i) =>
          line.highlight === 2 ? i + 1 : 0,
        )}
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
