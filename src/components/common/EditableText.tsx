import { Box, TextField } from '@mui/material';
import React, { useRef } from 'react';

interface EditableTextProps {
  text: string;
  action: (value: string) => void;
  multiline?: boolean;
  placeholder?: string;
  fontSize?: string;
  fontWeight?: number;
}

export const EditableText = (props: EditableTextProps) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const fontSize = props.fontSize || '1.5rem';
  const fontWeight = props.fontWeight || 700;

  return (
    <Box
      component={'form'}
      onSubmit={(e) => {
        e.preventDefault();
        props.action(titleRef.current?.value || props.text);
      }}
    >
      <TextField
        variant={'standard'}
        fullWidth
        multiline={props.multiline}
        placeholder={props.placeholder}
        inputRef={titleRef}
        defaultValue={props.text}
        onFocus={(e) => setIsEditing(true)}
        onBlur={() => {
          props.action(titleRef.current?.value || props.text);
          setIsEditing(false);
        }}
        InputProps={{ disableUnderline: true }}
        inputProps={{
          style: {
            textAlign: 'center',
            fontSize: fontSize,
            fontWeight: fontWeight,
            textDecoration: isEditing ? '#1976d2 underline' : 'none',
            textUnderlineOffset: '0.2rem',
          },
        }}
      />
    </Box>
  );
};
