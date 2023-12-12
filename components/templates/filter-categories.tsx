import type { FC } from 'react';

import { Filter } from 'lucide-react';

import { useCategoriesFilters } from '@/lib/stores/useCategoriesFilters';

import { Category } from '@/components/templates/category-tag';
import { Button, Select } from '@/components/ui';

// -----------------------------------------------------------------------------
// Props
// -----------------------------------------------------------------------------

type FilterCategoriesProps = { categories: Category[] };

// -----------------------------------------------------------------------------
// Component
// -----------------------------------------------------------------------------

const FilterCategories: FC<FilterCategoriesProps> = ({ categories }) => {
  const { currentFilter, filter } = useCategoriesFilters((state) => ({
    currentFilter: state.currentFilter,
    filter: state.filter,
  }));

  return (
    <div className="flex items-center space-x-4">
      <div className="text-gray-11">
        <Filter />
      </div>
      <Select
        size="md"
        variant="primary"
        intent="none"
        value={currentFilter ? currentFilter : 'All categories'}
        onChange={(e) =>
          e.target.value == 'All categories' ? filter(null) : filter(e.target.value as Category)
        }
      >
        <option>All categories</option>
        {categories.map((category) => (
          <option key={category}>{category}</option>
        ))}
      </Select>
      <Button size="md" variant="ghost" intent="none" onClick={() => filter(null)}>
        Clear
      </Button>
    </div>
  );
};

FilterCategories.displayName = 'FilterCategories';

export default FilterCategories;
