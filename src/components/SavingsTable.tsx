import React from 'react';
import { Table } from 'common/table/Table';
import { TableHeader } from 'common/table/TableHeader';
import { useSelector } from 'react-redux';
import { TableRow } from 'common/table/TableRow';
import { TableRowItem } from 'common/table/TableRowItem';
import { formatPrice } from 'utils/numberUtils';
import { TableFooter } from 'common/table/TableFooter';
import { TableFooterItem } from 'common/table/TableFooterItem';
import { selectSavings, updateSaving } from 'redux/economySlice';
import { If } from 'common/If';
import { useAppDispatch } from 'hooks';

export const SavingsTable = () => {
  const dispatch = useAppDispatch();
  const savings = useSelector(selectSavings);

  const rows = () => {
    return savings.map((saving, index) => {
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
          {savings.reduce((acc, curr) => acc + curr.value, 0)}
        </TableFooterItem>
      </TableFooter>
    );
  };

  return (
    <div style={{ width: '700px' }}>
      <h2>Savings</h2>
      <If true={savings?.length > 0}>
        <Table rows={rows()} footer={footer()}>
          <TableHeader>Name</TableHeader>
          <TableHeader width={'20%'}>Amount</TableHeader>
          <TableHeader>Description</TableHeader>
        </Table>
      </If>
    </div>
  );
};
