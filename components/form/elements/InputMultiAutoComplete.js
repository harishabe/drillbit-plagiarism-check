import React from 'react';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const InputMultiAutoComplete = ({
    field, control
}) => {
    return (
        <>
            <Controller
                name={field.name}
                control={control}
                render={({
                    field: { onChange, value },
                    ...props
                }) => (
                    <Autocomplete
                        multiple
                        id="multiCheckbox"
                        value={value}
                        options={field?.options}
                        disableCloseOnSelect
                        getOptionLabel={(option) => option.name}
                        renderOption={(props, option, { selected }) => (
                            <li {...props}>
                                <Checkbox
                                    icon={icon}
                                    checkedIcon={checkedIcon}
                                    style={{ marginRight: 8 }}
                                    checked={selected}
                                />
                                {option.name}
                            </li>
                        )}
                        renderInput={(params) => (
                            <TextField {...params} label={field.label} placeholder={field.label} />
                        )}
                        onChange={(e, data) => onChange(data)}
                        {...props}
                    />
                )}
                onChange={([, data]) => data}
            />
        </>
    );
};

InputMultiAutoComplete.propTypes = {
    field: PropTypes.any,
    control: PropTypes.any
};

export default InputMultiAutoComplete;


