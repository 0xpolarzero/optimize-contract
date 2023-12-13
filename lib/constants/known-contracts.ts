import { RECOMMENDED_CONTRACTS } from '@/lib/constants/recommended-libraries';
import { KnownContract, KnownLibrary } from '@/lib/types/library';

export const PREFIXES: Record<KnownLibrary, string[]> = {
  OpenZeppelin: ['@openzeppelin/contracts', 'openzeppelin-contracts', 'openzeppelin/contracts'],
};

export const KNOWN_CONTRACTS: Record<KnownLibrary, KnownContract[]> = {
  OpenZeppelin: [
    {
      library: 'OpenZeppelin',
      name: 'ERC20',
      url: 'https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol',
      recommendation: RECOMMENDED_CONTRACTS['Solady'].find((contract) => contract.name === 'ERC20'),
    },
  ],
};
