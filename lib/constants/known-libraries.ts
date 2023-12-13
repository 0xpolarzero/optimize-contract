import { RecommendedLibrary } from '@/lib/types/library';

export const KNOWN_LIBRARIES: Record<RecommendedLibrary, string[]> = {
  Solady: [
    // OpenZeppelin
    '@openzeppelin/',
    'openzeppelin-contracts/',
    'openzeppelin/contracts/',
    // Solmate
    'transmissions11/solmate/',
    'solmate/',
  ],
};
