import React, { useEffect } from 'react';
import { FinancialEntry } from 'redux/common';
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridEditInputCell,
  GridPreProcessEditCellProps,
  GridRenderEditCellParams,
  GridRowModel,
  GridSlotsComponentsProps,
} from '@mui/x-data-grid';
import { isValidNumber, maxLength, requiredMaxLength } from 'utils/validation';
import {
  Box,
  styled,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from '@mui/material';
import { currencySymbol, formatPrice } from 'utils/numberUtils';
import { useAppSelector } from 'hooks';
import { selectCurrency, selectDecimalPlaces } from 'redux/settingsSlice';

interface AmountTableProps {
  data: FinancialEntry[];
  updateRow: (
    index: number,
    name: string,
    amount: string,
    description: string
  ) => void;
  removeRow: (index: number) => void;
}

declare module '@mui/x-data-grid' {
  interface FooterPropsOverrides {
    total: string;
  }
}

export const FinanceTable = (props: AmountTableProps) => {
  const currency = useAppSelector(selectCurrency);
  const decimalPlaces = useAppSelector(selectDecimalPlaces);

  const [total, setTotal] = React.useState(
    formatPrice('0,0', decimalPlaces, currency)
  );

  useEffect(() => {
    const total = props.data.reduce((acc, curr) => {
      return acc + Number(curr.value);
    }, 0);
    setTotal(formatPrice(total.toString(), decimalPlaces, currency));
  });

  const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.error.main,
      color: theme.palette.error.contrastText,
    },
  }));

  const renderEdit = (params: GridRenderEditCellParams) => {
    const { error } = params;
    return (
      <div>
        <div>
          <GridEditInputCell {...params} error={!!error} />
        </div>
        <StyledTooltip open={!!error} title={error || ''}>
          <div></div>
        </StyledTooltip>
      </div>
    );
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      flex: 5,
      editable: true,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const errorMessage = requiredMaxLength(params.props.value);
        const error = errorMessage.length > 0 ? errorMessage : null;
        return { ...params.props, error: error };
      },
      renderEditCell: renderEdit,
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 2,
      editable: true,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const errorMessage = isValidNumber(params.props.value)
          ? null
          : 'Must be a valid number';
        return { ...params.props, error: errorMessage };
      },
      renderEditCell: renderEdit,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 5,
      editable: true,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const errorMessage = maxLength(params.props.value);
        const error = errorMessage.length > 0 ? errorMessage : null;
        return { ...params.props, error: error };
      },
      renderEditCell: renderEdit,
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

  const rows = props.data.map((entry: FinancialEntry, index) => {
    return {
      id: index,
      name: entry.name,
      amount: entry.value
        ?.toString()
        .replace('.', currencySymbol(currency).decimal),
      description: entry.description,
    };
  });

  const CustomFooterStatusComponent = (
    props: NonNullable<GridSlotsComponentsProps['footer']>
  ) => {
    return (
      <Box
        sx={{
          display: 'flex',
        }}
      >
        <Typography sx={{ width: '100%', p: 1 }} align={'right'}>
          Total {props.total}
        </Typography>
      </Box>
    );
  };

  return (
    <div style={{ width: '700px' }}>
      <DataGrid
        sx={{ mt: 1 }}
        columns={columns}
        rows={rows}
        // hideFooter={true}
        hideFooterPagination={true}
        hideFooterSelectedRowCount={true}
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
        slots={{
          footer: CustomFooterStatusComponent,
        }}
        slotProps={{
          footer: { total },
        }}
      />
    </div>
  );
};
