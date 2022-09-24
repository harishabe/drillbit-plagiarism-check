import React from 'react';
import { Grid, Box } from '@mui/material';
import Admin from '../../../layouts/Admin';
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
import { BASE_URL_EXTREM } from '../../../utils/BaseUrl';
import END_POINTS from '../../../utils/EndPoints';
// import Router, { useRouter } from "next/router";

const uploadFileRepository = () => {

    const AdminBreadCrumb = [
        {
            name: 'Dashboard',
            link: '/extream/admin/dashboard',
            active: false,
        },
        {
            name: 'Repository',
            link: '/extream/admin/repository',
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
            singleFileUploadAPI={ BASE_URL_EXTREM + END_POINTS.ADMIN_REPOSITARY_UPLOAD_SINGLE_FILE }
            multiFileUploadAPI={ BASE_URL_EXTREM + END_POINTS.ADMIN_REPOSITARY_UPLOAD_MULTIPLE_FILE }
            routerObj={ { pathname: '/extream/admin/repository' } }
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
                            item={ AdminBreadCrumb }
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

uploadFileRepository.layout = Admin;

export default uploadFileRepository;