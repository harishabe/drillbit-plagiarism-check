import React from 'react'
import { Box, Paper, Button } from '@mui/material'

const InputButton = ({
  field
}) => {
  return (
    <Paper>
      <Box my={2}>
        <Button
          style={{padding:'12px'}}
          fullWidth
          size="large"
          margin="normal"
          variant="contained"
          type={field.type}                    
          color="primary"
        >
          {field.label}
        </Button>
      </Box>
    </Paper>
  )
}

export default InputButton
