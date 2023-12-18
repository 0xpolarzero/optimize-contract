import { RECOMMENDED_LIBRARIES } from '../constants/recommended-libraries';

import { KNOWN_LIBRARIES } from '@/lib/constants/known-libraries';
import { RecommendedContract, RecommendedLibrary } from '@/lib/types/library';

export const findRecommendation_libraryToLibrary = (line: string): RecommendedContract | null => {
  // For all known libraries
  for (const [library, prefixes] of Object.entries(KNOWN_LIBRARIES)) {
    // If the import line contains a known prefix (associated with a recommendation)
    if (prefixes.some((prefix) => line.includes(prefix))) {
      // Get all its contracts
      const libraryContracts = RECOMMENDED_LIBRARIES[library as RecommendedLibrary];

      // Find the contract matching the import
      const findName = line.match(/\/([^/]+)\.sol/);
      const contractName = findName ? findName[1] : null;

      if (contractName) {
        // Return the recommended alternative if it exists
        return libraryContracts.find((contract) => contract.name === contractName) || null;
      }
    }
  }

  return null;
};
