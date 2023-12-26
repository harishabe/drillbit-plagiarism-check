import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FormControlLabel, FormControl, Switch} from '@mui/material';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
    BreadCrumb,
    Heading,
    CardView,
    Title1
} from './../../../components';
import { BASE_URL_EXTREM } from '../../../utils/BaseUrl';
import END_POINTS from '../../../utils/EndPoints';
import { MfaActivation } from '../../../redux/action/common/Settings/MfaAction';
import { getItemSessionStorage,setItemSessionStorage } from '../../../utils/RegExp';
import Admin from '../../../layouts/Admin';
import { WarningDialog } from './../../../components';
import { DeleteWarningIcon } from '../../../assets/icon';
const InstructorBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/pro/user/dashboard',
        active: false,
    },
    {
        name: 'Settings',
        link: '',
        active: true,
    },
];


const Settings = ({
    MfaActivation,
}) => {
    const mfaValue = getItemSessionStorage('mfa') === 'true';
    const [isMfaEnabled, setIsMfaEnabled] = useState(mfaValue);
    const [showStatusWarning, setStatusWarning] = useState(false);

    const handleSwitchChange = () => {
        setStatusWarning(true);
      };

      const handleYesWarning = () => {
        const newMfaStatus = !isMfaEnabled;
        setIsMfaEnabled(newMfaStatus); 
        const url = BASE_URL_EXTREM + END_POINTS.MFA_ACTIVATION_ADMIN + (newMfaStatus ? 'YES' : 'NO');
        MfaActivation(url);
        setItemSessionStorage('mfa', newMfaStatus.toString());
        setStatusWarning(false);
    };

    const handleStatusCloseWarning = () => {
        setStatusWarning(false);
      };

     return (
        <React.Fragment>
                <WarningDialog
                    warningIcon={<DeleteWarningIcon />}
                    message={isMfaEnabled ? "Are you sure, you want to deactivate MFA?" : "Are you sure, you want to activate MFA?"}
                    handleYes={handleYesWarning}
                    handleNo={handleStatusCloseWarning}
                    isOpen={showStatusWarning}
                />
            
            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 10 } xs={ 10 }>
                        <BreadCrumb item={ InstructorBreadCrumb } />
                    </Grid>
                </Grid>
            </Box>
            <Grid container spacing={ 2 }>
                <Grid item md={ 5 } xs={ 5 }>
                    <Heading title= {`Settings`} />
                </Grid>
            </Grid>
            <CardView>
            <FormControl component="fieldset">
                <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                        <Title1 title='Multi factor authentication'/>
                    </Grid>
                    <Grid item>
                        <FormControlLabel
                            control={<Switch checked={isMfaEnabled} onChange={handleSwitchChange} />}
                            label={isMfaEnabled ? 'On' : 'Off'}
                        />
                    </Grid>
                </Grid>
            </FormControl>
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

Settings.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(Settings);