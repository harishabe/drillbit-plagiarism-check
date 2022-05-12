import React from 'react'
import { Controller } from 'react-hook-form'
import PropTypes from 'prop-types'
import { TextField } from '@mui/material'

const InputFileType = ({
  control,
  field
}) => {

  return (
    <>
      <Controller
        name="file"
        control={control}
        render={({ field }) => (
          <TextField
            margin="normal"
            type="file"
            onChange={e => {
              field.onChange(e.target.files)
            }}
            fullWidth
            name={field.name}
            id={field.name}
            variant="outlined"
          />
        )}
      />
    </>
  )
}

InputFileType.propTypes = {
  control: PropTypes.any,
  field: PropTypes.any,
}

export default InputFileType


