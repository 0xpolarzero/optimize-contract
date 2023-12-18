import { RecommendedContract } from '@/lib/types/library';

const tree = `src
├─ Multicaller.sol — "The multicaller contract"
├─ MulticallerWithSender.sol — "The multicaller with sender contract"
├─ MulticallerWithSigner.sol — "The multicaller with signer contract"
└─ LibMulticaller.sol — "Library to read the multicaller contracts"`;

export const parseMulticallerStructure: () => RecommendedContract[] = () => {
  const lines = tree.split('\n');
  const items: RecommendedContract[] = [];
  let currentPath = '';

  lines.forEach((line) => {
    const directoryMatch = line.match(/^(\w+)/);
    const itemMatch = line.match(/├─ (\w+)\.sol — "(.+)"/);
    console.log(itemMatch);

    if (directoryMatch) {
      currentPath = directoryMatch[1] ? `${directoryMatch[1]}/` : '';
    } else if (itemMatch) {
      items.push({
        library: 'Multicaller',
        name: itemMatch[1],
        url: `https://github.com/Vectorized/multicaller/tree/main/src/${currentPath}${itemMatch[1]}.sol`,
        import: `import { ${itemMatch[1]} } from "multicall/${currentPath}${itemMatch[1]}.sol";`,
        description: itemMatch[2],
      });
    }
  });

  return items;
};
