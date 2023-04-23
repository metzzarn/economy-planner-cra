import { SortOrder } from 'common/SortOrder';

export const arraySort = (array: any[], order: SortOrder) => {
  if (order === SortOrder.Descending) {
    array.sort((a, b) => (a.name < b.name ? 1 : -1));
  } else if (order === SortOrder.Ascending) {
    array.sort((a, b) => (a.name > b.name ? 1 : -1));
  }
  return array;
};
