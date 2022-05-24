import React from 'react';
import { connect } from "react-redux";
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { FormComponent } from '../../components';
import FormJson from '../../constant/form/login-form.json';

import { login } from '../../redux/action/login/LoginAction';

const LoginForm = ({
    login,
}) => {
    const router = useRouter();

    const { handleSubmit, control } = useForm({
        mode: 'all',
    })

    const onSubmit = (data) => {
        login(data);
        // if (data?.username === 'harish@drillbit.com' && data?.password === 'harish123') {
        //     localStorage.setItem('role', 'admin')
        //     router.push('/admin/dashboard')
        // } else if (data?.username === 'jayanna@drillbit.com' && data?.password === 'jayanna123') {
        //     localStorage.setItem('role', 'instructor')
        //     router.push('/instructor/dashboard')
        // } else if (data?.username === 'sagar@drillbit.com' && data?.password === 'sagar123') {
        //     localStorage.setItem('role', 'student')
        //     router.push('/student/dashboard')
        // } else if (data?.username === 'super@drillbit.com' && data?.password === 'super123') {
        //     localStorage.setItem('role', 'super')
        //     router.push('/super/dashboard')
        // }
    }

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
                            />) : null
                }
            </form>
        </>
    )
}


const mapStateToProps = (state) => ({
    loginState: state,
})

const mapDispatchToProps = (dispatch) => {
    return {
        login: (values) => dispatch(login(values))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);