import React from 'react';
import styled from 'styled-components';
import { makeStyles } from '@mui/styles';
import InputLabel from '@mui/material/InputLabel';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';


export const LabelContainer = styled.div`
    font-size: 14px,
    font-weight:400,
    line-height:24px,
    font-style:normal,
    color:#000
`;

const StyledAutocompleteField = styled(Autocomplete)(() => ({
    ':hover': {
        transform: 'scale(1.01)',
        transition: 'all 0.2s ease-out',
    },
}));

const useStyles = makeStyles(() => ({
    helperText: {
        marginLeft: 0,
        color: '#ff0000'
    }
}));

const InputAutoComplete = ({
    field, control, renderOption
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
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                    formState, ...props
                }) => (
                    <StyledAutocompleteField
                        options={field.options}
                        getOptionLabel={(option) => (option.name)}
                        renderOption={renderOption}
                        size={field.size}
                        renderInput={(params) => <TextField
                            {...params} 
                            style={field.style }
                            name={field.name}
                            id={field.name}
                            margin="normal"
                            error={!!error}
                            helperText={error && error.message}
                            FormHelperTextProps={{
                                className: classes.helperText
                            }}
                        />}
                        onChange={(e, data) => onChange(data)}
                        value={{ name: value?.name === undefined ? '' : value?.name }}
                        //defaultValue={{ name: value }}

                        {...props}
                    />
                )}
                rules={{
                    required: field.required
                }}
                onChange={([, data]) => data}
            />
        </>
    );
};

InputAutoComplete.propTypes = {
    name: PropTypes.any,
    control: PropTypes.any,
    label: PropTypes.any,
};

export default InputAutoComplete;


