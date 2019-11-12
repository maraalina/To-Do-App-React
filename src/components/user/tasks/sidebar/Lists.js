import React from 'react';
import { withContext } from '../../../app/AppContext';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(theme => ({
    spacing: {
        padding: '3px 4px'
    },
    typography: {
        fontSize: 14
    }
}))

const Lists = ({ todoLists, setCurrentList }) => {
    const classes = useStyles();

    const handleTasksDisplay = (listId, listName) => {
        setCurrentList(listId, listName);
    }   

    return (
        <List className={classes.listSpacing}>
            {todoLists.map( (item) => {
                return (
                    <ListItem 
                        key={item.list._id}
                        className={classes.spacing}
                        button 
                        onClick={() => handleTasksDisplay(item.list._id, item.list.name)}>
                        <ListItemText classes={{primary:classes.typography}} primary={item.list.name}/>
                    </ListItem>
                );
            })
            }
        </List>
    )
}

export default withContext(Lists);