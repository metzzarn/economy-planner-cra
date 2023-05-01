import React from 'react';
import { FinancialEntry } from 'redux/common';
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridRowModel,
} from '@mui/x-data-grid';

interface AmountTableProps {
  data: FinancialEntry[];
  updateRow: (
    id: number,
    name: string,
    amount: number,
    description: string
  ) => void;
  removeRow: (id: number) => void;
}

export const FinanceTable = (props: AmountTableProps) => {
  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 5,
      editable: true,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 2,
      editable: true,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 5,
      editable: true,
    },
    {
      field: 'remove',
      headerName: '',
      flex: 1,
      editable: false,
      filterable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: () => <div style={{ cursor: 'pointer' }}>X</div>,
    },
  ];

  const rows = props.data.map((expense: FinancialEntry) => {
    return {
      id: expense.index,
      name: expense.name,
      amount: expense.value,
      description: expense.description,
    };
  });

  return (
    <div style={{ width: '700px' }}>
      <DataGrid
        sx={{ mt: 1 }}
        columns={columns}
        rows={rows}
        disableColumnSelector
        disableRowSelectionOnClick
        processRowUpdate={async (newRow: GridRowModel) => {
          props.updateRow(
            newRow.id,
            newRow.name,
            newRow.amount,
            newRow.description
          );
          return newRow;
        }}
        onProcessRowUpdateError={(error) => console.error(error)}
        onCellClick={(params: GridCellParams) =>
          params.field === 'remove' && props.removeRow(Number(params.id))
        }
      />{' '}
    </div>
  );
};
