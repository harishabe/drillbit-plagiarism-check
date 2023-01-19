import React from 'react';
import { Grid, Box } from '@mui/material';
import Admin from '../../../layouts/Admin';
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
import { BASE_URL_EXTREM } from '../../../utils/BaseUrl';
import END_POINTS from '../../../utils/EndPoints';
import { UPLOAD_TITLE_CONSTANT } from '../../../constant/data/Constant';
import { UPLOAD_SUPPORTED_FILES } from '../../../constant/data/Constant';

const uploadFileRepository = () => {

    const handleAPI = () => {};

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
            key={0}
            isRepository={ true }
            choseFileTitle='browse your file here'
            allowedFormat={ UPLOAD_SUPPORTED_FILES.REPO_ALLOWED_FILE }
            title={ UPLOAD_TITLE_CONSTANT.REPOSITORY }
            fileIcon={ < UploadFileIcon /> }
            singleFileUploadAPI={ BASE_URL_EXTREM + END_POINTS.ADMIN_REPOSITARY_UPLOAD_SINGLE_FILE }
            multiFileUploadAPI={ BASE_URL_EXTREM + END_POINTS.ADMIN_REPOSITARY_UPLOAD_MULTIPLE_FILE }
            routerObj={ { pathname: '/extream/admin/repository' } }
        />,
        <GDriveFileUpload
            key={1}
            isRepository={ true }
            allowedFormat={ UPLOAD_SUPPORTED_FILES.GDRIVE }
            title={ UPLOAD_TITLE_CONSTANT.REPOSITORY }
            fileUploadAPI={ BASE_URL_EXTREM + END_POINTS.ADMIN_REPOSITARY_UPLOAD_DRIVE }
            routerObj={ { pathname: '/extream/admin/repository' } }
        />,
        <ZipFileUpload
            key={2}
            isRepository={ true }
            title={ UPLOAD_TITLE_CONSTANT.REPOSITORY }
            allowedFormat={ UPLOAD_SUPPORTED_FILES.ZIP }
            notAllowedFormat={ UPLOAD_SUPPORTED_FILES.NON_ZIP }
            zipFileUploadAPI={ BASE_URL_EXTREM + END_POINTS.ADMIN_REPOSITARY_UPLOAD_ZIP }
            routerObj={ { pathname: '/extream/admin/repository' } }
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
                            handleAPI={ handleAPI }
                        />
                    </Grid>
                </Grid>
            </Box >
        </React.Fragment >
    );
};

uploadFileRepository.propTypes = {

};

uploadFileRepository.layout = Admin;

export default uploadFileRepository;