import { ASTNode } from '@solidity-parser/parser/dist/src/ast-types';

import { CodePatternResult } from '@/lib/types/code';
import { extractCodeFromNode } from '@/lib/utils';

export const findMulticallPatterns = (code: string, node: ASTNode): CodePatternResult[] => {
  const result: CodePatternResult[] = [];

  const traverse = (currentNode: ASTNode) => {
    if (currentNode.type === 'FunctionDefinition') {
      // Check if the function is named "multicall" or "multidelegatecall" (case-insensitive)
      const functionName = currentNode.name ? currentNode.name.toLowerCase() : '';
      if (functionName === 'multicall' || functionName === 'multidelegatecall') {
        result.push({
          code: extractCodeFromNode(code, currentNode),
          message: (
            <div>
              Found function named{' '}
              <pre className="inline-block" style={{ color: '#849DFF' }}>
                {currentNode.name}
              </pre>
              ; you might want to consider using an optimized Multicall library.
            </div>
          ),
          startLine: currentNode.loc?.start.line || 1,
          highlightedLines: [1],
          link: 'https://github.com/Vectorized/multicaller',
        });
      }
    }

    if (currentNode.type === 'ContractDefinition') {
      console.log(currentNode);
      // Check if the contract is named "Multicall" (case-insensitive)
      const contractName = currentNode.name ? currentNode.name.toLowerCase() : '';
      if (contractName === 'multicall' || contractName === 'multidelegatecall') {
        result.push({
          code: extractContractDefinition(extractCodeFromNode(code, currentNode)),
          message: (
            <div>
              Found contract{' '}
              <pre className="inline-block" style={{ color: '#849DFF' }}>
                {currentNode.name}
              </pre>
              ; you might want to consider using an optimized Multicall library.
            </div>
          ),
          startLine: currentNode.loc?.start.line || 1,
          highlightedLines: [1],
          link: 'https://github.com/Vectorized/multicaller',
        });
      }
    }

    if ('children' in currentNode && currentNode.children) {
      for (const child of currentNode.children) {
        traverse(child);
      }
    }
  };

  traverse(node);

  return result;
};

// Keep only the contract definition without the opening {
const extractContractDefinition = (code: string): string => {
  const contractDef = code.match(/contract.*\{/s);
  if (contractDef) {
    return contractDef[0].split('{')[0];
  }
  return code;
};
