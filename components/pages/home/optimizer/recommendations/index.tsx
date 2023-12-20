import { type FC } from 'react';

import RecDependencies from './rec-dependencies';
import { ASTNode } from '@solidity-parser/parser/dist/src/ast-types';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type RecommendationsProps = {
  input: string;
  parsed: ASTNode;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const Recommendations: FC<RecommendationsProps> = ({ input, parsed }) => {
  return <RecDependencies input={input} parsed={parsed} />;
};

Recommendations.displayName = 'Recommendations';

export default Recommendations;
