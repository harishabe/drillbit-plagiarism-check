import React, { useState } from 'react';
import { Grid, Box } from '@mui/material';
import Instructor from '../../../layouts/instructor';
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
import { BASE_URL_EXTREM } from '../../../utils/BaseUrl';
import END_POINTS from '../../../utils/EndPoints';

const uploadFileRepository = () => {
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
            isRepository={ true }
            choseFileTitle='browse your file here'
            fileIcon={ < UploadFileIcon /> }
            singleFileUploadAPI={ BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_REPOSITARY_UPLOAD_SINGLE_FILE }
            multiFileUploadAPI={ BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_REPOSITARY_UPLOAD_MULTIPLE_FILE }
            routerObj={ { pathname: '/extream/instructor/repository' } }
        />,
        <GDriveFileUpload />,
        <ZipFileUpload
            isRepository={ true }
            zipFileUploadAPI={ BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_REPOSITARY_UPLOAD_ZIP }
            routerObj={ { pathname: '/extream/instructor/repository' } }
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

uploadFileRepository.propTypes = {

}

uploadFileRepository.layout = Instructor;

export default uploadFileRepository;