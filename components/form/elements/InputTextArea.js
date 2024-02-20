import React from "react";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { TextareaAutosize, FormHelperText } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import styled from "styled-components";

const useStyles = makeStyles(() => ({
  helperTextLeft: {
    marginLeft: "0 !important",
  },
  label: {
    marginBottom: "6px", 
  },
}));

const StyledTextarea = styled(TextareaAutosize)(({ error }) => ({
  width: "100%",
  minHeight: "100px",
  padding: "12px 14px",
  borderRadius: "4px",
  border: `1px solid ${error ? "red" : "#ced4da"}`,
  borderWidth: error ? "1px" : "1px",
  fontSize: "14px",
  lineHeight: "1.5",
  resize: "none",
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 'normal',
  letterSpacing: "1px",
  overflowY: "auto",
  "&:focus": {
    border: `2px solid ${error ? "red" : "#007aff"}`,
    outline: "none",
  },
}));


const InputTextArea = ({ control, field }) => {
  const classes = useStyles();

  return (
    <>
      <InputLabel className={classes.label}>{field.label}</InputLabel>
      <Controller
        name={field.name}
        control={control}
        defaultValue=""
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <>
            <StyledTextarea
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              disabled={field.disabled}
              name={field.name}
              id={field.name}
              placeholder={field.placeholder}
              maxLength={field.maxLength}
              minLength={field.minLength}
              error={!!error} 
            />
            <FormHelperText
              error={!!error}
              classes={{ root: classes.helperTextLeft }}
            >
              {error && error.message}
            </FormHelperText>
          </>
        )}
        rules={{
          required: field.required && "Enter the text",
          minLength: {
            value: field.minLength,
            message: `Minimum length is ${field.minLength} characters`,
          },
          maxLength: {
            value: field.maxLength,
            message: `Maximum length is ${field.maxLength} characters`,
          },
          validate: {
            noLeadingTrailingSpaces: (value) => {
              const trimmedValue = value.trim();
              if (trimmedValue.length === value.length || (trimmedValue.length + 1 === value.length && value[value.length - 1] === ' ')) {
                return true;
              } else {
                return "Leading and trailing spaces are not allowed.";
              }
            },
          },
        }}
      />
    </>
  );
};

InputTextArea.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired, 
  field: PropTypes.shape({
    label: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    maxLength: PropTypes.number,
    minLength: PropTypes.number,
    required: PropTypes.bool,
  }).isRequired,
};

export default InputTextArea;
