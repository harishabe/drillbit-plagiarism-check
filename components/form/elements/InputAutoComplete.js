import React from 'react';
import { Controller } from "react-hook-form";
import PropTypes from 'prop-types';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const InputAutoComplete = ({
    field, control, renderOption, options
}) => {
    return (
        <>
            <Controller
                name={field.name}
                control={control}
                render={({
                    field: { onChange, value },
                    fieldState: { error },
                    formState, ...props
                }) => (
                    <Autocomplete
                        options={field.options}
                        getOptionLabel={(option) => (option.name)}
                        renderOption={renderOption}
                        renderInput={(params) => <TextField {...params}
                            name={field.name}
                            id={field.name}
                            label={field.label}
                            margin="normal" />}
                        onChange={(e, data) => onChange(data)}
                        {...props}
                    />
                )}
                onChange={([, data]) => data}
            />
        </>
    )
}

InputAutoComplete.propTypes = {
    name: PropTypes.any,
    control: PropTypes.any,
    label: PropTypes.any,
};

export default InputAutoComplete;


