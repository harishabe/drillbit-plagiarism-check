import React from 'react';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FormComponent } from '../../../components';
import { CreateAccount } from '../../../redux/action/super/SuperAdminAction';
import { AddImageIcon } from '../../../assets/icon';
import FormJson from '../../../constant/form/ref-account-form.json';
import { convertDate } from '../../../utils/RegExp';
import END_POINTS from '../../../utils/EndPoints';

const RefForm = ({
    CreateAccount,
    isLoadingCreate
}) => {
    const { handleSubmit, control } = useForm({
        mode: 'all',
    });

    const onSubmit = (data) => {
        let DetailedData = { ...data, "endDate": convertDate(data.endDate), "startDate": convertDate(data.startDate) }
        CreateAccount(END_POINTS.SUPER_ADMIN_REF, DetailedData);
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
    isLoadingCreate: state?.superAdmin?.isLoadingCreate,
});

const mapDispatchToProps = (dispatch) => {
    return {
        CreateAccount: (url, data) => dispatch(CreateAccount(url, data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RefForm);