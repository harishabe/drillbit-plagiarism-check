import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { useForm, useWatch } from 'react-hook-form';
import { FormComponent } from '../../../../components';
import { InstructorFeedback, EditFeedback } from '../../../../redux/action/instructor/InstructorAction';
import FormJson from '../../../../constant/form/feedback-form.json';
import { AddImageIcon } from '../../../../assets/icon';
import { FORM_VALIDATION } from '../../../../constant/data/Constant';

const FeedbackForm = ({
    isLoading,
    InstructorFeedback,
    gradingData,
    feedbackData,
    clasId,
    assId,
    maxMarks
}) => {

    const [formJsonField, setFormJsonField] = useState(FormJson);

    const { handleSubmit, control, setValue } = useForm({
        mode: 'all',
    });

    const marksData = useWatch({
        control,
        name: 'marks',
    });

    useEffect(() => {
        if (marksData !== undefined) {
            if (marksData > maxMarks) {
                let fields = FormJson?.map((item) => {
                    if (item?.field_type === 'inputNumber' && item?.name === 'marks') {
                        item['errorMsg'] = FORM_VALIDATION.GRADES;
                    }
                    if (item?.field_type === 'button') {
                        item['isDisabled'] = true;
                    }
                    return item;
                });
                setFormJsonField(fields);
            } else {
                let fields = FormJson?.map((item) => {
                    if (item?.field_type === 'inputNumber' && item?.name === 'marks') {
                        item['errorMsg'] = '';
                    }
                    if (item?.field_type === 'button') {
                        item['isDisabled'] = false;
                    }
                    return item;
                });
                setFormJsonField(fields);
            }
        }
    }, [marksData, gradingData]);

    const modifyFormField = () => {
        let formField = formJsonField?.map((field) => {
            if (field.name === 'marks') {
                field['info'] = 'Maximum marks: ' + maxMarks;
            }
            return field;
        });
        setFormJsonField(formField);
    };

    const onSubmit = (data) => {
        let DetailedData = {
            'feedback': data.feedback,
            'marks': data.marks,
        };
        InstructorFeedback(clasId, assId, feedbackData, DetailedData);
    };

    useEffect(() => {
        if (gradingData) {
            gradingData?.map((item) => {
                if (item?.paper_id === feedbackData) {
                    let a = {
                        'marks': item?.obtained_marks,
                        'feedback': item?.feedback,
                    };
                    const fields = [
                        'marks',
                        'feedback',
                    ];
                    fields.forEach(field => setValue(field, a[field]));
                    modifyFormField();
                }
            });
        }
    }, [gradingData]);

    return (
        <>
            <div style={ { textAlign: 'center' } }>
                <AddImageIcon />
            </div>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <Grid container>
                    { formJsonField?.map((field, i) => (
                        <Grid key={ field?.name } item md={ 12 } style={ { marginLeft: '8px' } }>
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
    );
};

const mapStateToProps = (state) => ({
    isLoading: state?.instructorSubmissionGrading?.isLoadingFeedback,
    gradingData: state?.instructorMyFolders?.submissionData?._embedded?.gradingDTOList,
    maxMarks: state?.instructorMyFolders?.submissionData?._embedded?.gradingDTOList[0]?.max_marks,
});

const mapDispatchToProps = (dispatch) => {
    return {
        InstructorFeedback: (clasId, assId, paperId, data) => dispatch(InstructorFeedback(clasId, assId, paperId, data)),
        EditFeedback: (clasId, folder_id, paper_id, data) => dispatch(EditFeedback(clasId, folder_id, paper_id, data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackForm);