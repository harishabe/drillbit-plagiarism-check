import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useForm, useWatch } from 'react-hook-form';
import Container from '@mui/material/Container';
import Student from './../../../../layouts/Student';
import { FormComponent, MainHeading, CardView } from '../../../../components';
import FormJson from '../../../../constant/form/change-password-form.json';
import { ProfileChangePassword } from '../../../../redux/action/profile/ProfileAction';
import { BASE_URL_EXTREM } from "../../../../utils/BaseUrl";
import END_POINTS from "../../../../utils/EndPoints";

const ChangePassword = ({
    ProfileChangePassword,
    isLoading
}) => {
    const [field, setField] = useState(FormJson);

    const { handleSubmit, control } = useForm({
        mode: 'all',
    });

    const onSubmit = (data) => {
        delete data['confirmPassword'];
        ProfileChangePassword(data, BASE_URL_EXTREM + END_POINTS.PROFILE_CHANGE_PASSWORD);
    };

    const confirmPassword = useWatch({
        control,
        name: 'confirmPassword',
    });

    const newPassword = useWatch({
        control,
        name: 'newPassword',
    });

    useEffect(() => {
        if (newPassword === confirmPassword) {
            let fields = FormJson?.map((item) => {
                if (item?.field_type === 'button') {
                    item['isDisabled'] = false;
                }
                return item;
            });
            setField(fields);
        } else {
            let fields = FormJson?.map((item) => {
                if (item?.field_type === 'button') {
                    item['isDisabled'] = true;
                }
                return item;
            });
            setField(fields);
        }
    }, [newPassword, confirmPassword]);

    return (
        <>
            <MainHeading title='Change Password' />
            <CardView>
                <form onSubmit={ handleSubmit(onSubmit) }>
                    <Container
                        component="main"
                        disableGutters={ true }
                        maxWidth="xs"
                        style={ { marginLeft: 0 } }
                    >
                        {
                            field?.map((field, i) =>
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
    );
};

const mapStateToProps = (state) => ({
    isLoading: state?.profile?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        ProfileChangePassword: (requestPayload, apiUrl) => dispatch(ProfileChangePassword(requestPayload, apiUrl)),
    };
};


ChangePassword.layout = Student;

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);