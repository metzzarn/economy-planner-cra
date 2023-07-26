import React from 'react';
import { IncomeEntry } from 'redux/common';
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridSlotsComponentsProps,
} from '@mui/x-data-grid';
import { Box, Tooltip, Typography } from '@mui/material';
import { currencySymbol, formatAmount } from 'utils/numberUtils';
import { useAppDispatch, useAppSelector } from 'hooks';
import { selectDecimalPlaces, selectLanguage } from 'redux/settingsSlice';
import { selectIncome, setSelectedIncome } from 'redux/incomeSlice';
import { If } from 'components/common/If';

interface AmountTableProps {
  data: IncomeEntry[];
  removeRow: (index: number) => void;
}

declare module '@mui/x-data-grid' {
  interface FooterPropsOverrides {
    selectedIncome: string;
  }
}

export const IncomeTable = (props: AmountTableProps) => {
  const dispatch = useAppDispatch();
  const language = useAppSelector(selectLanguage);
  const decimalPlaces = useAppSelector(selectDecimalPlaces);
  const selectedIncome = useAppSelector(selectIncome);

  const columns: GridColDef[] = [
    {
      field: 'income',
      headerName: 'Income',
      flex: 2,
      minWidth: 290,
      maxWidth: 320,
      editable: false,
      renderCell: (params: GridCellParams) => {
        return formatAmount(params.value as string, decimalPlaces, language);
      },
    },
    {
      field: 'tax',
      headerName: 'Tax',
      flex: 5,
      minWidth: 290,
      maxWidth: 320,
      editable: false,
      renderCell: (params: GridCellParams) => {
        return params.value !== undefined
          ? formatAmount(params.value as string, decimalPlaces, language)
          : params.value;
      },
    },
    {
      field: 'remove',
      headerName: '',
      minWidth: 50,
      maxWidth: 50,
      editable: false,
      filterable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: () => (
        <Tooltip title={'Remove'} enterDelay={700}>
          <div style={{ cursor: 'pointer' }}>X</div>
        </Tooltip>
      ),
    },
  ];

  const rows = props.data.map((entry: IncomeEntry, index) => {
    return {
      id: index,
      income: entry.value
        ?.toString()
        .replace('.', currencySymbol(language).decimal),
      tax: entry.tax?.toString().replace('.', currencySymbol(language).decimal),
    };
  });

  const CustomFooterStatusComponent = (
    props: NonNullable<GridSlotsComponentsProps['footer']>,
  ) => {
    return (
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Typography sx={{ width: '100%', p: 1 }} align={'right'}>
          Selected income {props.selectedIncome}
        </Typography>
      </Box>
    );
  };

  return (
    <Box sx={{ maxWidth: '700px' }}>
      <If true={rows.length > 0}>
        <DataGrid
          sx={{ mt: 1 }}
          columns={columns}
          rows={rows}
          hideFooterPagination={true}
          hideFooterSelectedRowCount={true}
          disableColumnSelector
          disableRowSelectionOnClick
          onCellClick={(params: GridCellParams) => {
            params.field === 'income' &&
              dispatch(setSelectedIncome(Number(params.id)));
            return (
              params.field === 'remove' && props.removeRow(Number(params.id))
            );
          }}
          slots={{
            footer: CustomFooterStatusComponent,
          }}
          slotProps={{
            footer: {
              selectedIncome: selectedIncome ? selectedIncome.value : 0,
            },
          }}
        />
      </If>
    </Box>
  );
};
