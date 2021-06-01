/* eslint-disable import/prefer-default-export */
import findIndex from 'lodash/findIndex';

export const updateList = (state, objToReplace) => {
  const elementIndex = findIndex(state.list, { id: objToReplace.id });
  if (elementIndex !== -1) {
    state.list[elementIndex] = objToReplace;
  }
};
