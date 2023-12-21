import { ReactElement } from 'react';

export type UpdatedLine = {
  value: string;
  highlight: number;
};

export type CodePatternResult = {
  code: string;
  startLine: number;
  highlightedLines: number[];
  message: ReactElement;
  link: string;
};
