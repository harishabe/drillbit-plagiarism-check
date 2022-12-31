import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { useForm, useWatch } from 'react-hook-form';
import { FormComponent } from '../../../../components';
import { CreateStudent, EditStudent } from '../../../../redux/action/instructor/InstructorAction';
import { SuperCreateStudent, SuperEditStudent } from '../../../../redux/action/super/SuperAdminAction';
import { AddImageIcon } from '../../../../assets/icon';
import FormJson from '../../../../constant/form/instructor-student-form.json';
import { FORM_VALIDATION } from '../../../../constant/data/Constant';
import { BASE_URL_SUPER } from '../../../../utils/BaseUrl';
import END_POINTS from '../../../../utils/EndPoints';

const StudentForm = ({
    CreateStudent,
    EditStudent,
    SuperCreateStudent,
    SuperEditStudent,
    isLoadingStudent,
    editData,
    isLoadingEditStudent
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
        let requestData = Object.entries(data).reduce((newObj, [key, value]) => (value == '' ? newObj : (newObj[key] = value, newObj)), {});

        if (editOperation) {
            if (router?.pathname.split('/')[1] === 'super') {
                SuperEditStudent(BASE_URL_SUPER + END_POINTS.SUPER_ADMIN_INSTRUCTOR + `${router?.query?.licenseId}/students/${editData?.id}`, requestData)
            } else {
                EditStudent(router.query.clasId, editData?.id, requestData);
            }
        } else {
            if (router?.pathname.split('/')[1] === 'super') {
                SuperCreateStudent(BASE_URL_SUPER + `/license/${router?.query?.licenseId}/students`, requestData)
            } else {
                CreateStudent(router.query.clasId, requestData);
            }
            // CreateStudent(router.query.clasId, requestData);
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
                'studentId': editData.student_id || editData.user_id,
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
                                isLoading={ isLoadingStudent || isLoadingEditStudent }
                            />
                        </Grid>
                    )) }
                </Grid>
            </form>
        </>
    );
};

const mapStateToProps = (state) => ({
    isLoadingStudent: state?.instructorClasses?.isLoadingStudent,
    isLoadingStudent: state?.superAdmin?.isLoadingCreateStudent,
});

const mapDispatchToProps = (dispatch) => {
    return {
        CreateStudent: (ClasId, data) => dispatch(CreateStudent(ClasId, data)),
        EditStudent: (ClasId, userId, requestPayload,) => dispatch(EditStudent(ClasId, userId, requestPayload,)),
        SuperCreateStudent: (url, requestPayload) => dispatch(SuperCreateStudent(url, requestPayload)),
        SuperEditStudent: (url, requestPayload) => dispatch(SuperEditStudent(url, requestPayload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm);