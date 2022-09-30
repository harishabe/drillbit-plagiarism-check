import React, { useState } from 'react';
import { Grid, Box } from '@mui/material';
import ProAdmin from '../../../layouts/ProAdmin';
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
import { BASE_URL_PRO } from '../../../utils/BaseUrl';
import END_POINTS_PRO from '../../../utils/EndPointPro';

const uploadFileRepository = () => {
    const [activeTab, setActiveTab] = useState(0);

    const handleAPI = (value) => {
        setActiveTab(value);
    }

    const AdminBreadCrumb = [
        {
            name: 'Dashboard',
            link: '/pro/user/dashboard',
            active: false,
        },
        {
            name: 'Repository',
            link: '/pro/user/repository',
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
            isRepository={ true }
            choseFileTitle='browse your file here'
            fileIcon={ < UploadFileIcon /> }
            singleFileUploadAPI={ BASE_URL_PRO + END_POINTS_PRO.USER_REPOSITARY_UPLOAD_SINGLE_FILE }
            multiFileUploadAPI={ BASE_URL_PRO + END_POINTS_PRO.USER_REPOSITARY_UPLOAD_MULTIPLE_FILE }
            routerObj={ { pathname: '/pro/user/repository' } }
        />,
        <GDriveFileUpload />,
        <ZipFileUpload
            zipFileUploadAPI={ BASE_URL_PRO + END_POINTS_PRO.USER_REPOSITARY_UPLOAD_ZIP }
            routerObj={ { pathname: '/pro/user/repository' } }
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
    )
};

uploadFileRepository.propTypes = {

}

uploadFileRepository.layout = ProAdmin;

export default uploadFileRepository;