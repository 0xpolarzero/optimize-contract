import { RECOMMENDED_LIBRARIES } from '../constants/recommended-libraries';
import { PatternMatch } from '../types/code';

import { EXCEPTIONS, KNOWN_LIBRARIES, REMAPPINGS } from '@/lib/constants/known-libraries';
import { RECOMMENDATION_PATTERNS } from '@/lib/constants/recommendation-patterns';
import { RecommendedContract, RecommendedLibrary } from '@/lib/types/library';

/**
 * Find a recommended contract, as part of a library, for a given import line,
 * by reading the whole library at that import.
 */
export const findRecommendation_libraryToLibrary = (line: string): RecommendedContract[] | null => {
  // For all known libraries
  for (const [library, prefixes] of Object.entries(KNOWN_LIBRARIES)) {
    // If the import line contains a known prefix (associated with a recommendation)
    if (prefixes.some((prefix) => line.includes(prefix))) {
      // Get all its contracts
      const libraryContracts = RECOMMENDED_LIBRARIES[library as RecommendedLibrary];

      // Find the contract matching the import
      const findName = line.match(/\/([^/]+)\.sol/);
      let contractName = findName ? findName[1] : null;

      // Check if there is a remapping to be done (e.g. Multicall => Multicaller)
      if (contractName && REMAPPINGS[contractName]) {
        contractName = REMAPPINGS[contractName];
      }

      // If we got a name, and a matching contract
      if (contractName && libraryContracts.some((contract) => contract.name === contractName)) {
        // Check for exceptions
        if (EXCEPTIONS[contractName]) {
          // Return all matching contracts from the exceptions list
          return EXCEPTIONS[contractName]
            .map((name) => libraryContracts.find((contract) => contract.name === name))
            .filter((contract): contract is RecommendedContract => contract !== undefined);
        } else {
          // Return the recommended alternative if it exists
          const recommendedContract = libraryContracts.find(
            (contract) => contract.name === contractName,
          );
          return recommendedContract ? [recommendedContract] : null;
        }
      }
    }
  }

  return null;
};

/**
 * Find a suspicious pattern in a given contract
 */
export const findPatternMatches = (code: string): PatternMatch[] => {
  const matches: PatternMatch[] = [];

  RECOMMENDATION_PATTERNS.forEach((pattern) => {
    const regex = new RegExp(pattern.regex, 'gi');
    let match: RegExpExecArray | null;

    while ((match = regex.exec(code)) !== null) {
      const functionStartIndex =
        match.index +
        match[0].indexOf(match[1]) +
        (pattern.isFunctionPattern ? match[0].indexOf('function') : 0);
      const linesUpToMatch = code.substring(0, functionStartIndex).split('\n').length;
      const endOfMatch = findEndOfFunction(code, functionStartIndex);

      // Extract the matched code and adjust indentation
      const matchedCode = code.substring(match.index, endOfMatch);
      const adjustedCode = adjustIndentation(matchedCode);

      matches.push({
        start: functionStartIndex,
        end: endOfMatch,
        startLine: linesUpToMatch,
        pattern: pattern,
        match: match[2],
        code: adjustedCode, // Store the adjusted code
      });
    }
  });

  return matches.sort((a, b) => a.start - b.start);
};

const findEndOfFunction = (code: string, startIndex: number): number => {
  let openBraces = 0;
  let index = startIndex;

  while (index < code.length) {
    if (code[index] === '{') {
      openBraces++;
    } else if (code[index] === '}') {
      openBraces--;
      if (openBraces === 0) {
        return index + 1; // Include the closing brace in the match
      }
    }
    index++;
  }

  return index; // In case the function body is not properly closed
};

const adjustIndentation = (code: string): string => {
  const lines = code.split('\n');
  while (lines.length > 0 && lines[0].trim() === '') {
    lines.shift();
  }

  if (lines.length === 0) return code;

  // Find the number of leading spaces in the first line
  const firstLineIndentation = lines[0].search(/\S/);
  if (firstLineIndentation === -1) {
    // If the first line is empty, find the indentation of the next non-empty line
    for (let i = 1; i < lines.length; i++) {
      const indentation = lines[i].search(/\S/);
      if (indentation !== -1) {
        return lines.map((line) => line.substring(indentation)).join('\n');
      }
    }
  }

  // Adjust indentation based on the first line
  return lines.map((line) => line.substring(firstLineIndentation)).join('\n');
};
