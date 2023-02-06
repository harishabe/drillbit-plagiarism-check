import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Admin from "../../../../../layouts/Admin";
import { BreadCrumb } from "./../../../../../components";
import { GetGoogleLms } from "../../../../../redux/action/admin/AdminAction";

const IntegrationBreadCrumb = [
  {
    name: "Dashboard",
    link: "/extream/admin/dashboard",
    active: false,
  },
  {
    name: "Integrations",
    link: "",
    active: true,
  },
];

const googleAuth = ({ GetGoogleLms, googleConfigData }) => {
  useEffect(() => {
    GetGoogleLms();
  }, []);

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item md={10} xs={10}>
            <BreadCrumb item={IntegrationBreadCrumb} />
          </Grid>
          <Grid item md={2} xs={2}></Grid>
        </Grid>
      </Box>
      <div style={{ textAlign: "center" }}>
        <a href={googleConfigData}>Sign in Google</a>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  googleConfigData: state?.adminIntegrationData?.googleConfigData,
  isLoading: state?.adminIntegrationData?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    GetGoogleLms: () => dispatch(GetGoogleLms()),
  };
};

googleAuth.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(googleAuth);
