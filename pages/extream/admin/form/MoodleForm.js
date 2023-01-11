import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { useForm, useWatch } from 'react-hook-form';
import { FormComponent } from '../../../../components';
import { LmsIntegration, ChangeConfig } from '../../../../redux/action/admin/AdminAction';
import FormJson from '../../../../constant/form/admin-moodle-form.json';
import { AddImageIcon } from '../../../../assets/icon';
import END_POINTS from '../../../../utils/EndPoints';
import { BASE_URL_EXTREM } from '../../../../utils/BaseUrl';
import { FORM_VALIDATION } from '../../../../constant/data/Constant';

const MoodleForm = ({
    LmsIntegration,
    ChangeConfig,
    editData,
    isLoadingUpload
}) => {
    const [formJsonField, setFormJsonField] = useState(FormJson);

    const [editOperation, setEditOperation] = useState(false);

    const { handleSubmit, control, setValue } = useForm({
        mode: 'all',
    });

    const phoneNumber = useWatch({
        control,
        name: 'phone',
    });

    const onSubmit = (data) => {
        if (editOperation) {
            ChangeConfig(BASE_URL_EXTREM + END_POINTS.ADMIN_MOODLE_INTEGRATION, data);
        } else {
            LmsIntegration(BASE_URL_EXTREM + END_POINTS.ADMIN_MOODLE_INTEGRATION, data);
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
    };

    useEffect(() => {
        if (phoneNumber !== undefined) {
            if ((phoneNumber?.length >= 1 && phoneNumber?.length < 10) || phoneNumber?.length > 15) {
                let fields = FormJson?.map((item) => {
                    if (item?.field_type === 'inputNumber' && item?.name === 'phone') {
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
                    if (item?.field_type === 'inputNumber' && item?.name === 'phone') {
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

    useEffect(() => {
        if (editData) {
            let a = {
                'name': editData?.name,
                'email': editData?.email,
                'phone': editData?.phone,
                'moodle_url': editData?.lms_url,
            };
            const fields = [
                'name',
                'email',
                'phone',
                'moodle_url',
            ];
            fields.forEach(field => setValue(field, a[field]));
            modifyFormField('Submit', true);
            setEditOperation(true);
        } else {
            modifyFormField('Submit', false);
        }
    }, [editData]);

    return (
        <>
            <div style={ { textAlign: 'center' } }>
                <AddImageIcon />
            </div>
            <form onSubmit={ handleSubmit(onSubmit) }>
                <Grid container>
                    { formJsonField?.map((field, i) => (
                        <Grid key={field?.name} md={ 12 } style={ { marginLeft: '8px' } }>
                            <FormComponent
                                key={ i }
                                field={ field }
                                control={ control }
                                isLoading={ isLoadingUpload }
                            />
                        </Grid>
                    )) }
                </Grid>
            </form>
        </>
    );
};

const mapStateToProps = (state) => ({
    isLoadingUpload: state?.adminIntegrationData?.isLoadingUpload,
});

const mapDispatchToProps = (dispatch) => {
    return {
        LmsIntegration: (url, data) => dispatch(LmsIntegration(url, data)),
        ChangeConfig: (url, data) => dispatch(ChangeConfig(url, data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoodleForm);