import { Box, Button, TextField } from '@mui/material';
import React, { FormEvent } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  action: (title: string, description: string) => void;
}

export const EventEntryForm = (props: Props) => {
  const { t } = useTranslation();

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
        label={t('Title')}
        name={'title'}
        variant={'outlined'}
        size={'small'}
        placeholder={t('Travel to Australia')}
      />
      <TextField
        sx={{ m: 1 }}
        label={t('Description')}
        name={'description'}
        variant={'outlined'}
        size={'small'}
        placeholder={t('Eat at restaurants')}
        multiline
        minRows={3}
      />
      <Button sx={{ m: 1 }} variant="contained" type={'submit'}>
        {t('Add event')}
      </Button>
    </Box>
  );
};
