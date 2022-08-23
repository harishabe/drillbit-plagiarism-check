import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { FormComponent } from '../../components';
import FormJson from '../../constant/form/login-form.json';
import { Role } from '../../constant/data';

import { login } from '../../redux/action/login/LoginAction';

const LoginForm = ({
    login,
    loginState,
    isLoading
}) => {
    const router = useRouter();

    const { handleSubmit, control } = useForm({
        mode: 'all',
    });

    const onSubmit = (data) => {
        login(data);
    };

    useEffect(() => {
        if (loginState?.role === Role.admin) {
            localStorage.setItem('role', Role.admin);
            localStorage.setItem('token', loginState?.token);
            localStorage.setItem('email', loginState?.username);
            localStorage.setItem('name', loginState?.name);
            router.push('/admin/dashboard');
        } else if (loginState?.role === Role.instructor) {
            localStorage.setItem('role', Role.instructor);
            localStorage.setItem('token', loginState?.token);
            localStorage.setItem('email', loginState?.username);
            localStorage.setItem('name', loginState?.name);
            router.push('/instructor/dashboard')
        } else if (loginState?.role === Role.student) {
            localStorage.setItem('role', Role.student);
            localStorage.setItem('token', loginState?.token);
            localStorage.setItem('email', loginState?.username);
            localStorage.setItem('name', loginState?.name);
            router.push('/student/dashboard');
        } else if (loginState?.role === Role.super) {
            localStorage.setItem('role', Role.super);
            localStorage.setItem('token', loginState?.token);
            localStorage.setItem('email', loginState?.username);
            localStorage.setItem('name', loginState?.name);
            router.push('/super/dashboard');
        }
    }, [loginState]);

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

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);