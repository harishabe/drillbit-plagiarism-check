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
import { BASE_URL_PRO } from '../../../utils/BaseUrl';
import END_POINTS_PRO from '../../../utils/EndPointPro';
import { MfaActivation } from '../../../redux/action/common/Settings/MfaAction';
import { getItemSessionStorage,setItemSessionStorage } from '../../../utils/RegExp';
import ProAdmin from '../../../layouts/ProAdmin';
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

    const handleSwitchChange = (event) => {
        event.preventDefault()
        const newMfaStatus = !isMfaEnabled;
        setIsMfaEnabled(newMfaStatus);
        MfaActivation(BASE_URL_PRO + END_POINTS_PRO.MFA_ACTIVATION_ADMIN + (newMfaStatus ? 'YES' : 'NO'));
        setItemSessionStorage('mfa', newMfaStatus.toString());
    };

     return (
        <React.Fragment>
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

Settings.layout = ProAdmin;

export default connect(mapStateToProps, mapDispatchToProps)(Settings);