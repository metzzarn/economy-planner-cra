import { SortOrder } from 'common/SortOrder';

export const arraySortByValue = (array: any[], order: SortOrder) => {
  if (order === SortOrder.Descending) {
    array.sort((a, b) => (a.value < b.value ? 1 : -1));
  } else if (order === SortOrder.Ascending) {
    array.sort((a, b) => (a.value > b.value ? 1 : -1));
  }
  return array;
};
