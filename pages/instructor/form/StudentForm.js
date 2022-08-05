import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { useRouter } from "next/router";
import { useForm } from 'react-hook-form';
import { FormComponent } from '../../../components';
import { CreateStudent, EditStudent } from '../../../redux/action/instructor/InstructorAction';
import { AddImageIcon } from '../../../assets/icon';
import FormJson from '../../../constant/form/instructor-student-form.json';

const StudentForm = ({
    CreateStudent,
    EditStudent,
    isLoadingCreate,
    editData
}) => {

    const router = useRouter();
    const [formJsonField, setFormJsonField] = useState(FormJson);

    const [editOperation, setEditOperation] = useState(false);

    const { handleSubmit, control, setValue } = useForm({
        mode: 'all',
    });

    const onSubmit = (data) => {
        console.log("editDataeditData", editData)
        if (editOperation) {
            EditStudent(router.query.clasId, editData?.id, data);
        } else {
            CreateStudent(router.query.clasId, data);
        }
    };

    const modifyFormField = (buttonLabel, isEmailDisabled) => {
        let formField = formJsonField?.map((field) => {
            if (field.field_type === 'button') {
                field.label = buttonLabel;
            }
            if (field.type === 'email') {
                field.disabled = isEmailDisabled;
            }
            return field;
        });
        setFormJsonField(formField);
    }

    useEffect(() => {
        if (editData) {
            let a = {
                'name': editData.name,
                'email': editData.email,
                'studentId': editData.id,
                'department': editData.department,
                'section': editData.section
            };
            const fields = [
                'name',
                'email',
                'studentId',
                'department',
                'section'
            ];
            fields.forEach(field => setValue(field, a[field]));
            modifyFormField('Edit Student', true);
            setEditOperation(true);
        } else {
            modifyFormField('Create Student', false);
        }
    }, [editData]);

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
                                isLoading={ isLoadingCreate }
                            />
                        </Grid>
                    )) }
                </Grid>
            </form>
        </>
    )
}

const mapStateToProps = (state) => ({
    isLoadingCreate: state?.instructorClasses?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        CreateStudent: (ClasId, data) => dispatch(CreateStudent(ClasId, data)),
        EditStudent: (ClasId, userId, requestPayload,) => dispatch(EditStudent(ClasId, userId, requestPayload,)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm);