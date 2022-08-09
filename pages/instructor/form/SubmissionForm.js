import React from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FormComponent } from '../../../components';
import { SubmissionListUpload } from '../../../redux/action/instructor/InstructorAction';
import { AddImageIcon } from '../../../assets/icon';
import FormJson from '../../../constant/form/instructor-upload-file-form.json';

const SubmissionForm = ({
    SubmissionListUpload,
    clasId,
    folderId,
    isLoadingUpload
}) => {

    const { handleSubmit, control } = useForm({
        mode: 'all',
    });

    const onSubmit = (data) => {
        let bodyFormData = new FormData();
        bodyFormData.append('authorName', data.authorName);
        bodyFormData.append('title', data.title);
        bodyFormData.append('documentType', data.documentType.name);
        bodyFormData.append('plagiarismCheck', data.plagiarismCheck);
        bodyFormData.append('grammarCheck', data.grammarCheck);
        bodyFormData.append('language', "English");
        bodyFormData.append('file', data.file[0]);
        if (clasId) {
            SubmissionListUpload(`classes/${clasId}/assignments/${folderId}/singleFile`, bodyFormData);
        } else {
            SubmissionListUpload(`myFolder/${folderId}/singleFile`, bodyFormData);
        }

    };

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

const mapDispatchToProps = (dispatch) => {
    return {
        SubmissionListUpload: (apiUrl, data) => dispatch(SubmissionListUpload(apiUrl, data)),
    };
};

export default connect(null, mapDispatchToProps)(SubmissionForm);