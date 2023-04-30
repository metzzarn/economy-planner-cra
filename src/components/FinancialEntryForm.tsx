import { Field, Form } from 'react-final-form';
import { convertToNumber } from 'utils/numberUtils';
import React, { FormEvent, useState } from 'react';
import { isValidNumber, validNumberPattern } from 'utils/validation';
import { Box, Button, InputAdornment, TextField } from '@mui/material';

export interface FormValues {
  name: string;
  value: string;
  description: string;
}

interface Props {
  action: (name: string, value: number, description: string) => void;
  namePlaceholder?: string;
  descriptionPlaceholder?: string;
  buttonText?: string;
}

export const FinancialEntryForm = (props: Props) => {
  const [nameErrorText, setNameErrorText] = useState<string>('');
  const [amountErrorText, setAmountErrorText] = useState<string>('');
  const [descriptionErrorText, setDescriptionErrorText] = useState<string>('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    const value = formData.get('value') as string;
    const description = formData.get('description') as string;

    if (!name || !isValidNumber(value)) {
      return;
    }

    props.action(name, convertToNumber(value), description);
  };

  const requiredString = (value: string) => (value ? undefined : 'Required');

  const requiredMaxLength = (value: string) => {
    if (value && value.length > 30) {
      return 'Cannot be longer than 30 characters';
    }
    return value ? '' : 'Required';
  };

  const maxLength = (value: string) => {
    if (value && value.length > 30) {
      return 'Cannot be longer than 30 characters';
    }
    return '';
  };

  return (
    <Box component={'form'} sx={{ mt: 1 }} onSubmit={handleSubmit}>
      <TextField
        sx={{ m: 1 }}
        required
        label={'Name'}
        name={'name'}
        variant={'outlined'}
        size={'small'}
        placeholder={props.namePlaceholder ? props.namePlaceholder : ''}
        helperText={nameErrorText}
      />
      <TextField
        sx={{ m: 1 }}
        required
        label={'Amount'}
        name={'value'}
        variant={'outlined'}
        size={'small'}
        placeholder={'0,0 kr'}
        InputProps={{
          endAdornment: <InputAdornment position={'end'}>kr</InputAdornment>,
          inputProps: {
            inputMode: 'decimal',
            pattern: validNumberPattern,
          },
        }}
        onChange={(event) =>
          isValidNumber(event.target.value)
            ? setAmountErrorText(' ')
            : setAmountErrorText('Please enter a valid number')
        }
        helperText={amountErrorText}
      />
      <TextField
        sx={{ m: 1 }}
        label={'Description'}
        name={'description'}
        variant={'outlined'}
        size={'small'}
        placeholder={
          props.descriptionPlaceholder ? props.descriptionPlaceholder : ''
        }
        onChange={(event) =>
          setDescriptionErrorText(maxLength(event.target.value))
        }
        helperText={descriptionErrorText}
      />
      <Button sx={{ m: 1 }} variant="contained" type={'submit'}>
        Add
      </Button>
    </Box>
  );
  return (
    <Form
      onSubmit={(formValues: FormValues) => {
        if (!formValues.name || !formValues.value) {
          return;
        }

        return props.action(
          formValues.name,
          convertToNumber(formValues.value),
          formValues.description
        );
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <Field
              name={'name'}
              component={'input'}
              type={'text'}
              validate={(value) => requiredMaxLength(value)}
            >
              {({ input, meta }) => (
                <div>
                  <label>Name</label>
                  <input
                    {...input}
                    type={'text'}
                    placeholder={
                      props.namePlaceholder ? props.namePlaceholder : ''
                    }
                  />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field
              name={'value'}
              component={'input'}
              type={'text'}
              formatOnBlur
              validate={requiredString}
            >
              {({ input, meta }) => (
                <div>
                  <label>Amount</label>
                  <input {...input} type="text" placeholder="0,0 kr" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>

            <Field
              name={'description'}
              component={'input'}
              type={'text'}
              validate={(value) => maxLength(value)}
            >
              {({ input, meta }) => (
                <div>
                  <label>Description</label>
                  <input
                    {...input}
                    type={'text'}
                    placeholder={
                      props.descriptionPlaceholder
                        ? props.descriptionPlaceholder
                        : ''
                    }
                  />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
          </div>
          <div>
            <Button variant="contained" type={'submit'}>
              {props.buttonText ? props.buttonText : 'Submit'}
            </Button>
          </div>
        </form>
      )}
    />
  );
};
