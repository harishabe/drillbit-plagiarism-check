import React from 'react';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import { FormComponent } from '../../../../components';
import FormJson from '../../../../constant/form/instructor-repositary-form.json';
import { AddImageIcon } from '../../../../assets/icon';
import { RepoUpload, SubmissionListUpload } from '../../../../redux/action/instructor/InstructorAction';
import { BASE_URL_EXTREM } from '../../../../utils/BaseUrl';
import END_POINTS from '../../../../utils/EndPoints';

const RepositaryForm = ({
    // RepoUpload,
    // isLoadingUpload,
    // clasId,
    // assId,
    SubmissionListUpload,
    isLoadingUpload
}) => {
    const { handleSubmit, control } = useForm({
        mode: 'all',
    });

    const onSubmit = (data) => {
        let bodyFormData = new FormData();
        bodyFormData.append('name', data.name);
        bodyFormData.append('title', data.title);
        bodyFormData.append('year', data.year);
        bodyFormData.append('repository', data.repository.name);
        bodyFormData.append('language', data.language.name);
        bodyFormData.append('file', data.file[0]);
        // RepoUpload(BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_REPOSITARY_UPLOAD, bodyFormData)
        SubmissionListUpload(BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_REPOSITARY_UPLOAD, bodyFormData)
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
                                isLoading={ isLoadingUpload }
                            />
                        </Grid>
                    )) }
                </Grid>
            </form>
        </>
    )
}

// const mapStateToProps = (state) => ({
//     isLoadingUpload: state?.instructorClasses?.isLoadingUpload,
// });

const mapDispatchToProps = (dispatch) => {
    return {
        // RepoUpload: (url, data) => dispatch(RepoUpload(url, data)), 
        SubmissionListUpload: (apiUrl, data) => dispatch(SubmissionListUpload(apiUrl, data)),
    };
};

export default connect(null, mapDispatchToProps)(RepositaryForm);