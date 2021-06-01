import { initialPaginationState } from './pagination';

export const getCardState = (state = {}) => ({
  mode: state.cardMode,
  isOpen: state.isCardOpen || false,
  initialValues: state.cardValues || {},
  isLoadingCardData: state.isLoadingCardData || false,
});

export const getTableState = (state = {}) => ({
  list: state.list || [],
  selected: state.selected || [],
  isLoading: state.isLoading || false,
});

export const getFilterState = (state = {}) => ({
  initialValues: state.filterValues || {},
  isLoading: state.isLoading || false,
});

export const getPaginationState = (state = {}) => ({
  pagination: state.pagination || initialPaginationState,
  isLoading: state.isLoading || false,
  isResults: Boolean(state.list?.length),
});
