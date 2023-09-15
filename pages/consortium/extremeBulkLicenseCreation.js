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
import { EXTREME_ACCOUNT_BULK_CREATION_TEMPLATE_TITLE, CONSORTIUM_EXTREME_BULK_CREATION_TITLE } from '../../constant/data/Constant';

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
    padding10: {
        padding: '10px'
    },
    link: {
        marginLeft: '5px'
    },
    error: {
        color: '#FF0000'
    },
    button: {
        marginTop: '15px',
        textAlign: 'center'
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
        name: 'Extreme',
        link: '/consortium/extreme',
        active: false,
    },
    {
        name: 'Create Multiple Extreme Accounts',
        link: '/consortium/extremeBulkLicenseCreation',
        active: true,
    },
];

const ProBulkLicenseCreation = ({
    DownloadTemplate,
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
        DownloadTemplate(BASE_URL_SUPER + END_POINTS.CREATE_MULTIPLE_EXTREME_LICENSES, EXTREME_ACCOUNT_BULK_CREATION_TEMPLATE_TITLE);
    };

    const handleSubmit = () => {
        if (fileData !== '') {
            setShowError(false);
            let bodyFormData = new FormData();
            bodyFormData.append('file', fileData);
            UploadFile(BASE_URL_SUPER + END_POINTS.CREATE_MULTIPLE_EXTREME_LICENSES, bodyFormData);
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
        router.push('/consortium/extreme');
    };

    useEffect(() => {
        if (fileUploadData?.status === 200 || fileUploadData?.status === 201) {
            setFileData('');
            router.push('/consortium/extreme');
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
                                        <MainHeading title={ CONSORTIUM_EXTREME_BULK_CREATION_TITLE.MAIN_HEADING } />
                                    </Grid>
                                    <Grid item md={ 6 } xs={ 6 } align="right">
                                        <Button
                                            onClick={ handleDownload }
                                            variant="contained"
                                            size="large"
                                            disabled={ isLoadingTemplate }
                                        >
                                            { isLoadingTemplate ? <BeatLoader color="#fff" /> : CONSORTIUM_EXTREME_BULK_CREATION_TITLE.TEMPLATE_BUTTON }
                                        </Button>
                                    </Grid>

                                    <Grid container spacing={ 1 }>
                                        <Grid item md={ 12 } xs={ 12 }>
                                            <div className={ classes.dragAndDropArea }>
                                                <UploadFileIcon />
                                                <SubTitle1 title={ CONSORTIUM_EXTREME_BULK_CREATION_TITLE.HEADING } />
                                                <SubTitle2 title={ CONSORTIUM_EXTREME_BULK_CREATION_TITLE.MANDATORY_FIELDS } />
                                                <div className={ classes.padding10 }>
                                                    <Link className={ classes.link }>
                                                        <label htmlFor="file-upload" className={ classes.customFileUpload }>
                                                            { CONSORTIUM_EXTREME_BULK_CREATION_TITLE.BROWSE_YOUR_FILE }
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

                                                    { showError ? <div className={ classes.error }>{ CONSORTIUM_EXTREME_BULK_CREATION_TITLE.ERROR } </div> : '' }
                                                </div>
                                            </div>
                                        </Grid>

                                    </Grid>

                                    <Grid container spacing={ 1 }>
                                        <Grid item md={ 4 } xs={ 4 }></Grid>
                                        <Grid item md={ 4 } xs={ 4 } className={ classes.button }>
                                            <Button
                                                onClick={ handleSubmit }
                                                variant="contained"
                                                size="large"
                                                disabled={ isLoadingInstructorFileUpload }
                                            >
                                                { isLoadingInstructorFileUpload ? <BeatLoader color="#fff" /> : CONSORTIUM_EXTREME_BULK_CREATION_TITLE.SUBMIT_BUTTON }
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