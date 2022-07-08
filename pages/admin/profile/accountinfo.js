import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Box, Skeleton, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Admin from './../../../layouts/Admin';
import { CardView, CommonTable, MainHeading, SubTitle } from '../../../components';
import { UploadIcon } from '../../../assets/icon';
import { GetProfile, ProfileLogo } from '../../../redux/action/profile/ProfileAction';
import { Role } from '../../../constant/data';

const columns = [
    { id: 'name', label: 'Name' },
    { id: 'details', label: 'Details' },
];

function createData(name, details) {
    return { name, details }
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
    const [role, setRole] = useState('');

    useEffect(() => {
        GetProfile(localStorage.getItem('role'));
        setRole(localStorage.getItem('role'));
    }, []);

    useEffect(() => {
        console.log('rolerolerole',role);
        console.log('adminrole',Role);
        if (role === Role.admin) {
            let row = [
                createData("Institution Name", accountInfo?.institutionName),
                createData("Admin Username", accountInfo?.adminUsername),
                createData("Account ID", accountInfo?.accountId),
                createData("Date Of Activation", accountInfo?.dateOfActivation),
                createData("Instructor Account", accountInfo?.instructorAccount),
                createData("Student Account", accountInfo?.studentAccount),
                createData("Number Of Documents", accountInfo?.numberOfDocuments),
                createData("One Document Length", accountInfo?.oneDocumentLength),
                createData("Date of Expiry", accountInfo?.dateOfExpiry),
                createData("Grammer", accountInfo?.grammar),
                createData("Product Name", accountInfo?.productName),
                createData("Time Zone", accountInfo?.timeZone),
            ];
            setRows([...row])
        } else if (role === Role.instructor) {
            let row = [
                createData("Institution Name", accountInfo?.institutionName),
                createData("Admin Username", accountInfo?.adminUsername),
                createData("Account ID", accountInfo?.accountId),
                createData("Date Of Activation", accountInfo?.dateOfActivation),
                createData("Instructor Account", accountInfo?.instructorAccount),
                createData("Student Account", accountInfo?.studentAccount),
                createData("Number Of Documents", accountInfo?.numberOfDocuments),
                createData("One Document Length", accountInfo?.oneDocumentLength),
                createData("Date of Expiry", accountInfo?.dateOfExpiry),
                createData("Grammer", accountInfo?.grammar),
                createData("Product Name", accountInfo?.productName),
                createData("Time Zone", accountInfo?.timeZone),
            ];
            setRows([...row])
        } else if (role === Role.student) {
            let row = [
                createData("Institution Name", accountInfo?.institutionName),
                createData("Admin Username", accountInfo?.adminUsername),
                createData("Account ID", accountInfo?.accountId),
                createData("Date Of Activation", accountInfo?.dateOfActivation),
                createData("Instructor Account", accountInfo?.instructorAccount),
                createData("Student Account", accountInfo?.studentAccount),
                createData("Number Of Documents", accountInfo?.numberOfDocuments),
                createData("One Document Length", accountInfo?.oneDocumentLength),
                createData("Date of Expiry", accountInfo?.dateOfExpiry),
                createData("Grammer", accountInfo?.grammar),
                createData("Product Name", accountInfo?.productName),
                createData("Time Zone", accountInfo?.timeZone),
            ];
            setRows([...row])
        }
    }, [accountInfo]);

    const handleChange = (data) => {
        let bodyFormData = new FormData();
        bodyFormData.append('file', data.target.files[0]);
        ProfileLogo(bodyFormData);
    }


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
                            </label>
                        </form>
                    </Grid>
                    <Grid item md={2} style={{ textAlign: 'right' }}>
                        {accountInfo && <ImgLogo src={`data:image/png;base64,${accountInfo.logo}`} />}
                    </Grid>
                </Grid>
            </Box>


            <CardView>
                {isLoading ? (
                    <>
                        <Skeleton />
                        <Skeleton />
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
    )
}

const mapStateToProps = (state) => ({
    accountInfo: state?.profile?.profileData,
    isLoading: state?.profile?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetProfile: (role) => dispatch(GetProfile(role)),
        ProfileLogo: (data) => dispatch(ProfileLogo(data)),
    };
};

AccountInfo.layout = Admin

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);