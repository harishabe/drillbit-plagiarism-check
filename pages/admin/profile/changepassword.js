import React from 'react';
import { connect } from 'react-redux';
import Admin from '../../../layouts/Admin';
import { useForm } from 'react-hook-form';
import { FormComponent, MainHeading, CardView } from '../../../components';
import FormJson from '../../../constant/form/change-password-form.json';
import { ProfileChangePassword } from '../../../redux/action/profile/ProfileAction';
import Container from '@mui/material/Container';

const ChangePassword = ({
    ProfileChangePassword,
    isLoading
}) => {
    const { handleSubmit, control } = useForm({
        mode: 'all',
    })

    const onSubmit = (data) => {
        console.log("data", data)
        if (data.newPassword === data.confirmPassword) {
            console.log("true")
        } else {
            console.log("false")
        }
        // ProfileChangePassword(data);
    }

    return (
        <>
            <MainHeading title='Change Password' />
            <CardView>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Container
                        component="main"
                        disableGutters={ true }
                        maxWidth="xs"
                        style={ { marginLeft: 0 } }
                    >
                        {
                            FormJson?.map((field, i) =>
                                <FormComponent
                                    key={ i }
                                    field={ field }
                                    control={ control }
                                    isLoading={ isLoading }
                                />
                            )
                        }
                    </Container>
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