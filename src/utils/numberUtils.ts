export const convertToNumber = (value: string): number =>
  +value
    .replace(/[^0-9,]/g, '') // Keep only numbers and commas
    .replace(/,(?=.*,)/g, '') // Remove all commas but the last one
    .replace(',', '.'); // Replace the comma with a punctuation

export const formatPrice = (value: string) =>
  value !== undefined
    ? convertToNumber(value).toLocaleString('sv-Se', {
        currency: 'SEK',
        style: 'currency',
        maximumFractionDigits: 2,
      })
    : '';
