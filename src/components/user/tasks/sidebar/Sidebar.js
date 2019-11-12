import React, { Component } from 'react';
import Divider from '@material-ui/core/Divider';
import AddItem from './AddItem';
import Lists from './Lists';

class Sidebar extends Component {

    render() {
        return (           
            <div>
                <Lists />
                <Divider />
                <AddItem />
            </div>   
        )
    }
} 

export default Sidebar;