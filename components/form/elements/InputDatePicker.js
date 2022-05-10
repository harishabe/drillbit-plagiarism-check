import React, { useState } from 'react';
import { Controller } from "react-hook-form";
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Stack from '@mui/material/Stack';

const InputDatePicker = ({
    control,
    field
}) => {

    return (
        <>
            <Controller
                name={field.name}
                control={control}
                render={({
                    field: { onChange, value }
                }) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                            <DatePicker
                                inputFormat="dd/MM/yyyy"
                                label={field.label}
                                fullWidth
                                value={value === undefined ? null : value}
                                onChange={onChange}
                                renderInput={(params) => <TextField margin="normal" {...params} />}
                            />
                        </Stack>
                    </LocalizationProvider>
                )}
            />
        </>
    )
}

InputDatePicker.propTypes = {
    name: PropTypes.any,
    control: PropTypes.any,
    label: PropTypes.any,
};

export default InputDatePicker;


