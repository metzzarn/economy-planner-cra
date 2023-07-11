import { Box, Button, TextField } from '@mui/material';
import { convertToNumber } from 'utils/numberUtils';
import { isValidNumber } from 'utils/validation';
import React, { FormEvent, useState } from 'react';
import { useAppSelector } from 'hooks';
import { selectLanguage } from 'redux/settingsSlice';

interface Props {
  action: (value: number, tax: number) => void;
  titlePlaceholder: string;
  descriptionPlaceholder?: string;
  buttonText?: string;
}

export const EventEntryForm = (props: Props) => {
  const [incomeErrorText, setIncomeErrorText] = useState<string>('');

  const language = useAppSelector(selectLanguage);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const income = formData.get('title') as string;
    const description = formData.get('description') as string;

    if (
      !isValidNumber(income) ||
      (description !== '' && !isValidNumber(description))
    ) {
      return;
    }

    props.action(convertToNumber(income), convertToNumber(description));
  };

  return (
    <Box component={'form'} sx={{ mt: 1 }} onSubmit={handleSubmit}>
      <TextField
        sx={{ m: 1 }}
        required
        label={'Title'}
        name={'title'}
        variant={'outlined'}
        size={'small'}
        placeholder={props.titlePlaceholder}
        onChange={(event) =>
          isValidNumber(event.target.value)
            ? setIncomeErrorText(' ')
            : setIncomeErrorText('Must be a valid number')
        }
        helperText={incomeErrorText}
      />
      <TextField
        sx={{ m: 1 }}
        label={'Description'}
        name={'description'}
        variant={'outlined'}
        size={'small'}
        placeholder={props.descriptionPlaceholder}
        multiline
        minRows={3}
      />
      <Button sx={{ m: 1 }} variant="contained" type={'submit'}>
        Add income
      </Button>
    </Box>
  );
};
