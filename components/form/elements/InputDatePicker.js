import React from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import InputLabel from '@mui/material/InputLabel'
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import Stack from '@mui/material/Stack';
import styled from 'styled-components';

export const LabelContainer = styled.div`
    font-size: 14px,
    font-weight:400,
    line-height:24px,
    font-style:normal,
    color:#000
`;

const InputDatePicker = ({
    control,
    field
}) => {

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
                    field: { onChange, value }
                }) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                            <DatePicker
                                style={{ marginTop: '10px' }}
                                inputFormat="dd/MM/yyyy"
                                label={field.dateLabel}
                                fullWidth
                                value={value === undefined ? null : value}
                                onChange={onChange}
                                minDate={field.minDate ? new Date():''} 
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
}

export default InputDatePicker


