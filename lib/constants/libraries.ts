import Link from 'next/link';

import { RECOMMENDED_CONTRACTS } from './recommended-libraries';

import { Library, RecommendedLibrary } from '@/lib/types/library';

export const LIBRARIES: Record<RecommendedLibrary, Library> = {
  Solady: {
    name: 'Solady',
    author: { name: 'Vectorized', url: 'https://twitter.com/optimizoor' },
    description: 'Gas optimized Solidity snippets.',
    url: 'https://github.com/Vectorized/solady',
    contracts: Object.values(RECOMMENDED_CONTRACTS['Solady']),
    instructions:
      'Each contract is thoroughly documented; please pay extra attention to the small distinctions with standard OpenZeppelin/Solmate implementations.',
    audit: {
      authors: ['Ackee Blockchain', 'Cantina', 'Shung'],
      dates: [new Date('2023-05-30'), new Date('2023-09-14'), new Date('2023-07-08')],
      url: 'https://github.com/Vectorized/solady/tree/main/audits',
    },
  },
};
