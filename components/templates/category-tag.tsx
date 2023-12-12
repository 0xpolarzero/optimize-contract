import type { FC } from 'react';

import { useCategoriesFilters } from '@/lib/stores/useCategoriesFilters';

import { Badge } from '@/components/ui';
import type { BadgeProps } from '@/components/ui/badge/types';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

export type Category = 'test' | 'other';

export type CategoryTagProps = Omit<BadgeProps, 'variant' | 'intent'> & {
  category: 'test' | 'other';
};

type Intent = 'none' | 'primary' | 'success' | 'fail' | 'warning' | 'orange';

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const CategoryTag: FC<CategoryTagProps> = ({ size, category, ...rest }) => {
  const CATEGORY_TO_COLORS: Record<typeof category, Intent> = {
    test: 'primary',
    other: 'orange',
  };

  const filter = useCategoriesFilters((state) => state.filter);

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <Badge
      size={size}
      variant="secondary"
      intent={CATEGORY_TO_COLORS[category]}
      className="hover:cursor-pointer hover:underline"
      onClick={() => filter(category)}
      {...rest}
    >
      {category}
    </Badge>
  );
};

CategoryTag.displayName = 'CategoryTag';

export default CategoryTag;
