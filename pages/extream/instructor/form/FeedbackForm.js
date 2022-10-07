import React, { useEffect } from 'react';
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
    gradingData,
    feedbackData,
    clasId,
    assId
}) => {

    const { handleSubmit, control, setValue } = useForm({
        mode: 'all',
    });

    const onSubmit = (data) => {
        let DetailedData = {
            'feedback': data.feedback,
            'marks': data.marks,
        }
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
                }
            })
        }
    }, [gradingData]);

    return (
        <>
            <div style={ { textAlign: 'center' } }>
                <AddImageIcon />
            </div>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <Grid container>
                    { FormJson?.map((field, i) => (
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