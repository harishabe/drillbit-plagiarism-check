import React, { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import { useRouter } from 'next/router';
import Student from '../../../../layouts/Student';
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

    const StudentBreadCrumb = [
        {
            name: 'Dashboard',
            link: '/extream/student/dashboard',
            active: false,
        },
        {
            name: className,
            link: '/extream/student/myclasses',
            active: false,
        },
        {
            name: assName,
            link: '/extream/student/myassignments?' + router?.asPath,
            active: false,
        },
        {
            name: 'Submission details',
            link: '/extream/student/myassignment-details?' + router?.asPath.split('?')[1],
            active: false,
        },
        {
            name: 'Upload File',
            link: '',
            active: true,
        },
    ];

    return (
        <React.Fragment>
            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 10 } xs={ 10 }>
                        <BreadCrumb
                            item={ StudentBreadCrumb }
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 12 } xs={ 12 }>
                        <UploadFiles
                            key={ 0 }
                            choseFileTitle='browse your file here'
                            title={ UPLOAD_TITLE_CONSTANT.SUBMISSION }
                            allowedFormat={ UPLOAD_SUPPORTED_FILES.SINGLE }
                            fileIcon={ <UploadFileIcon /> }
                            langType="Non English"
                            isStudent={ true }
                            singleFileUploadAPI={ BASE_URL_UPLOAD + `/files/classes/${router.query.clasId}/assignments/${router.query.assId}/studentNonEnglishFile` }
                            // multiFileUploadAPI={ BASE_URL_UPLOAD + END_POINTS.INSTRUCTOR_SUBMISSION_UPLOAD + `classes/${router.query.clasId}/assignments/${router.query.assId}/multipleFiles` }
                            routerObj={ {
                                pathname: '/extream/student/myassignment-details',
                                query: { clasId: router.query.clasId, assId: router.query.assId, clasName: router.query.clasName, assName: router.query.assName }
                            } }
                        />
                    </Grid>
                </Grid>
            </Box >
        </React.Fragment >
    );
};

EnglishFile.propTypes = {

};

EnglishFile.layout = Student;

export default EnglishFile;