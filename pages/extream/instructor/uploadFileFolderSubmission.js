import React from 'react';
import { Grid, Box } from '@mui/material';
import Instructor from '../../../layouts/Instructor';
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
import { useRouter } from "next/router";

const UploadFileFolderSubmission = () => {
    const router = useRouter();

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
            name: router.query.name,
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
    {/* <DragAndDrop
btnTitle='Process the file'
choseFileTitle='browse your file here'
fileIcon={< UploadFileIcon />}
isUploadFile={true}
/>, */}
    const componentList = [

        <UploadFiles choseFileTitle='browse your file here' fileIcon={ < UploadFileIcon /> } />,
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

UploadFileFolderSubmission.propTypes = {

}

UploadFileFolderSubmission.layout = Instructor;

export default UploadFileFolderSubmission;