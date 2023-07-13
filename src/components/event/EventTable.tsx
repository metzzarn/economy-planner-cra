import { EventEntry } from 'redux/common';
import { Box, Tooltip } from '@mui/material';
import { DataGrid, GridCellParams, GridColDef } from '@mui/x-data-grid';
import React from 'react';
import { If } from 'components/common/If';

interface EventTableProps {
  removeRow: (index: number) => void;
  events: EventEntry[];
}

export const EventTable = (props: EventTableProps) => {
  const columns: GridColDef[] = [
    {
      field: 'title',
      headerName: 'Title',
      flex: 2,
      minWidth: 290,
      maxWidth: 320,
      editable: false,
    },
    {
      field: 'description',
      headerName: 'Description',
      flex: 5,
      minWidth: 290,
      maxWidth: 320,
      editable: false,
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

  const rows = props.events.map((entry: EventEntry, index: number) => {
    return {
      id: index,
      title: entry.title,
      description: entry.description,
    };
  });

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
          hideFooter
          onCellClick={(params: GridCellParams) => {
            return (
              params.field === 'remove' && props.removeRow(Number(params.id))
            );
          }}
        />
      </If>
    </Box>
  );
};
