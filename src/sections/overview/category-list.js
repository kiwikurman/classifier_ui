import { formatDistanceToNow } from 'date-fns';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  SvgIcon
} from '@mui/material';

import * as React from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function FormDialog(props) {
const { open, handleClose, t } = props;
  return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{t}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            bow words go here?
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="name"
            label="type the words.."
            type="text"
            fullWidth
            variant="standard"
            multiline="true"
            size='medium'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Update New Words</Button>
        </DialogActions>
      </Dialog>
  );
}

export const Categories = (props) => {
  const { categories = [], sx, getDataClick } = props;
  const [open, setOpen] = React.useState(false);
  const [theTittle, setTheTittle] = React.useState("");

  const handleClickOpen = (event, newTittle) => {
    setOpen(true);
    setTheTittle(newTittle);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let counter = 1;
  const handle = (event, param) => {
    alert(param);
  };
  return (
    <Card sx={sx}>
      <CardHeader title="My Categories" />
      <List>
        {categories.map((category, index) => {
          const hasDivider = index < categories.length - 1;
          return (
            <ListItem
              divider={hasDivider}
              key={index}
            >
              <ListItemText
                primary={category.category}
                primaryTypographyProps={{ variant: 'subtitle1' }}
              />
              <IconButton edge="end" onClick={() => handleClickOpen(event, category.category)}>
                <SvgIcon>
                  <EllipsisVerticalIcon />

                </SvgIcon>
              </IconButton>
              <FormDialog
              open={open}
              handleClose={handleClose}
              t = {theTittle}
            />
            </ListItem>
          );
        })}
      </List>
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
          Manage Categories
        </Button>
      </CardActions>
    </Card>
  );
};

Categories.propTypes = {
  categories: PropTypes.array,
  sx: PropTypes.object
};
