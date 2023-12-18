import { parseMulticallerStructure } from './multicaller';
import { parseSoladyStructure } from './solady';

import { RecommendedContract, RecommendedLibrary } from '@/lib/types/library';

export const RECOMMENDED_LIBRARIES: Record<RecommendedLibrary, RecommendedContract[]> = {
  Solady: parseSoladyStructure(),
  Multicaller: parseMulticallerStructure(),
};
