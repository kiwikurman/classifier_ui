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
import { Scrollbar } from 'src/components/scrollbar';
import { SeverityPill } from 'src/components/severity-pill';

const statusMap = {
  pending: 'warning',
  delivered: 'success',
  refunded: 'error'
};

export const TransactionTable = (props) => {
  const { transactions = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="Transactions" />
      <Scrollbar sx={{ flexGrow: 1 }}>
        <Box sx={{ minWidth: 800 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  Date
                </TableCell>
                <TableCell>
                  Merchant
                </TableCell>
                <TableCell sortDirection="desc">
                  Amount
                </TableCell>
                <TableCell>
                  Classification
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((transaction) => {
                const createdAt = format(transaction.createdAt, 'dd/MM/yyyy');
                 return (
                  <TableRow
                    hover
                    key={transaction.id}
                  >
                    <TableCell>
                      {createdAt}
                    </TableCell>
                    <TableCell>
                      {transaction.merchant}
                    </TableCell>
                    <TableCell>
                      {transaction.amount}
                    </TableCell>
                    <TableCell>
                      {transaction.classification}
                      {/*<SeverityPill color={statusMap[transaction.status]}>
                        {transaction.status}
                      </SeverityPill>*/}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
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
        >
          View all
        </Button>
      </CardActions>
    </Card>
  );
};

TransactionTable.prototype = {
  transactions: PropTypes.array,
  sx: PropTypes.object
};
