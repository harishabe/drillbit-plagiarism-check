import React from 'react';
import { Box, Paper, Button } from '@mui/material';
import styled from 'styled-components';
import BeatLoader from "react-spinners/BeatLoader";

const StyledButton = styled(Button)(() => ({
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
                    style={{ padding: '12px' }}
                    fullWidth
                    size="large"
                    margin="normal"
                    variant="contained"
                    type={field.type}
                    color="primary"
                >
                    {isLoading ? <BeatLoader color="#fff" /> : field.label}
                </StyledButton>
            </Box>
        </Paper>
    )
}

export default InputButton
