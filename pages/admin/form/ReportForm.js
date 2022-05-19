import React from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Grid from '@mui/material/Grid'
import { FormComponent } from '../../../components'
import FormJson from '../../../constant/form/admin-report-form.json'

const ReportForm = () => {
    const router = useRouter()

    const { handleSubmit, control } = useForm({
        mode: 'all',
    })

    const onSubmit = (data) => {
    }

    return (
        <>
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

export default ReportForm