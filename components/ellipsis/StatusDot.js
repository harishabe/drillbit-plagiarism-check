import React from 'react';
import { makeStyles } from '@mui/styles';
import { StatusDotIcon } from '../../assets/icon';
import { SubTitle } from '../../components';

const useStyles = makeStyles((theme) => ({
    subTitle:{
        marginTop: '-8px', 
        marginLeft: '8px'
    },
    inline:{
        display:'flex'
    }
}));

const StatusDot = ({
    color,
    title
}) => {
    const classes = useStyles();
    return (
        <div className={classes.inline}>
            <StatusDotIcon color={color} /> <div className={classes.subTitle}><SubTitle title={title} /></div>
        </div>
    )
}

export default StatusDot
