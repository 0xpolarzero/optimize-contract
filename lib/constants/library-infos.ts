import { RECOMMENDED_LIBRARIES } from './recommended-libraries';

import { Library, RecommendedLibrary } from '@/lib/types/library';

export const LIBRARY_INFOS: Record<RecommendedLibrary, Library> = {
  Solady: {
    name: 'Solady',
    author: { name: 'Vectorized', url: 'https://twitter.com/optimizoor' },
    description: 'Gas optimized Solidity snippets.',
    url: 'https://github.com/Vectorized/solady',
    contracts: Object.values(RECOMMENDED_LIBRARIES['Solady']),
    instructions:
      'Each contract is thoroughly documented; please pay extra attention to the small distinctions with standard OpenZeppelin/Solmate implementations.',
    audit: {
      authors: ['Ackee Blockchain', 'Cantina', 'Shung'],
      dates: [new Date('2023-05-30'), new Date('2023-09-14'), new Date('2023-07-08')],
      url: 'https://github.com/Vectorized/solady/tree/main/audits',
    },
  },
  Multicaller: {
    name: 'Multicaller',
    author: { name: 'Vectorized', url: 'https://twitter.com/optimizoor' },
    description: 'Efficiently call multiple contracts in a single transaction.',
    url: 'https://github.com/Vectorized/multicaller',
    contracts: Object.values(RECOMMENDED_LIBRARIES['Multicaller']),
    instructions:
      'Enables "forwarding" of msg.sender to the contracts called; see repo for deployed contracts.',
    audit: {
      authors: ['0xphaze', '0xth0mas'],
      dates: [new Date('2023-10-07'), new Date('2023-12-14')],
      url: 'https://github.com/Vectorized/multicaller/tree/main/audits',
    },
  },
};
