import React from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
 
const MediaQuery = (props) => {
    const matches = useMediaQuery('(min-width:750px)');
    console.log(matches)
    if (matches) {
        return <div>{props.desktop}</div>;
    }
    return <div>{props.mobile}</div>;
}

export default MediaQuery;