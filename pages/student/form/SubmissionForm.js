import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import { FormComponent } from '../../../components';
import FormJson from '../../../constant/form/student-submission-form.json';
import { AddImageIcon } from '../../../assets/icon';

const SubmissionForm = ({
    onSubmit,
    isLoadingNewSubmission,
}) => {
    const { handleSubmit, control } = useForm({
        mode: 'all',
    });

    return (
        <>
            <div style={ { textAlign: 'center' } }>
                <AddImageIcon />
            </div>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <Grid container>
                    { FormJson?.map((field, i) => (
                        <Grid md={ 12 } style={ { marginLeft: '8px' } }>
                            <FormComponent
                                key={ i }
                                field={ field }
                                control={ control }
                                isLoading={ isLoadingNewSubmission }
                            />
                        </Grid>
                    )) }
                </Grid>
            </form>
        </>
    )
}

export default SubmissionForm;