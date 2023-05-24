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
import CategorySharpIcon from '@mui/icons-material/CategorySharp';


function FormDialog(props) {
const { open, handleClose, handleSendUpdate, theCategory, isNew, handleDelete } = props;
  const words = theCategory.words.join(",");
  const [updatedText, setUpdatedText] = React.useState("");
  const [updatedCategoryName, setUpdatedCategoryName] = React.useState("");

  const handleWordsChange = (event) => {
    setUpdatedText(event.target.value);
  };

  const handleCategoryNameChange = (event) => {
    setUpdatedCategoryName(event.target.value);
  };

  return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{theCategory.category}</DialogTitle>
        <DialogContent>
          { (isNew) && <DialogContentText component="span">
            <TextField
              margin="normal"
              id="category_input_text"
              defaultValue={theCategory.category}
              type="text"
              fullWidth
              variant="filled"
              size='small'
              sx={{width: 500}}
              onChange={handleCategoryNameChange}
            />
          </DialogContentText> }
          <DialogContentText  component="span">
           <TextField
            autoFocus
            margin="normal"
            id="words_input_text"
            defaultValue={words}
            type="text"
            fullWidth
            variant="filled"
            size='medium'
            sx={{width: 500}}
            onChange={handleWordsChange}
            InputProps={{
              inputProps: {
                style: { textAlign: "right" },
              }
            }}
          />
          </DialogContentText>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => handleDelete(theCategory, updatedText, updatedCategoryName)}>Delete The Bag</Button>
          <Button onClick={() => handleSendUpdate(theCategory, updatedText, updatedCategoryName)}>Update New Words</Button>
        </DialogActions>
      </Dialog>
  );
}

export const Categories = (props) => {
  const { categories = [], sx, getDataClick } = props;
  const [open, setOpen] = React.useState(false);
  const [isNew, setIsNew] = React.useState(false);
  const [currentCategory, setCurrentCategory] = React.useState({"category": "groceries", "words": ["lala"]});

  const handleClickOpen = (event, theCategory, is_new) => {
    setOpen(true);
    setCurrentCategory(theCategory);
    setIsNew(is_new);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendUpdate = async (category, updatedText, updatedCategoryName) => {
    setOpen(false);
    let words_list = updatedText.split(",");
    let cat_name = (isNew)?  updatedCategoryName : category.category;
    console.log(updatedCategoryName);
    console.log(category.category);
    console.log(cat_name);
    console.log(words_list);
    const newCategory = {
      "category": cat_name,
      "words": words_list,
    };

    const response = await fetch('https://g1y4r7q6t5.execute-api.eu-central-1.amazonaws.com/classifier/bows',
    {
      method: 'POST',
      mode: "no-cors",
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

  const handleDelete = async (category, updatedText, updatedCategoryName) => {
    setOpen(false);
    const bow_base_url = 'https://g1y4r7q6t5.execute-api.eu-central-1.amazonaws.com/classifier/bows';
    const bow_to_delete = category.category;
    const url = bow_base_url + "/" + bow_to_delete;
    alert(url);
    try {
      const response = await fetch(url, {
        method: 'DELETE',
        mode: 'cors',
      });

      if (response.ok) {
        console.log('Request successful');
      } else {
        console.error('Request failed');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
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
                primaryTypographyProps={{ variant: 'subtitle2' }}
                secondary="subtotal: 25"
              />
              <IconButton edge="end" onClick={() => handleClickOpen(event, category, false)}>
                <SvgIcon>
                  <EllipsisVerticalIcon />
                </SvgIcon>
              </IconButton>
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
              <CategorySharpIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
          onClick={() => handleClickOpen(event, {"category": "new category", "words": ["no", "words", "yet"]}, true)}
         >
          New Category
        </Button>
      </CardActions>
          <FormDialog
                open={open}
                handleClose={handleClose}
                handleSendUpdate={handleSendUpdate}
                theCategory={currentCategory}
                isNew={isNew}
                handleDelete={handleDelete}
              />
    </Card>
  );
};

Categories.propTypes = {
  categories: PropTypes.array,
  sx: PropTypes.object
};
