import React from 'react';
import PropTypes from 'prop-types';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Title from '../typography/title';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    errorContainer: {
        textAlign: 'center',
        border: '1px solid gray',
        borderRadius: '10px',
        padding:'15px',
        margin:'20px'
    },
    color: {
        color: 'gray'
    }
}));

const ErrorBlock = ({
    message
}) => {
    const classes = useStyles();
    return (
        <div className={classes.errorContainer}>
            <InfoOutlinedIcon className={classes.color} /> 
            <Title title={message} textColor="gray" />
        </div>
    );
};

ErrorBlock.propTypes = {
    message: PropTypes.string
};

export default ErrorBlock;