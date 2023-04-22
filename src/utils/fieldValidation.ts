export const requiredString = (value: string) =>
  value ? undefined : 'Required';

export const requiredMaxLength = (value: string, message?: string) => {
  if (value && value.length > 30) {
    return message ? message : 'Cannot be longer than 30 characters';
  }

  return value ? undefined : 'Required';
};

export const maxLength = (value: string, message?: string) => {
  if (value && value.length > 30) {
    return message ? message : 'Cannot be longer than 30 characters';
  }
  return undefined;
};
