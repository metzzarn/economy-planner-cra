import React, { useEffect, useRef, useState } from 'react';
import { Table } from 'common/table/Table';
import { TableHeader } from 'common/table/TableHeader';
import { TableRow } from 'common/table/TableRow';
import { TableRowItem } from 'common/table/TableRowItem';
import { formatPrice } from 'utils/numberUtils';
import { TableFooter } from 'common/table/TableFooter';
import { TableFooterItem } from 'common/table/TableFooterItem';
import {
  editSavingsTitle,
  removeSaving,
  selectSavings,
  selectSavingsTitle,
  updateSaving,
} from 'redux/savingsSlice';
import { If } from 'common/If';
import { useAppDispatch, useAppSelector } from 'hooks';
import { FinancialEntry } from 'redux/common';
import { Field, Form } from 'react-final-form';

interface FormValues {
  title: string;
}

export const SavingsTable = () => {
  const dispatch = useAppDispatch();
  const savings = useAppSelector(selectSavings);
  const title = useAppSelector(selectSavingsTitle) || 'Savings';
  const [editValue, setEditValue] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const requiredField = (value: string) => (value ? undefined : 'Required');

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [editValue]);

  const titleInput = (
    <Form
      onSubmit={(formValues: FormValues) => {
        if (!formValues.title) {
          return;
        }

        setEditValue(false);
        return dispatch(editSavingsTitle(formValues.title));
      }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <div>
            <Field
              name={'title'}
              component={'input'}
              type={'text'}
              validate={requiredField}
              defaultValue={title}
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
  const rows = () => {
    return savings.map((saving: FinancialEntry, index: number) => {
      const updateName = (value: string) => {
        return dispatch(
          updateSaving({
            name: value,
            value: saving.value,
            description: saving.description,
            index,
          })
        );
      };
      const updateValue = (value: number) => {
        return dispatch(
          updateSaving({
            name: saving.name,
            value,
            description: saving.description,
            index,
          })
        );
      };
      const updateDescription = (description: string) => {
        return dispatch(
          updateSaving({
            name: saving.name,
            value: saving.value,
            description,
            index,
          })
        );
      };

      return (
        <TableRow key={index}>
          <TableRowItem
            index={index}
            allowEdit
            action={updateName}
            value={saving.name}
          />
          <TableRowItem
            index={index}
            allowEdit
            action={updateValue}
            value={formatPrice(saving.value.toString())}
          />
          <TableRowItem
            index={index}
            allowEdit
            action={updateDescription}
            value={saving.description}
          />
          <TableRowItem
            style={{ cursor: 'pointer' }}
            value={'X'}
            index={index}
            onClick={() => dispatch(removeSaving(index))}
          />
        </TableRow>
      );
    });
  };

  const footer = () => {
    return (
      <TableFooter>
        <TableFooterItem>
          <span style={{ fontWeight: 'bold' }}>Total</span>
        </TableFooterItem>
        <TableFooterItem>
          {savings.reduce(
            (acc: number, curr: FinancialEntry) => acc + curr.value,
            0
          )}
        </TableFooterItem>
      </TableFooter>
    );
  };

  return (
    <div style={{ width: '700px' }}>
      <h2
        onClick={() => {
          setEditValue(true);
        }}
      >
        {editValue ? titleInput : title}
      </h2>
      <If true={savings?.length > 0}>
        <Table rows={rows()} footer={footer()}>
          <TableHeader>Name</TableHeader>
          <TableHeader width={'20%'}>Amount</TableHeader>
          <TableHeader>Description</TableHeader>
          <TableHeader width={'5%'}></TableHeader>
        </Table>
      </If>
    </div>
  );
};
