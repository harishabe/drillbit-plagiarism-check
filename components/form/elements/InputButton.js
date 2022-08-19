import React from 'react';
import { Box, Paper, Button } from '@mui/material';
import BeatLoader from "react-spinners/BeatLoader";

const InputButton = ({
    field,
    isLoading
}) => {
    return (
        <Paper>
            <Box my={2}>
                <Button
                    style={{ padding: '12px' }}
                    fullWidth
                    size="large"
                    margin="normal"
                    variant="contained"
                    type={field.type}
                    color="primary"
                >
                    {isLoading ? <BeatLoader color="#fff" /> : field.label}
                </Button>
            </Box>
        </Paper>
    )
}

export default InputButton
