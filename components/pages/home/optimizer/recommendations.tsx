import { type FC, useEffect, useMemo, useState } from 'react';

import { RecommendedContract } from '@/lib/types/library';
import { findRecommendationFromImport } from '@/lib/utils';

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
      if (!lines) return;
      const rec: RecommendedContract[] = [];

      const processed = lines.map((line) => {
        const recommended = findRecommendationFromImport(line);
        console.log(line);
        if (!recommended) return { value: line, highlight: 0 };

        rec.push(recommended);
        return [
          { value: line, highlight: -1 },
          { value: recommended.import, highlight: 1 },
        ];
      });

      console.log(processed);

      setUpdatedLines(processed.flat());
      setRecommendations(rec);
      setUpdatedCount(rec.length);
    };

    processLines();
  }, [lines]);

  if (!updatedLines.length) {
    return null;
  }

  return (
    <div className="flex flex-col space-y-2">
      <span className="text-gray-11">
        {updatedCount} import{updatedCount > 1 ? 's' : ''} updated
      </span>
      <CodeBlock
        language="solidity"
        showLineNumbers={false}
        highlightLinesDiffPlus={updatedLines.map((line, i) => (line.highlight === 1 ? i + 1 : 0))}
        highlightLinesDiffMinus={updatedLines.map((line, i) => (line.highlight === -1 ? i + 1 : 0))}
      >
        {updatedLines.map((line) => line.value).join('\n')}
      </CodeBlock>
    </div>
  );
};

Recommendations.displayName = 'Recommendations';

export default Recommendations;
