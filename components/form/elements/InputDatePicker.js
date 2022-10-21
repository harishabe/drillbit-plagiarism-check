import React from 'react';
import { Controller } from 'react-hook-form';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import { TextField } from '@mui/material';
//import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import InputLabel from '@mui/material/InputLabel';
//import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
//import DatePicker from '@mui/lab/DatePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';


export const LabelContainer = styled.div`
    font-size: 14px,
    font-weight:400,
    line-height:24px,
    font-style:normal,
    color:#000
`;

const StyledDatePickerTextField = styled(TextField)(() => ({
    ':hover': {
        transform: 'scale(1.01)',
        transition: 'all 0.2s ease-out',
    },
}));

const useStyles = makeStyles(() => ({
    helperText: {
        marginLeft: 0,
        color:'#ff0000'
    }
}));

const InputDatePicker = ({
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
                render={({
                    field: { onChange, value }, fieldState: { error }
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
                                disableFuture={ field.nextDate }
                                disablePast={ field.prevDate }
                                renderInput={(params) => <StyledDatePickerTextField
                                    margin="normal"
                                    {...params}
                                    helperText={error ? error.message : field.info} 
                                    FormHelperTextProps={{
                                        className: classes.helperText
                                    }}
                                />}
                            />
                        </Stack>
                    </LocalizationProvider>
                )}
                rules={{
                    required: field.required
                }}
            />
        </>
    );
};

InputDatePicker.propTypes = {
    name: PropTypes.any,
    control: PropTypes.any,
    label: PropTypes.any,
};

export default InputDatePicker;


