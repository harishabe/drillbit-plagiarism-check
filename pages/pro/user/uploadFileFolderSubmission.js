import React from 'react';
import { Grid, Box } from '@mui/material';
import ProUser from '../../../layouts/ProUser';
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

const UploadFileFolderSubmission = () => {
    const router = useRouter();
    console.log("router", router.query.folderId)

    const UserBreadCrumb = [
        {
            name: 'Dashboard',
            link: '/pro/user/dashboard',
            active: false,
        },
        {
            name: 'My folder',
            link: '/pro/user/myfolder',
            active: false,
        },
        {
            name: router.query.name,
            link: '/pro/user/folderSubmission' + router?.asPath?.slice(router?.pathname?.length),
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
            singleFileUploadAPI={ `myFolder/${router.query.folderId}/singleFile` }
            multiFileUploadAPI={ `myFolder/${router.query.folderId}/multipleFiles` }
            routerObj={ { pathname: '/pro/user/folderSubmission', query: { name: router.query.name, folderId: router.query.folderId } } }
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
                            item={ UserBreadCrumb }
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

UploadFileFolderSubmission.propTypes = {

}

UploadFileFolderSubmission.layout = ProUser;

export default UploadFileFolderSubmission;