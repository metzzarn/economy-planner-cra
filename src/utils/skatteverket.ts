const columnNames = [
  'kolumn 1',
  'kolumn 2',
  'kolumn 3',
  'kolumn 4',
  'kolumn 5',
  'kolumn 6',
  'kolumn 7',
];

export const getTax = async (
  income: string,
  tax: string,
  tableNumber: number,
  column: number,
  year: number,
  useSkatteverket: boolean,
) => {
  if (useSkatteverket) {
    return await fetchTaxFromSkatteverket(
      Number(income),
      tableNumber,
      column,
      year,
    );
  }

  return tax;
};

const fetchTaxFromSkatteverket = async (
  value: number,
  tableNumber: number,
  column: number,
  year: number,
) => {
  const divider = value > 20000 ? 200 : 100;
  const toIncome = Math.ceil(value / divider) * divider;
  const fromIncome =
    toIncome === value
      ? Math.floor((value - 1) / divider) * divider + 1
      : Math.floor(value / divider) * divider + 1;

  const url =
    'https://skatteverket.entryscape.net/rowstore/dataset/88320397-5c32-4c16-ae79-d36d95b17b95' +
    '?tabellnr=' +
    tableNumber +
    '&inkomst%20t.o.m.=' +
    toIncome +
    '&inkomst%20fr.o.m.=' +
    fromIncome +
    '&%C3%A5r=' +
    year;

  return await fetch(url)
    .then((response) => response.json())
    .then((json) => {
      if (json.results.length > 0 && json.results[0][columnNames[column - 1]]) {
        return json.results[0][columnNames[column - 1]];
      }
    });
};
