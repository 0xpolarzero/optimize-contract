import { useRouter } from 'next/navigation';
import { type FC, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type FeatureDisplayProps = {
  className?: string;
  name: string;
  description: string;
  symbol: ReactNode;
  tags?: ReactNode[];
  button?: ReactNode;
  children: ReactNode;
  internalLink?: string;
  addUrl?: string;
  bgBase?: string;
  bgImmersive?: string;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const FeatureDisplay: FC<FeatureDisplayProps> = ({
  className,
  name,
  description,
  symbol,
  tags,
  button,
  children,
  internalLink,
  addUrl,
}) => {
  const router = useRouter();

  const handleClick = () => {
    if (addUrl) {
      window.open(addUrl, '_blank');
    } else if (internalLink) {
      router.push(internalLink);
    }
  };

  return (
    <div
      className={cn(
        'flex h-max w-64 flex-col overflow-hidden rounded-xl border border-gray-6 md:h-full',
        className,
      )}
    >
      {/* Header */}
      <div
        className="relative flex h-[4.5rem] items-center space-x-2.5 border-b border-gray-7 bg-gray-2 px-4"
        onClick={handleClick}
      >
        {/* Symbol */}
        <div className="flex h-min w-min items-center justify-center rounded border border-gray-6 bg-gray-3 p-2 text-gray-11">
          <div className="flex h-6 w-6 items-center justify-center">{symbol}</div>
        </div>
        {/* Title + subtitle */}
        <div>
          <div className="line-clamp-1 text-ellipsis font-medium text-gray-12">{name}</div>
          <div className="line-clamp-1 text-ellipsis text-sm text-gray-11">{description}</div>
        </div>
      </div>

      {/* Body */}
      <div className="w-full grow bg-gray-2" onClick={handleClick}>
        {children}
      </div>

      {/* Footer */}
      {tags || button ? (
        <div
          className="flex h-min flex-wrap items-center justify-between border-t border-gray-6 bg-gray-2 p-2 transition duration-200 ease-in-out sm:flex-nowrap"
          style={{ gap: 8 }}
        >
          {/* Tags */}
          <div className="flex flex-wrap items-center" style={{ gap: 4 }}>
            {tags ? tags.map((tag) => tag) : null}
          </div>

          {/* Button */}
          <div className="whitespace-nowrap">{button}</div>
        </div>
      ) : null}
    </div>
  );
};

export default FeatureDisplay;
