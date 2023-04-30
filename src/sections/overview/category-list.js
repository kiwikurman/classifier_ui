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

export const Categories = (props) => {
  const { categories = [], sx } = props;

  return (
    <Card sx={sx}>
      <CardHeader title="My Categories" />
      <List>
        {categories.map((category, index) => {
          const hasDivider = index < categories.length - 1;
          const ago = formatDistanceToNow(category.updatedAt);

          return (
            <ListItem
              divider={hasDivider}
              key={category.id}
            >
              {/*<ListItemAvatar>
                {
                  category.image
                    ? (
                      <Box
                        component="img"
                        src={category.image}
                        sx={{
                          borderRadius: 1,
                          height: 48,
                          width: 48
                        }}
                      />
                    )
                    : (
                      <Box
                        sx={{
                          borderRadius: 1,
                          backgroundColor: 'neutral.200',
                          height: 48,
                          width: 48
                        }}
                      />
                    )
                }
              </ListItemAvatar>*/}
              <ListItemText
                primary={category.name}
                primaryTypographyProps={{ variant: 'subtitle1' }}
              />
              <IconButton edge="end">
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
              <ArrowRightIcon />
            </SvgIcon>
          )}
          size="small"
          variant="text"
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
