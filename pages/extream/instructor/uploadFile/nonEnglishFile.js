import React, { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import { useRouter } from 'next/router';
import Instructor from '../../../../layouts/Instructor';
import {
    BreadCrumb,
    UploadFiles,
} from '../../../../components';
import {
    UploadFileIcon,
} from '../../../../assets/icon';
import { BASE_URL_UPLOAD } from '../../../../utils/BaseUrl';
import END_POINTS from '../../../../utils/EndPoints';
import { UPLOAD_TITLE_CONSTANT, UPLOAD_SUPPORTED_FILES } from '../../../../constant/data/Constant';

const NonEnglishFile = () => {
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
                        <UploadFiles
                            key={0}
                            choseFileTitle='browse your file here'
                            langType='Non English'
                            title={UPLOAD_TITLE_CONSTANT.SUBMISSION}
                            allowedFormat={UPLOAD_SUPPORTED_FILES.SINGLE}
                            fileIcon={<UploadFileIcon />}
                            singleFileUploadAPI={ BASE_URL_UPLOAD + END_POINTS.INSTRUCTOR_SUBMISSION_UPLOAD + `classes/${router.query.clasId}/assignments/${router.query.assId}/nonEnglishFile` }
                            multiFileUploadAPI={BASE_URL_UPLOAD + END_POINTS.INSTRUCTOR_SUBMISSION_UPLOAD + `classes/${router.query.clasId}/assignments/${router.query.assId}/multipleFiles`}
                            routerObj={{
                                pathname: '/extream/instructor/mysubmissions',
                                query: { clasId: router.query.clasId, assId: router.query.assId, clasName: router.query.clasName, assName: router.query.assName }
                            }}
                        />
                    </Grid>
                </Grid>
            </Box >
        </React.Fragment >
    );
};

NonEnglishFile.propTypes = {

};

NonEnglishFile.layout = Instructor;

export default NonEnglishFile;