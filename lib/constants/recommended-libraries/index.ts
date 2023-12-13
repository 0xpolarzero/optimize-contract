import { parseSoladyStructure } from './solady';

import { RecommendedContract, RecommendedLibrary } from '@/lib/types/library';

export const RECOMMENDED_CONTRACTS: Record<RecommendedLibrary, RecommendedContract[]> = {
  Solady: parseSoladyStructure(),
};
