import React from 'react';
import { Box, Paper, Button } from '@mui/material';
import styled from 'styled-components';
import BeatLoader from 'react-spinners/BeatLoader';

const StyledButton = styled(Button)((disabled) => ({
    'background-color': disabled && '#3672FF !important',
    ':hover': {
        transform: 'scale(1.01)',
        transition: 'all 0.2s ease-out',
    },
}));

const LoaderContainer = styled.div`
    position: relative;
    top:3px;
`;

const InputButton = ({
    field,
    isLoading
}) => {
    return (
        <Paper>
            <Box my={2}>
                <StyledButton
                    fullWidth
                    margin="normal"
                    variant="contained"
                    type={field.type}
                    color="primary"
                    disabled={isLoading || field.isDisabled}
                    href={ field.href }
                >
                    {isLoading ? <LoaderContainer><BeatLoader size={11} color="#fff" /></LoaderContainer> : field.label}
                </StyledButton>
            </Box>
        </Paper>
    );
};

export default InputButton;
