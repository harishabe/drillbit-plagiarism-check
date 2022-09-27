import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { useForm, useWatch } from 'react-hook-form';
import { FormComponent } from '../../../../components';
import { CreateClass, EditClass } from '../../../../redux/action/instructor/InstructorAction';
import FormJson from '../../../../constant/form/myclasses-form.json';
import { AddImageIcon } from '../../../../assets/icon';
import { convertDate } from '../../../../utils/RegExp';
import { EXPIRY_DATE_GREATER_THAN_CURRENT_DATE } from '../../../../constant/data/ErrorMessage';

const MyClassesForm = ({
    isLoading,
    CreateClass,
    EditClass,
    editData,
}) => {

    const [formJsonField, setFormJsonField] = useState(FormJson);

    const [editOperation, setEditOperation] = useState(false);

    const { handleSubmit, control, setValue } = useForm({
        mode: 'all',
    });

    const expiryDate = useWatch({
        control,
        name: "expiry_date",
    });

    useEffect(() => {
        if (new Date(expiryDate).getDate() < new Date().getDate()) {
            let fields = FormJson?.map((item) => {
                if (item?.field_type === 'button') {
                    item['isDisabled'] = true;
                }
                if (item?.field_type === 'datepicker') {
                    item['info'] = EXPIRY_DATE_GREATER_THAN_CURRENT_DATE;
                }
                return item;
            });
            setFormJsonField(fields);
        } else if (new Date(expiryDate).getDate() > new Date().getDate()) {
            let fields = FormJson?.map((item) => {
                if (item?.field_type === 'button') {
                    item['isDisabled'] = false;
                }
                if (item?.field_type === 'datepicker') {
                    item['info'] = '';
                }
                return item;
            });
            setFormJsonField(fields);
        } else if (new Date(expiryDate).getDate() === new Date().getDate()) {
            let fields = FormJson?.map((item) => {
                if (item?.field_type === 'button') {
                    item['isDisabled'] = false;
                }
                if (item?.field_type === 'datepicker') {
                    item['info'] = '';
                }
                return item;
            });
            setFormJsonField(fields);
        } else {
            let fields = FormJson?.map((item) => {
                if (item?.field_type === 'button') {
                    item['isDisabled'] = false;
                }
                // if (item?.field_type === 'datepicker') {
                //     item['info'] = expiryDate;
                // } 
                return item;
            });
            setFormJsonField(fields);
        }
    }, [expiryDate])

    const onSubmit = (data) => {
        if (editOperation) {
            data['end_date'] = convertDate(data.expiry_date);
            delete data.expiry_date;
            EditClass(editData?.id, data);
        } else {
            let DetailedData = { ...data, "end_date": convertDate(data.expiry_date) }
            delete DetailedData.expiry_date;
            CreateClass(DetailedData);
        }
    };

    const modifyFormField = (buttonLabel, isNameDisabled) => {
        let formField = formJsonField?.map((field) => {
            if (field.type === 'text') {
                field.disabled = isNameDisabled;
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
    };

    useEffect(() => {
        if (editData) {
            let a = {
                'class_name': editData.name,
                'description': editData.description,
                'expiry_date': convertDate(editData.expiry_date),
            };
            const fields = [
                'class_name',
                'description',
                'expiry_date',
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
            <div style={{ textAlign: 'center' }}>
                <AddImageIcon />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container>
                    {formJsonField?.map((field, i) => (
                        <Grid item md={12} style={{ marginLeft: '8px' }}>
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
    )
}

const mapStateToProps = (state) => ({
    isLoading: state?.instructorCrud?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        CreateClass: (data) => dispatch(CreateClass(data)),
        EditClass: (classId, requestPayload) => dispatch(EditClass(classId, requestPayload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MyClassesForm);