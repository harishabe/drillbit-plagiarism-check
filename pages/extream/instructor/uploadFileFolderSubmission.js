import React, { useState } from 'react';
import { Grid, Box } from '@mui/material';
import Instructor from '../../../layouts/Instructor';
import {
    BreadCrumb,
    TabMenu,
    UploadFiles,
    GDriveFileUpload,
    ZipFileUpload
} from '../../../components';
import {
    UploadFileIcon,
    GoogleDriveIcon
} from '../../../assets/icon';
import Router, { useRouter } from "next/router";
import { BASE_URL_UPLOAD } from '../../../utils/BaseUrl';
import END_POINTS from '../../../utils/EndPoints';

const UploadFileFolderSubmission = () => {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState(0);

    const handleAPI = (value) => {
        setActiveTab(value);
    }
    const InstructorBreadCrumb = [
        {
            name: 'Dashboard',
            link: '/extream/instructor/dashboard',
            active: false,
        },
        {
            name: 'My folder',
            link: '/extream/instructor/myfolder',
            active: false,
        },
        {
            name: router.query.name,
            link: '/extream/instructor/folderSubmission' + router?.asPath?.slice(router?.pathname?.length),
            active: false,
        },
        {
            name: 'Submissions',
            link: '',
            active: true,
        }
    ];

    const tabMenu = [
        {
            label: 'Upload File',
        },
        {
            label: 'Google Drive',
        },
        {
            label: 'Zip',
        },
    ];

    const componentList = [
        <UploadFiles 
            choseFileTitle='browse your file here' 
            fileIcon={ < UploadFileIcon /> } 
            singleFileUploadAPI={ BASE_URL_UPLOAD + END_POINTS.INSTRUCTOR_SUBMISSION_UPLOAD + `myFolder/${router.query.folderId}/singleFile` }
            multiFileUploadAPI={ BASE_URL_UPLOAD + END_POINTS.INSTRUCTOR_SUBMISSION_UPLOAD + `myFolder/${router.query.folderId}/multipleFiles` }
            routerObj={ { pathname: '/extream/instructor/folderSubmission', query: { name: router.query.name, folderId: router.query.folderId } } }
        />,
        <GDriveFileUpload />,
        <ZipFileUpload
            zipFileUploadAPI={ BASE_URL_UPLOAD + END_POINTS.INSTRUCTOR_SUBMISSION_UPLOAD + `myFolder/${router.query.folderId}/zipFile` }
            confirmZipFileAPI={ BASE_URL_UPLOAD + END_POINTS.INSTRUCTOR_SUBMISSION_UPLOAD + `myFolder/${router.query.folderId}/confirmZipFile` }
            routerObj={ { pathname: '/extream/instructor/folderSubmission', query: { name: router.query.name, folderId: router.query.folderId } } }
        />
    ];

    return (
        <React.Fragment>
            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 10 } xs={ 10 }>
                        <BreadCrumb
                            item={ InstructorBreadCrumb }
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 12 } xs={ 12 }>
                        <TabMenu
                            menuButton={ tabMenu }
                            components={ componentList }
                            handleAPI={ handleAPI }
                        />
                    </Grid>
                </Grid>
            </Box >
        </React.Fragment >
    )
};

UploadFileFolderSubmission.propTypes = {

}

UploadFileFolderSubmission.layout = Instructor;

export default UploadFileFolderSubmission;