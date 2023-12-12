export type KnownLibrary = 'OpenZeppelin';

export type RecommendedLibrary = 'Solady';

export type Library = {
  name: KnownLibrary | RecommendedLibrary;
  url: string;
  contracts: Contract[];
  instructions?: string;
};

type Contract = {
  library: KnownLibrary | RecommendedLibrary;
  name: string;
  url: string;
};

export type KnownContract = Contract & {
  recommendation: RecommendedContract;
};

export type RecommendedContract = Contract & {
  import: string;
  instructions?: string;
};
