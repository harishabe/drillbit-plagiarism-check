import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { FormComponent } from "../../components";
import FormJson from "../../constant/form/mfa-form.json";
import { MfaLogin } from "../../redux/action/common/Settings/MfaAction";
import { setItemSessionStorage } from "../../utils/RegExp";
import { Role } from "../../constant/data";

const MFAForm = ({ isLoading, MfaLogin, mfaData }) => {
  const router = useRouter();
  const { handleSubmit, control } = useForm({
    mode: "all",
  });

  const onSubmitMFA = (data) => {
    let obj = {
      otp: data.otp,
      email: router.query.name,
    };
    MfaLogin(obj);
  };
  console.log("123", mfaData);

  useEffect(() => {
    if (mfaData?.role === Role.admin) {
      setItemSessionStorage("role", Role.admin);
      setItemSessionStorage("token", mfaData?.token);
      setItemSessionStorage("email", mfaData?.username);
      setItemSessionStorage("name", mfaData?.name);
      setItemSessionStorage("mfa", mfaData?.mfa);
      setItemSessionStorage("switchRole", "instructor");
      router.push("/extream/instructor/myclasses");
    } else if (mfaData?.role === Role.instructor) {
      setItemSessionStorage("role", Role.instructor);
      setItemSessionStorage("token", mfaData?.token);
      setItemSessionStorage("email", mfaData?.username);
      setItemSessionStorage("name", mfaData?.name);
      setItemSessionStorage("mfa", mfaData?.mfa);
      router.push("/extream/instructor/myclasses");
    } else if (mfaData?.role === Role.student) {
      setItemSessionStorage("role", Role.student);
      setItemSessionStorage("token", mfaData?.token);
      setItemSessionStorage("email", mfaData?.username);
      setItemSessionStorage("name", mfaData?.name);
      setItemSessionStorage("mfa", mfaData?.mfa);
      router.push("/extream/student/myclasses");
    } else if (mfaData?.role === Role.proAdmin) {
      setItemSessionStorage("role", Role.proAdmin);
      setItemSessionStorage("token", mfaData?.token);
      setItemSessionStorage("email", mfaData?.username);
      setItemSessionStorage("name", mfaData?.name);
      setItemSessionStorage("switchProRole", "user");
      setItemSessionStorage("mfa", mfaData?.mfa);
      router.push("/pro/user/myfolder");
    } else if (mfaData?.role === Role.proUser) {
      setItemSessionStorage("role", Role.proUser);
      setItemSessionStorage("token", mfaData?.token);
      setItemSessionStorage("email", mfaData?.username);
      setItemSessionStorage("name", mfaData?.name);
      setItemSessionStorage("mfa", mfaData?.mfa);
      router.push("/pro/user/myfolder");
    } else if (mfaData?.role === Role.super) {
      setItemSessionStorage("role", Role.super);
      setItemSessionStorage("token", mfaData?.token);
      setItemSessionStorage("email", mfaData?.username);
      setItemSessionStorage("name", mfaData?.name);
      setItemSessionStorage("mfa", mfaData?.mfa);
      router.push("/super/dashboard");
    } else if (mfaData?.role === Role.supplier) {
      setItemSessionStorage("role", Role.supplier);
      setItemSessionStorage("token", mfaData?.token);
      setItemSessionStorage("email", mfaData?.username);
      setItemSessionStorage("name", mfaData?.name);
      setItemSessionStorage("mfa", mfaData?.mfa);
      router.push("/supplier/dashboard");
    } else if (mfaData?.role === Role.consortium) {
      setItemSessionStorage("role", Role.consortium);
      setItemSessionStorage("token", mfaData?.token);
      setItemSessionStorage("email", mfaData?.username);
      setItemSessionStorage("name", mfaData?.name);
      setItemSessionStorage("flag", mfaData?.in_flag);
      setItemSessionStorage("mfa", mfaData?.mfa);
      router.push("/consortium/dashboard");
    }
  }, [router, mfaData]);

  return (
    <form onSubmit={handleSubmit(onSubmitMFA)}>
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
  );
};

const mapStateToProps = (state) => ({
  mfaData: state?.mfaActivation?.mfaData,
  isLoading: state?.mfaActivation?.isLoadingMfa,
  loginState: state?.login?.data,
});

const mapDispatchToProps = (dispatch) => {
  return {
    MfaLogin: (data) => dispatch(MfaLogin(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MFAForm);
