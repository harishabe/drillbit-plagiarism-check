import React from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import styled from 'styled-components';
import { handleKeyPress } from '../../../utils/RegExp';
import { MuiFormElementConfig } from './../MuiFormElementConfig'

export const LabelContainer = styled.div`
    font-size: 14px,
    font-weight:400,
    line-height:24px,
    font-style:normal,
    color:#000
`;

export const ErrorMessage = styled.span`
    font-size: 0.75rem;
    color: red;
    font-weight:400;
`;

const useStyles = makeStyles(() => ({
    helperTextLeft: {
        marginLeft: '0 !important'
    }
}));

const StyledInputField = styled(TextField)(() => ({
    ':hover': {
        transform: 'scale(1.01)',
        transition: 'all 0.2s ease-out',
    },
}));

const InputNumberField = ({
    control,
    field
}) => {

    const classes = useStyles();

    return (
        <>
            <LabelContainer>
                <InputLabel >
                    {field.label}
                </InputLabel>
            </LabelContainer>
            <Controller
                name={field.name}
                control={control}
                defaultValue=""
                render={({
                    field: { onChange, onBlur, value }, fieldState: { error }
                }) => (
                    <StyledInputField
                        style={{ marginTop: '10px' }}
                        margin="normal"
                        type='number'
                        size={ MuiFormElementConfig.size }
                        onChange={onChange}
                        onBlur={onBlur}
                        error={!!error}
                        value={value}
                        fullWidth
                        onKeyPress={ handleKeyPress }
                        disabled={field.disabled}
                        name={field.name}
                        id={field.name}
                        variant={ MuiFormElementConfig.variant }
                        helperText={error ? error.message : field.info}
                        FormHelperTextProps={{ classes: { root: classes.helperTextLeft } }}
                        InputProps={{
                            inputProps: { min: 0 }
                        }}
                    />
                )}
                rules={{
                    required: field.required,
                    // pattern: {
                    //     value: regex,
                    //     message: field.validationMsg
                    // }
                }}
            />
            {field.errorMsg !== '' &&
                <ErrorMessage>{field.errorMsg}</ErrorMessage>}
        </>
    );
};

InputNumberField.propTypes = {
    name: PropTypes.any,
    control: PropTypes.any,
    label: PropTypes.any,
};

export default InputNumberField;


