import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FormComponent } from '../../../components';
import { CreateClass, EditClass } from '../../../redux/action/instructor/InstructorAction';
import FormJson from '../../../constant/form/myclasses-form.json';
import { AddImageIcon } from '../../../assets/icon';
import { convertDate } from '../../../utils/RegExp';

const MyClassesForm = ({
    isLoading,
    CreateClass,
    EditClass,
    editData,
}) => {

    const [formJsonField, setFormJsonField] = useState(FormJson);

    const [editOperation, setEditOperation] = useState(false);

    const { handleSubmit, control } = useForm({
        mode: 'all',
    });

    const onSubmit = (data) => {
        if (editOperation) {
            data['end_date'] = convertDate(data.expiry_date);
            // EditClass(editData?.user_id?.props?.title, data);
            console.log("datadatadata", editData?.user_id?.props?.title, data)
        } else {
            let Detaileddata = { ...data, "end_date": convertDate(data.end_date) }
            CreateClass(Detaileddata);
        }
    };

    const modifyFormField = (buttonLabel) => {
        let formField = formJsonField?.map((field) => {
            if (field.name === 'class_name') {
                field.name = "";
            }
            if (field.name === 'end_date') {
                field.minDate = false;
            }
            if (field.field_type === 'button') {
                field.label = buttonLabel;
            }
            return field;
        });
        setFormJsonField(formField);
    }

    useEffect(() => {
        if (editData) {
            let a = {
                'name': editData.name,
                'end_date': convertDate(editData.expiry_date),
            };
            const fields = [
                'name',
                'end_date',
            ];
            fields.forEach(field => setValue(field, a[field]));
            modifyFormField('Edit Class', true);
            setEditOperation(true);
        } else {
            modifyFormField('Create Class', false);
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
    isLoading: state?.instructorClasses?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        CreateClass: (data) => dispatch(CreateClass(data)),
        EditClass: (classId, requestPayload) => dispatch(EditClass(classId, requestPayload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyClassesForm);