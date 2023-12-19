import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Box, Skeleton, FormControlLabel, FormControl, Switch} from '@mui/material';
import { styled } from '@mui/material/styles';
import Instructor from './../../../../layouts/Instructor';
import { CardView, CommonTable, MainHeading, Title1 } from '../../../../components';
import { GetProfile } from '../../../../redux/action/profile/ProfileAction';
import { BASE_URL_PRO } from '../../../../utils/BaseUrl';
import END_POINTS_PRO from '../../../../utils/EndPointPro';
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
    // isMfaEnabled,
}) => {

    const [rows, setRows] = useState([]);
    const [isMfaEnabled, setIsMfaEnabled] = useState(false);

    const handleSwitchChange = (event) => {
        setIsMfaEnabled(event.target.checked);
        const mfaValue = isMfaEnabled ? 'NO' : 'YES';
        MfaActivation(BASE_URL_PRO + END_POINTS_PRO.MFA_ACTIVATION + mfaValue);
    };

    console.log('isMfaEnabled', isMfaEnabled)

    useEffect(() => {
        GetProfile(BASE_URL_PRO + END_POINTS_PRO.USER_PROFILE_DATA);
    }, []);

    useEffect(() => {
        let row = [
            createData('Institution Name', accountInfo?.institution_name ? accountInfo?.institution_name : '-'),
            createData('Username', accountInfo?.name ? accountInfo?.name : '-'),
            createData('User ID', accountInfo?.account_id ? accountInfo?.account_id : '-'),
            createData('User Email Address', accountInfo?.email ? accountInfo?.email : '-'),
            createData('Creation Date', accountInfo?.created_date ? accountInfo?.created_date : '-'),
            createData('Total Documents Alloted', accountInfo?.total_documents_alloted),
            createData('Total Documents Submitted', accountInfo?.total_documents_submitted),
            createData('Files Saved to Repository', accountInfo?.total_documents_added_to_Repository),
            createData('Account Expires on', accountInfo?.expiry_date ? accountInfo?.expiry_date : '-'),
            createData('Account Type', accountInfo?.license_type ? accountInfo?.license_type : '-'),
            // createData('Product Name', accountInfo?.product_name ? accountInfo?.product_name : '-'),
            createData('Product Name', 'Drillbit Extreme'),
            createData('Admin Account', accountInfo?.admin_email ? accountInfo?.admin_email : '-'),
            createData('Time Zone', accountInfo?.timezone ? accountInfo?.timezone : '-'),
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