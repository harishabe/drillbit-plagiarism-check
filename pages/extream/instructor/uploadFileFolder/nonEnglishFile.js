import React, { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import { useRouter } from 'next/router';
import Instructor from '../../../../layouts/Instructor';
import {
    BreadCrumb,
    TabMenu,
    UploadFiles,
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
        label: 'Zip',
    },
];

const NonEnglishFile = () => {
    const router = useRouter();
    const [className, setClassName] = useState('');

    useEffect(() => {
        if (router.isReady) {
            setClassName(router.query.name);
        }
    }, [router.isReady]);

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
            name: className,
            link: '/extream/instructor/folderSubmission' + router?.asPath?.slice(router?.pathname?.length),
            active: false,
        },
        {
            name: 'Upload files',
            link: '',
            active: true,
        }

    ];

    const handleAPI = () => { };

    const componentList = [
        <UploadFiles
            key={ 0 }
            choseFileTitle='Browse your file here'
            langType='Non English'
            title={ UPLOAD_TITLE_CONSTANT.SUBMISSION }
            allowedFormat={ UPLOAD_SUPPORTED_FILES.SINGLE }
            fileIcon={ <UploadFileIcon /> }
            singleFileUploadAPI={ BASE_URL_UPLOAD + END_POINTS.INSTRUCTOR_SUBMISSION_UPLOAD + `myFolder/${router.query.folderId}/nonEnglishFile` }
            multiFileUploadAPI={ BASE_URL_UPLOAD + END_POINTS.INSTRUCTOR_SUBMISSION_UPLOAD + `folder/${router.query.folderId}/nonenglish/multipleFiles` }
            routerObj={ {
                pathname: '/extream/instructor/folderSubmission',
                query: { name: router.query.name, folderId: router.query.folderId, grammar: router.query.grammar }
            } }
        />,
        <ZipFileUpload
            key={ 1 }
            isNonEnglish={ true }
            title={ UPLOAD_TITLE_CONSTANT.SUBMISSION }
            allowedFormat={ UPLOAD_SUPPORTED_FILES.ZIP }
            notAllowedFormat={ UPLOAD_SUPPORTED_FILES.NON_ZIP }
            zipFileUploadAPI={ BASE_URL_UPLOAD + END_POINTS.INSTRUCTOR_SUBMISSION_UPLOAD + `myFolder/${router.query.folderId}/nonenglish/zipFile` }
            confirmZipFileAPI={ BASE_URL_UPLOAD + END_POINTS.INSTRUCTOR_SUBMISSION_UPLOAD + `myFolder/${router.query.folderId}/nonenglish/confirmZipFile` }
            routerObj={ {
                pathname: '/extream/instructor/folderSubmission',
                query: { name: router.query.name, folderId: router.query.folderId, grammar: router.query.grammar }
            } }
        />
    ]

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
    );
};

NonEnglishFile.propTypes = {

};

NonEnglishFile.layout = Instructor;

export default NonEnglishFile;