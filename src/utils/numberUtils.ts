export const convertToNumber = (value: string): number =>
  +value
    .replace(/,(?=.*,)/g, '')
    .replace(',', '.')
    .replace(/[^0-9.-]/g, ''); // Remove all commas but the last one

export const formatPrice = (value: string, decimalPlaces: number) =>
  value !== undefined
    ? convertToNumber(value).toLocaleString('sv-Se', {
        currency: 'SEK',
        style: 'currency',
        maximumFractionDigits: decimalPlaces,
      })
    : '';
