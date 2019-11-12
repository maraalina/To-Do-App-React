import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import MenuIcon from '@material-ui/icons/Menu';
import Lists from '../user/tasks/sidebar/Lists';
import AddItem from '../user/tasks/sidebar/AddItem';
import IconButton from '@material-ui/core/IconButton';  


const useStyles = makeStyles( theme => ({
  list: {
    width: 200,
    paddingTop: 40,
    paddingLeft: 30,
  },
  menuButton: {
    marginRight: theme.spacing(2),
    padding: theme.spacing(0)
  }
}));

const MobileHeader = props => {
  const classes = useStyles();
  const [state, setState] = React.useState({left: false});

  const toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ [side]: open });
  };

  const sideList = side => (
    <div 
      className={classes.list}
      role="presentation">
      <div onClick={toggleDrawer(side, false)}>
        <Lists />
      </div>
      <AddItem />
    </div>
    
  );

  return (
    <div className="mobile-menu">
        <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer('left', true)}
            edge="start"
            className={classes.menuButton}
          ><MenuIcon /></IconButton>
      <Drawer open={state.left} onClose={toggleDrawer('left', false)}>
        {sideList('left')}
      </Drawer>
    </div>
  );
}

export default MobileHeader; 