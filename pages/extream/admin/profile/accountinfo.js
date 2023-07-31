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
import { getItemSessionStorage } from '../../../../utils/RegExp'

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
    width: '180px',
    height: '115px',
    objectFit: 'contain',
    overflow: 'hidden',
});

const AccountInfo = ({
    GetProfile,
    ProfileLogo,
    isLoading,
    accountInfo
}) => {

    const [rows, setRows] = useState([]);
    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        let roleEndpoint = (getItemSessionStorage('switchRole') !== null ? getItemSessionStorage('switchRole') : getItemSessionStorage('role'));
        GetProfile(BASE_URL_EXTREM + END_POINTS.PROFILE_DATA + roleEndpoint + '/accountInformation');
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
        let img = new Image()
        let size = (data?.target?.files[0]?.size / 1024 / 1024).toFixed(2)
        img.src = data?.target?.files[0] && window?.URL?.createObjectURL(data?.target?.files[0])
        img.onload = () => {
            if (img.width <= 1000 && img.height <= 1000) {
                if (size > 10) {
                    setError(true)
                    setMessage(`Image size is ${size} MB. Required size is less than 10 MB.`);

                } else {
                    setError(false)
                    let bodyFormData = new FormData();
                    bodyFormData.append('file', data.target.files[0]);
                    ProfileLogo(BASE_URL_EXTREM + END_POINTS.ADMIN_PROFILE_UPLOAD_LOGO, bodyFormData);
                }
            } else {
                setError(true)
                setMessage(`Please resize the logo to fit the specified dimensions`);
            }

        }
    };


    return (
        <React.Fragment>
            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 10 }>
                        <MainHeading title='Account Information' />
                        <form>
                            <label htmlFor="contained-button-file">
                                <Input accept=".png, .jpg, .jpeg" id="contained-button-file" onChange={ handleChange } type="file" />
                                <Button variant="contained" component="span" style={ { marginBottom: '10px' } }>
                                    <>
                                        <UploadIcon />
                                        <UploadButtonAlign>
                                            <SubTitle textColor='#fff' title='Upload Logo' />
                                        </UploadButtonAlign>
                                    </>
                                </Button>

                                <SubTitle2 title='Supported formats : JPG,PNG, Image resolutions : 1000x1000 (mm), Maximum size : 10 MB' />
                                { error &&
                                    <SubTitle2 color='red' title={ message } />
                                }
                            </label>
                        </form>
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