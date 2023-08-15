import React from 'react';
import PropTypes from 'prop-types';
import Title from '../typography/title';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
    instructionContainer: {
        textAlign: 'start',
        border: '1px solid gray',
        borderRadius: '10px',
        padding: '15px',
        margin: '20px'
    },
    color: {
        color: 'gray'
    }
}));

const Instructions = ({ message }) => {
    const classes = useStyles();
    return (
        <div className={ classes.instructionContainer }>
            { message &&
                message.map((item, index) => {
                    return (
                        <Title title={ item } textColor="gray" />
                    );
                }) }
        </div>
    );
};

Instructions.propTypes = {
    message: PropTypes.string
};

export default Instructions;