import React from "react";
import { connect } from "react-redux";
import { useForm } from "react-hook-form";
import { FormComponent } from "../../components";
import FormJson from "../../constant/form/mfa-form.json";
import { MfaLogin } from "../../redux/action/common/Settings/MfaAction";

const MFAForm = ({ isLoading, MfaLogin }) => {
  const { handleSubmit, control } = useForm({
    mode: "all",
  });

  const onSubmitMFA = (data) => {
    MfaLogin(data);
  };

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
  mfaData: state?.mfa?.mfaData,  
  isLoading: state?.mfa?.isLoadingMfa,
});

const mapDispatchToProps = (dispatch) => {
  return {
    MfaLogin: (data) => dispatch(MfaLogin(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MFAForm);
