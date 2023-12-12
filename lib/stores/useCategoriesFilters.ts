import { create } from 'zustand';

import { Category } from '@/components/templates/category-tag';

interface CategoriesFiltersState {
  currentFilter: Category | null;
  filter: (category: Category | null) => void;
}

export const useCategoriesFilters = create<CategoriesFiltersState>((set) => ({
  currentFilter: null,
  filter: (category) => set({ currentFilter: category }),
}));
