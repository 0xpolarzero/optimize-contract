export type Library = {
  name: KnownLibrary | RecommendedLibrary;
  author: Author;
  description: string;
  url: string;
  contracts: Contract[];
  instructions?: string;
  audit?: Audit | null;
};

type Author = {
  name: string;
  url: string;
};

type Contract = {
  name: string;
  url: string;
};

type Audit = {
  authors: string[];
  dates: Date[];
  url: string;
};

/**
 * Known libraries/contracts
 */

export type KnownLibrary = 'OpenZeppelin';

export type KnownContract = Contract & {
  library: KnownLibrary;
  recommendation: RecommendedContract | undefined;
};

/**
 * Recommended libraries/contracts
 */

export type RecommendedLibrary = 'Solady' | 'Multicaller';

export type RecommendedContract = Contract & {
  library: RecommendedLibrary;
  import: string;
  description: string;
};
