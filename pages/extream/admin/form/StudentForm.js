import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FormComponent } from '../../../../components';
import { EditData } from '../../../../redux/action/admin/AdminAction';
import FormJson from '../../../../constant/form/student-form.json';
import { EditClassAndStudentIcon } from '../../../../assets/icon';
import END_POINTS from '../../../../utils/EndPoints';
import { BASE_URL_EXTREM } from '../../../../utils/BaseUrl';

const StudentForm = ({
    isLoading,
    editData,
    EditData
}) => {

    const [formJsonField, setFormJsonField] = useState(FormJson);
    const [editOperation, setEditOperation] = useState(false);

    const { handleSubmit, control, setValue } = useForm({
        mode: 'all',
    });

    const onSubmit = (data) => {
        if (editOperation) {
            EditData(BASE_URL_EXTREM + END_POINTS.ADMIN_INSTRUCTOR_EDIT_DATA + 'students/' + editData?.id, data, 'students');
        }
    };
    useEffect(() => {
        if (editData) {
            let a = {
                'name': editData.name,
            'email': editData.username,
                'studentId': editData?.student_user_id,
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
            setEditOperation(true);
        }
    }, [editData]);

    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <EditClassAndStudentIcon />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container>
                    {formJsonField?.map((field, i) => (
                        <Grid key={field?.name} md={12} style={{ marginLeft: '8px' }}>
                            <FormComponent
                                key={i}
                                field={field}
                                control={control}
                                isLoading={isLoading}
                            />
                        </Grid>
                    ))}
                </Grid>
            </form>
        </>
    );
};

const mapStateToProps = (state) => ({
    isLoading: state?.adminCrud?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        EditData: (url, data, API_END_POINT) => dispatch(EditData(url, data, API_END_POINT)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm);