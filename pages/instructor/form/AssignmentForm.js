import React, { useState } from 'react';
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
    const [formField, setFormField] = useState(FormJson);

    const ClasId = router.query.clasId;

    const { watch, handleSubmit, control } = useForm({
        mode: 'onChange',
    });

    React.useEffect(() => {
        watch((value) => {
            if (value?.assignment_setting === 'yes') {
                let arr = formField;
                arr.splice(formField.length - 1, 0, {
                    "field_type": "toggle",
                    "id": "exclude_quotes",
                    "name": "exclude_quotes",
                    "label": "Exclude Quotes",
                    "options": [
                        "yes",
                        "no"
                    ]
                });
                setFormField(arr);
            }
        });
    }, [watch]);

    const onSubmit = (data) => {
        console.log('datadatadata', data);
        // let bodyFormData = new FormData();
        // bodyFormData.append('assignment_name', data.assignment_name);
        // bodyFormData.append('end_date', convertDate(data.end_date));
        // bodyFormData.append('exclude_refernces', data.exclude_refernces);
        // bodyFormData.append('exclude_quotes', data.exclude_quotes);
        // bodyFormData.append('exclude_small_sources', data.exclude_small_sources);
        // bodyFormData.append('assignment_grading', data.assignment_grading);
        // bodyFormData.append('exclude_include_sources', data.exclude_include_sources);
        // bodyFormData.append('save_to_repository', data.save_to_repository);
        // bodyFormData.append('allow_resubmissions', data.allow_resubmissions);
        // bodyFormData.append('allow_submissions_after_due_date', data.allow_submissions_after_due_date);
        // bodyFormData.append('grammar_check', data.grammar_check);
        // bodyFormData.append('choice_of_email_notifications', data.choice_of_email_notifications);
        // bodyFormData.append('add_questions', data.add_questions);
        // bodyFormData.append('exclude_phrases', data.exclude_phrases);
        // bodyFormData.append('repository_scope', data.repository_scope.name);
        // bodyFormData.append('report_access', data.report_access);
        // bodyFormData.append('db_studentpaper', data.db_studentpaper);
        // bodyFormData.append('db_publications', data.db_publications);
        // bodyFormData.append('db_internet', data.db_internet);
        // bodyFormData.append('institution_repository', data.institution_repository);
        // bodyFormData.append('file', data.file[0]);
        // CreateAssignment(ClasId, bodyFormData);
    };



    return (

        console.log('fieldsfieldsfieldsfields0', formField),
        <div>
            <div style={{ textAlign: 'center' }}>
                <AddImageIcon />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container>
                    {formField?.map((field, i) => (
                        <Grid md={12} style={{ marginLeft: '8px' }}>
                            <FormComponent
                                key={i}
                                field={field}
                                control={control}
                                isLoading={isLoadingCreate}
                            />
                        </Grid>
                    ))}
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