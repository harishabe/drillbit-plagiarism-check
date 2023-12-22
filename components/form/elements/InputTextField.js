import React, { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();
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
      setRegex(/^[A-Z0-9._%+-]{2,64}@[A-Z0-9.-]{2,255}\.[A-Z0-9-]{2,63}$/i);
    }
  }, [field]);

  return (
    <>
      <InputLabel>{ t(`FORM_COMPONENT.${field.id}.label`) }</InputLabel>
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
            helperText={ error ? t(`FORM_COMPONENT.${field.id}.required`) : t(`FORM_COMPONENT.${field.id}.info`)}
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
          required: t(`FORM_COMPONENT.${field.id}.required`),
          pattern: {
            value: regex,
            message: t(`FORM_COMPONENT.${field.id}.validationMsg`),
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
