import { CodePatternResult } from '@/lib/types/code';

export const detectEventEmissionInLoops = (code: string): CodePatternResult[] => {
  const results: CodePatternResult[] = [];
  const lines = code.split('\n');
  let currentFunction = '';
  let loopDepth = 0;
  // let loopType: 'for' | 'while' = 'for';
  let inFunction = false;

  lines.forEach((line, index) => {
    // Detect function start
    const functionMatch = line.match(/\bfunction\s+(\w+)/);
    if (functionMatch) {
      currentFunction = functionMatch[1];
      inFunction = true;
    }

    // Track curly braces to handle nested structures
    if (inFunction) {
      loopDepth += (line.match(/\{/g) || []).length;
      loopDepth -= (line.match(/\}/g) || []).length;

      if (loopDepth < 0) {
        // Reset when leaving the function
        loopDepth = 0;
        inFunction = false;
      }
    }

    // Detect loop start
    if (line.includes('for (') || line.includes('while (')) {
      loopDepth++;
      // loopType = line.includes('for (') ? 'for' : 'while';
    }

    // Detect event emission inside loop
    if (loopDepth > 0) {
      const emitMatch = line.match(/\bemit\s+(\w+)/);
      if (emitMatch) {
        results.push({
          functionName: currentFunction,
          eventName: emitMatch[1],
          line: index + 1, // Line numbers are typically 1-based
        });
      }
    }
  });

  return results;
};
