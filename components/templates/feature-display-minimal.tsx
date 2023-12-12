import type { FC, ReactNode } from 'react';

import { cn } from '@/lib/utils';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type FeatureDisplayMinimalProps = {
  className?: string;
  name: string;
  details: string;
  description: string;
  symbol: ReactNode;
  button: ReactNode;
  allowWrap?: boolean;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const FeatureDisplayMinimal: FC<FeatureDisplayMinimalProps> = ({
  className,
  name,
  details,
  description,
  symbol,
  button,
  allowWrap = false,
}) => {
  return (
    <div
      className={cn(
        'flex justify-between rounded-xl border border-gray-6 bg-gray-2 px-4',
        allowWrap ? 'flex-col' : 'h-[4.5rem] items-center',
        className,
      )}
    >
      <div className={cn('flex items-center justify-between')}>
        <div className={cn('flex', allowWrap ? 'mb-2 mt-4 items-start' : 'items-center')}>
          {/* Symbol */}
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded border border-gray-6 bg-gray-3 p-2 text-gray-11',
              allowWrap ? 'mt-[2px]' : '',
            )}
          >
            <div className="flex h-6 w-6 items-center justify-center">{symbol}</div>
          </div>
          {/* Name + description (!allowWrap) */}
          <div className="ml-2.5 mr-2">
            <div
              className={cn(
                'font-medium text-gray-12',
                allowWrap ? '' : 'line-clamp-1 text-ellipsis',
              )}
            >
              {name}
            </div>
            {!allowWrap ? (
              <div className={cn('line-clamp-1 text-ellipsis text-sm text-gray-11')}>
                {description}
              </div>
            ) : (
              <div className={cn('text-sm font-medium text-gray-11')}>{details}</div>
            )}
          </div>
        </div>

        {/* Button */}
        {button}
      </div>
      {/* description (allowWrap) */}
      {allowWrap ? <div className={cn('mb-2 text-sm text-gray-11')}>{description}</div> : null}
    </div>
  );
};

export default FeatureDisplayMinimal;
