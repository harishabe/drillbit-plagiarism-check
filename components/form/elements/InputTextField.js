import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import styled from "styled-components";

const useStyles = makeStyles(() => ({
  helperTextLeft: {
    marginLeft: "0 !important",
  },
}));

const StyledInputField = styled(TextField)(() => ({
  ":hover": {
    transform: "scale(1.01)",
    transition: "all 0.2s ease-out",
  },
}));

const InputTextField = ({ control, field }) => {
  const classes = useStyles();

  const [regex, setRegex] = useState();

  useEffect(() => {
    if (field.name === "newPassword") {
      setRegex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      );
    }
    if (field.name === "confirmPassword") {
      setRegex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
      );
    }
    if (field.name === "email" || field.name === "adminEmail") {
      setRegex(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{1,}$/i);
    }
  }, [field]);

  return (
    <>
      <InputLabel>{field.label}</InputLabel>
      <Controller
        name={field.name}
        control={control}
        defaultValue=""
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <StyledInputField
            style={{ marginTop: "5px" }}
            margin="normal"
            size={field.size}
            type={field.type}
            onChange={onChange}
            onBlur={onBlur}
            error={!!error}
            value={value}
            fullWidth
            disabled={field.disabled}
            name={field.name}
            id={field.name}
            variant="outlined"
            helperText={error ? error.message : field.info}
            FormHelperTextProps={{ classes: { root: classes.helperTextLeft } }}
            inputProps={{
              maxLength: field.maxLength,
              minLength: field.minLength,
              style: {
                padding: "12px 14px"
              },
            }}
          />
        )}
        rules={{
          required: field.required,
          pattern: {
            value: regex,
            message: field.validationMsg,
          },
          validate: {
            noLeadingTrailingSpaces: (value) => {
              const trimmedValue = value?.trim();
              if (trimmedValue?.length === value?.length || (trimmedValue?.length + 1 === value?.length && value[value?.length - 1] === ' ')) {
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

InputTextField.propTypes = {
  name: PropTypes.any,
  control: PropTypes.any,
  label: PropTypes.any,
};

export default InputTextField;
