export const validNumberPattern = '[0-9,.]*';

export const isValidNumber = (input: string) => {
  const regex = new RegExp(validNumberPattern);
  return regex.test(input);
};
