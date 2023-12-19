export type UpdatedLine = {
  value: string;
  highlight: number;
};

export type RecommendationPattern = {
  regex: string;
  message: string;
  link: string;
};

export type PatternMatch = {
  start: number;
  end: number;
  startLine: number;
  code: string;
  pattern: {
    message: string;
    link: string;
  };
};
