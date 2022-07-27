import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { FormComponent } from '../../components';
import FormJson from '../../constant/form/forgot-password.json';

import { login } from '../../redux/action/login/LoginAction';

const ForgotPwdForm = ({
    login,
    isLoading
}) => {
    const router = useRouter();

    const { handleSubmit, control } = useForm({
        mode: 'all',
    });

    const onSubmit = (data) => {
        login(data);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                {
                    FormJson ?
                        FormJson.map((field, i) =>
                            <FormComponent
                                key={i}
                                field={field}
                                control={control}
                                isLoading={isLoading}
                            />) : null
                }
            </form>
        </>
    )
}


const mapStateToProps = (state) => ({
    loginState: state?.login?.data,
    isLoading: state?.login?.isLoading
});

const mapDispatchToProps = (dispatch) => {
    return {
        login: (values) => dispatch(login(values))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPwdForm);