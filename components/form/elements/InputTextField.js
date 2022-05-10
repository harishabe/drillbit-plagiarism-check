import React, { useEffect, useState } from 'react';
import { Controller } from "react-hook-form";
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import styled from "styled-components";

export const LabelContainer = styled.div`
    font-size: 14px,
    font-weight:400,
    line-height:24px,
    font-style:normal,
    color:#000
`;

const useStyles = makeStyles((theme) => ({
    helperText: {
        marginLeft: 0
    }
}));


const InputTextField = ({
    control,
    field
}) => {

    const classes = useStyles();

    const [regex, setRegex] = useState();

    useEffect(() => {
        if (field.type === 'email') {
            setRegex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i);
        }
        if (field.type === 'password') {
            setRegex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
        }
    }, [field]);

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
                    <TextField
                        style={{ marginTop: '10px' }}
                        margin="normal"
                        type={field.type}
                        onChange={onChange}
                        onBlur={onBlur}
                        error={!!error}
                        value={value}
                        fullWidth
                        name={field.name}
                        id={field.name}
                        variant="outlined"
                        helperText={error ? error.message : null}                        
                        FormHelperTextProps={{
                            className: classes.helperText
                        }}
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
};

export default InputTextField;


