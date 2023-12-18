import { RecommendedLibrary } from '@/lib/types/library';

/**
 * Known libraries that we want to recommend alternatives for.
 */
export const KNOWN_LIBRARIES: Record<RecommendedLibrary, string[]> = {
  Solady: [
    // OpenZeppelin
    'openzeppelin/',
    'openzeppelin-contracts/',
    'openzeppelin/contracts/',
    // Solmate
    'solmate/',
    'solmate/src/',
  ],
  Multicaller: [],
};

KNOWN_LIBRARIES.Multicaller = KNOWN_LIBRARIES.Solady;

/**
 * Remappings for known libraries, when the alternative doesn't have the same name.
 */
export const REMAPPINGS: Record<string, RecommendedLibrary> = {
  Multicall: 'Multicaller',
};
