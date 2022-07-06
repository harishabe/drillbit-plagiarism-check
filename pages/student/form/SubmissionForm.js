import React from 'react';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import { FormComponent } from '../../../components';
import FormJson from '../../../constant/form/student-submission-form.json';
import { AddImageIcon } from '../../../assets/icon';
import { NewSubmission } from '../../../redux/action/student/StudentAction';

const SubmissionForm = ({
    NewSubmission,
    isLoadingNewSubmission,
}) => {
    const { handleSubmit, control } = useForm({
        mode: 'all',
    });

    const onSubmit = (data) => {
        let bodyFormData = new FormData();
        bodyFormData.append('file', data.file[0]);
        NewSubmission(bodyFormData)
    }

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

const mapStateToProps = (state) => ({
    isLoadingNewSubmission: state?.studentClasses?.isLoadingNewSubmission,
});

const mapDispatchToProps = (dispatch) => {
    return {
        NewSubmission: (data) => dispatch(NewSubmission(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionForm);