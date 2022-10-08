import React, { useState, useEffect } from 'react';
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
import { UPLOAD_SUPPORTED_FILES } from '../../../constant/data/Constant';

const UploadFileSubmission = () => {
    const router = useRouter();
    const [myFolder, setMyfolder] = useState('');

    useEffect(() => {
        if (router.isReady) {
            setMyfolder(router.query.name);
        }
    }, [router.isReady]);

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
            name: myFolder,
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
            label: 'Regional File',
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
            allowedFormat={ UPLOAD_SUPPORTED_FILES.SINGLE }
            fileIcon={ < UploadFileIcon /> }
            singleFileUploadAPI={ BASE_URL_UPLOAD + `/files/folder/${router.query.folderId}/singleFile` }
            multiFileUploadAPI={ BASE_URL_UPLOAD + `/files/folder/${router.query.folderId}/multipleFiles` }
            routerObj={ { pathname: '/pro/user/folderSubmission', query: { name: router.query.name, folderId: router.query.folderId } } }
        />,
        <UploadFiles
            isRegionalFile={ true }
            allowedFormat={ UPLOAD_SUPPORTED_FILES.REGIONAL }
            choseFileTitle='browse your regional file here'
            title={ UPLOAD_TITLE_CONSTANT.REGIONAL }
            fileIcon={ < UploadFileIcon /> }
            singleFileUploadAPI={ BASE_URL_UPLOAD + `/files/folder/${router.query.folderId}/regionalFile` }
            routerObj={ { pathname: '/pro/user/folderSubmission', query: { name: router.query.name, folderId: router.query.folderId } } }
        />,
        <GDriveFileUpload
            allowedFormat={ UPLOAD_SUPPORTED_FILES.GDRIVE }
            title={ UPLOAD_TITLE_CONSTANT.SUBMISSION }
            fileUploadAPI={ BASE_URL_UPLOAD + `/files/folder/${router.query.folderId}/drive` }
            routerObj={ {
                pathname: '/pro/user/folderSubmission',
                query: { name: router.query.name, folderId: router.query.folderId }
            } }
        />,
        <ZipFileUpload
            title={ UPLOAD_TITLE_CONSTANT.SUBMISSION }
            allowedFormat={ UPLOAD_SUPPORTED_FILES.ZIP }
            notAllowedFormat={ UPLOAD_SUPPORTED_FILES.NON_ZIP }
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

UploadFileSubmission.propTypes = {

};

UploadFileSubmission.layout = ProUser;

export default UploadFileSubmission;