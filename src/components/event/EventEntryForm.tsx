import { Box, Button, TextField } from '@mui/material';
import React, { FormEvent } from 'react';

interface Props {
  action: (title: string, description: string) => void;
  titlePlaceholder: string;
  descriptionPlaceholder?: string;
  buttonText?: string;
}

export const EventEntryForm = (props: Props) => {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;

    props.action(title, description);
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
        {props.buttonText || 'Add'}
      </Button>
    </Box>
  );
};
