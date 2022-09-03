import React from 'react';
import PropTypes from 'prop-types';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SubTitle from '../typography/SubTitle1';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    errorContainer: {
        textAlign: 'center',
        border: '1px solid gray',
        padding: '15px',
        borderRadius: '10px',
        marginTop: '20px',
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
            <SubTitle title={message} textColor="gray" />
        </div>
    )
};

ErrorBlock.propTypes = {
    message: PropTypes.string
};

export default ErrorBlock;