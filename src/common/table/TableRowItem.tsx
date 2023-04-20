import styles from 'common/table/TableRowItem.module.css';
import React, { CSSProperties, useEffect, useRef, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { FormValues } from 'components/FinancialEntryForm';
import { requiredString } from 'utils/fieldValidation';

interface Props {
  value: string;
  allowEdit?: boolean;
  index?: number;
  action?: (value: any) => void;
  style?: CSSProperties;
  onClick?: () => any;
}
export const TableRowItem = (props: Props) => {
  const [showEditIcon, setShowEditIcon] = useState(false);
  const [editValue, setEditValue] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [editValue]);

  const input = (
    <Form
      onSubmit={(formValues: FormValues) => {
        if (!formValues.value) {
          return;
        }

        setEditValue(false);
        props.action && props.action(formValues.value);
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <Field
              name={'value'}
              component={'input'}
              type={'text'}
              validate={requiredString}
              defaultValue={props.value}
            >
              {({ input, meta }) => (
                <div>
                  <input
                    ref={inputRef}
                    {...input}
                    onBlur={() => {
                      setEditValue(false);
                      return handleSubmit;
                    }}
                    type={'text'}
                  />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
          </div>
        </form>
      )}
    />
  );

  return (
    <th
      style={props.style}
      className={styles.item}
      onMouseEnter={() => props.allowEdit && setShowEditIcon(true)}
      onMouseLeave={() => props.allowEdit && setShowEditIcon(false)}
      onClick={() => {
        props.onClick && props.onClick();
        props.allowEdit && setEditValue(true);
      }}
    >
      {editValue ? input : props.value}
      {!editValue && showEditIcon && <span>[X]</span>}
    </th>
  );
};
