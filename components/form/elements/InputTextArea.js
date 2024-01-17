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

const StyledTextarea = styled(TextareaAutosize)(() => ({
  ":hover": {
    transform: "scale(1.01)",
    transition: "all 0.2s ease-out",
  },
  width: "100%",
  minHeight: "100px",
  padding: "12px 14px",
  borderRadius: "4px",
  border: "1px solid #ced4da",
  fontSize: "16px",
  lineHeight: "1.5",
  resize: "none",
  "&:focus": {
    border: "none",
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
            />
            <FormHelperText
              error={!!error}
              classes={{ root: classes.helperTextLeft }}
            >
              {error ? error.message : field.info}
            </FormHelperText>
          </>
        )}
        rules={{
          required: field.required && "Enter the text",
        }}
      />
    </>
  );
};

InputTextArea.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default InputTextArea;
