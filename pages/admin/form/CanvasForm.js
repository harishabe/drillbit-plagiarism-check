import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FormComponent } from '../../../components';
import { LmsIntegration, ChangeConfig } from '../../../redux/action/admin/AdminAction';
import FormJson from '../../../constant/form/admin-canvas-form.json';
import { AddImageIcon } from '../../../assets/icon';
import END_POINTS from '../../../utils/EndPoints';

const CanvasForm = ({
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

    const onSubmit = (data) => {
        if (editOperation) {
            ChangeConfig(END_POINTS.ADMIN_CANVAS_INTEGRATION, data);
        } else {
            LmsIntegration(END_POINTS.ADMIN_CANVAS_INTEGRATION, data)
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
            let a = {
                'platform_url': editData?.platform_url,
                'client_id': editData?.client_id,
                'auth_end_point': editData?.auth_end_point,
                'access_end_point': editData?.access_end_point,
                'method': editData?.method,
                'keyset_end_point': editData?.keyset_end_point,
            };
            const fields = [
                'platform_url',
                'client_id',
                'auth_end_point',
                'access_end_point',
                'method',
                'keyset_end_point',
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
                    { FormJson?.map((field, i) => (
                        <Grid md={ 12 } style={ { marginLeft: '8px' } }>
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
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        LmsIntegration: (url, data) => dispatch(LmsIntegration(url, data)),
        ChangeConfig: (url, data) => dispatch(ChangeConfig(url, data)),
    };
};

export default connect(null, mapDispatchToProps)(CanvasForm);