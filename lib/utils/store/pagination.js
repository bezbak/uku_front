import { getPageParam } from '@utils/entity/parser';

export const initialPaginationState = {
  pageSize: 50,
  currentPage: 1,
  totalPages: 1,
  next: null,
  previous: null,
};

export const setPagination = (state, payload) => {
  const { count, next, previous } = payload;
  state.pagination.next = next;
  state.pagination.previous = previous;
  const totalPages = Math.ceil(count / state.pagination.pageSize);
  state.pagination.totalPages = totalPages;
  if (next) {
    const { page } = getPageParam(next);
    if (page) {
      state.pagination.currentPage = Number(page) - 1;
    }
  } else if (previous) {
    state.pagination.currentPage = totalPages;
  } else {
    state.pagination.currentPage = 1;
  }
};
