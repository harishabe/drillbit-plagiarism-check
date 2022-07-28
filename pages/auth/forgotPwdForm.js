import React from 'react';
import { connect } from "react-redux";
import { useForm } from 'react-hook-form';
import { FormComponent } from '../../components';
import FormJson from '../../constant/form/forgot-password.json';
import { ForgetPassword } from '../../redux/action/login/LoginAction';

const ForgotPwdForm = ({
    ForgetPassword,
    isLoading
}) => {
    const { handleSubmit, control } = useForm({
        mode: 'all',
    });

    const onSubmit = (data) => {
        ForgetPassword(data);
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                {
                    FormJson &&
                        FormJson.map((field, i) =>
                            <FormComponent
                                key={i}
                                field={field}
                                control={control}
                                isLoading={isLoading}
                            />)
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
        ForgetPassword: (values) => dispatch(ForgetPassword(values))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPwdForm);