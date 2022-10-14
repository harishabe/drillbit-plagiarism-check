import React, { useState, useEffect } from 'react';
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
    UploadFileIcon
} from '../../../assets/icon';
import { useRouter } from 'next/router';
import { BASE_URL_UPLOAD } from '../../../utils/BaseUrl';
import END_POINTS from '../../../utils/EndPoints';
import { UPLOAD_TITLE_CONSTANT } from '../../../constant/data/Constant';
import { UPLOAD_SUPPORTED_FILES } from '../../../constant/data/Constant';

const UploadFileFolderSubmission = () => {
    const router = useRouter();
    const [myFolder, setMyfolder] = useState('');

    useEffect(() => {
        if (router.isReady) {
            setMyfolder(router.query.name);
        }
    }, [router.isReady]);
    const [activeTab, setActiveTab] = useState(0);

    const handleAPI = (value) => {
        setActiveTab(value);
    };
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
            name: myFolder,
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
            key={0}
            activeTab={ activeTab }
            choseFileTitle='browse your file here'
            title={UPLOAD_TITLE_CONSTANT.SUBMISSION}
            allowedFormat={UPLOAD_SUPPORTED_FILES.SINGLE}
            fileIcon={< UploadFileIcon />}
            singleFileUploadAPI={BASE_URL_UPLOAD + END_POINTS.INSTRUCTOR_SUBMISSION_UPLOAD + `myFolder/${router.query.folderId}/singleFile`}
            multiFileUploadAPI={BASE_URL_UPLOAD + END_POINTS.INSTRUCTOR_SUBMISSION_UPLOAD + `myFolder/${router.query.folderId}/multipleFiles`}
            routerObj={{ pathname: '/extream/instructor/folderSubmission', query: { name: router.query.name, folderId: router.query.folderId } }}
        />,
        <GDriveFileUpload
            key={1}
            activeTab={ activeTab }
            allowedFormat={UPLOAD_SUPPORTED_FILES.GDRIVE}
            title={UPLOAD_TITLE_CONSTANT.SUBMISSION}
            fileUploadAPI={BASE_URL_UPLOAD + `/files/myFolder/${router.query.folderId}/drive`}
            routerObj={{
                pathname: '/extream/instructor/folderSubmission',
                query: { name: router.query.name, folderId: router.query.folderId }
            }}
        />,
        <ZipFileUpload
            key={2}
            activeTab={ activeTab }
            title={UPLOAD_TITLE_CONSTANT.SUBMISSION}
            allowedFormat={UPLOAD_SUPPORTED_FILES.ZIP}
            notAllowedFormat={UPLOAD_SUPPORTED_FILES.NON_ZIP}
            zipFileUploadAPI={BASE_URL_UPLOAD + END_POINTS.INSTRUCTOR_SUBMISSION_UPLOAD + `myFolder/${router.query.folderId}/zipFile`}
            confirmZipFileAPI={BASE_URL_UPLOAD + END_POINTS.INSTRUCTOR_SUBMISSION_UPLOAD + `myFolder/${router.query.folderId}/confirmZipFile`}
            routerObj={{ pathname: '/extream/instructor/folderSubmission', query: { name: router.query.name, folderId: router.query.folderId } }}
        />
    ];

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={10} xs={10}>
                        <BreadCrumb
                            item={InstructorBreadCrumb}
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={1}>
                    <Grid item md={12} xs={12}>
                        <TabMenu
                            menuButton={tabMenu}
                            components={componentList}
                            handleAPI={handleAPI}
                        />
                    </Grid>
                </Grid>
            </Box >
        </React.Fragment >
    );
};

UploadFileFolderSubmission.propTypes = {

};

UploadFileFolderSubmission.layout = Instructor;

export default UploadFileFolderSubmission;