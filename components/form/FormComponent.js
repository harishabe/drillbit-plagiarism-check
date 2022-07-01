import React from 'react'
import InputTextField from './elements/InputTextField'
import InputButton from './elements/InputButton'
import InputDatePicker from './elements/InputDatePicker'
import InputAutoComplete from './elements/InputAutoComplete'
import InputToggleButton from './elements/InputToggleButton'
import InputFileType from './elements/InputFileType'
import InputMultiAutoComplete from './elements/InputMultiAutoComplete'

const FormComponent = ({
    field,
    control,
    options,
    isLoading
}) => {
    console.log('fieldfieldfieldfield',field);
    switch (field.field_type) {
        case 'input':
            return (
                <InputTextField
                    field={field}
                    control={control}
                />
            )
        case 'file':
            return (
                <InputFileType
                    field={field}
                    control={control}
                />
            )
        case 'datepicker':
            return (
                <InputDatePicker
                    field={field}
                    control={control}
                />
            )
        case 'dropdown':
            return (
                <InputAutoComplete
                    field={field}
                    control={control}
                    options={options}
                />
            )
        case 'multiSelectDropdown':
            return (
                <InputMultiAutoComplete
                    field={field}
                    control={control}
                    options={options}
                />
            )
        case 'toggle':
            return (
                <InputToggleButton
                    field={field}
                    control={control}
                />
            )
        case 'button':
            return (
                <InputButton
                    field={field}
                    isLoading={isLoading}
                />
            )
        default:
            return null
    }
}

export default FormComponent
