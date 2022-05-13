import React from 'react'
import { Controller } from 'react-hook-form'
import PropTypes from 'prop-types'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import InputLabel from '@mui/material/InputLabel'

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
                        <InputLabel style={{ fontSize: '15px', margin: '10px 0px' }}>
                            {field.label}
                        </InputLabel>
                        <ToggleButtonGroup
                            color="primary"
                            value={value}
                            label={field.label}
                            exclusive
                            onChange={onChange}
                        >
                            {field.options.map((item, i) => (
                                <ToggleButton style={{paddingLeft:'100%',paddingRight:'100%'}}
                                    key={i} value={item}>
                                    {item}
                                </ToggleButton>
                            ))}
                        </ToggleButtonGroup>
                    </>
                )}
            />
        </>
    )
}

InputToggleButton.propTypes = {
    control: PropTypes.any,
    field: PropTypes.any,
}

export default InputToggleButton


