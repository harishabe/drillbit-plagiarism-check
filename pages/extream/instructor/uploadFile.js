import React, { useState } from 'react';
import { Grid, Box } from '@mui/material';
import { useRouter } from "next/router";
import Instructor from '../../../layouts/Instructor';
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
import { BASE_URL_UPLOAD } from '../../../utils/BaseUrl';
import END_POINTS from '../../../utils/EndPoints';


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
            link: '/extream/instructor/my-assignment?clasId='+router.query.clasId,
            active: false,
        },
        {
            name: 'Submissions',
            link: '/extream/instructor/mysubmissions?isAssignment=true&clasId='+router.query.clasId+'&assId='+router.query.assId,
            active: false,
        },
        {
            name: 'Upload files',
            link: '',
            active: true,
        }

    ];

    const componentList = [
        <UploadFiles
            choseFileTitle='browse your file here'
            fileIcon={<UploadFileIcon />}
            singleFileUploadAPI={BASE_URL_UPLOAD + END_POINTS.INSTRUCTOR_SUBMISSION_UPLOAD + `classes/${router.query.clasId}/assignments/${router.query.assId}/singleFile`}
            multiFileUploadAPI={BASE_URL_UPLOAD + END_POINTS.INSTRUCTOR_SUBMISSION_UPLOAD + `classes/${router.query.clasId}/assignments/${router.query.assId}/multipleFiles`}
            routerObj={{ pathname: '/extream/instructor/mysubmissions', query: { isAssignment: true, clasId: router.query.clasId, assId: router.query.assId } }}
        />,
        <GDriveFileUpload />,
        <ZipFileUpload
            zipFileUploadAPI={BASE_URL_UPLOAD + END_POINTS.INSTRUCTOR_SUBMISSION_UPLOAD + `classes/${router.query.clasId}/assignments/${router.query.assId}/zipFile`}
            confirmZipFileAPI={BASE_URL_UPLOAD + END_POINTS.INSTRUCTOR_SUBMISSION_UPLOAD + `classes/${router.query.clasId}/assignments/${router.query.assId}/confirmZipFile`}
            routerObj={{ pathname: '/extream/instructor/mysubmissions', query: { isAssignment: true, clasId: router.query.clasId, assId: router.query.assId } }}
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
                            handleAPI={ handleAPI }
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