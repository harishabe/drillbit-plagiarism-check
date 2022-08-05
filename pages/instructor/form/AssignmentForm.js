import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useRouter } from "next/router";
import { FormComponent } from '../../../components';
import { AddImageIcon } from '../../../assets/icon';
import { CreateAssignment, EditAssignment } from '../../../redux/action/instructor/InstructorAction';
import FormJson from '../../../constant/form/instructor-assignment-form.json';
import { convertDate } from '../../../utils/RegExp'

const AssignmentForm = ({
    CreateAssignment,
    EditAssignment,
    editData,
    isLoading
}) => {

    const router = useRouter();
    const [formJsonField, setFormJsonField] = useState(FormJson);

    const [editOperation, setEditOperation] = useState(false);

    const { handleSubmit, control, setValue } = useForm({
        mode: 'all',
    });

    const onSubmit = (data) => {
        let bodyFormData = new FormData();
        if (editOperation) {
            data['start_date'] = convertDate(data.start_date);
            data['end_date'] = convertDate(data.end_date);
            EditAssignment(router.query.clasId, editData?.id, data);
        } else {
        bodyFormData.append('assignment_name', data.assignment_name);
            bodyFormData.append('start_date', convertDate(data.start_date));
        bodyFormData.append('end_date', convertDate(data.end_date));
            bodyFormData.append('exclude_references', data.exclude_references);
        bodyFormData.append('exclude_quotes', data.exclude_quotes);
        bodyFormData.append('exclude_small_sources', data.exclude_small_sources);
        bodyFormData.append('assignment_grading', data.assignment_grading);
        bodyFormData.append('exclude_include_sources', data.exclude_include_sources);
        bodyFormData.append('save_to_repository', data.save_to_repository);
        bodyFormData.append('allow_resubmissions', data.allow_resubmissions);
        bodyFormData.append('allow_submissions_after_due_date', data.allow_submissions_after_due_date);
        bodyFormData.append('grammar_check', data.grammar_check);
        bodyFormData.append('choice_of_email_notifications', data.choice_of_email_notifications);
        bodyFormData.append('add_questions', data.add_questions);
        bodyFormData.append('exclude_phrases', data.exclude_phrases);
        bodyFormData.append('repository_scope', data.repository_scope.name);
        bodyFormData.append('report_access', data.report_access);
        bodyFormData.append('db_studentpaper', data.db_studentpaper);
        bodyFormData.append('db_publications', data.db_publications);
        bodyFormData.append('db_internet', data.db_internet);
        bodyFormData.append('institution_repository', data.institution_repository);
        bodyFormData.append('file', data.file[0]);
            CreateAssignment(router.query.clasId, bodyFormData);
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
    }

    useEffect(() => {
        if (editData) {
            console.log("editData", editData)
            let a = {
                'assignment_name': editData.name,
                'start_date': convertDate(editData.creation),
                'end_date': convertDate(editData.end),
                'exclude_references': editData.exclude_references,
                'exclude_quotes': editData.exclude_quotes,
                'exclude_small_sources': editData.exclude_small_sources,
                'assignment_grading': editData.assignment_grading,
                'exclude_include_sources': editData.exclude_include_sources,
                'save_to_repository': editData.save_to_repository,
                'allow_resubmissions': editData.allow_resubmissions,
                'allow_submissions_after_due_date': editData.allow_submissions_after_due_date,
                'grammar_check': editData.grammar_check,
                'choice_of_email_notifications': editData.choice_of_email_notifications,
                'add_questions': editData.add_questions,
                'exclude_phrases': editData.exclude_phrases,
                'repository_scope': editData.repository_scope,
                'report_access': editData.report_access,
                'db_studentpaper': editData.db_studentpaper,
                'db_publications': editData.db_publications,
                'db_internet': editData.db_internet,
                'institution_repository': editData.institution_repository,
                'file': ' ',
            };
            const fields = [
                'assignment_name',
                'start_date',
                'end_date',
                'exclude_references',
                'exclude_quotes',
                'exclude_small_sources',
                'assignment_grading',
                'exclude_include_sources',
                'save_to_repository',
                'allow_resubmissions',
                'allow_submissions_after_due_date',
                'grammar_check',
                'choice_of_email_notifications',
                'add_questions',
                'exclude_phrases',
                'repository_scope',
                'report_access',
                'db_studentpaper',
                'db_publications',
                'db_internet',
                'institution_repository',
                'file'
            ];
            fields.forEach(field => setValue(field, a[field]));
            modifyFormField('Edit Assignment', true);
            setEditOperation(true);
        } else {
            modifyFormField('Create Assignment', false);
        }
    }, [editData]);

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
                                isLoading={ isLoading }
                            />

                        </Grid>
                    )) }
                </Grid>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => ({
    isLoading: state?.instructorClasses?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        CreateAssignment: (ClasId, data) => dispatch(CreateAssignment(ClasId, data)),
        EditAssignment: (ClasId, assId) => dispatch(EditAssignment(ClasId, assId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AssignmentForm);