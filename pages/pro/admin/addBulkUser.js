import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import BeatLoader from 'react-spinners/BeatLoader';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import { Box, Button, IconButton, Link, Tooltip } from '@mui/material';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import ProAdmin from '../../../layouts/ProAdmin';
import {
    BreadCrumb,
    CardView,
    EllipsisText,
    MainHeading,
    Title1
} from '../../../components';
import {
    DownBorderArrowIcon,
    UploadFileIcon
} from '../../../assets/icon';
import {
    DownloadTemplate,
    UploadFile
} from '../../../redux/action/admin/AdminAction';
import { BASE_URL_PRO } from '../../../utils/BaseUrl';
import END_POINTS_PRO from '../../../utils/EndPointPro';
import { USER_TEMPLATE_TITLE } from '../../../constant/data/Constant';

const useStyles = makeStyles({
    customFileUpload: {
        display: 'inline-block',
        padding: '6px 12px',
        cursor: 'pointer'
    },
    dragAndDropArea: {
        height: '300px',
        border: '1px dashed rgba(0, 0, 0, 0.38)',
        borderRadius: '20px',
        padding: '15px',
        background: '#F9FBFF',
        textAlign: 'center',
        marginTop: '20px',
        padding: '30px',
        textAlign: 'center'
    },
    padding30: {
        padding: '30px'
    }
});

const Input = styled('input')({
    display: 'none',
});

const UserBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/pro/admin/dashboard',
        active: false,
    },
    {
        name: 'Users',
        link: '/pro/admin/users',
        active: false,
    },
    {
        name: 'Add Multiple Users',
        link: '',
        active: true,
    },
];

const addBulkUser = ({
    DownloadTemplate,
    UploadFile,
    isLoadingTemplate,
    isLoadingInstructorFileUpload,
    fileUploadData
}) => {
    const router = useRouter();
    const classes = useStyles();
    const [fileData, setFileData] = useState('');
    const [showError, setShowError] = useState(false);

    const handleDownload = () => {
        DownloadTemplate(BASE_URL_PRO + END_POINTS_PRO.USER_DOWNLOAD_TEMPLATE, USER_TEMPLATE_TITLE);
    };

    const handleSubmit = () => {
        if (fileData !== '') {
            setShowError(false);
            let bodyFormData = new FormData();
            bodyFormData.append('file', fileData);
            UploadFile(BASE_URL_PRO + END_POINTS_PRO.CREATE_MULTIPLE_USER, bodyFormData);
        } else {
            setShowError(true);
        }
    };

    const handleUpload = (e) => {
        e.preventDefault();
        setFileData(e.target.files[0]);
        setShowError(false);
    };

    const handleBack = (e) => {
        e.preventDefault();
        router.push('/pro/admin/users');
    };

    useEffect(() => {
        if (fileUploadData?.status === 200) {
            setFileData('');
            router.push('/pro/admin/users');
        }
    }, [fileUploadData && fileUploadData !== '']);

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={10} xs={10}>
                        <BreadCrumb item={UserBreadCrumb} />
                    </Grid>
                    <Grid item md={2} xs={2}>

                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item md={12} xs={12}>
                        <CardView>
                            <Tooltip title="Back" arrow>
                                <IconButton onClick={handleBack} size="large">
                                    <ArrowBackOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                            <div style={{ padding: '0px 150px' }}>
                                <Grid container spacing={1}>
                                    <Grid item md={6} xs={6}>
                                        <MainHeading title='Add Multiple Users' />
                                    </Grid>
                                    <Grid item md={6} xs={6} align="right">
                                        <Button
                                            onClick={handleDownload}
                                            variant="contained"
                                            size="large"
                                            startIcon={!isLoadingTemplate && <DownBorderArrowIcon />}>
                                            {isLoadingTemplate ? <BeatLoader color="#fff" /> : 'Download Template'}
                                        </Button>
                                    </Grid>

                                    <Grid container spacing={1}>
                                        <Grid item md={12} xs={12}>
                                            <div className={classes.dragAndDropArea}>
                                                <UploadFileIcon />
                                                <div className={classes.padding30}>
                                                    <Title1 title='File format : CSV' />
                                                    <Link style={{ marginLeft: '5px' }}>
                                                        <label htmlFor="file-upload" className={classes.customFileUpload}>
                                                            browse your file here
                                                        </label>
                                                    </Link>
                                                    <Input onChange={handleUpload} id="file-upload" type="file" />
                                                    <EllipsisText value={fileData !== '' ? fileData?.name : ''} charLength={80} />
                                                    {showError ? <div style={{ color: 'red' }}>Please select your file to upload </div> : ''}
                                                </div>
                                            </div>
                                        </Grid>

                                    </Grid>

                                    <Grid container spacing={1}>
                                        <Grid item md={4} xs={4}></Grid>
                                        <Grid item md={4} xs={4} style={{ marginTop: '15px', textAlign: 'center' }}>
                                            <Button onClick={handleSubmit} variant="contained" size="large">
                                                {isLoadingInstructorFileUpload ? <BeatLoader color="#fff" /> : 'Submit'}
                                            </Button>
                                        </Grid>
                                        <Grid item md={4} xs={4}></Grid>
                                    </Grid>
                                </Grid>
                            </div>
                        </CardView>
                    </Grid>
                </Grid>
            </Box>
        </React.Fragment>
    );
};



const mapStateToProps = (state) => ({
    isLoadingTemplate: state?.detailsData?.isLoadingTemplate,
    isLoadingInstructorFileUpload: state?.detailsData?.isLoading,
    fileUploadData: state?.detailsData?.fileUploadData,
});

const mapDispatchToProps = (dispatch) => {
    return {
        DownloadTemplate: (url, title) => dispatch(DownloadTemplate(url, title)),
        UploadFile: (url, data) => dispatch(UploadFile(url, data)),
    };
};

addBulkUser.layout = ProAdmin;

addBulkUser.propTypes = {
    DownloadTemplate: propTypes.func.isRequired,
    UploadFile: propTypes.func.isRequired,
    isLoadingTemplate: propTypes.bool,
    isLoadingInstructorFileUpload: propTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(addBulkUser);
