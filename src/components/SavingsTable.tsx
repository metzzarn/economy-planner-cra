import React from 'react';
import { Table } from 'common/table/Table';
import { TableHeader } from 'common/table/TableHeader';
import { useSelector } from 'react-redux';
import { TableRow } from 'common/table/TableRow';
import { TableRowItem } from 'common/table/TableRowItem';
import { formatPrice } from 'utils/numberUtils';
import { TableFooter } from 'common/table/TableFooter';
import { TableFooterItem } from 'common/table/TableFooterItem';
import { selectSavings } from 'redux/economySlice';
import { If } from 'common/If';

export const SavingsTable = () => {
  const savings = useSelector(selectSavings);

  const rows = () => {
    return savings.map((saving) => {
      return (
        <TableRow>
          <TableRowItem>{saving.name}</TableRowItem>
          <TableRowItem>{formatPrice(saving.value.toString())}</TableRowItem>
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
          <TableHeader>Description</TableHeader>
          <TableHeader width={'20%'}>Amount</TableHeader>
        </Table>
      </If>
    </div>
  );
};
