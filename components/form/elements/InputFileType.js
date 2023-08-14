import React from "react";
import styled from "styled-components";
import { makeStyles } from "@mui/styles";
import { Controller } from "react-hook-form";
import PropTypes from "prop-types";
import { TextField } from "@mui/material";

const InfoContainer = styled.div`
  font-size: 13px;
`;

const StyledInputField = styled(TextField)(() => ({
  ":hover": {
    transform: "scale(1.01)",
    transition: "all 0.2s ease-out",
  },
}));

const useStyles = makeStyles(() => ({
  helperText: {
    marginLeft: 0,
  },
}));

const InputFileType = ({ control, field }) => {
  const classes = useStyles();
  return (
    <>
      <Controller
        name="file"
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <StyledInputField
            margin="normal"
            type="file"
            onChange={(e) => {
              onChange(e.target.files);
            }}
            fullWidth
            name={field.name}
            id={field.name}
            variant="outlined"
            error={!!error}
            helperText={
              value !== undefined &&
              typeof value === "string" &&
              value.length > 0 &&
              `Last uploaded file: ${value}`
            }
            FormHelperTextProps={{ classes: { root: classes.helperTextLeft } }}
            inputProps={{
              style: {
                padding: "12px 14px",
              },
            }}
          />
        )}
        rules={{
          required: field.required,
          pattern: {
            message: field.validationMsg,
          },
        }}
      />
      {field.info && <InfoContainer>{field.info}</InfoContainer>}
    </>
  );
};

InputFileType.propTypes = {
  control: PropTypes.any,
  field: PropTypes.any,
};

export default InputFileType;
