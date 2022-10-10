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
import Instructor from '../../../layouts/Instructor';
import {
    BreadCrumb,
    CardView,
    MainHeading,
    SubTitle1
} from '../../../components';
import {
    UploadFileIcon
} from '../../../assets/icon';
import {
    DownloadTemplate,
    UploadFile,
} from '../../../redux/action/instructor/InstructorAction';

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
        padding: '10px'
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

const AddBulkStudent = ({
    DownloadTemplate,
    UploadFile,
    isLoadingTemplate,
    isLoadingStudentFileUpload,
    fileUploadData
}) => {
    const router = useRouter();
    const classes = useStyles();
    const [myclass, setMyClass] = useState('');
    const [classId, setClassId] = useState('');
    const [fileData, setFileData] = useState('');
    const [showError, setShowError] = useState(false);

    useEffect(() => {
        if (router.isReady) {
            setMyClass(router?.query?.clasName);
            setClassId(router.query.clasId);
        }
    }, [router.isReady]);;

    const InstructorBreadCrumb = [
        {
            name: 'Dashboard',
            link: '/extream/instructor/dashboard',
            active: false,
        },
        {
            name: myclass,
            link: '/extream/instructor/myclasses',
            active: false,
        },
        {
            name: 'My assignments',
            link: '/extream/instructor/my-assignment?clasId=' + classId + '&clasName=' + myclass,
            active: false,
        },
        {
            name: 'Add multiple student',
            link: '/extream/instructor/my-assignment/addBulkStudent',
            active: true,
        },
    ];

    const handleDownload = () => {
        DownloadTemplate(classId);
    };

    const handleSubmit = () => {
        if (fileData !== '') {
            setShowError(false);
            let bodyFormData = new FormData();
            bodyFormData.append('file', fileData);
            UploadFile(classId, bodyFormData);
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
        router.push('/extream/instructor/my-assignment?clasId=' + classId + '&clasName=' + myclass);
    };

    useEffect(() => {
        if (fileUploadData?.status === 200) {
            setFileData('');
            router.push('/extream/instructor/my-assignment?clasId=' + classId + '&clasName=' + myclass);
        }
    }, [fileUploadData && fileUploadData !== '']);

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={10} xs={10}>
                        <BreadCrumb item={InstructorBreadCrumb} />
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
                            <div style={{ padding: '25px 150px' }}>
                                <Grid container spacing={1}>
                                    <Grid item md={6} xs={6}>
                                        <MainHeading title='Add Multiple Students' />
                                    </Grid>
                                    <Grid item md={6} xs={6} align="right">
                                        <Button
                                            onClick={handleDownload}
                                            variant="contained"
                                            size="large"
                                        >
                                            {isLoadingTemplate ? <BeatLoader color="#fff" /> : 'Download Template'}
                                        </Button>
                                    </Grid>

                                    <Grid container spacing={1}>
                                        <Grid item md={12} xs={12}>
                                            <div className={classes.dragAndDropArea}>
                                                <UploadFileIcon />
                                                <SubTitle1 title="File Format : CSV " />
                                                <div className={classes.padding30}>
                                                    <Link style={{ marginLeft: '5px' }}>
                                                        <label htmlFor="file-upload" className={classes.customFileUpload}>
                                                            browse your file here
                                                        </label>
                                                    </Link>
                                                    <Input onChange={handleUpload} id="file-upload" type="file" />
                                                    <div>
                                                        {fileData !== '' &&
                                                            <ChipContainer>
                                                                <Chip
                                                                    label={fileData?.name}
                                                                />
                                                            </ChipContainer>}
                                                    </div>
                                                    {showError ? <div style={{ color: 'red' }}>Please select your file to upload </div> : ''}
                                                </div>
                                            </div>
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={1}>
                                        <Grid item md={4} xs={4}></Grid>
                                        <Grid item md={4} xs={4} style={{ marginTop: '15px', textAlign: 'center' }}>
                                            <Button onClick={handleSubmit} variant="contained" size="large">
                                                {isLoadingStudentFileUpload ? <BeatLoader color="#fff" /> : 'Submit'}
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
    studentData: state?.instructorClasses?.studentData?._embedded?.studentDTOList,
    pageDetails: state?.instructorClasses?.studentData?.page,
    isLoadingTemplate: state?.instructorClasses?.isLoadingTemplate,
    isLoadingStudentFileUpload: state?.instructorClasses?.isLoadingStudentFileUpload,
    fileUploadData: state?.instructorClasses?.fileUploadData,
});

const mapDispatchToProps = (dispatch) => {
    return {
        DownloadTemplate: (ClasId) => dispatch(DownloadTemplate(ClasId)),
        UploadFile: (ClasId, data) => dispatch(UploadFile(ClasId, data)),
    };
};

AddBulkStudent.layout = Instructor;

AddBulkStudent.propTypes = {
    DownloadTemplate: propTypes.func.isRequired,
    UploadFile: propTypes.func.isRequired,
    studentData: propTypes.object,
    pageDetails: propTypes.object,
    isLoadingTemplate: propTypes.bool,
    isLoadingStudentFileUpload: propTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddBulkStudent);
