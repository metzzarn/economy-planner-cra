import React from 'react';
import { Table } from 'common/table/Table';
import { TableHeader } from 'common/table/TableHeader';
import { TableRow } from 'common/table/TableRow';
import { TableRowItem } from 'common/table/TableRowItem';
import { convertToNumber, formatPrice } from 'utils/numberUtils';
import { TableFooter } from 'common/table/TableFooter';
import { TableFooterItem } from 'common/table/TableFooterItem';
import {
  editSavingsTitle,
  removeSaving,
  selectSavings,
  selectSavingsSortOrder,
  selectSavingsTitle,
  sortSavingsByName,
  sortSavingsByValue,
  updateSaving,
} from 'redux/savingsSlice';
import { If } from 'common/If';
import { useAppDispatch, useAppSelector } from 'hooks';
import { FinancialEntry } from 'redux/common';
import {
  Editable,
  EditableArea,
  EditableInput,
  EditablePreview,
} from '@ark-ui/react';
import { SortOrder } from 'common/SortOrder';
import { selectDecimalPlaces } from 'redux/settingsSlice';

export const SavingsTable = () => {
  const dispatch = useAppDispatch();
  const savings = useAppSelector(selectSavings);
  const sortOrder = useAppSelector(selectSavingsSortOrder);
  const title = useAppSelector(selectSavingsTitle) || 'Savings';
  const decimalPlaces = useAppSelector(selectDecimalPlaces);

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
      const updateValue = (value: string) => {
        return dispatch(
          updateSaving({
            name: saving.name,
            value: convertToNumber(value),
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
          <TableRowItem allowEdit action={updateName} value={saving.name} />
          <TableRowItem
            allowEdit
            action={updateValue}
            value={formatPrice(saving.value.toString(), decimalPlaces)}
          />
          <TableRowItem
            allowEdit
            action={updateDescription}
            value={saving.description}
          />
          <TableRowItem
            style={{ cursor: 'pointer' }}
            value={'X'}
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
          {formatPrice(
            savings
              .reduce(
                (acc: number, curr: FinancialEntry) => acc + curr.value,
                0
              )
              .toString(),
            decimalPlaces
          )}
        </TableFooterItem>
      </TableFooter>
    );
  };

  return (
    <div style={{ width: '700px' }}>
      <h2>
        <Editable
          name={'savingsTitle'}
          placeholder={title}
          defaultValue={title}
          onSubmit={(value) => dispatch(editSavingsTitle(value.value))}
          maxLength={25}
          selectOnFocus={false}
        >
          <EditableArea>
            <EditableInput />
            <EditablePreview />
          </EditableArea>
        </Editable>
      </h2>
      <If true={savings?.length > 0}>
        <Table rows={rows()} footer={footer()}>
          <TableHeader
            onClick={() =>
              dispatch(
                sortSavingsByName(
                  sortOrder === SortOrder.Descending
                    ? SortOrder.Ascending
                    : SortOrder.Descending
                )
              )
            }
            style={{ cursor: 'pointer' }}
          >
            Name
          </TableHeader>
          <TableHeader
            width={'20%'}
            onClick={() =>
              dispatch(
                sortSavingsByValue(
                  sortOrder === SortOrder.Descending
                    ? SortOrder.Ascending
                    : SortOrder.Descending
                )
              )
            }
            style={{ cursor: 'pointer' }}
          >
            Amount
          </TableHeader>
          <TableHeader>Description</TableHeader>
          <TableHeader width={'5%'}></TableHeader>
        </Table>
      </If>
    </div>
  );
};
