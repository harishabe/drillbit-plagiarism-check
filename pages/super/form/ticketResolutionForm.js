import React from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { AddImageIcon } from '../../../assets/icon';
import { FormComponent } from '../../../components';
import FormJson from '../../../constant/form/super-admin-ticket-form.json';

const TicketResolutionForm = ({
    editData
}) => {
    const { handleSubmit, control } = useForm({
        mode: 'all',
    });

    const onSubmit = (data) => {
        console.log('data', data)
        console.log('editData', editData)
    };

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
                            />
                        </Grid>
                    )) }
                </Grid>
            </form>
        </>
    );
};

const mapStateToProps = (state) => ({
    isLoadingSend: state?.superAdmin?.isLoadingSend,
});

export default connect(mapStateToProps, {})(TicketResolutionForm);