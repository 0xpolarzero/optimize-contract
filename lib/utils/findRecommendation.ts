import { RECOMMENDED_LIBRARIES } from '../constants/recommended-libraries';

import { EXCEPTIONS, KNOWN_LIBRARIES, REMAPPINGS } from '@/lib/constants/known-libraries';
import { RecommendedContract, RecommendedLibrary } from '@/lib/types/library';

/**
 * Find recommended contracts, as part of libraries, for a set of import lines,
 * by reading the whole library for all imports.
 */
export const findRecommendation_libraryToRecommended = (
  lines: string[],
): Record<string, RecommendedContract[]> => {
  const recommendations: Record<string, RecommendedContract[]> = {};

  // For all known libraries
  for (const [library, prefixes] of Object.entries(KNOWN_LIBRARIES)) {
    for (const line of lines) {
      // If the import line contains a known prefix (associated with a recommendation)
      if (prefixes.some((prefix) => line.includes(prefix))) {
        // Get all its contracts
        const libraryContracts = RECOMMENDED_LIBRARIES[library as RecommendedLibrary];

        // Find the contract matching the import
        const findName = line.match(/\/([^/]+)\.sol/);
        let contractName = findName ? findName[1] : null;

        // Check if there is a remapping to be done (e.g. Multicall => Multicaller)
        if (contractName && REMAPPINGS[contractName]) {
          contractName = REMAPPINGS[contractName];
        }

        // If we got a name, and a matching contract
        if (contractName && libraryContracts.some((contract) => contract.name === contractName)) {
          // Check for exceptions
          if (EXCEPTIONS[contractName]) {
            // Return all matching contracts from the exceptions list
            const exceptionContracts = EXCEPTIONS[contractName]
              .map((name) => libraryContracts.find((contract) => contract.name === name))
              .filter((contract): contract is RecommendedContract => contract !== undefined);
            recommendations[line] = exceptionContracts;
          } else {
            // Return the recommended alternative if it exists
            const recommendedContract = libraryContracts.find(
              (contract) => contract.name === contractName,
            );
            recommendations[line] = recommendedContract ? [recommendedContract] : [];
          }
        }
      }
    }
  }

  return recommendations;
};

/**
 * Find a recommended contract, as part of a library, for a given contract name.
 */
export const findRecommendation_nameToRecommended = (
  contractNames: string[],
): Record<string, RecommendedContract[]> => {
  const recommendations: Record<string, RecommendedContract[]> = {};

  // For all known libraries
  for (const [library, contracts] of Object.entries(RECOMMENDED_LIBRARIES)) {
    for (const contractName of contractNames) {
      // Check if there is a remapping to be done (e.g. Multicall => Multicaller)
      const mappedContractName = REMAPPINGS[contractName] || contractName;

      // If the contract name matches any recommended contract
      if (contracts.some((contract) => contract.name === mappedContractName)) {
        // Check for exceptions
        if (EXCEPTIONS[mappedContractName]) {
          // Return all matching contracts from the exceptions list
          const exceptionContracts = EXCEPTIONS[mappedContractName]
            .map((name) => contracts.find((contract) => contract.name === name))
            .filter((contract): contract is RecommendedContract => contract !== undefined);
          recommendations[contractName] = exceptionContracts;
        } else {
          // Return the recommended alternatives if they exist
          const recommendedContracts = contracts.filter(
            (contract) => contract.name === mappedContractName,
          );
          recommendations[contractName] = recommendedContracts;
        }
      }
    }
  }

  return recommendations;
};
