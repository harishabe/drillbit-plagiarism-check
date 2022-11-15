import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Box, Skeleton, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Admin from './../../../../layouts/Admin';
import { CardView, CommonTable, MainHeading, SubTitle2, SubTitle } from '../../../../components';
import { UploadIcon } from '../../../../assets/icon';
import { GetProfile, ProfileLogo } from '../../../../redux/action/profile/ProfileAction';
import { BASE_URL_EXTREM } from '../../../../utils/BaseUrl';
import END_POINTS from '../../../../utils/EndPoints';

const columns = [
    { id: 'name', label: 'Name' },
    { id: 'details', label: 'Details' },
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
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    objectPosition: 'bottom'
});

const AccountInfo = ({
    GetProfile,
    ProfileLogo,
    isLoading,
    accountInfo
}) => {

    const [rows, setRows] = useState([]);

    useEffect(() => {
        GetProfile(BASE_URL_EXTREM + END_POINTS.PROFILE_DATA + localStorage.getItem('role') + '/accountInformation');
    }, []);

    useEffect(() => {
        let row = [
            createData('Institution Name', accountInfo?.institutionName ? accountInfo?.institutionName : '-'),
            createData('Admin Username', accountInfo?.name ? accountInfo?.name : '-'),
            createData('Account ID', accountInfo?.accountId ? accountInfo?.accountId : '-'),
            createData('Date Of Activation', accountInfo?.createdDate ? accountInfo?.createdDate : '-'),
            createData('Instructor Account', accountInfo?.instructorAccount ? accountInfo?.instructorAccount : '-'),
            createData('Student Account', accountInfo?.studentAccount ? accountInfo?.studentAccount : '-'),
            createData('Number Of Documents Alloted', accountInfo?.totalDocumentsAlloted ? accountInfo?.totalDocumentsAlloted : '-'),
            createData('Number Of Documents Submitted', accountInfo?.totalDocumentsSubmitted ? accountInfo?.totalDocumentsSubmitted : '-'),
            createData('Max. document length(pages)', accountInfo?.oneDocumentLength ? accountInfo?.oneDocumentLength : '-'),
            createData('Date of Expiry', accountInfo?.expiryDate ? accountInfo?.expiryDate : '-'),
            createData('Grammar checks', accountInfo?.grammar ? accountInfo?.grammar : '-'),
            createData('Product Name', accountInfo?.productName ? accountInfo?.productName : '-'),
            createData('Time Zone', accountInfo?.timeZone ? accountInfo?.timeZone : '-'),
        ];
        setRows([...row]);
    }, [accountInfo]);

    const handleChange = (data) => {
        let bodyFormData = new FormData();
        bodyFormData.append('file', data.target.files[0]);
        ProfileLogo(BASE_URL_EXTREM + END_POINTS.ADMIN_PROFILE_UPLOAD_LOGO, bodyFormData);
    };


    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={10}>
                        <MainHeading title='Account Information' />
                        <form>
                            <label htmlFor="contained-button-file">
                                <Input accept="image/*" id="contained-button-file" onChange={handleChange} multiple type="file" />
                                <Button variant="contained" component="span" style={{ marginBottom: '10px' }}>
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
                        tableData={rows}
                        charLength={50}
                        path=''
                    />
                )}

            </CardView>
        </React.Fragment >
    );
};

const mapStateToProps = (state) => ({
    accountInfo: state?.profile?.profileData,
    isLoading: state?.profile?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetProfile: (role) => dispatch(GetProfile(role)),
        ProfileLogo: (role, data) => dispatch(ProfileLogo(role, data)),
    };
};

AccountInfo.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);