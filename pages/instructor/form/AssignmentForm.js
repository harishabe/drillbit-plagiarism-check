import React from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useRouter } from "next/router";
import { FormComponent } from '../../../components';
import { AddImageIcon } from '../../../assets/icon';
import { CreateAssignment } from '../../../redux/action/instructor/InstructorAction';
import FormJson from '../../../constant/form/instructor-assignment-form.json';
import { convertDate } from '../../../utils/RegExp'

const AssignmentForm = ({
    CreateAssignment,
    isLoadingCreate
}) => {

    const router = useRouter();

    const ClasId = router.query.clasId;

    const { handleSubmit, control } = useForm({
        mode: 'all',
    });

    const onSubmit = (data) => {
        let bodyFormData = new FormData();
        bodyFormData.append('assignment_name', data.assignment_name);
        bodyFormData.append('end_date', convertDate(data.end_date));
        bodyFormData.append('exclude_refernces', 'yes');
        bodyFormData.append('exclude_quotes', 'yes');
        bodyFormData.append('exclude_small_sources', 'yes');
        bodyFormData.append('assignment_grading', 'no');
        bodyFormData.append('exclude_include_sources', 'yes');
        bodyFormData.append('save_to_repository', 'no');
        bodyFormData.append('allow_resubmissions', 'no');
        bodyFormData.append('allow_submissions_after_due_date', 'no');
        bodyFormData.append('grammar_check', 'no');
        bodyFormData.append('choice_of_email_notifications', 'no');
        bodyFormData.append('add_questions', 'no');
        bodyFormData.append('exclude_phrases', 'no');
        bodyFormData.append('repository_scope', 'no');
        bodyFormData.append('report_access', 'no');
        bodyFormData.append('db_studentpaper', 'no');
        bodyFormData.append('db_publications', 'no');
        bodyFormData.append('db_internet', 'no');
        bodyFormData.append('institution_repository', 'yes');
        bodyFormData.append('file', data.file[0]);
        CreateAssignment(ClasId, bodyFormData);
    };

    return (
        <div>
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
                                isLoading={ isLoadingCreate }
                            />

                        </Grid>
                    )) }
                </Grid>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isLoadingCreate: state?.instructorClasses?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        CreateAssignment: (ClasId, data) => dispatch(CreateAssignment(ClasId, data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentForm);