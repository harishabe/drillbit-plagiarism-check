import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FormComponent } from '../../../../components';
import { InstructorFeedback, EditFeedback } from '../../../../redux/action/instructor/InstructorAction';
import FormJson from '../../../../constant/form/feedback-form.json';
import { AddImageIcon } from '../../../../assets/icon';

const FeedbackForm = ({
    isLoading,
    InstructorFeedback,
    EditFeedback,
    editData,
    feedbackData,
    clasId,
    assId
}) => {

    const [formJsonField, setFormJsonField] = useState(FormJson);

    const [editOperation, setEditOperation] = useState(false);

    const { handleSubmit, control, setValue } = useForm({
        mode: 'all',
    });

    const onSubmit = (data) => {
        if (editOperation) {
            let DetailedData = {
                'feedback': data.feedback,
                'marks': data.marks,
            }
            // EditFeedback(clasId, folder_id, editData?.id, DetailedData);
        } else {
            let DetailedData = {
                'feedback': data.feedback,
                'marks': data.marks,
            }
            // console.log("InstructorFeedback", clasId, assId, feedbackData, DetailedData)
            InstructorFeedback(clasId, assId, feedbackData, DetailedData);
        }
    };

    const modifyFormField = (buttonLabel) => {
        let formField = formJsonField?.map((field) => {
            if (field.field_type === 'button') {
                field.label = buttonLabel;
            }
            return field;
        });
        setFormJsonField(formField);
    };

    useEffect(() => {
        if (editData) {
            let a = {
                'marks': editData.marks,
                'feedback': editData.feedback,
            };
            const fields = [
                'marks',
                'feedback',
            ];
            fields.forEach(field => setValue(field, a[field]));
            modifyFormField('Submit');
            setEditOperation(true);
        } else {
            modifyFormField('Submit');
        }
    }, [editData]);

    return (
        <>
            <div style={ { textAlign: 'center' } }>
                <AddImageIcon />
            </div>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <Grid container>
                    { formJsonField?.map((field, i) => (
                        <Grid item md={ 12 } style={ { marginLeft: '8px' } }>
                            <FormComponent
                                key={ i }
                                field={ field }
                                control={ control }
                                isLoading={ isLoading }
                            />
                        </Grid>
                    )) }
                </Grid>
            </form>
        </>
    )
}

const mapStateToProps = (state) => ({
    isLoading: state?.instructorSubmissionGrading?.isLoadingFeedback,
});

const mapDispatchToProps = (dispatch) => {
    return {
        InstructorFeedback: (clasId, assId, paperId, data) => dispatch(InstructorFeedback(clasId, assId, paperId, data)),
        EditFeedback: (clasId, folder_id, paper_id, data) => dispatch(EditFeedback(clasId, folder_id, paper_id, data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackForm);