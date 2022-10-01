import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { useRouter } from 'next/router';
import { useForm, useWatch } from 'react-hook-form';
import { FormComponent } from '../../components';
import FormJson from '../../constant/form/reset-password-form.json';
import { ResetPassword } from '../../redux/action/login/LoginAction';
import { ErrorMessageContainer } from '../style/index';
import { CONFIRM_PASSWORD_NOT_VALID } from '../../constant/data/ErrorMessage';

const ResetPwdForm = ({
    ResetPassword,
    isLoading
}) => {
    const [field, setField] = useState(FormJson);

    const router = useRouter();
    const { handleSubmit, control } = useForm({
        mode: 'all',
    });

    const onSubmit = (data) => {
        let obj = {
            'token': router.query.token,
            'password': data.newPassword,
            'confirm_password': data.confirmPassword
        }
        ResetPassword(obj);
    };

    const confirmPassword = useWatch({
        control,
        name: "confirmPassword",
    });

    const newPassword = useWatch({
        control,
        name: "newPassword",
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
            <form onSubmit={ handleSubmit(onSubmit) }>
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
                {
                    (
                        (confirmPassword !== '' && newPassword !== '') &&
                        (confirmPassword !== newPassword)
                    ) ?
                        <ErrorMessageContainer>{ CONFIRM_PASSWORD_NOT_VALID }</ErrorMessageContainer>
                        : ''
                }
            </form>
        </>
    )
}


const mapStateToProps = (state) => ({
    loginState: state?.login?.data,
    isLoading: state?.login?.isLoadingResetPwd
});

const mapDispatchToProps = (dispatch) => {
    return {
        ResetPassword: (values) => dispatch(ResetPassword(values))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResetPwdForm);