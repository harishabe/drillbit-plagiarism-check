import React, { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import { useRouter } from 'next/router';
import ProUser from '../../../../layouts/ProUser';
import {
    BreadCrumb,
    TabMenu,
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

    const tabMenu = [
        {
            label: 'Regional Language',
        },
        {
            label: 'Cross Language',
            isDisabled: router?.query?.translation === 'YES' ? false : true
        }
    ];

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

    const handleAPI = () => {

    };

    const componentList = [
        <UploadFiles
            key={ 0 }
            isRegionalFile={ true }
            choseFileTitle='Browse your regional file here'
            title={ UPLOAD_TITLE_CONSTANT.REGIONAL }
            allowedFormat={ UPLOAD_SUPPORTED_FILES.REGIONAL_FORMAT }
            fileIcon={ <UploadFileIcon /> }
            isCrossLangDropdown={ false }
            singleFileUploadAPI={ BASE_URL_UPLOAD + `/files/regional/folder/${router.query.folderId}/upload` }
            routerObj={ {
                pathname: '/pro/user/folderSubmission', query: { name: router.query.name, folderId: router.query.folderId, grammar: router.query.grammar, translation: router.query.translation }
            } }
        />,
        <UploadFiles
            key={ 0 }
            isRegionalFile={ true }
            choseFileTitle='Browse your regional file here'
            title={ UPLOAD_TITLE_CONSTANT.REGIONAL }
            allowedFormat={ UPLOAD_SUPPORTED_FILES.CROSS_LANGUAGE_FORMAT }
            fileIcon={ <UploadFileIcon /> }
            isCrossLangDropdown={ true }
            singleFileUploadAPI={ BASE_URL_UPLOAD + `/files/crossLangauge/folder/${router.query.folderId}/upload` }
            routerObj={ {
                pathname: '/pro/user/folderSubmission', query: { name: router.query.name, folderId: router.query.folderId, grammar: router.query.grammar, translation: router.query.translation }
            } }
        />
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
                        <TabMenu
                            menuButton={ tabMenu }
                            components={ componentList }
                            handleAPI={ handleAPI }
                            isDisabled={ tabMenu[1].isDisabled }
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