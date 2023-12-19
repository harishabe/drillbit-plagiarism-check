import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Box, Skeleton, FormControlLabel, FormControl, Switch } from '@mui/material';
import { styled } from '@mui/material/styles';
import Instructor from './../../../../layouts/Instructor';
import { CardView, CommonTable, MainHeading, Title1 } from '../../../../components';
import { GetProfile } from '../../../../redux/action/profile/ProfileAction';
import { BASE_URL_EXTREM } from '../../../../utils/BaseUrl';
import END_POINTS from '../../../../utils/EndPoints';
import { getItemSessionStorage } from '../../../../utils/RegExp';
import { MfaActivation } from '../../../../redux/action/common/Settings/MfaAction';

const columns = [
    { id: 'name', label: 'Name', maxWidth: 200 },
    { id: 'details', label: 'Details', maxWidth: 500 },
];

function createData(name, details) {
    return { name, details };
};

const ImgLogo = styled('img')({
    width: '100%',
    height: '115px',
    objectFit: 'contain',
    overflow: 'hidden',
});

const AccountInfo = ({
    GetProfile,
    isLoading,
    accountInfo,
    MfaActivation,
}) => {

    const [rows, setRows] = useState([]);
    const [isMfaEnabled, setIsMfaEnabled] = useState(false);

    const handleSwitchChange = (event) => {
        setIsMfaEnabled(event.target.checked);
        const mfaValue = isMfaEnabled ? 'NO' : 'YES';
        MfaActivation(BASE_URL_EXTREM + END_POINTS.MFA_ACTIVATION_INSTRUCTOR + mfaValue);
    };

    useEffect(() => {
        let roleEndpoint = (getItemSessionStorage('switchRole') !== null ? getItemSessionStorage('switchRole') : getItemSessionStorage('role'));
        GetProfile(BASE_URL_EXTREM + END_POINTS.PROFILE_DATA + roleEndpoint + '/accountInformation');
    }, []);

    useEffect(() => {
        let row = [
            createData('Name', accountInfo?.name ? accountInfo?.name : '-'),
            createData('Institution Name', accountInfo?.institutionName ? accountInfo?.institutionName : '-'),
            createData('Instructor ID', accountInfo?.accountId ? accountInfo?.accountId : '-'),
            createData('Instructor Email Address', accountInfo?.email ? accountInfo?.email : '-'),
            createData('Admin Email Address', accountInfo?.adminEmail ? accountInfo?.adminEmail : '-'),
            createData('Created Date', accountInfo?.createdDate ? accountInfo?.createdDate : '-'),
            createData('Expiry Date', accountInfo?.expiryDate ? accountInfo?.expiryDate : '-'),
            createData('Total Documents Alloted', accountInfo?.totalDocumentsAlloted ),
            createData('Total Documents Submitted', accountInfo?.totalDocumentsSubmitted),
            createData('Files Saved to Repository', accountInfo?.totalDocumentsAddedToRepository),
            createData('Time Zone', accountInfo?.timeZone ? accountInfo?.timeZone : '-'),
        ];
        setRows([...row]);
    }, [accountInfo]);


    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={10}>
                        <MainHeading title='Account Information' />
                    </Grid>
                    <Grid item md={2} style={{ textAlign: 'right' }}>
                        {accountInfo &&
                            <>
                                <ImgLogo src={`data:image/png;base64,${accountInfo.logo}`} />
                            </>
                        }
                    </Grid>
                </Grid>
            </Box>


            <CardView>
                {isLoading ? (
                    <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </>
                ) : (
                    <CommonTable
                        isCheckbox={false}
                        tableHeader={columns}
                            tableData={ rows }
                        path=''
                    />
                )}

            </CardView>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={10}>
                        <MainHeading title='Multi factor authentication' />
                    </Grid>
                </Grid>
            </Box>
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
        </React.Fragment >
    );
};

const mapStateToProps = (state) => ({
    accountInfo: state?.profile?.profileData,
    isLoading: state?.profile?.isLoading,
    isMfaEnabled: state?.mfa?.isMfaEnabled,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetProfile: (role) => dispatch(GetProfile(role)),
        MfaActivation: (url) => dispatch(MfaActivation(url)),
    };
};

AccountInfo.layout = Instructor;

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);