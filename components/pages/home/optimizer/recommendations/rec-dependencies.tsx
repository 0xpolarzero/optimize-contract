import { type FC, useEffect, useMemo, useState } from 'react';

import {
  ContractDefinition,
  ImportDirective,
  SourceUnit,
} from '@solidity-parser/parser/dist/src/ast-types';
import { ChevronRight } from 'lucide-react';

import { UpdatedLine } from '@/lib/types/code';
import { RecommendedContract } from '@/lib/types/library';
import {
  findRecommendation_libraryToRecommended,
  findRecommendation_nameToRecommended,
} from '@/lib/utils';

import Instructions from '@/components/pages/home/optimizer/recommendations/rec-dependencies-instructions';
import InfoTooltip from '@/components/templates/info-tooltip';
import { CodeBlock } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type RecDependenciesProps = {
  input: string;
  parsed: SourceUnit;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const RecDependencies: FC<RecDependenciesProps> = ({ input, parsed }) => {
  // Extract import lines from the AST node
  const imports: string[] = useMemo(() => {
    if (parsed.type === 'SourceUnit') {
      const importNodes = parsed.children.filter(
        (node): node is ImportDirective => node.type === 'ImportDirective',
      );
      return importNodes.map((node) => node.pathLiteral.value);
    }
    return [];
  }, [parsed]);

  // Extract contract names from the AST node
  const contracts: string[] = useMemo(() => {
    if (parsed.type === 'SourceUnit') {
      const contractNodes = parsed.children.filter(
        (node): node is ContractDefinition => node.type === 'ContractDefinition',
      );
      return contractNodes.map((node) => node.name);
    }
    return [];
  }, [parsed]);

  // Import lines
  const [updatedLines, setUpdatedLines] = useState<UpdatedLine[]>([]);
  const [recommendations, setRecommendations] = useState<RecommendedContract[]>([]);
  const [updatedCount, setUpdatedCount] = useState<number>(0);
  // Contracts
  const [updatedContracts, setUpdatedContracts] = useState<Record<string, RecommendedContract[]>>(
    {},
  );

  useEffect(() => {
    const processLines = () => {
      if (!imports) {
        setUpdatedLines([]);
        setRecommendations([]);
        setUpdatedCount(0);
        return;
      }

      const rec: Record<string, RecommendedContract[]> =
        findRecommendation_libraryToRecommended(imports);

      let updatedCount = 0;
      const newImports = imports.flatMap((line) => {
        const recommended = rec[line];
        if (!recommended || recommended.length === 0)
          return [{ value: `import ${line}`, highlight: 0 }];

        updatedCount += 1;
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

      // Extract values from the object and flatten the array
      setRecommendations(Object.values(rec).flat());
      setUpdatedCount(updatedCount);
    };

    const processContracts = () => {
      if (!contracts) {
        setUpdatedContracts({});
        return;
      }

      const rec: Record<string, RecommendedContract[]> =
        // remove duplicates in the keys
        findRecommendation_nameToRecommended(
          contracts.filter((c, i) => contracts.indexOf(c) === i),
        );

      setUpdatedContracts(rec);
    };

    processLines();
    processContracts();
  }, [imports, contracts]);

  if (!updatedCount && Object.entries(updatedContracts).length === 0) {
    return <div className="text-gray-11">No recommendations to show</div>;
  }

  return (
    <div className="flex flex-col space-y-2">
      <h3 className="text-xl font-semibold">Dependencies</h3>
      {updatedCount > 0 ? (
        <>
          {/* imports count */}
          <div className="flex items-center space-x-2 text-gray-11">
            <span className="flex items-center space-x-2 text-gray-11">
              <ChevronRight size={16} /> Update {updatedCount} import{updatedCount > 1 ? 's' : ''}
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
            highlightLinesDiffPlus={updatedLines.map((line, i) =>
              line.highlight === 1 ? i + 1 : 0,
            )}
            highlightLinesDiffMinus={updatedLines.map((line, i) =>
              line.highlight === -1 ? i + 1 : 0,
            )}
            highlightLinesDiffMultiple={updatedLines.map((line, i) =>
              line.highlight === 2 ? i + 1 : 0,
            )}
          >
            {updatedLines.map((line) => line.value).join('\n')}
          </CodeBlock>
          {/* instructions */}
          <span className="flex items-center space-x-2 text-gray-11">
            <ChevronRight size={16} /> Add the following to your contract:
          </span>
          <Instructions recommendations={recommendations} />
        </>
      ) : null}
      {/* contracts */}
      {Object.entries(updatedContracts).length > 0 ? (
        <div>
          <span className="flex items-center space-x-2 text-gray-11">
            <ChevronRight size={16} /> We found the following contracts in your code; consider using
            the recommended libraries instead:
          </span>
          <span className="ml-4">{Object.keys(updatedContracts).join(', ')}</span>
          <Instructions
            recommendations={Object.entries(updatedContracts)
              .map(([contractName, recs]) => recs)
              .flat()}
          />
        </div>
      ) : null}
    </div>
  );
};

RecDependencies.displayName = 'RecDependencies';

export default RecDependencies;
