import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Chip from '@mui/material/Chip';
import { Grid, Link } from '@mui/material';
import useDrivePicker from 'react-google-drive-picker';
import FileForm from './FileForm';
import RepositoryFileForm from './RepositoryFileForm';
import {
    Title,
    CardView,
    SubTitle1
} from '../../components';
import {
    DragAreaPadding,
    DragDropArea,
    ChooseLabel,
    ChipContainer,
    ContentCenter
} from './FileStyle';
import {
    GoogleDriveIcon
} from '../../assets/icon';
import { UploadFileDrive, UploadGdriveFileDataClear } from '../../redux/action/common/UploadFile/UploadFileAction';

const GDriveFileUpload = ({
    isLoadingFileDrive,
    title,
    UploadFileDrive,
    allowedFormat,
    routerObj,
    uploadFileSuccess,
    UploadGdriveFileDataClear,
    fileUploadAPI,
    isRepository
}) => {
    const router = useRouter();
    const [driveFile, setDriveFile] = useState('');
    const [driveFilePayload, setDriveFilePayload] = useState('');
    const [documnet, setDocument] = useState('');
    const [driveAuthToken, setDriveAuthToken] = useState('');
    const [openPicker, tokenData] = useDrivePicker();

    useEffect(() => {
        setDriveAuthToken(tokenData?.access_token);
    }, [tokenData]);

    const handleOpenPicker = () => {
        openPicker({
            //clientId: '32303602935-bbvsv5k7sksm71pipiru8jur6puhtm66.apps.googleusercontent.com',
            clientId:'322042705830-t41sd3gqi37845gdgc6khardvt9bq8gu.apps.googleusercontent.com',
            developerKey: 'AIzaSyBdE0t7rV5mH4grsIzKgVtJmlDMqf7zMZI',
            viewId: 'DOCS',
            showUploadView: true,
            showUploadFolders: true,
            supportDrives: true,
            multiselect: true,
            customScopes: ['https://www.googleapis.com/auth/drive.readonly'],
            callbackFunction: (data) => {
                if (data && data?.docs?.length > 0) {
                    setDocument(data?.docs);
                    setDriveFile(data && data?.docs[0].name);
                    setDriveFilePayload({
                        'fileId': data.docs[0].id,
                        'fileName': data.docs[0].name,
                        'url': data.docs[0].url,
                        'mimetype': data.docs[0].mimeType,
                        'token': driveAuthToken,
                        'fileSize': data.docs[0].sizeBytes
                    });
                }
            },
        });
    };

    const handleSubmit = (data) => {
        if (!isRepository) {
            let bodyFormData = new FormData();
            bodyFormData.append('authorName', data.authorName0);
            bodyFormData.append('title', data.title0);
            bodyFormData.append('documentType', data.documentType0);
            bodyFormData.append('plagiarismCheck', 'YES');
            bodyFormData.append('grammarCheck', 'NO');
            bodyFormData.append('language', 'English');
            bodyFormData.append('fileId', driveFilePayload?.fileId);
            bodyFormData.append('fileName', driveFilePayload?.fileName);
            bodyFormData.append('token', driveAuthToken);
            bodyFormData.append('fileSize', driveFilePayload?.fileSize);
            UploadFileDrive(fileUploadAPI, bodyFormData);
        } else {
            let bodyFormData = new FormData();
            bodyFormData.append('name', data.authorName0);
            bodyFormData.append('title', data.title0);
            bodyFormData.append('year', data.year0);
            bodyFormData.append('repository', (data.repository0 === 'Global') ? 'GLOBAL' : 'LOCAL');
            bodyFormData.append('language', data.language0);
            bodyFormData.append('fileId', driveFilePayload?.fileId);
            bodyFormData.append('fileName', driveFilePayload?.fileName);
            bodyFormData.append('token', driveAuthToken);
            bodyFormData.append('fileSize', driveFilePayload?.fileSize);
            UploadFileDrive(fileUploadAPI, bodyFormData);
        }
    };

    useEffect(() => {
        if (uploadFileSuccess) {
            console.log('routerObjrouterObj', routerObj);
            router.push(routerObj);
            UploadGdriveFileDataClear();
        }
    }, [uploadFileSuccess?.status === 200]);

    return (
        <CardView>
            <ContentCenter>
                <Title
                    color='#020B50'
                    title={title}
                />
                <DragAreaPadding>
                    <Grid container spacing={1}>
                        <Grid item md={12} xs={12}>
                            <DragDropArea>
                                <div>
                                    <GoogleDriveIcon />
                                </div>
                                <SubTitle1 title={ allowedFormat } />
                                <Link style={{ marginLeft: '5px' }}>
                                    <ChooseLabel onClick={() => handleOpenPicker()}>
                                        Browse your file from google drive
                                    </ChooseLabel>
                                </Link>
                                <div>
                                    {driveFile !== '' &&
                                        <ChipContainer>
                                            <Chip
                                                label={driveFile}
                                            />
                                        </ChipContainer>}
                                </div>
                            </DragDropArea>
                            { driveFile && driveFile?.length > 0 &&
                                <>
                                    { !isRepository ? <FileForm
                                        handleSubmitFile={ handleSubmit }
                                        files={ documnet }
                                        btnTitle='Submit'
                                        isLoading={ isLoadingFileDrive }
                                    /> :
                                        <RepositoryFileForm
                                            handleSubmitRepository={ handleSubmit }
                                            files={ documnet }
                                            btnTitle='Submit'
                                            isLoading={ isLoadingFileDrive }
                                        /> 
                                    }
                                </>
                            }

                            {/* {driveFile && driveFile?.length > 0 &&
                                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                                    <Button type="submit" onClick={handleGoogleDriveFile} variant="contained" size="large">
                                        {isLoadingUpload ? <BeatLoader color="#fff" /> : 'Process File'}
                                    </Button>
                                </div>
                            } */}
                        </Grid>
                    </Grid>
                </DragAreaPadding>
            </ContentCenter>
        </CardView>
    );
};

const mapStateToProps = (state) => ({
    uploadData: state?.instructorMyFolders?.uploadData,
    isLoadingUpload: state?.instructorMyFolders?.isLoadingUpload,
    isLoadingUploadFile: state?.instructorMyFolders?.isLoadingSubmission,
    extractedFileData: state?.instructorMyFolders?.extractedFileData,
    isLoadingExtractedFile: state?.instructorMyFolders?.isLoadingExtractedFile,
    uploadFileSuccess: state?.uploadFile?.uploadFileDrive,
    isLoadingFileDrive: state?.uploadFile?.isLoadingFileDrive
});

const mapDispatchToProps = (dispatch) => {
    return {
        UploadFileDrive: (url, data) => dispatch(UploadFileDrive(url, data)),
        UploadGdriveFileDataClear: () => dispatch(UploadGdriveFileDataClear()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GDriveFileUpload);