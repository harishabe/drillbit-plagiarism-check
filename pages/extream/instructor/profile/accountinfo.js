import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Box, Skeleton } from '@mui/material';
import { styled } from '@mui/material/styles';
import Instructor from './../../../../layouts/Instructor';
import { CardView, CommonTable, MainHeading } from '../../../../components';
import { GetProfile } from '../../../../redux/action/profile/ProfileAction';
import { BASE_URL_EXTREM } from '../../../../utils/BaseUrl';
import END_POINTS from '../../../../utils/EndPoints';
import { getItemSessionStorage } from '../../../../utils/RegExp';

const columns = [
    { id: 'name', label: 'Name' },
    { id: 'details', label: 'Details' },
];

function createData(name, details) {
    return { name, details };
};

const ImgLogo = styled('img')({
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    objectPosition: 'bottom'
});

const AccountInfo = ({
    GetProfile,
    isLoading,
    accountInfo
}) => {

    const [rows, setRows] = useState([]);

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
            createData('Total Documents Alloted', accountInfo?.totalDocumentsAlloted ? accountInfo?.totalDocumentsAlloted : '-'),
            createData('Total Documents Submitted', accountInfo?.totalDocumentsSubmitted ? accountInfo?.totalDocumentsSubmitted : '-'),
            createData('Files Saved to Repository', accountInfo?.totalDocumentsAddedToRepository ? accountInfo?.totalDocumentsAddedToRepository : '-'),
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
        GetProfile: (role) => dispatch(GetProfile(role))
    };
};

AccountInfo.layout = Instructor;

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);