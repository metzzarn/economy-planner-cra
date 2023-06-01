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
import { currencySymbol, formatAmount } from 'utils/numberUtils';
import { useAppSelector } from 'hooks';
import { selectDecimalPlaces, selectLanguage } from 'redux/settingsSlice';

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
  const language = useAppSelector(selectLanguage);
  const decimalPlaces = useAppSelector(selectDecimalPlaces);

  const [total, setTotal] = React.useState(
    formatAmount('0,0', decimalPlaces, language)
  );

  useEffect(() => {
    const total = props.data.reduce((acc, curr) => {
      return acc + Number(curr.value);
    }, 0);
    setTotal(formatAmount(total.toString(), decimalPlaces, language));
  }, [props.data, decimalPlaces, language]);

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
      minWidth: 200,
      maxWidth: 250,
      editable: true,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const errorMessage = requiredMaxLength(params.props.value);
        const error = errorMessage.length > 0 ? errorMessage : null;
        return { ...params.props, error: error };
      },
      renderEditCell: renderEdit,
      renderCell: (params: GridCellParams) => {
        return (
          <Tooltip title={'Double-click to edit'} enterDelay={700}>
            <span>{params.value as string}</span>
          </Tooltip>
        );
      },
    },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 2,
      minWidth: 80,
      maxWidth: 140,
      editable: true,

      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const errorMessage = isValidNumber(params.props.value)
          ? null
          : 'Must be a valid number';
        return { ...params.props, error: errorMessage };
      },
      renderEditCell: renderEdit,
      renderCell: (params: GridCellParams) => {
        return (
          <Tooltip title={'Double-click to edit'} enterDelay={700}>
            <span>
              {formatAmount(params.value as string, decimalPlaces, language)}
            </span>
          </Tooltip>
        );
      },
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 5,
      minWidth: 200,
      maxWidth: 250,
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

  const rows = props.data.map((entry: FinancialEntry, index) => {
    return {
      id: index,
      name: entry.name,
      amount: entry.value
        ?.toString()
        .replace('.', currencySymbol(language).decimal),
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
    <Box sx={{ maxWidth: '700px' }}>
      <DataGrid
        sx={{ mt: 1 }}
        columns={columns}
        rows={rows}
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
    </Box>
  );
};
