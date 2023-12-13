import Link from 'next/link';

import { RECOMMENDED_CONTRACTS } from './recommended-libraries';

import { Library, RecommendedLibrary } from '@/lib/types/library';

export const LIBRARIES: Record<RecommendedLibrary, Library> = {
  Solady: {
    name: 'Solady',
    description: 'Gas optimized Solidity snippets.',
    url: 'https://github.com/Vectorized/solady',
    contracts: Object.values(RECOMMENDED_CONTRACTS['Solady']),
    instructions:
      'Each contract is thoroughly documented; please pay extra attention to the small distinctions with standard OpenZeppelin/Solmate implementations.',
  },
};
