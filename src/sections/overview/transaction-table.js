import { format } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  SvgIcon,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';

const statusMap = {
  pending: 'warning',
  delivered: 'success',
  refunded: 'error'
};

const now = new Date();


export default function DataGridDemo() {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}

const columns = [
    { field: 'date', headerName: 'DATE', type: 'date', width: 150 },
    { field: 'merchant',headerName: 'MERCHANT',width: 150 },
    { field: 'amount', headerName: 'AMOUNT', type: 'number', width: 150 },
    { field: 'full_text_classification', headerName: 'CLASSIFICATION',width: 150, editable: true },
  ];

export const TransactionTable = (props) => {
  const { transactions = [], sx, getDataClick } = props;


  return (
    <Card sx={sx}>
      <CardHeader title="Transactions" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <DataGrid rows={transactions} columns={columns} />
        </Box>
      </Scrollbar>
      <Divider />
      <CardActions sx={{ justifyContent: 'flex-end' }}>
        <Button
          color="inherit"
          endIcon={(
            <SvgIcon fontSize="small">
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
          onClick={getDataClick}
        >
          Manage Source Files
        </Button>
      </CardActions>
    </Card>
  );
};

TransactionTable.prototype = {
  transactions: PropTypes.array,
  sx: PropTypes.object
};
