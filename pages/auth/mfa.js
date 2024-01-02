import React, { useEffect } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  LoginContainer,
  BannerContainer,
  ImgContainer,
  MarginTop,
} from "../../style/login-style";
import MFAForm from "./MfaForm";
import { MainHeading, Title1 } from "../../components";
import { DrillBitLogo } from "../../assets/icon";
import { LOGIN_IMG_BANNER } from "../../constant/data/content";
import { ClearLoginState } from "../../redux/action/login/LoginAction";

const MfaPage = ({ ClearLoginState, loginState }) => {
  const router = useRouter();

  useEffect(() => {
    if (loginState === "") {
      router.push("/auth/login");
    }
  }, [loginState, router]);

  const handleBackToLogin = () => {
    ClearLoginState();
  };
    
  window.addEventListener('popstate', handleBackToLogin);

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item md={7} display={{ xs: "none", lg: "block" }}>
            <BannerContainer>
              <DrillBitLogo />
              <ImgContainer>
                <Image
                  src="/img/login-banner.svg"
                  alt={LOGIN_IMG_BANNER}
                  width={500}
                  height={500}
                />
              </ImgContainer>
            </BannerContainer>
          </Grid>
          <Grid item md={5} style={{ width: "100%" }}>
            <LoginContainer>
              <MainHeading mb={"20px"} title="Authenticate your account" />
              <Title1 title="Please check your registered email inbox for the OTP. If you don't see it in your inbox, kindly check your spam or junk folder." />
              <MarginTop>
                <MFAForm />
                <div align="center">
                  <InputLabel
                    onClick={handleBackToLogin}
                    style={{ cursor: "pointer" }}
                  >
                    « Back to login
                  </InputLabel>
                </div>
              </MarginTop>
            </LoginContainer>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => ({
  loginState: state?.login?.data,
});

const mapDispatchToProps = (dispatch) => {
  return {
    ClearLoginState: () => dispatch(ClearLoginState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MfaPage);
