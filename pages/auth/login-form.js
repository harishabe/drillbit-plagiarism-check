import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { FormComponent } from "../../components";
import FormJson from "../../constant/form/login-form.json";
import { Role } from "../../constant/data";

import { login } from "../../redux/action/login/LoginAction";
import { setItemSessionStorage } from '../../utils/RegExp'

const LoginForm = ({ login, loginState, isLoading }) => {
  const router = useRouter();

  const { handleSubmit, control } = useForm({
    mode: "all",
  });

  const onSubmit = (data) => {
    login(data);
  };

  useEffect(() => {
    if (loginState?.role === Role.admin) {
      setItemSessionStorage("role", Role.admin);
      setItemSessionStorage("token", loginState?.token);
      setItemSessionStorage("email", loginState?.username);
      setItemSessionStorage("name", loginState?.name);
      router.push("/extream/admin/dashboard");
    } else if (loginState?.role === Role.instructor) {
      setItemSessionStorage("role", Role.instructor);
      setItemSessionStorage("token", loginState?.token);
      setItemSessionStorage("email", loginState?.username);
      setItemSessionStorage("name", loginState?.name);
      router.push("/extream/instructor/dashboard");
    } else if (loginState?.role === Role.student) {
      setItemSessionStorage("role", Role.student);
      setItemSessionStorage("token", loginState?.token);
      setItemSessionStorage("email", loginState?.username);
      setItemSessionStorage("name", loginState?.name);
      router.push("/extream/student/dashboard");
    } else if (loginState?.role === Role.proAdmin) {
      setItemSessionStorage("role", Role.proAdmin);
      setItemSessionStorage("token", loginState?.token);
      setItemSessionStorage("email", loginState?.username);
      setItemSessionStorage("name", loginState?.name);
      router.push("/pro/admin/dashboard");
    } else if (loginState?.role === Role.proUser) {
      setItemSessionStorage("role", Role.proUser);
      setItemSessionStorage("token", loginState?.token);
      setItemSessionStorage("email", loginState?.username);
      setItemSessionStorage("name", loginState?.name);
      router.push("/pro/user/dashboard");
    } else if (loginState?.role === Role.super) {
      setItemSessionStorage("role", Role.super);
      setItemSessionStorage("token", loginState?.token);
      setItemSessionStorage("email", loginState?.username);
      setItemSessionStorage("name", loginState?.name);
      router.push("/super/dashboard");
    } else if (loginState?.role === Role.supplier) {
      setItemSessionStorage("role", Role.supplier);
      setItemSessionStorage("token", loginState?.token);
      setItemSessionStorage("email", loginState?.username);
      setItemSessionStorage("name", loginState?.name);
      router.push("/supplier/extreamProduct");
    }
  }, [router, loginState]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {FormJson
          ? FormJson.map((field, i) => (
              <FormComponent
                key={i}
                field={field}
                control={control}
                isLoading={isLoading}
              />
            ))
          : null}
      </form>
    </>
  );
};

const mapStateToProps = (state) => ({
  loginState: state?.login?.data,
  isLoading: state?.login?.isLoadingLogin,
});

const mapDispatchToProps = (dispatch) => {
  return {
    login: (values) => dispatch(login(values)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
