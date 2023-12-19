import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Box, Skeleton, Button, FormControlLabel, FormControl, Switch } from '@mui/material';
import { styled } from '@mui/material/styles';
import Student from './../../../../layouts/Student';
import { CardView, CommonTable, MainHeading, SubTitle2, SubTitle, Title1 } from '../../../../components';
import { UploadIcon } from '../../../../assets/icon';
import { GetProfile, ProfileLogo } from '../../../../redux/action/profile/ProfileAction';
import { Role } from '../../../../constant/data';
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

const Input = styled('input')({
    display: 'none',
});

const UploadButtonAlign = styled('div')({
    marginBottom: '-5px',
    marginLeft: '10px'
});

const ImgLogo = styled('img')({
    width: '100%',
    height: '115px',
    objectFit: 'contain',
    overflow: 'hidden',
});

const AccountInfo = ({
    GetProfile,
    ProfileLogo,
    isLoading,
    accountInfo,
    MfaActivation
}) => {

    const [rows, setRows] = useState([]);
    const [role, setRole] = useState('');
    const [isMfaEnabled, setIsMfaEnabled] = useState(false);

    const handleSwitchChange = (event) => {
        setIsMfaEnabled(event.target.checked);
        const mfaValue = isMfaEnabled ? 'NO' : 'YES';
        MfaActivation(BASE_URL_EXTREM + END_POINTS.MFA_ACTIVATION_STUDENT + mfaValue);
    };

    useEffect(() => {
        GetProfile(BASE_URL_EXTREM + END_POINTS.PROFILE_DATA + getItemSessionStorage('role') + '/accountInformation');
        setRole(getItemSessionStorage('role'));
    }, []);

    useEffect(() => {
        let row = [
            createData('Account ID', accountInfo?.accountId ? accountInfo?.accountId : '-'),
            createData('Student ID', accountInfo?.stuednt_id ? accountInfo?.stuednt_id : '-'),
            createData('Name', accountInfo?.name ? accountInfo?.name : '-'),
            createData('Email', accountInfo?.email ? accountInfo?.email : '-'),
            createData('Institution Name', accountInfo?.institutionName ? accountInfo?.institutionName : '-'),
            createData('Department', accountInfo?.department ? accountInfo?.department : '-'),
            createData('Created Date', accountInfo?.createdDate ? accountInfo?.createdDate : '-'),
            createData('Expiry Date', accountInfo?.expiryDate ? accountInfo?.expiryDate : '-'),
        ];
        setRows([...row]);
    }, [accountInfo]);

    const handleChange = (data) => {
        let bodyFormData = new FormData();
        bodyFormData.append('file', data.target.files[0]);
        ProfileLogo(getItemSessionStorage('role'), bodyFormData);
    };
    
    return (
        <React.Fragment>
            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 10 }>
                        <MainHeading title='Account Information' />
                        { role === Role.admin &&
                            <form>
                                <label htmlFor="contained-button-file">
                                    <Input accept="image/*" id="contained-button-file" onChange={ handleChange } multiple type="file" />
                                    <Button variant="contained" component="span" style={ { marginBottom: '10px' } }>
                                        <>
                                            <UploadIcon />
                                            <UploadButtonAlign>
                                                <SubTitle textColor='#fff' title='Upload Logo' />
                                            </UploadButtonAlign>
                                        </>
                                    </Button>

                                    <SubTitle2 title='Supported formats : JPG,PNG' />
                                </label>
                            </form>
                        }
                    </Grid>
                    <Grid item md={ 2 } style={ { textAlign: 'right' } }>
                        { accountInfo &&
                            <>
                                <ImgLogo src={ `data:image/png;base64,${accountInfo.logo}` } />
                            </>
                        }
                    </Grid>
                </Grid>
            </Box>


            <CardView>
                { isLoading ? (
                    <>
                        <Skeleton />
                        <Skeleton />
                        <Skeleton />
                    </>
                ) : (
                    <CommonTable
                        isCheckbox={ false }
                        tableHeader={ columns }
                            tableData={ rows }
                        path=''
                    />
                ) }

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
        ProfileLogo: (role, data) => dispatch(ProfileLogo(role, data)),
        MfaActivation: (url) => dispatch(MfaActivation(url)),
    };
};

AccountInfo.layout = Student;

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);