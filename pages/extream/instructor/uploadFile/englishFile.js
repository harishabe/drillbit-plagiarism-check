import React, { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import { useRouter } from 'next/router';
import Instructor from '../../../../layouts/Instructor';
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
import END_POINTS from '../../../../utils/EndPoints';
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
];

const EnglishFile = () => {
    const router = useRouter();
    const [className, setClassName] = useState('');
    const [assName, setAssName] = useState('');

    useEffect(() => {
        if (router.isReady) {
            setClassName(router.query.clasName);
            setAssName(router.query.assName);
        }
    }, [router.isReady]);

    const InstructorBreadCrumb = [
        {
            name: 'Dashboard',
            link: '/extream/instructor/dashboard',
            active: false,
        },
        {
            name: className,
            link: '/extream/instructor/myclasses',
            active: false,
        },
        {
            name: assName,
            link: '/extream/instructor/my-assignment' + router?.asPath?.slice(router?.pathname?.length),
            active: false,
        },
        {
            name: 'Submissions',
            link: '/extream/instructor/mysubmissions' + router?.asPath?.slice(router?.pathname?.length),
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
            key={0}
            choseFileTitle='browse your file here'
            title={UPLOAD_TITLE_CONSTANT.SUBMISSION}
            allowedFormat={UPLOAD_SUPPORTED_FILES.SINGLE}
            fileIcon={<UploadFileIcon />}
            langType="English"
            singleFileUploadAPI={BASE_URL_UPLOAD + END_POINTS.INSTRUCTOR_SUBMISSION_UPLOAD + `classes/${router.query.clasId}/assignments/${router.query.assId}/singleFile`}
            multiFileUploadAPI={BASE_URL_UPLOAD + END_POINTS.INSTRUCTOR_SUBMISSION_UPLOAD + `classes/${router.query.clasId}/assignments/${router.query.assId}/multipleFiles`}
            routerObj={{
                pathname: '/extream/instructor/mysubmissions',
                query: { clasId: router.query.clasId, assId: router.query.assId, clasName: router.query.clasName, assName: router.query.assName }
            }}
        />,
        <GDriveFileUpload
            key={1}
            allowedFormat={UPLOAD_SUPPORTED_FILES.GDRIVE}
            title={UPLOAD_TITLE_CONSTANT.SUBMISSION}
            fileUploadAPI={BASE_URL_UPLOAD + `/files/classes/${router.query.clasId}/assignments/${router.query.assId}/drive`}
            routerObj={{
                pathname: '/extream/instructor/mysubmissions',
                query: { clasId: router.query.clasId, assId: router.query.assId, clasName: router.query.clasName, assName: router.query.assName }
            }}
        />,
        <ZipFileUpload
            key={2}
            title={UPLOAD_TITLE_CONSTANT.SUBMISSION}
            allowedFormat={UPLOAD_SUPPORTED_FILES.ZIP}
            notAllowedFormat={UPLOAD_SUPPORTED_FILES.NON_ZIP}
            zipFileUploadAPI={BASE_URL_UPLOAD + END_POINTS.INSTRUCTOR_SUBMISSION_UPLOAD + `classes/${router.query.clasId}/assignments/${router.query.assId}/zipFile`}
            confirmZipFileAPI={BASE_URL_UPLOAD + END_POINTS.INSTRUCTOR_SUBMISSION_UPLOAD + `classes/${router.query.clasId}/assignments/${router.query.assId}/confirmZipFile`}
            routerObj={{ pathname: '/extream/instructor/mysubmissions', query: { clasId: router.query.clasId, assId: router.query.assId, clasName: router.query.clasName, assName: router.query.assName } }}
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

EnglishFile.propTypes = {

};

EnglishFile.layout = Instructor;

export default EnglishFile;