import { type FC, useEffect, useMemo, useState } from 'react';

import { ASTNode, ImportDirective } from '@solidity-parser/parser/dist/src/ast-types';

import { UpdatedLine } from '@/lib/types/code';
import { RecommendedContract } from '@/lib/types/library';
import { findRecommendation_libraryToLibrary } from '@/lib/utils';

import Instructions from '@/components/pages/home/optimizer/instructions';
import InfoTooltip from '@/components/templates/info-tooltip';
import { CodeBlock } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type RecDependenciesProps = {
  input: string;
  parsed: ASTNode;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const RecDependencies: FC<RecDependenciesProps> = ({ input, parsed }) => {
  const imports = useMemo(() => {
    // Extract import lines from the AST node
    if (parsed.type === 'SourceUnit') {
      const importNodes = parsed.children.filter(
        (node): node is ImportDirective => node.type === 'ImportDirective',
      );
      return importNodes.map((node) => node.pathLiteral.value);
    }
    return [];
  }, [parsed]);

  const [updatedLines, setUpdatedLines] = useState<UpdatedLine[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendedContract[]>([]);
  const [updatedCount, setUpdatedCount] = useState<number>(0);

  useEffect(() => {
    const processLines = () => {
      if (!imports) {
        setUpdatedLines([]);
        setRecommendations([]);
        setUpdatedCount(0);
        return;
      }

      const rec: RecommendedContract[] = [];

      let updatedCount = 0;
      const newImports = imports.flatMap((line) => {
        const recommended = findRecommendation_libraryToLibrary(line);
        if (!recommended || recommended.length === 0)
          return [{ value: `import ${line}`, highlight: 0 }];

        updatedCount += 1;
        rec.push(...recommended);
        console.log(recommended);
        return [
          {
            value: `import ${line}`,
            highlight: -1,
          },
          ...(recommended.length === 1
            ? [{ value: recommended[0].import, highlight: 1 }]
            : recommended.map((r) => ({ value: r.import, highlight: 2 }))),
        ];
      });

      setUpdatedLines(newImports);
      setRecommendations(rec);
      setUpdatedCount(updatedCount);
    };

    processLines();
  }, [imports]);

  if (input === '') return null;

  if (!updatedCount) {
    return <div className="text-gray-11">No recommendations to show</div>;
  }

  return (
    <div className="flex flex-col space-y-2">
      <h3 className="text-xl font-semibold">Optimized dependencies</h3>
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

RecDependencies.displayName = 'RecDependencies';

export default RecDependencies;
