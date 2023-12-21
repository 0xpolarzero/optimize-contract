import { ASTNode } from '@solidity-parser/parser/dist/src/ast-types';

// Get the code of a function, with the adapted indentation (basically minus the indentation from the contract)
export const extractCodeFromNode = (code: string, node: ASTNode) => {
  const lines = code.split('\n');
  const startLine = node.loc?.start.line || 1;
  const startColumn = node.loc?.start.column || 1;

  // Find the correct end line starting from the end of the code
  let endLine = lines.length;
  while (endLine > startLine && lines[endLine - 1].trim() === '') {
    endLine--;
  }

  // Extract code lines based on node location
  const codeLines = lines.slice(startLine - 1, endLine);

  // Calculate indentation
  const indentation = lines[startLine - 1].slice(0, startColumn - 1);

  // Adjust the first and last lines to consider column positions
  codeLines[0] = codeLines[0].slice(startColumn - 1);
  codeLines[codeLines.length - 1] = codeLines[codeLines.length - 1].slice(0, -1); // Remove last character (possibly an additional bracket)

  // Remove common indentation from each line
  const formattedCode = codeLines
    .map((line) => line.replace(new RegExp(`^${indentation}`), ''))
    .filter((line) => line.trim() !== '') // Remove blank lines
    .join('\n');

  return formattedCode;
};
