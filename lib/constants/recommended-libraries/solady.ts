import { RecommendedContract } from '@/lib/types/library';

const tree = `accounts
├─ Receiver — "Receiver mixin for ETH and safe-transferred ERC721 and ERC1155 tokens"
├─ ERC1271 — "ERC1271 mixin with nested EIP-712 approach"
├─ ERC4337 — "Simple ERC4337 account implementation"
├─ ERC4337Factory — "Simple ERC4337 account factory implementation"
├─ ERC6551 — "Simple ERC6551 account implementation"
├─ ERC6551Proxy — "Relay proxy for upgradeable ERC6551 accounts"
auth
├─ Ownable — "Simple single owner authorization mixin"
├─ OwnableRoles — "Simple single owner and multiroles authorization mixin"
tokens
├─ WETH — "Simple Wrapped Ether implementation"
├─ ERC20 — "Simple ERC20 + EIP-2612 implementation"
├─ ERC4626 — "Simple ERC4626 tokenized Vault implementation"
├─ ERC721 — "Simple ERC721 implementation with storage hitchhiking"
├─ ERC2981 — "Simple ERC2981 NFT Royalty Standard implementation"
├─ ERC1155 — "Simple ERC1155 implementation"
├─ ERC6909 — "Simple EIP-6909 minimal multi-token implementation"
utils
├─ MerkleProofLib — "Library for verification of Merkle proofs"
├─ SignatureCheckerLib — "Library for verification of ECDSA and ERC1271 signatures"
├─ ECDSA — "Library for verification of ECDSA signatures"
├─ EIP712 — "Contract for EIP-712 typed structured data hashing and signing"
├─ ERC1967Factory — "Factory for deploying and managing ERC1967 proxy contracts"
├─ ERC1967FactoryConstants — "The address and bytecode of the canonical ERC1967Factory"
├─ JSONParserLib — "Library for parsing JSONs"
├─ LibSort — "Library for efficient sorting of memory arrays"
├─ LibPRNG — "Library for generating pseudorandom numbers"
├─ Base64 — "Library for Base64 encoding and decoding"
├─ SSTORE2 — "Library for cheaper reads and writes to persistent storage"
├─ CREATE3 — "Deploy to deterministic addresses without an initcode factor"
├─ LibRLP — "Library for computing contract addresses from their deployer and nonce"
├─ LibBit — "Library for bit twiddling and boolean operations"
├─ LibZip — "Library for compressing and decompressing bytes"
├─ Clone — "Class with helper read functions for clone with immutable args"
├─ LibClone — "Minimal proxy library"
├─ UUPSUpgradeable — "UUPS proxy mixin"
├─ LibString — "Library for converting numbers into strings and other string operations"
├─ LibBitmap — "Library for storage of packed booleans"
├─ LibMap — "Library for storage of packed unsigned integers"
├─ MinHeapLib — "Library for managing a min-heap in storage"
├─ RedBlackTreeLib — "Library for managing a red-black-tree in storage"
├─ Multicallable — "Contract that enables a single call to call multiple methods on itself"
├─ GasBurnerLib — "Library for burning gas without reverting"
├─ SafeTransferLib — "Safe ERC20/ETH transfer lib that handles missing return values"
├─ DynamicBufferLib — "Library for buffers with automatic capacity resizing"
├─ MetadataReaderLib — "Library for reading contract metadata robustly"
├─ FixedPointMathLib — "Arithmetic library with operations for fixed-point numbers"
├─ SafeCastLib — "Library for integer casting that reverts on overflow"
└─ DateTimeLib — "Library for date time operations"`;

export const parseSoladyStructure: () => RecommendedContract[] = () => {
  const lines = tree.split('\n');
  const items: RecommendedContract[] = [];
  let currentPath = '';

  lines.forEach((line) => {
    const directoryMatch = line.match(/^(\w+)/);
    const itemMatch = line.match(/├─ (\w+) — "(.+)"/);

    if (directoryMatch) {
      currentPath = directoryMatch[1];
    } else if (itemMatch) {
      items.push({
        library: 'Solady',
        name: itemMatch[1],
        url: `https://github.com/Vectorized/solady/blob/main/src/${currentPath}/${itemMatch[1]}.sol`,
        import: `import { ${itemMatch[1]} } from "solady/${currentPath}/${itemMatch[1]}.sol";`,
        description: itemMatch[2],
      });
    }
  });

  return items;
};
