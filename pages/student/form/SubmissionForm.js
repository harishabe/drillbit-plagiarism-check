import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import { useForm } from 'react-hook-form';
import { useRouter } from "next/router";
import { FormComponent } from '../../../components';
import FormJson from '../../../constant/form/student-submission-form.json';
import { AddImageIcon } from '../../../assets/icon';
import { NewSubmission } from '../../../redux/action/student/StudentAction';
import { getItemLocalStorage } from '../../../utils/RegExp';

const SubmissionForm = ({
    NewSubmission,
    isLoadingNewSubmission,
    instructorName
}) => {
    const router = useRouter();

    const [formJsonField, setFormJsonField] = useState(FormJson);

    const class_id = router.query.clasId;
    const folder_id = router.query.assId;

    const { handleSubmit, control, setValue } = useForm({
        mode: 'all',
    });

    console.log(getItemLocalStorage('name'))

    const onSubmit = (data) => {
        console.log('data',data);
        let bodyFormData = new FormData();
        bodyFormData.append('authorName', getItemLocalStorage('name'));
        // bodyFormData.append('name', 'drillbit');
        bodyFormData.append('title', data.title);
        bodyFormData.append('file', data.file[0]);
        NewSubmission(bodyFormData, class_id, folder_id)
    }

    const modifyFormField = (isDisabled) => {
        let formField = formJsonField?.map((field) => {
            if (field.name === 'name') {
                field.label = isDisabled;
            }
            return field;
        });
        setFormJsonField(formField);
    };

    useEffect(() => {
        let a = {
            'name': getItemLocalStorage('name')
        };
        const fields = [
            'name'
        ];
        fields.forEach(field => setValue(field, a[field]));
        modifyFormField("Student name");
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
    instructorName: state?.studentClasses?.headerData?.instructorName,
});

const mapDispatchToProps = (dispatch) => {
    return {
        NewSubmission: (data, class_id, folder_id) => dispatch(NewSubmission(data, class_id, folder_id)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmissionForm);