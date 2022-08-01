import React from 'react';
import PropTypes from 'prop-types';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import SubTitle from '../typography/SubTitle1';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    errorContainer: {
        textAlign: 'center',
        border: '1px solid rgb(186, 12, 47)',
        padding: '15px',
        borderRadius: '10px',
        marginTop: '50px',
    },
    color: {
        color: 'rgb(186, 12, 47)'
    }
}));

const ErrorBlock = ({
    message
}) => {
    const classes = useStyles();
    return (
        <div className={classes.errorContainer}>
            <ErrorOutlineIcon className={classes.color} /> <SubTitle title={message} textColor="rgb(186, 12, 47)" />
        </div>
    )
};

ErrorBlock.propTypes = {
    message: PropTypes.string
};

export default ErrorBlock;