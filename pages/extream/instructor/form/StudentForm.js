import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { useForm, useWatch } from 'react-hook-form';
import { FormComponent } from '../../../../components';
import { CreateStudent, EditStudent } from '../../../../redux/action/instructor/InstructorAction';
import { AddImageIcon } from '../../../../assets/icon';
import FormJson from '../../../../constant/form/instructor-student-form.json';
import { FORM_VALIDATION } from '../../../../constant/data/Constant';

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

    const phoneNumber = useWatch({
        control,
        name: 'phone_number',
    });

    useEffect(() => {
        if (phoneNumber !== undefined) {
            if ((phoneNumber?.length >= 1 && phoneNumber?.length < 10) || phoneNumber?.length > 15) {
                let fields = FormJson?.map((item) => {
                    if (item?.field_type === 'inputNumber' && item?.name === 'phone_number') {
                        item['errorMsg'] = FORM_VALIDATION.PHONE_NUMBER;
                    }
                    if (item?.field_type === 'button') {
                        item['isDisabled'] = true;
                    }
                    return item;
                });
                setFormJsonField(fields);
            } else {
                let fields = FormJson?.map((item) => {
                    if (item?.field_type === 'inputNumber' && item?.name === 'phone_number') {
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

    }, [phoneNumber]);

    const onSubmit = (data) => {
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
    };

    useEffect(() => {
        if (editData) {
            let a = {
                'name': editData.name,
                'email': editData.username,
                'studentId': editData.id,
                'department': editData.department,
                'section': editData.section,
                'phone_number': editData.phone_number
            };
            const fields = [
                'name',
                'email',
                'studentId',
                'department',
                'section',
                'phone_number'
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
                        <Grid key={ field?.name } md={ 12 } style={ { marginLeft: '8px' } }>
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
    );
};

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