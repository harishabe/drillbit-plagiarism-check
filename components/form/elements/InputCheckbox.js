import React from "react";
import styled from "styled-components";
import { makeStyles } from "@mui/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

const StyledCheckbox = styled(Checkbox)(() => ({
  "&.Mui-checked": {
    color: "#007bff",
  },
  ":hover": {
    transform: "scale(1.01)",
    transition: "all 0.2s ease-out",
  },
}));

const useStyles = makeStyles(() => ({
  label: {
    marginLeft: '-12px',
    fontWeight: "500",
  },
  errorText: {
    color: "red",
    fontSize: "12px",
    marginTop: "4px",
    fontWeight: 400
  },
}));

const InputCheckbox = ({ field, control }) => {
  const classes = useStyles();

  return (
    <Controller
      name={field.name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div>
          {field.options.map((option) => (
            <FormControlLabel
              key={option.name}
              control={
                <StyledCheckbox
                  checked={value && value[option.name]}
                  onChange={(e) =>
                    onChange({
                      ...value,
                      [option.name]: e.target.checked,
                    })
                  }
                  name={option.name}
                />
              }
              label={option.label}
              className={classes.label}
            />
          ))}
           {error && (
            <div className={classes.errorText}>
              {field.validationMsg}
            </div>
          )}
        </div>
      )}
      rules={{
        required: field.required,
      }}
    />
  );
};

InputCheckbox.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    required: PropTypes.bool,
    options: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        value: PropTypes.bool.isRequired,
      })
    ).isRequired,
  }).isRequired,
  control: PropTypes.any.isRequired,
};

export default InputCheckbox;
