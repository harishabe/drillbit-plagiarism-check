import React from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import MuiToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import InputLabel from '@mui/material/InputLabel';


const ToggleButton = styled(MuiToggleButton)({
    '&.Mui-selected, &.Mui-selected:hover': {
        color: '#fff',
        backgroundColor: '#3672FF'
    }
});

const InputToggleButton = ({
    control,
    field
}) => {

    return (
        <>
            <Controller
                name={field.name}
                control={control}
                render={({
                    field: { onChange, value }
                }) => (
                    <>
                        <Grid container>
                            <Grid item md={8}>
                                <InputLabel style={{ fontSize: '15px', margin: '10px 0px' }}>
                                    {field.label}
                                </InputLabel>
                            </Grid>
                            <Grid item md={4} style={{ textAlign: 'right', margin: '15px 0px' }}>
                                <ToggleButtonGroup
                                    color="primary"
                                    value={value}
                                    label={field.label}
                                    exclusive
                                    onChange={onChange}
                                >
                                    {field.options.map((item, i) => (
                                        <ToggleButton
                                            key={i} value={item}>
                                            {item}
                                        </ToggleButton>
                                    ))}
                                </ToggleButtonGroup>
                            </Grid>
                        </Grid>
                    </>
                )}
            />
        </>
    );
};

InputToggleButton.propTypes = {
    control: PropTypes.any,
    field: PropTypes.any,
};

export default InputToggleButton;


