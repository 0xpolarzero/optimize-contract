export type KnownLibrary = 'OpenZeppelin';

export type RecommendedLibrary = 'Solady';

export type Library = {
  name: KnownLibrary | RecommendedLibrary;
  description: string;
  url: string;
  contracts: Contract[];
  instructions?: string;
};

type Contract = {
  name: string;
  url: string;
};

export type KnownContract = Contract & {
  library: KnownLibrary;
  recommendation: RecommendedContract | undefined;
};

export type RecommendedContract = Contract & {
  library: RecommendedLibrary;
  import: string;
  description: string;
};
