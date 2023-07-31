import React from 'react';
import { Box, Paper, Button } from '@mui/material';
import styled from 'styled-components';
import BeatLoader from 'react-spinners/BeatLoader';

import { MuiFormElementConfig } from './../MuiFormElementConfig'

const StyledButton = styled(Button)((disabled) => ({
    'background-color': disabled && '#3672FF !important',
    ':hover': {
        transform: 'scale(1.01)',
        transition: 'all 0.2s ease-out',
    },
}));

const InputButton = ({
    field,
    isLoading
}) => {
    return (
        <Paper>
            <Box my={2}>
                <StyledButton
                    fullWidth
                    size='medium'
                    margin={ MuiFormElementConfig.margin }
                    variant={ MuiFormElementConfig.buttonVariant }
                    type={field.type}
                    color="primary"
                    disabled={isLoading || field.isDisabled}
                    href={ field.href }
                >
                    {isLoading ? <BeatLoader color="#fff" /> : field.label}
                </StyledButton>
            </Box>
        </Paper>
    );
};

export default InputButton;
