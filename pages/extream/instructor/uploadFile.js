import React from 'react';
import { Grid, Box } from '@mui/material';
import { useRouter } from "next/router";
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

const InstructorBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/extream/instructor/dashboard',
        active: false,
    },
    {
        name: 'My classes',
        link: '/extream/instructor/myclasses',
        active: false,
    },
    {
        name: 'My assignments',
        link: '/extream/instructor/my-assignment',
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

const UploadFile = () => {
    const router = useRouter();
    const componentList = [
        <UploadFiles
            choseFileTitle='browse your file here'
            fileIcon={< UploadFileIcon />}
            singleFileUploadAPI={`classes/${router.query.clasId}/assignments/${router.query.assId}/singleFile`}
            multiFileUploadAPI={`classes/${router.query.clasId}/assignments/${router.query.assId}/multipleFiles`}
            routerObj={{ pathname: '/extream/instructor/mysubmissions', query: { isAssignment: true, clasId: router.query.clasId, assId: router.query.assId } }}
        />,
        <DragAndDrop
            btnTitle='Process the file'
            choseFileTitle='Browse your file from google drive'
            fileIcon={< GoogleDriveIcon />}
            isGoogleDriveFile={true}
        />,
        <DragAndDrop
            choseFileTitle='browse your zip here'
            btnTitle='Process the file'
            fileIcon={< UploadFileIcon />}
            isZipFile={true}
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
                        />
                    </Grid>
                </Grid>
            </Box >
        </React.Fragment >
    )
};

UploadFile.propTypes = {

}

UploadFile.layout = Instructor;

export default UploadFile;