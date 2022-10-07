import React from 'react';
import { Grid, Box } from '@mui/material';
import ProUser from '../../../layouts/ProUser';
import {
    BreadCrumb,
    TabMenu,
    UploadFiles,
    GDriveFileUpload,
    ZipFileUpload
} from '../../../components';
import {
    UploadFileIcon,
} from '../../../assets/icon';
import { useRouter } from 'next/router';
import { BASE_URL_UPLOAD } from '../../../utils/BaseUrl';
import { UPLOAD_TITLE_CONSTANT } from '../../../constant/data/Constant';

const UploadFileFolderSubmission = () => {
    const router = useRouter();
    const handleAPI = () => {
    };

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
            title={ UPLOAD_TITLE_CONSTANT.SUBMISSION }
            fileIcon={ < UploadFileIcon /> }
            singleFileUploadAPI={ BASE_URL_UPLOAD + `/files/folder/${router.query.folderId}/singleFile` }
            multiFileUploadAPI={ BASE_URL_UPLOAD + `/files/folder/${router.query.folderId}/multipleFiles` }
            routerObj={ { pathname: '/pro/user/folderSubmission', query: { name: router.query.name, folderId: router.query.folderId } } }
        />,
        <GDriveFileUpload title={ UPLOAD_TITLE_CONSTANT.SUBMISSION } />,
        <ZipFileUpload
            title={ UPLOAD_TITLE_CONSTANT.SUBMISSION }
            zipFileUploadAPI={ BASE_URL_UPLOAD + `/files/folder/${router.query.folderId}/zipFile` }
            confirmZipFileAPI={ BASE_URL_UPLOAD + `/files/folder/${router.query.folderId}/confirmZipFile` }
            routerObj={ { pathname: '/pro/user/folderSubmission', query: { name: router.query.name, folderId: router.query.folderId } } }
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
                            handleAPI={ handleAPI }
                        />
                    </Grid>
                </Grid>
            </Box >
        </React.Fragment >
    );
};

UploadFileFolderSubmission.propTypes = {

};

UploadFileFolderSubmission.layout = ProUser;

export default UploadFileFolderSubmission;