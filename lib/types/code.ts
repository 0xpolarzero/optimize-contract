import { ReactElement } from 'react';

export type UpdatedLine = {
  value: string;
  highlight: number;
};

export type RecommendationPattern = {
  regex: string;
  message: (match: string | null) => ReactElement;
  link: string;
  isFunctionPattern?: boolean;
};

export type CodePatternResult = {
  functionName: string;
  eventName: string;
  line: number;
};
