import { RecommendedContract, RecommendedLibrary } from '../types/library';

export const RECOMMENDATIONS: Record<RecommendedLibrary, Record<string, RecommendedContract>> = {
  Solady: {
    ERC20: {
      library: 'Solady',
      name: 'ERC20',
      url: 'https://github.com/Vectorized/solady/blob/main/src/tokens/ERC20.sol',
      import: 'import { ERC20 } from "solady/tokens/ERC20.sol";',
      instructions: 'do stuff with name() and symbol()',
    },
  },
};
