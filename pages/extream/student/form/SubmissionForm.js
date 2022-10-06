import React, { useState, useEffect } from 'react';
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
    const [formJsonField, setFormJsonField] = useState(FormJson);
    const { handleSubmit, control, setValue } = useForm({
        mode: 'all',
    });

    const onSubmit = (data) => {
        console.log('datadatadatadata',data);
        let bodyFormData = new FormData();
        bodyFormData.append('authorName', getItemLocalStorage('name'));
        bodyFormData.append('title', assignmentName);
        bodyFormData.append('file', data.file[0]);
        NewSubmission(bodyFormData, router.query.clasId, router.query.assId)

    }

    const modifyFormField = () => {
        let formField = formJsonField?.map((field) => {
            if (field.field_type === 'file') {
                field['info'] = 'Supported files: pdf, doc, docx, txt, rtf, dot, dotx, html, odt, pptx';
            }
            return field;
        });
        setFormJsonField(formField);
    }

    useEffect(() => {
        let a = {
            'name': getItemLocalStorage('name'),
            'title': assignmentName,
        };
        const fields = [
            'name',
            'title',
        ];
        fields.forEach(field => setValue(field, a[field]));
        modifyFormField();
    }, []);

    console.log("formJsonField", formJsonField)
    return (
        <>
            <div style={ { textAlign: 'center' } }>
                <AddImageIcon />
            </div>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <Grid container>
                    { formJsonField?.map((field, i) => (
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