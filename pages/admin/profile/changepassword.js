import React from 'react';
import { connect } from 'react-redux';
import Admin from '../../../layouts/Admin';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';
import { FormComponent, MainHeading, CardView } from '../../../components';
import FormJson from '../../../constant/form/change-password-form.json';
import { ProfileChangePassword } from '../../../redux/action/profile/ProfileAction';

const ChangePassword = ({
    ProfileChangePassword,
    isLoading
}) => {

    const { handleSubmit, control } = useForm({
        mode: 'all',
    })

    const onSubmit = (data) => {
        ProfileChangePassword(data);
    }

    return (
        <>
            <MainHeading title='Change Password' />
            <CardView>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container>
                        {
                            FormJson?.map((field, i) =>
                                <Grid md={5.8} xs={12} style={{ marginLeft: '8px' }}>
                                    <FormComponent
                                        key={i}
                                        field={field}
                                        control={control}
                                        isLoading={ isLoading }
                                    />
                                </Grid>)
                        }
                    </Grid>
                </form>
            </CardView>
        </>
    )
}

const mapStateToProps = (state) => ({
    isLoading: state?.profile?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        ProfileChangePassword: (requestPayload) => dispatch(ProfileChangePassword(requestPayload)),
    };
};


ChangePassword.layout = Admin

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);