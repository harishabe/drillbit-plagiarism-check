import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from "next/router";
import Chip from '@mui/material/Chip';
import { Grid, Link, Button } from '@mui/material';
import useDrivePicker from "react-google-drive-picker";
import BeatLoader from "react-spinners/BeatLoader";
import styled from 'styled-components';
import {
    UploadFileIcon
} from '../../assets/icon';
import {
    Title,
    Title1,
    CardView
} from '../../components';
import FileForm from './FileForm';
import {
    UPLOAD_FILE_MAX_LIMIT
} from '../../constant/data/ErrorMessage';

import {
    Input,
    DragAreaPadding,
    DragDropArea,
    ChooseLabel,
    ChipContainer,
    ContentCenter
} from './FileStyle';

import {
    SubmissionListUpload,
    SubmissionListExtractedFileUpload,
    UploadZipFileDataClear,
    UploadFileDataClear
} from '../../redux/action/instructor/InstructorAction';

const DragAndDrop = ({
    btnTitle,
    fileIcon,
    choseFileTitle,
    isGoogleDriveFile,
    isZipFile,
    SubmissionListUpload,
    SubmissionListExtractedFileUpload,
    uploadData,
    isLoadingUploadFile,
    isLoadingUpload,
    extractedFileData,
    isLoadingExtractedFile,
    UploadZipFileDataClear
}) => {
    const router = useRouter();
    const [fileData, setFileData] = useState([]);
    const [fileWarning, setFileWarning] = useState(false);
    const [driveFile, setDriveFile] = useState('');
    const [driveFilePayload, setDriveFilePayload] = useState('');
    const [driveAuthToken, setDriveAuthToken] = useState('');
    const [openPicker, data, authResponse] = useDrivePicker();

    const handleDelete = (e, item) => {
        e.preventDefault();
        let a = fileData.filter((filterItem) => {
            if (filterItem[1].name !== item[1].name) {
                return filterItem;
            }
        });
        setFileData(a);
    }

    const handleUpload = (e) => {
        e.preventDefault();
        if (Object.entries(e.target.files).length > 10) {
            setFileWarning(true);
        } else {
            setFileData(Object.entries(e.target.files));
            setFileWarning(false);
        }
    };

    const handleSubmit = (data) => {
        if (fileData.length === 1) {
            singleFileUpload(fileData, data);
        } else {
            multiFileUpload(fileData, data);
        }
    }

    const singleFileUpload = (files, data) => {
        let bodyFormData = new FormData();
        bodyFormData.append('authorName', data.authorName0);
        bodyFormData.append('title', data.title0);
        bodyFormData.append('documentType', data.documentType0);
        bodyFormData.append('plagiarismCheck', 'yes');
        bodyFormData.append('grammarCheck', 'yes');
        bodyFormData.append('language', 'English');
        bodyFormData.append('file', files[0][1]);
        SubmissionListUpload(`classes/${router.query.clasId}/assignments/${router.query.assId}/singleFile`, bodyFormData);
    }

    const multiFileUpload = (files, data) => {
        let authorNameArr = [], titleArr = [], documentTypeArr = [], filesArr = [];
        let bodyFormData = new FormData();
        fileData?.map((item, i) => {
            authorNameArr.push(data['authorName' + i]);
            titleArr.push(data['title' + i]);
            documentTypeArr.push(data['documentType' + i]);
            console.log('item[1]', item[1]);
            filesArr.push(item[1]);
        });

        bodyFormData.append('authorName', authorNameArr);
        bodyFormData.append('title', titleArr);
        bodyFormData.append('documentType', documentTypeArr);
        bodyFormData.append('file', filesArr);
        SubmissionListUpload(`classes/${router.query.clasId}/assignments/${router.query.assId}/multipleFiles`, bodyFormData);
    }

    const handleUploadZipFile = (e) => {
        e.preventDefault();
        let bodyFormData = new FormData();
        bodyFormData.append('file', fileData[0][1]);
        SubmissionListUpload(`classes/${router.query.clasId}/assignments/${router.query.assId}/zipFile`, bodyFormData);
    }

    const handleOpenPicker = () => {
        openPicker({
            clientId: "32303602935-bbvsv5k7sksm71pipiru8jur6puhtm66.apps.googleusercontent.com",
            developerKey: "AIzaSyAJq_NcYAf92IKUBf53Wj5ywQYlPt7-Now",
            viewId: "DOCS",
            showUploadView: true,
            showUploadFolders: true,
            supportDrives: true,
            multiselect: true,
            customScopes: ['https://www.googleapis.com/auth/drive.readonly'],
            callbackFunction: (data) => {
                if (data && data?.docs?.length > 0) {
                    console.log('datadatadatadata',data);
                    setDriveFile(data && data?.docs[0].name);
                    setDriveFilePayload({
                        "fileId": data.docs[0].id,
                        "fileName": data.docs[0].name,
                        "url": data.docs[0].url,
                        "mimetype": data.docs[0].mimeType,
                        "token": driveAuthToken,
                        "fileSize": data.docs[0].sizeBytes
                    });
                }
            },
        });
    };

    useEffect(() => {
        console.log('accesstoken',data);
        setDriveAuthToken(data?.access_token)
    }, [data]);

    const handleGoogleDriveFile = (e) => {
        e.preventDefault();
        console.log('driverFile', driveFilePayload);
        //SubmissionListUpload(`classes/${router.query.clasId}/assignments/${router.query.assId}/zipFile`, driveFilePayload);
    }

    const handleProcessZipFile = (data) => {
        let authorNameArr = [], titleArr = [], documentTypeArr = [];
        uploadData?.fileNames?.map((item, i) => {
            authorNameArr.push(data['authorName' + i]);
            titleArr.push(data['title' + i]);
            documentTypeArr.push(data['documentType' + i]);
        });
        uploadData['authorName'] = authorNameArr;
        uploadData['title'] = titleArr;
        uploadData['documentType'] = documentTypeArr;
        SubmissionListExtractedFileUpload(`classes/${router.query.clasId}/assignments/${router.query.assId}/confirmZipFile`, uploadData);
    }

    useEffect(() => {
        if (extractedFileData) {
            UploadZipFileDataClear();
            router.push({ pathname: '/instructor/mysubmissions', query: { isAssignment: true, clasId: router.query.clasId, assId: router.query.assId } });
        }
    }, [extractedFileData && extractedFileData !== '']);

    useEffect(() => {
        if (uploadData) {
            UploadFileDataClear();
            router.push({ pathname: '/instructor/mysubmissions', query: { isAssignment: true, clasId: router.query.clasId, assId: router.query.assId } });
        }
    }, [uploadData && uploadData !== '']);

    return (
        <CardView>
            <ContentCenter>
                <Title
                    color='#020B50'
                    title='Upload your files here to check plagiarism'
                />
            </ContentCenter>
            <DragAreaPadding>
                <Grid container spacing={1}>
                    <Grid item md={12} xs={12}>
                        <DragDropArea>
                            {fileIcon}
                            {!isGoogleDriveFile ?
                                <div>
                                    <Title1 title='Drag and drop, or ' />
                                    <Link style={{ marginLeft: '5px' }}>
                                        <ChooseLabel for="file-upload">
                                            {choseFileTitle}
                                        </ChooseLabel>
                                    </Link>
                                    <Input
                                        multiple
                                        onChange={handleUpload}
                                        id="file-upload"
                                        type="file"
                                    />
                                </div>
                                : <div>
                                    <Link style={{ marginLeft: '5px' }}>
                                        <ChooseLabel onClick={() => handleOpenPicker()}>
                                            {choseFileTitle}
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
                                </div>}
                            <div>
                                {(fileData?.length > 0) && fileData?.map((item) => (
                                    <ChipContainer>
                                        <Chip
                                            label={item[1]?.name}
                                            onDelete={(e) => handleDelete(e, item)}
                                        />
                                    </ChipContainer>
                                ))}
                            </div>

                            <div style={{ marginTop: '10px' }}>
                                {isZipFile && uploadData?.fileNames?.map((files) => (
                                    <ChipContainer key={files}>
                                        <Chip
                                            label={files}
                                        />
                                    </ChipContainer>
                                ))}
                            </div>
                            {fileWarning && <div style={{ color: 'red' }}>{UPLOAD_FILE_MAX_LIMIT}</div>}
                        </DragDropArea>

                        {(isZipFile !== true && fileData) && fileData?.length > 0 &&
                            <FileForm
                                handleSubmitFile={handleSubmit}
                                files={fileData}
                                btnTitle={btnTitle}
                                isLoading={isLoadingUpload}
                            />}

                        <div style={{ textAlign: 'center', marginTop: '10px' }}>
                            {(isZipFile && fileData?.length > 0 && uploadData === undefined) &&
                                <Button type="submit" onClick={handleUploadZipFile} variant="contained" size="large">
                                    {isLoadingUpload ? <BeatLoader color="#fff" /> : 'Upload Zip File'}
                                </Button>
                            }
                        </div>
                        {(isZipFile && uploadData?.fileNames?.length > 0) &&
                            <FileForm
                                handleSubmitFile={handleProcessZipFile}
                                files={uploadData?.fileNames}
                                btnTitle={btnTitle}
                                isLoading={isLoadingExtractedFile}
                            />}
                        {(isGoogleDriveFile && driveFile !== '') && <div style={{ textAlign: 'center', marginTop: '10px' }}>
                            <Button type="submit" onClick={handleGoogleDriveFile} variant="contained" size="large">
                                {isLoadingUpload ? <BeatLoader color="#fff" /> : 'Process File'}
                            </Button>
                        </div>}
                    </Grid>
                </Grid>
            </DragAreaPadding>
        </CardView >
    )
};

const mapStateToProps = (state) => ({
    uploadData: state?.instructorMyFolders?.uploadData,
    isLoadingUpload: state?.instructorMyFolders?.isLoadingUpload,
    isLoadingUploadFile: state?.instructorMyFolders?.isLoadingSubmission,
    extractedFileData: state?.instructorMyFolders?.extractedFileData,
    isLoadingExtractedFile: state?.instructorMyFolders?.isLoadingExtractedFile,
});

const mapDispatchToProps = (dispatch) => {
    return {
        SubmissionListUpload: (apiUrl, data) => dispatch(SubmissionListUpload(apiUrl, data)),
        SubmissionListExtractedFileUpload: (apiUrl, data) => dispatch(SubmissionListExtractedFileUpload(apiUrl, data)),
        UploadZipFileDataClear: () => dispatch(UploadZipFileDataClear()),
        UploadFileDataClear: () => dispatch(UploadFileDataClear())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DragAndDrop);