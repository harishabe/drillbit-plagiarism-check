import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Grid, Box, Skeleton, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Student from './../../../../layouts/Student';
import { CardView, CommonTable, MainHeading, SubTitle2, SubTitle } from '../../../../components';
import { UploadIcon } from '../../../../assets/icon';
import { GetProfile, ProfileLogo } from '../../../../redux/action/profile/ProfileAction';
import { Role } from '../../../../constant/data';
import { BASE_URL_EXTREM } from '../../../../utils/BaseUrl';
import END_POINTS from '../../../../utils/EndPoints';

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
        GetProfile(BASE_URL_EXTREM + END_POINTS.PROFILE_DATA + localStorage.getItem('role') + '/accountInformation');
        setRole(localStorage.getItem('role'));
    }, []);

    useEffect(() => {
            let row = [
                createData("Account ID", accountInfo?.accountId ? accountInfo?.accountId : '-'),
                createData("Student ID", accountInfo?.stuednt_id ? accountInfo?.stuednt_id : '-'),
                createData("Name", accountInfo?.name ? accountInfo?.name : '-'),
                createData("Email", accountInfo?.email ? accountInfo?.email : '-'),
                createData("Institution Name", accountInfo?.institutionName ? accountInfo?.institutionName : '-'),
                createData("Department", accountInfo?.department ? accountInfo?.department : '-'),
                createData("Created Date", accountInfo?.createdDate ? accountInfo?.createdDate : '-'),
                createData("Expiry Date", accountInfo?.expiryDate ? accountInfo?.expiryDate : '-'),
            ];
            setRows([...row]);
    }, [accountInfo]);

    const handleChange = (data) => {
        let bodyFormData = new FormData();
        bodyFormData.append('file', data.target.files[0]);
        ProfileLogo(localStorage.getItem('role'), bodyFormData);
    }
    
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
                        charLength={ 50 }
                        path=''
                    />
                ) }

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
        ProfileLogo: (role, data) => dispatch(ProfileLogo(role, data)),
    };
};

AccountInfo.layout = Student

export default connect(mapStateToProps, mapDispatchToProps)(AccountInfo);