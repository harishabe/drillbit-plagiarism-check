import React, { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import Chip from '@mui/material/Chip';
import { useRouter } from 'next/router';
import BeatLoader from 'react-spinners/BeatLoader';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import { Box, Button, IconButton, Link, Tooltip } from '@mui/material';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import Admin from '../../layouts/Admin';
import {
    BreadCrumb,
    CardView,
    MainHeading,
    SubTitle1,
    SubTitle2
} from '../../components';
import {
    UploadFileIcon
} from '../../assets/icon';
import {
    DownloadTemplate,
    UploadFile,
    UploadFileDataClear
} from '../../redux/action/admin/AdminAction';
import { BASE_URL_SUPER } from '../../utils/BaseUrl';
import END_POINTS from '../../utils/EndPoints';
// import { INSTRUCTOR_TEMPLATE_TITLE } from '../../constant/data/Constant';  <--- DOWNLOAD TEMPLATE -->

const useStyles = makeStyles({
    customFileUpload: {
        display: 'inline-block',
        padding: '6px 12px',
        cursor: 'pointer'
    },
    customFileUploadHeader: {
        padding: '0px 50px',
        marginTop: '-50px'
    },
    dragAndDropArea: {
        height: '330px',
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
        padding: '10px'
    },
    link: {
        marginLeft: '5px'
    },
    error: {
        color: 'red'
    }
});

const ChipContainer = styled('div')({
    display: 'inline-flex',
    marginTop: '10px',
    marginLeft: '10px'
});

const Input = styled('input')({
    display: 'none',
});

const InstructorBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/consortium/dashboard',
        active: false,
    },
    {
        name: 'Pro',
        link: '/consortium/pro',
        active: false,
    },
    {
        name: 'Create Multiple Pro Accounts',
        link: '/consortium/proBulkLicenseCreation',
        active: true,
    },
];

const ProBulkLicenseCreation = ({
    // DownloadTemplate, <--- DOWNLOAD TEMPLATE -->
    UploadFile,
    isLoadingTemplate,
    isLoadingInstructorFileUpload,
    fileUploadData,
    UploadFileDataClear,
}) => {
    const router = useRouter();
    const classes = useStyles();
    const [fileData, setFileData] = useState('');
    const [showError, setShowError] = useState(false);

    const handleDownload = () => {
        // DownloadTemplate(BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_DOWNLOAD_TEMPLATE, INSTRUCTOR_TEMPLATE_TITLE);  <--- DOWNLOAD TEMPLATE -->
        console.log('need template API')
    };

    const handleSubmit = () => {
        if (fileData !== '') {
            setShowError(false);
            let bodyFormData = new FormData();
            bodyFormData.append('file', fileData);
            UploadFile(BASE_URL_SUPER + END_POINTS.CREATE_MULTIPLE_PRO_LICENSES, bodyFormData);
        } else {
            setShowError(true);
        }
    };

    const handleUpload = (e) => {
        e.preventDefault();
        setFileData(e.target.files[0]);
        setShowError(false);
        e.target.value = '';
    };

    const handleBack = (e) => {
        e.preventDefault();
        router.push('/consortium/pro');
    };

    useEffect(() => {
        if (fileUploadData?.status === 200 || fileUploadData?.status === 201) {
            setFileData('');
            router.push('/consortium/pro');
        } else if (fileUploadData?.response?.data?.status === 400) {
            UploadFileDataClear()
            setFileData('');
        }
    }, [router, fileData, fileUploadData]);

    return (
        <React.Fragment>
            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 10 } xs={ 10 }>
                        <BreadCrumb item={ InstructorBreadCrumb } />
                    </Grid>
                    <Grid item md={ 2 } xs={ 2 }>

                    </Grid>
                </Grid>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 12 } xs={ 12 }>
                        <CardView>
                            <Tooltip title="Back" arrow>
                                <IconButton onClick={ handleBack } size="large">
                                    <ArrowBackOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                            <div className={ classes.customFileUploadHeader }>
                                <Grid container spacing={ 1 }>
                                    <Grid item md={ 6 } xs={ 6 }>
                                        <MainHeading title='Create Multiple Pro Accounts' />
                                    </Grid>
                                    <Grid item md={ 6 } xs={ 6 } align="right">
                                        <Button
                                            onClick={ handleDownload }
                                            variant="contained"
                                            size="large"
                                            disabled={ isLoadingTemplate }
                                        >
                                            { isLoadingTemplate ? <BeatLoader color="#fff" /> : 'Download Template' }
                                        </Button>
                                    </Grid>

                                    <Grid container spacing={ 1 }>
                                        <Grid item md={ 12 } xs={ 12 }>
                                            <div className={ classes.dragAndDropArea }>
                                                <UploadFileIcon />
                                                <SubTitle1 title="File Format : CSV " />
                                                <SubTitle2 title=" Mandatory fields : Institution Name* , State* , Country* , Coordinator Name* , Coordinator Email* , Designation* , Department* , Phone* , Start Date* , End Date* , No Of Users* , No Of Submissions* , Account Manager* , Institution Type* " />
                                                <div className={ classes.padding30 }>
                                                    <Link className={ classes.link }>
                                                        <label htmlFor="file-upload" className={ classes.customFileUpload }>
                                                            Browse your file here
                                                        </label>
                                                    </Link>
                                                    <Input onChange={ handleUpload } id="file-upload" type="file" />
                                                    <div>
                                                        { fileData !== '' &&
                                                            <ChipContainer>
                                                                <Chip
                                                                    label={ fileData?.name }
                                                                />
                                                            </ChipContainer>
                                                        }
                                                    </div>

                                                    { showError ? <div className={ classes.error }>Please select your file to upload </div> : '' }
                                                </div>
                                            </div>
                                        </Grid>

                                    </Grid>

                                    <Grid container spacing={ 1 }>
                                        <Grid item md={ 4 } xs={ 4 }></Grid>
                                        <Grid item md={ 4 } xs={ 4 } style={ { marginTop: '15px', textAlign: 'center' } }>
                                            <Button
                                                onClick={ handleSubmit }
                                                variant="contained"
                                                size="large"
                                                disabled={ isLoadingInstructorFileUpload }
                                            >
                                                { isLoadingInstructorFileUpload ? <BeatLoader color="#fff" /> : 'Submit' }
                                            </Button>
                                        </Grid>
                                        <Grid item md={ 4 } xs={ 4 }></Grid>
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
    grammar_access: state?.detailsData?.instructorData?.grammar_access
});

const mapDispatchToProps = (dispatch) => {
    return {
        DownloadTemplate: (url, title) => dispatch(DownloadTemplate(url, title)),
        UploadFile: (url, data) => dispatch(UploadFile(url, data)),
        UploadFileDataClear: () => dispatch(UploadFileDataClear()),
    };
};

ProBulkLicenseCreation.layout = Admin;

ProBulkLicenseCreation.propTypes = {
    DownloadTemplate: propTypes.func.isRequired,
    UploadFile: propTypes.func.isRequired,
    isLoadingTemplate: propTypes.bool,
    isLoadingInstructorFileUpload: propTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProBulkLicenseCreation);