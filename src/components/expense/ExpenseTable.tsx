import React, { useEffect } from 'react';
import { ExpenseEntry } from 'redux/common';
import {
  DataGrid,
  GridCellParams,
  GridColDef,
  GridEditInputCell,
  GridEditSingleSelectCell,
  GridPreProcessEditCellProps,
  GridRenderEditCellParams,
  GridRowModel,
  GridSlotsComponentsProps,
  GridValueFormatterParams,
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
import { If } from 'components/common/If';
import { useTranslation } from 'react-i18next';

interface ExpenseTableProps {
  data: ExpenseEntry[];
  updateRow: (
    index: number,
    name: string,
    amount: string,
    description: string,
    priority: string,
  ) => void;
  removeRow: (index: number) => void;
}

declare module '@mui/x-data-grid' {
  interface FooterPropsOverrides {
    total: string;
  }
}

export const ExpenseTable = (props: ExpenseTableProps) => {
  const language = useAppSelector(selectLanguage);
  const decimalPlaces = useAppSelector(selectDecimalPlaces);
  const { t } = useTranslation();

  const [total, setTotal] = React.useState(
    formatAmount('0,0', decimalPlaces, language),
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

  const renderPriorityEdit = (params: GridRenderEditCellParams) => {
    const { error } = params;
    return (
      <div>
        <GridEditSingleSelectCell
          getOptionLabel={(value) => t(value)}
          {...params}
          error={!!error}
        />
      </div>
    );
  };

  const editTooltip = t('Double-click to edit');

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: t('Name'),
      flex: 5,
      minWidth: 200,
      maxWidth: 250,
      editable: true,
      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const errorMessage = requiredMaxLength(t, params.props.value);
        const error = errorMessage.length > 0 ? errorMessage : null;
        return { ...params.props, error: error };
      },
      renderEditCell: renderEdit,
      renderCell: (params: GridCellParams) => {
        return (
          <Tooltip title={editTooltip} enterDelay={700}>
            <span>{params.value as string}</span>
          </Tooltip>
        );
      },
    },
    {
      field: 'amount',
      headerName: t('Amount'),
      flex: 2,
      minWidth: 80,
      maxWidth: 140,
      editable: true,

      preProcessEditCellProps: (params: GridPreProcessEditCellProps) => {
        const errorMessage = isValidNumber(params.props.value)
          ? null
          : t('Must be a valid number');
        return { ...params.props, error: errorMessage };
      },
      renderEditCell: renderEdit,
      renderCell: (params: GridCellParams) => {
        return (
          <Tooltip title={editTooltip} enterDelay={700}>
            <span>
              {formatAmount(params.value as string, decimalPlaces, language)}
            </span>
          </Tooltip>
        );
      },
    },
    {
      field: 'description',
      headerName: t('Description'),
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
      field: 'priority',
      type: 'singleSelect',
      headerName: t('Priority'),
      flex: 5,
      minWidth: 85,
      maxWidth: 100,
      editable: true,
      valueOptions: () => {
        return ['Must', 'Need', 'Want'];
      },
      valueFormatter: (params: GridValueFormatterParams<number>) =>
        t(params.value.toLocaleString()),
      renderEditCell: renderPriorityEdit,
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
        <Tooltip title={t('Remove')} enterDelay={700}>
          <div style={{ cursor: 'pointer' }}>X</div>
        </Tooltip>
      ),
    },
  ];

  const rows = props.data.map((entry: ExpenseEntry, index) => {
    return {
      id: index,
      name: entry.name,
      amount: entry.value
        ?.toString()
        .replace('.', currencySymbol(language).decimal),
      description: entry.description,
      priority: entry.priority,
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
          {t('Total', { total: props.total })}
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
          processRowUpdate={async (newRow: GridRowModel) => {
            props.updateRow(
              newRow.id,
              newRow.name,
              newRow.amount,
              newRow.description,
              newRow.priority,
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
      </If>
    </Box>
  );
};
