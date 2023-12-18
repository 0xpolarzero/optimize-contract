import { cva } from 'class-variance-authority';

export const codeBlockContainerVariants = cva(
  ['flex', 'flex-col', 'overflow-hidden', 'border', 'border-gray-6'],
  {
    variants: {
      roundedTop: {
        true: ['rounded-xl'],
        false: ['rounded-b-xl', 'rounded-t-none'],
      },
    },
  },
);

export const codeBlockHeaderFileNameContainerStyles = 'flex items-center space-x-2 text-gray-11';

export const codeBlockHeaderFileNameIconStyles = 'w-4 h-4';

export const codeBlockHeaderFileNameStyles = 'text-sm text-ellipsis overflow-hidden line-clamp-1';

export const codeBlockHeaderStyles =
  'flex h-10 grow items-center justify-between border-b border-gray-6 bg-gray-2 pl-4 pr-2 rounded-top-xl';

export const codeBlockLineHighlightedStyles = 'bg-indigo-4 shadow-[inset_2px_0] shadow-indigo-9';
export const codeBlockLineHighlightedDiffPlusStyles =
  'bg-green-4 shadow-[inset_2px_0] shadow-green-9';
export const codeBlockLineHighlightedDiffMinusStyles =
  'bg-red-4 shadow-[inset_2px_0] shadow-red-9 opacity-70';
export const codeBlockLineHighlightedDiffMultipleStyles =
  'bg-yellow-4 shadow-[inset_2px_0] shadow-yellow-9';

export const codeBlockLineNumberStyles = 'mr-4 inline-block w-4 text-end text-gray-11 select-none';
export const codeBlockDiffPlusStyles = 'inline-block w-4 text-green-11 select-none';
export const codeBlockDiffMinusStyles = 'inline-block w-4 text-red-11 select-none';
export const codeBlockDiffNoneStyles = 'inline-block w-4 select-none';
export const codeBlockDiffMultipleStyles = 'inline-block w-4 text-yellow-11 select-none';

export const codeBlockLineStyles = 'px-4 min-w-fit';

export const codeBlockPreVariants = cva(
  ['group', 'py-4', 'px-0', 'overflow-x-scroll', 'my-0', 'bg-gray-3'],
  {
    variants: {
      hasFileName: { true: ['rounded-b-xl', 'rounded-t-none'], false: ['rounded-xl'] },
    },
  },
);

export const codeBlockStyles = 'text-xs normal leading-5 flex flex-col min-w-fit';
