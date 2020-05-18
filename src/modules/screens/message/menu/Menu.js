import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/Inbox';
import MarkunreadIcon from '@material-ui/icons/Markunread';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

const Menu = (props) => {
  const classes = useStyles();
  const { handleClick } = props;

  return (
    <div className={classes.root}>
      <List>
        <ListItem button onClick={() => handleClick('all')}>
          <ListItemIcon>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText primary='Inbox' />
        </ListItem>
        <ListItem button onClick={() => handleClick('unread')}>
          <ListItemIcon>
            <MarkunreadIcon />
          </ListItemIcon>
          <ListItemText primary='Unread' />
        </ListItem>
      </List>
    </div>
  );
};

export default Menu;
