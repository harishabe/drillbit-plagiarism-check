import React, { useState } from "react";
import { connect } from "react-redux";
import { FormControlLabel, FormControl, Switch } from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  BreadCrumb,
  Heading,
  CardView,
  Title1,
  SubTitle,
} from "./../../../components";
import { makeStyles } from "@mui/styles";
import ProUser from "../../../layouts/ProUser";
import { BASE_URL_PRO } from "../../../utils/BaseUrl";
import END_POINTS_PRO from "../../../utils/EndPointPro";
import { MfaActivation } from "../../../redux/action/common/Settings/MfaAction";
import { WarningDialog } from "./../../../components";
import { MfaWarningIcon } from "../../../assets/icon";
import {
  getItemSessionStorage,
  setItemSessionStorage,
} from "../../../utils/RegExp";

const InstructorBreadCrumb = [
  {
    name: "Dashboard",
    link: "/pro/user/dashboard",
    active: false,
  },
  {
    name: "Settings",
    link: "",
    active: true,
  },
];

const useStyles = makeStyles (() => ({
    margin : {
        marginTop: "16px",
    },
    text : {
        marginTop : "-5px",
    },
}));

const Settings = ({ MfaActivation }) => {
  const classes = useStyles();

  const mfaValue = getItemSessionStorage("mfa") === "true";
  const [isMfaEnabled, setIsMfaEnabled] = useState(mfaValue);
  const [showStatusWarning, setStatusWarning] = useState(false);

  const handleSwitchChange = () => {
    setStatusWarning(true);
  };

  const handleYesWarning = () => {
    const newMfaStatus = !isMfaEnabled;
    setIsMfaEnabled(newMfaStatus);
    const url =
      BASE_URL_PRO +
      END_POINTS_PRO.MFA_ACTIVATION +
      (newMfaStatus ? "YES" : "NO");
    MfaActivation(url);
    setItemSessionStorage("mfa", newMfaStatus.toString());
    setStatusWarning(false);
  };

  const handleStatusCloseWarning = () => {
    setStatusWarning(false);
  };

  return (
    <React.Fragment>
      <WarningDialog
        warningIcon={<MfaWarningIcon />}
        message={
          isMfaEnabled
            ? "Are you sure, you want to deactivate multi factor authentication?"
            : "Are you sure, you want to activate multi factor authentication?"
        }
        handleYes={handleYesWarning}
        handleNo={handleStatusCloseWarning}
        isOpen={showStatusWarning}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item md={10} xs={10}>
            <BreadCrumb item={InstructorBreadCrumb} />
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={2}>
        <Grid item md={5} xs={5}>
          <Heading title={`Settings`} />
        </Grid>
      </Grid>
      <CardView>
        <Grid container spacing={2}>
          <Grid item>
            <Heading title="Multi-Factor Authentication" />
            <Title1
              title={
                "Multi-factor authentication (MFA), also known as two-factor authentication (2FA) or two-step verification, is a security process that requires users to provide multiple forms of identification before they can access an account, system, or application."
              }
              color={"common.gray"}
            />
          </Grid>
        </Grid>
        
          <Grid container spacing={2} className={classes.margin}>
            <Grid item md={5} xs={8} sm={8} lg={5}>
              <Title1 title="Multi factor authentication" />
                <SubTitle className={classes.text}
                  title={"* Check your email address for the verification code "}
                />
            </Grid>
            <Grid item md={7} xs={4} sm={4} lg={7}>
            <FormControl component="fieldset">
                <FormControlLabel
                    control={
                    <Switch
                        checked={isMfaEnabled}
                        onChange={handleSwitchChange}
                    />
                    }
                    label={isMfaEnabled ? "On" : "Off"}
                />              
                </FormControl>
            </Grid>
          </Grid>
      </CardView>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  isMfaEnabled: state?.mfa?.isMfaEnabled,
});

const mapDispatchToProps = (dispatch) => {
  return {
    MfaActivation: (url) => dispatch(MfaActivation(url)),
  };
};

Settings.layout = ProUser;

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
