import React, { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import { useRouter } from 'next/router';
import ProUser from '../../../../layouts/ProUser';
import {
    BreadCrumb,
    TabMenu,
    UploadFiles,
    GDriveFileUpload,
    ZipFileUpload
} from '../../../../components';
import {
    UploadFileIcon,
} from '../../../../assets/icon';
import { BASE_URL_UPLOAD } from '../../../../utils/BaseUrl';
import { UPLOAD_TITLE_CONSTANT, UPLOAD_SUPPORTED_FILES } from '../../../../constant/data/Constant';

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
    {
        label: 'Scanned PDF',
    },
];

const EnglishFile = () => {
    const router = useRouter();
    const [myFolder, setMyfolder] = useState('');

    useEffect(() => {
        if (router.isReady) {
            setMyfolder(router.query.name);
        }
    }, [router.isReady]);

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
            name: 'Upload files',
            link: '',
            active: true,
        }

    ];

    const handleAPI = () => {

    };

    const componentList = [
        <UploadFiles
            key={ 0 }
            choseFileTitle='browse your file here'
            title={ UPLOAD_TITLE_CONSTANT.SUBMISSION }
            allowedFormat={ UPLOAD_SUPPORTED_FILES.SINGLE }
            fileIcon={ <UploadFileIcon /> }
            langType="English"
            singleFileUploadAPI={ BASE_URL_UPLOAD + `/files/folder/${router.query.folderId}/singleFile` }
            multiFileUploadAPI={ BASE_URL_UPLOAD + `/files/folder/${router.query.folderId}/multipleFiles` }
            routerObj={ {
                pathname: '/pro/user/folderSubmission', query: { name: router.query.name, folderId: router.query.folderId, grammar: router.query.grammar }
            } }
        />,
        <GDriveFileUpload
            key={ 1 }
            allowedFormat={ UPLOAD_SUPPORTED_FILES.GDRIVE }
            title={ UPLOAD_TITLE_CONSTANT.SUBMISSION }
            fileUploadAPI={ BASE_URL_UPLOAD + `/files/folder/${router.query.folderId}/drive` }
            routerObj={ {
                pathname: '/pro/user/folderSubmission',
                query: { name: router.query.name, folderId: router.query.folderId, grammar: router.query.grammar }
            } }
        />,
        <ZipFileUpload
            key={ 2 }
            title={ UPLOAD_TITLE_CONSTANT.SUBMISSION }
            allowedFormat={ UPLOAD_SUPPORTED_FILES.ZIP }
            notAllowedFormat={ UPLOAD_SUPPORTED_FILES.NON_ZIP }
            zipFileUploadAPI={ BASE_URL_UPLOAD + `/files/folder/${router.query.folderId}/zipFile` }
            confirmZipFileAPI={ BASE_URL_UPLOAD + `/files/folder/${router.query.folderId}/confirmZipFile` }
            routerObj={ { pathname: '/pro/user/folderSubmission', query: { name: router.query.name, folderId: router.query.folderId, grammar: router.query.grammar } } }
        />,
        <UploadFiles
            key={ 3 }
            choseFileTitle='Browse your file here'
            title={ UPLOAD_TITLE_CONSTANT.SUBMISSION }
            allowedFormat={ UPLOAD_SUPPORTED_FILES.SCANNED_PDF }
            fileIcon={ <UploadFileIcon /> }
            langType="ScannedPDF"
            singleFileUploadAPI={ BASE_URL_UPLOAD + `/files/folder/${router.query.folderId}/scannedPDF` }
            routerObj={ { pathname: '/pro/user/folderSubmission', query: { name: router.query.name, folderId: router.query.folderId, grammar: router.query.grammar } } }
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

EnglishFile.propTypes = {

};

EnglishFile.layout = ProUser;

export default EnglishFile;