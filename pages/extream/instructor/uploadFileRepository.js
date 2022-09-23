import React from 'react';
import { Grid, Box } from '@mui/material';
import Instructor from '../../../layouts/instructor';
import {
    BreadCrumb,
    DragAndDrop,
    TabMenu,
    UploadFiles
} from '../../../components';
import {
    UploadFileIcon,
    GoogleDriveIcon
} from '../../../assets/icon';
import Router, { useRouter } from "next/router";
import { BASE_URL_EXTREM } from '../../../utils/BaseUrl';
import END_POINTS from '../../../utils/EndPoints';

const uploadFileRepository = () => {
    const router = useRouter();
    console.log("router", router.query.folderId)

    const InstructorBreadCrumb = [
        {
            name: 'Dashboard',
            link: '/extream/instructor/dashboard',
            active: false,
        },
        {
            name: 'Repository',
            link: '/extream/instructor/repository',
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
            singleFileUploadAPI={ BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_REPOSITARY_UPLOAD_SINGLE_FILE }
            multiFileUploadAPI={ BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_REPOSITARY_UPLOAD_MULTIPLE_FILE }
            routerObj={ { pathname: '/extream/instructor/repository' } }
        />,
        <DragAndDrop
            btnTitle='Process the file'
            choseFileTitle='Browse your file from google drive'
            fileIcon={ < GoogleDriveIcon /> }
            isGoogleDriveFile={ true }
        />,
        <DragAndDrop
            choseFileTitle='browse your zip here'
            btnTitle='Process the file'
            fileIcon={ < UploadFileIcon /> }
            isZipFile={ true }
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
                        />
                    </Grid>
                </Grid>
            </Box >
        </React.Fragment >
    )
};

uploadFileRepository.propTypes = {

}

uploadFileRepository.layout = Instructor;

export default uploadFileRepository;