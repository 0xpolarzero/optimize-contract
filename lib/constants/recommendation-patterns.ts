import { RecommendationPattern } from '@/lib/types/code';

export const RECOMMENDATION_PATTERNS: RecommendationPattern[] = [
  {
    regex:
      '(^|\\n)\\s*function\\s+multi(?:delegate)?call\\s*\\(' + // Matches function with leading whitespace
      '[^)]*\\)' + // Matches any characters inside the parentheses (parameters)
      '\\s*(?:external|public|internal|private)?' + // Optionally matches visibility specifiers
      '\\s*(?:payable)?' + // Optionally matches the 'payable' keyword
      '\\s*(?:returns\\s*\\([^)]*\\))?' + // Optionally matches the 'returns' statement
      '\\s*\\{[\\s\\S]*?\\}', // Matches the function body, including newlines
    message: 'Consider using an optimized multicall function.',
    link: 'https://github.com/Vectorized/multicaller',
  },
];
