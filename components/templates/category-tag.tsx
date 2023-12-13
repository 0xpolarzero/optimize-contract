import type { FC } from 'react';

import { Badge } from '@/components/ui';
import type { BadgeProps } from '@/components/ui/badge/types';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

export type Category = 'Vectorized';

export type CategoryTagProps = Omit<BadgeProps, 'variant' | 'intent'> & {
  category: Category;
  url?: string;
};

type Intent = 'none' | 'primary' | 'success' | 'fail' | 'warning' | 'orange';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const CategoryTag: FC<CategoryTagProps> = ({ size, category, url, ...rest }) => {
  const CATEGORY_TO_COLORS: Record<typeof category, Intent> = {
    Vectorized: 'orange',
  };

  const openUrl = () => {
    window.open(url, '_blank');
  };

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Badge
      size={size}
      variant="secondary"
      intent={CATEGORY_TO_COLORS[category]}
      className="hover:cursor-pointer hover:underline"
      onClick={() => openUrl()}
      {...rest}
    >
      {category}
    </Badge>
  );
};

CategoryTag.displayName = 'CategoryTag';

export default CategoryTag;
