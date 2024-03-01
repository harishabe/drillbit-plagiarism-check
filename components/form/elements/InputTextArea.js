import React from "react";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { FormHelperText } from "@mui/material";
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

export const ErrorMessage = styled.span`
  font-size: 0.75rem;
  color: red;
  font-weight: 400;
`;

const StyledTextarea = styled.textarea(({ error }) => ({
  width: "100%",
  minHeight: "130px", 
  maxHeight: "calc(5 * 1.5em)",
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
  overflowX: "hidden",
  "&:focus": {
    border: `2px solid ${error ? "red" : "#007aff"}`,
    outline: "none",
  },
  ":hover": {
    transform: "scale(1.01)",
    transition: "all 0.2s ease-out",
  },
  "&::-webkit-scrollbar": {
    width: "6px", 
  },
  "&::-webkit-scrollbar-track" : {
    background: "#f1f1f1" 
  },
  "&::-webkit-scrollbar-thumb": {
    backgroundColor: "#888", 
    borderRadius: "3px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    backgroundColor: "#555", 
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
              {error && error?.message}
            </FormHelperText>
          </>
        )}
        rules={field?.rules}
      />
        {field.errorMsg !== "" && <ErrorMessage>{field.errorMsg}</ErrorMessage>}
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
