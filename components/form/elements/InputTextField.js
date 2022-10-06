import React, { useEffect, useState } from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import styled from 'styled-components';

export const LabelContainer = styled.div`
    font-size: 14px,
    font-weight:400,
    line-height:24px,
    font-style:normal,
    color:#000
`;

const useStyles = makeStyles((theme) => ({
    helperTextLeft: {
        marginLeft: '0 !important'
    }
}))

const StyledInputField = styled(TextField)(() => ({
    ':hover': {
        transform: 'scale(1.01)',
        transition: 'all 0.2s ease-out',
    },
}));

const InputTextField = ({
    control,
    field
}) => {

    const classes = useStyles()

    const [regex, setRegex] = useState()

    useEffect(() => {
        // if (field.type === 'email') {
        //     setRegex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
        // }
        // if (field.type === 'password') {
        //     setRegex(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,}$/g)
        // }

        if (field.name === 'newPassword') {
            setRegex(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,}$/g);
        }
        if (field.name === 'confirmPassword') {
            setRegex(/^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]{6,}$/g);
        }
    }, [field])

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
                        size={field.size}
                        type={field.type}
                        onChange={onChange}
                        onBlur={onBlur}
                        error={!!error}
                        value={value}
                        fullWidth
                        disabled={field.disabled}
                        name={field.name}
                        id={field.name}
                        variant="outlined"
                        helperText={error ? error.message : field.info}
                        FormHelperTextProps={{ classes: { root: classes.helperTextLeft } }}
                    />
                )}
                rules={{
                    required: field.required,
                    pattern: {
                        value: regex,
                        message: field.validationMsg
                    }
                }}
            />
        </>
    )
}

InputTextField.propTypes = {
    name: PropTypes.any,
    control: PropTypes.any,
    label: PropTypes.any,
}

export default InputTextField


