import React, { useEffect } from 'react';
import { connect } from 'react-redux';
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
            sessionStorage.setItem('role', Role.admin);
            sessionStorage.setItem('token', loginState?.token);
            sessionStorage.setItem('email', loginState?.username);
            sessionStorage.setItem('name', loginState?.name);
            router.push('/extream/admin/dashboard');
        } else if (loginState?.role === Role.instructor) {
            sessionStorage.setItem('role', Role.instructor);
            sessionStorage.setItem('token', loginState?.token);
            sessionStorage.setItem('email', loginState?.username);
            sessionStorage.setItem('name', loginState?.name);
            router.push('/extream/instructor/dashboard');
        } else if (loginState?.role === Role.student) {
            sessionStorage.setItem('role', Role.student);
            sessionStorage.setItem('token', loginState?.token);
            sessionStorage.setItem('email', loginState?.username);
            sessionStorage.setItem('name', loginState?.name);
            router.push('/extream/student/dashboard');
        } else if (loginState?.role === Role.super) {
            sessionStorage.setItem('role', Role.super);
            sessionStorage.setItem('token', loginState?.token);
            sessionStorage.setItem('email', loginState?.username);
            sessionStorage.setItem('name', loginState?.name);
            router.push('/super/dashboard');
        } else if (loginState?.role === Role.proAdmin) {
            sessionStorage.setItem('role', Role.proAdmin);
            sessionStorage.setItem('token', loginState?.token);
            sessionStorage.setItem('email', loginState?.username);
            sessionStorage.setItem('name', loginState?.name);
            router.push('/pro/admin/dashboard');
        } else if (loginState?.role === Role.proUser) {
            sessionStorage.setItem('role', Role.proUser);
            sessionStorage.setItem('token', loginState?.token);
            sessionStorage.setItem('email', loginState?.username);
            sessionStorage.setItem('name', loginState?.name);
            router.push('/pro/user/dashboard');
        }
    }, [router,loginState]);

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
    );
};


const mapStateToProps = (state) => ({
    loginState: state?.login?.data,
    isLoading: state?.login?.isLoadingLogin
});

const mapDispatchToProps = (dispatch) => {
    return {
        login: (values) => dispatch(login(values))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);