import React from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FormComponent } from '../../../components';
import { LmsIntegration } from '../../../redux/action/admin/AdminAction';
import FormJson from '../../../constant/form/admin-canvas-form.json';
import { AddImageIcon } from '../../../assets/icon';
import END_POINTS from '../../../utils/EndPoints';

const CanvasForm = ({
    LmsIntegration,
    isLoading
}) => {

    const { handleSubmit, control } = useForm({
        mode: 'all',
    });

    const onSubmit = (data) => {
        console.log("data", data)
        LmsIntegration(END_POINTS.ADMIN_CANVAS_INTEGRATION, data)
    };

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
    isLoading: state?.adminIntegrationData?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        LmsIntegration: (url, data) => dispatch(LmsIntegration(url, data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CanvasForm);