import React, { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import { useRouter } from 'next/router';
import ProUser from '../../../../layouts/ProUser';
import {
    BreadCrumb,
    UploadFiles,
} from '../../../../components';
import {
    UploadFileIcon,
} from '../../../../assets/icon';
import { BASE_URL_UPLOAD } from '../../../../utils/BaseUrl';
import { UPLOAD_TITLE_CONSTANT, UPLOAD_SUPPORTED_FILES } from '../../../../constant/data/Constant';

const NonEnglishFile = () => {
    const router = useRouter();
    const [myFolder, setMyfolder] = useState('');

    useEffect(() => {
        if (router.isReady) {
            setMyfolder(router.query.name);
        }
    }, [router.isReady]);

    const UserBreadCrumb = [
        {
            name: 'Dashboard',
            link: '/pro/user/dashboard',
            active: false,
        },
        {
            name: 'My folder',
            link: '/pro/user/myfolder',
            active: false,
        },
        {
            name: myFolder,
            link: '/pro/user/folderSubmission' + router?.asPath?.slice(router?.pathname?.length),
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
            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 10 } xs={ 10 }>
                        <BreadCrumb
                            item={ UserBreadCrumb }
                        />
                    </Grid>
                </Grid>
                <Grid container spacing={ 1 }>
                    <Grid item md={ 12 } xs={ 12 }>
                        <UploadFiles
                            key={ 0 }
                            isRegionalFile={ true }
                            choseFileTitle='browse your regional file here'
                            title={ UPLOAD_TITLE_CONSTANT.REGIONAL }
                            allowedFormat={ UPLOAD_SUPPORTED_FILES.SINGLE }
                            fileIcon={ <UploadFileIcon /> }
                            singleFileUploadAPI={ BASE_URL_UPLOAD + `/files/regional/folder/${router.query.folderId}/upload` }
                            routerObj={ {
                                pathname: '/pro/user/folderSubmission', query: { name: router.query.name, folderId: router.query.folderId, grammar: router.query.grammar }
                            } }
                        />
                    </Grid>
                </Grid>
            </Box >
        </React.Fragment >
    );
};

NonEnglishFile.propTypes = {

};

NonEnglishFile.layout = ProUser;

export default NonEnglishFile;