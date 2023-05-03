export const validNumberPattern = '^\\d+([,.]\\d{1,4})?$';

export const isValidNumber = (input: string) => {
  const regex = new RegExp(validNumberPattern);
  return regex.test(input);
};

export const requiredMaxLength = (value: string) => {
  if (value && value.length > 30) {
    return 'Cannot be longer than 30 characters';
  }
  return value ? '' : 'Required';
};

export const maxLength = (value: string) => {
  if (value && value.length > 30) {
    return 'Cannot be longer than 30 characters';
  }
  return '';
};
