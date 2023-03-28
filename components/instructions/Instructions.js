import React from 'react';
import PropTypes from 'prop-types';
import SubTitle from '../typography/SubTitle1';
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
                        <div key={ index }>
                            <SubTitle title={ item } textColor="gray" />
                        </div>
                    );
                }) }
        </div>
    );
};

Instructions.propTypes = {
    message: PropTypes.string
};

export default Instructions;