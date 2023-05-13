import { Box, TextField } from '@mui/material';
import React, { useRef } from 'react';

interface EditableTextProps {
  title: string;
  action: (value: string) => void;
}

export const EditableText = (props: EditableTextProps) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  return (
    <Box
      component={'form'}
      onSubmit={(e) => {
        e.preventDefault();
        props.action(titleRef.current?.value || props.title);
      }}
    >
      <TextField
        variant={'standard'}
        fullWidth
        inputRef={titleRef}
        defaultValue={props.title}
        onFocus={(e) => setIsEditing(true)}
        onBlur={() => {
          props.action(titleRef.current?.value || props.title);
          setIsEditing(false);
        }}
        InputProps={{ disableUnderline: true }}
        inputProps={{
          style: {
            textAlign: 'center',
            fontSize: '1.5rem',
            fontWeight: 700,
            textDecoration: isEditing ? '#1976d2 underline' : 'none',
            textUnderlineOffset: '0.2rem',
          },
        }}
      />
    </Box>
  );
};
