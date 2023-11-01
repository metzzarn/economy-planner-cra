import { EventEntry } from 'redux/common';
import { Box, Tooltip } from '@mui/material';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { If } from 'components/common/If';
import { useTranslation } from 'react-i18next';
import { EventStatus } from 'components/event/EventStatus';

interface EventTableProps {
  eventStatus: EventStatus;
  removeRow: (id: string) => void;
  updateStatus: (id: string) => void;
  events: EventEntry[];
}

export const EventTable = (props: EventTableProps) => {
  const { t } = useTranslation();
  const moveTo =
    props.eventStatus === EventStatus.CREATED
      ? t('Move to complete')
      : t('Move to incomplete');

  const columns: GridColDef[] = [
    {
      field: 'id',
      headerName: t('Id'),
      editable: false,
    },
    {
      field: 'title',
      headerName: t('Title'),
      flex: 2,
      minWidth: 170,
      maxWidth: 299,
      editable: false,
    },
    {
      field: 'description',
      headerName: t('Description'),
      flex: 5,
      minWidth: 170,
      maxWidth: 299,
      editable: false,
    },
    {
      field: 'update-status',
      headerName: '',
      width: 50,
      editable: false,
      filterable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: () => (
        <Tooltip title={moveTo} enterDelay={700}>
          <div style={{ cursor: 'pointer' }}>O</div>
        </Tooltip>
      ),
    },
    {
      field: 'remove',
      headerName: '',
      width: 50,
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

  const rows = props.events.map((entry: EventEntry) => {
    return {
      id: entry.id,
      title: entry.title,
      description: entry.description,
      status: entry.status,
    };
  });

  return (
    <Box sx={{ maxWidth: '700px' }}>
      <If true={rows.length > 0}>
        <DataGrid
          initialState={{
            columns: {
              columnVisibilityModel: {
                id: false,
              },
            },
          }}
          sx={{ mt: 1 }}
          columns={columns}
          rows={rows}
          hideFooterPagination={true}
          hideFooterSelectedRowCount={true}
          disableColumnSelector
          disableRowSelectionOnClick
          hideFooter
          onCellClick={(params: GridCellParams) => {
            return (
              (params.field === 'remove' && props.removeRow(params.row.id)) ||
              (params.field === 'update-status' &&
                props.updateStatus(params.row.id))
            );
          }}
        />
      </If>
    </Box>
  );
};
