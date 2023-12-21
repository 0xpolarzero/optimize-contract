import { type FC } from 'react';

import RecDependencies from './rec-dependencies';
import RecPatterns from './rec-patterns';
import { SourceUnit } from '@solidity-parser/parser/dist/src/ast-types';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type RecommendationsProps = {
  input: string;
  parsed: SourceUnit;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const Recommendations: FC<RecommendationsProps> = ({ input, parsed }) => {
  return (
    <div className="flex flex-col space-y-4">
      <RecDependencies input={input} parsed={parsed} />
      <RecPatterns input={input} parsed={parsed} />
    </div>
  );
};

Recommendations.displayName = 'Recommendations';

export default Recommendations;
