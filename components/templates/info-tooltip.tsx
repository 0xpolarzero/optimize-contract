import type { FC, ReactElement } from 'react';

import { HelpCircle } from 'lucide-react';

import { Tooltip } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

export type InfoTooltipProps = {
  content: ReactElement;
};

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const InfoTooltip: FC<InfoTooltipProps> = ({ content }) => {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Tooltip content={content}>
      <HelpCircle className="h-4 w-4 text-gray-300" />
    </Tooltip>
  );
};

InfoTooltip.displayName = 'InfoTooltip';

export default InfoTooltip;
