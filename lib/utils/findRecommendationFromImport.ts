import { KNOWN_CONTRACTS, PREFIXES } from '@/lib/constants/known-contracts';
import { KnownLibrary, RecommendedContract } from '@/lib/types/library';

const findRecommendationFromImport = (line: string): RecommendedContract | null => {
  // Find the library
  const lib = Object.keys(PREFIXES).find((library) => {
    const prefixes = PREFIXES[library as KnownLibrary];
    return prefixes.some((prefix) => line.includes(prefix));
  });
  if (!lib) return null;

  // Find the contract
  // Catch the exact contract name from the import statement (just catch what is before .sol until the previous /)
  const findName = line.match(/\/([^/]+)\.sol/);
  const contractName = findName ? findName[1] : null;
  if (!contractName) return null; // this should never happen

  // Find the recommended alternative, if any
  const contract = KNOWN_CONTRACTS[lib as KnownLibrary].find(
    (contract) => contract.name === contractName,
  );
  if (!contract) return null;

  return contract.recommendation;
};

export default findRecommendationFromImport;
