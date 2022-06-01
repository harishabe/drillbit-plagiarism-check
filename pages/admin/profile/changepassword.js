import React from 'react'
import Admin from '../../../layouts/Admin'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Grid from '@mui/material/Grid'
import { FormComponent, MainHeading } from '../../../components'
import FormJson from '../../../constant/form/change-password-form.json'

const ChangePassword = () => {
    const router = useRouter()

    const { handleSubmit, control } = useForm({
        mode: 'all',
    })

    const onSubmit = (data) => {
    }

    return (
        <>
        <MainHeading title='Change Password' />
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container>
                    {
                        FormJson ?
                            FormJson.map((field, i) =>
                                <Grid md={5.8} style={{marginLeft:'8px'}}>
                                    <FormComponent
                                        key={i}
                                        field={field}
                                        control={control}
                                    />
                                </Grid>) : null
                    }
                </Grid>
            </form>
        </>
    )
}

ChangePassword.layout = Admin

export default ChangePassword