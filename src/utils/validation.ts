export const isValidNumber = (input: string) => {
  const regex = new RegExp('^[0-9,.]*$');
  return regex.test(input);
};
