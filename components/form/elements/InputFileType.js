import React from 'react';
import styled from 'styled-components';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { TextField } from '@mui/material';

const InfoContainer = styled.div`
    font-size: 13px;
`;

const StyledInputField = styled(TextField)(() => ({
    ':hover': {
        transform: 'scale(1.01)',
        transition: 'all 0.2s ease-out',
    },
}));

const useStyles = makeStyles(() => ({
    helperTextLeft: {
        marginLeft: '0 !important'
    }
}));

const InputFileType = ({
    control,
    field
}) => {
    const classes = useStyles();
    return (
        <>
            <Controller
                name="file"
                control={ control }
                render={ ({ field: { onChange, value }, fieldState: { error } }) => (
                    <StyledInputField
                        margin="normal"
                        type="file"
                        onChange={ e => { onChange(e.target.files) } }
                        fullWidth
                        name={ field.name }
                        id={ field.name }
                        variant="outlined"
                        error={ !!error }
                        helperText={
                            (value !== undefined) && (typeof value === 'string') && (value.length > 0) && `Last uploaded file: ${value}`
                        }
                        FormHelperTextProps={{ classes: { root: classes.helperTextLeft } }}
                    />
                ) }
                rules={ {
                    required: field.required,
                    pattern: {
                        message: field.validationMsg
                    }
                } }
            />
            { field.info && <InfoContainer>{ field.info }</InfoContainer> }
        </>
    );
};

InputFileType.propTypes = {
    control: PropTypes.any,
    field: PropTypes.any,
};

export default InputFileType;


