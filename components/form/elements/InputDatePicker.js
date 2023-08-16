import React from "react";
import { Controller } from "react-hook-form";
import styled from "styled-components";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { TextField } from "@mui/material";
//import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import InputLabel from "@mui/material/InputLabel";
//import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
//import DatePicker from '@mui/lab/DatePicker';
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Stack from "@mui/material/Stack";

const StyledDatePickerTextField = styled(TextField)(() => ({
  margin:'5px 0px 8px',
  ":hover": {
    transform: "scale(1.01)",
    transition: "all 0.2s ease-out",
  },
}));

const useStyles = makeStyles(() => ({
  helperText: {
    marginLeft: 0,
    color: "#ff0000",
  },
  root: {
    "& .MuiInputBase-root": {
      "& .MuiButtonBase-root": {
        paddingLeft: '12px 14px'
      },
      "& .MuiInputBase-input": {
        padding: '12px 14px',
      }
    }
  }
}));

const InputDatePicker = ({ control, field }) => {
  const classes = useStyles();
  const onKeyDown = (e) => {
    e.preventDefault();
  };
  return (
    <>
      <InputLabel>{field.label}</InputLabel>
      <Controller
        name={field.name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <DatePicker
               className={classes.root}
                style={{ marginTop: "5px" }}
                inputFormat="dd/MM/yyyy"
                label={field.dateLabel}
                fullWidth
                value={value === undefined ? null : value}
                onChange={onChange}
                disableFuture={field.nextDate}
                disablePast={field.prevDate}
                minDate={field.minDate}
                maxDate={field.maxDate}
                renderInput={(params) => (
                  <StyledDatePickerTextField
                    margin="normal"
                    onKeyDown={onKeyDown}
                    {...params}
                    error={!!error}
                    helperText={error ? error.message : field.info}
                    FormHelperTextProps={{
                      className: classes.helperText,
                    }}
                  />
                )}
              />
            </Stack>
          </LocalizationProvider>
        )}
        rules={{
          required: field.required,
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
