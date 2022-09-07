import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import { useRouter } from "next/router";
import { FormComponent } from '../../../../components';
import FormJson from '../../../../constant/form/student-submission-form.json';
import { AddImageIcon } from '../../../../assets/icon';
import { NewSubmission } from '../../../../redux/action/student/StudentAction';
import { getItemLocalStorage } from '../../../../utils/RegExp';

const SubmissionForm = ({
    NewSubmission,
    isLoadingNewSubmission,
    assignmentName
}) => {
    const router = useRouter();

    const { handleSubmit, control, setValue } = useForm({
        mode: 'all',
    });

    const onSubmit = (data) => {
        let bodyFormData = new FormData();
        bodyFormData.append('authorName', getItemLocalStorage('name'));
        bodyFormData.append('title', assignmentName);
        bodyFormData.append('file', data.file[0]);
        NewSubmission(bodyFormData, router.query.clasId, router.query.assId)
    }

    useEffect(() => {
        let a = {
            'name': getItemLocalStorage('name'),
            'title': assignmentName
        };
        const fields = [
            'name',
            'title'
        ];
        fields.forEach(field => setValue(field, a[field]));
    }, []);

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
    assignmentName: state?.studentClasses?.headerData?.assignmentName,
});

const mapDispatchToProps = (dispatch) => {
    return {
        NewSubmission: (data, class_id, folder_id) => dispatch(NewSubmission(data, class_id, folder_id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionForm);