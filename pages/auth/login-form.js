import React from 'react';
import { useRouter } from 'next/router';
import { useForm } from "react-hook-form";
import { FormComponent } from '../../components';
import FormJson from '../../constant/form/login-form.json';

const LoginForm = () => {
    const router = useRouter();

    const { handleSubmit, control } = useForm({
        mode: "all",
    });

    const onSubmit = (data) => {
        if (data?.username === 'harish@drillbit.com' && data?.password === 'harish123') {
            localStorage.setItem('role', 'admin');
            router.push('/admin/dashboard');
        } else if (data?.username === 'jayanna@drillbit.com' && data?.password === 'jayanna123') {
            localStorage.setItem('role', 'instructor')
            router.push('/instructor/dashboard');
        } else if (data?.username === 'sagar@drillbit.com' && data?.password === 'sagar123') {
            localStorage.setItem('role', 'student')
            router.push('/student/dashboard');
        }
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
};

export default LoginForm;