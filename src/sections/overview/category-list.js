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
const { open, handleClose, handleSendUpdate, theCategory } = props;
  const words = theCategory.words.join(", ");
  const [updatedText, setUpdatedText] = React.useState("");

  const handleTextFieldChange = (event) => {
    setUpdatedText(event.target.value);
  };

  return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{theCategory.category}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            bow words go here?
          </DialogContentText>
          <TextField
            autoFocus
            margin="normal"
            id="name"
            defaultValue={words}
            type="text"
            fullWidth
            variant="standard"
            multiline="true"
            size='medium'
            sx={{width: 500}}
            onChange={handleTextFieldChange}
            InputProps={{
              inputProps: {
                style: { textAlign: "right" },
              }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleSendUpdate(theCategory, updatedText)}>Update New Words</Button>
        </DialogActions>
      </Dialog>
  );
}

export const Categories = (props) => {
  const { categories = [], sx, getDataClick } = props;
  const [open, setOpen] = React.useState(false);
  const [currentCategory, setCurrentCategory] = React.useState({"category": "groceries", "words": ["lala"]});

  const handleClickOpen = (event, theCategory) => {
    setOpen(true);
    setCurrentCategory(theCategory);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendUpdate = async (category, updatedText) => {
    setOpen(false);
    let words_list = updatedText.split(", ");
    const newCategory = {
      "category": category.category,
      "words": { words_list }
    };

    const response = await fetch('https://g1y4r7q6t5.execute-api.eu-central-1.amazonaws.com/classifier/bows',
    {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ newCategory }),
    });
    if (response.ok) {
      console.log('List sent successfully!');
    } else {
      console.log('Error sending list.');
    }
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
          [{"category": "groceries", "words": ["סופר פארם", "רמי לוי", "אפייה", "אפיה", "אייזיקס"]}]
          return (
            <ListItem
              divider={hasDivider}
              key={index}
            >
              <ListItemText
                primary={category.category}
                primaryTypographyProps={{ variant: 'subtitle2' }}
                secondary="subtotal: 25"
              />
              <IconButton edge="end" onClick={() => handleClickOpen(event, category)}>
                <SvgIcon>
                  <EllipsisVerticalIcon />
                </SvgIcon>
              </IconButton>
              <FormDialog
                open={open}
                handleClose={handleClose}
                handleSendUpdate={handleSendUpdate}
                theCategory={currentCategory}
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
