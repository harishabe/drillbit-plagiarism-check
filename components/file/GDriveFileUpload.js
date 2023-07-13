import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Chip from '@mui/material/Chip';
import styled from "styled-components";
import { Grid, Link, Tooltip, IconButton } from '@mui/material';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import useDrivePicker from 'react-google-drive-picker';
import FileForm from './FileForm';
import RepositoryFileForm from './RepositoryFileForm';
import {
    Title,
    CardView,
    SubTitle1,
    MainHeading
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
import { isValidFileUploaded, isValidRepositoryFileUploaded, isValidRepositoryFileUpload } from '../../utils/RegExp';
import { UPLOAD_SUPPORTED_FILES, UPLOAD_TITLE_CONSTANT } from "../../constant/data/Constant";

const InvalidFileFormatError = styled.div`
  color: red;
`;

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
    const [invalidFileFormat, setInvalidFileFormat] = useState(false);
    const [openPicker, tokenData] = useDrivePicker();

    let fileExtension = '';

    const RepositoryMimeTypes = 'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document';

    const SubmissionMimeTypes = 'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.template,application/msword-template,application/vnd.ms-powerpoint,application/vnd.openxmlformats-officedocument.presentationml.presentation,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/wordperfect,application/rtf,text/html,application/vnd.oasis.opendocument.text,application/postscript,application/x-tex,application/xml,image/tiff,text/x-latex,text/x-tex,text/xml';

    const driveFileUploaded = (mimeType) => {
        switch (mimeType) {
            case 'application/pdf':
                fileExtension = '.pdf';
                break;
            case 'application/msword':
                fileExtension = '.doc';
                break;
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
                fileExtension = '.docx';
                break;
            case 'text/plain':
                fileExtension = '.txt';
                break;
            case 'application/vnd.openxmlformats-officedocument.wordprocessingml.template':
                fileExtension = '.dotx';
                break;
            case 'application/msword-template':
                fileExtension = '.dot';
                break;
            case 'application/vnd.ms-powerpoint':
                fileExtension = '.ppt';
                break;
            case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
                fileExtension = '.pptx';
                break;
            case 'application/vnd.ms-excel':
                fileExtension = '.xls';
                break;
            case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
                fileExtension = '.xlsx';
                break;
            case 'application/wordperfect':
                fileExtension = '.wpd';
                break;
            case 'application/rtf':
                fileExtension = '.rtf';
                break;
            case 'text/html':
                fileExtension = '.html';
                break;
            case 'application/vnd.oasis.opendocument.text':
                fileExtension = '.odt';
                break;
            case 'application/postscript':
                fileExtension = '.ps';
                break;
            case 'application/x-tex':
                fileExtension = '.tex';
                break;
            case 'text/x-latex':
                fileExtension = '.tex';
                break;
            case 'text/x-tex':
                fileExtension = '.tex';
                break;
            case 'application/xml':
                fileExtension = '.xml';
                break;
            case 'text/xml':
                fileExtension = '.xml';
                break;
            case 'image/tiff':
                fileExtension = '.tiff';
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        setDriveAuthToken(tokenData?.access_token);
    }, [tokenData]);

    const handleOpenPicker = () => {
        openPicker({
            //clientId: '32303602935-bbvsv5k7sksm71pipiru8jur6puhtm66.apps.googleusercontent.com',

            clientId: '32303602935-7bv10gd67fipvuvg4r3ffdu5a3hh79gs.apps.googleusercontent.com',
            developerKey: 'AIzaSyBaI_bwyb-qSkgUlZkIMkbkul_gICLRBwc',
            viewId: 'DOCS',
            viewMimeTypes: isRepository ? RepositoryMimeTypes : SubmissionMimeTypes,
            showUploadView: true,
            showUploadFolders: true,
            supportDrives: true,
            multiselect: false,
            customScopes: ['https://www.googleapis.com/auth/drive.file'],
            callbackFunction: (data) => {
                if (data && data?.docs?.length > 0) {
                    const file = data.docs[0];
                    let validFile;
                    let validRepoFile;

                    if (!isRepository) {
                        if (file?.name?.includes('.')) {
                            validFile = isValidFileUploaded(file);

                            if (validFile === false) {
                                driveFileUploaded(file?.mimeType)
                            }
                        } else {
                            validFile = false;
                            driveFileUploaded(file?.mimeType)
                        }
                    } else {
                        if (file?.name?.includes('.')) {
                            validFile = isValidRepositoryFileUploaded(file)
                            if (validFile === false) {

                                if (file?.name.includes('.rtf') || file?.name.includes('.dot')) {
                                    setInvalidFileFormat(true)
                                } else {
                                    driveFileUploaded(file?.mimeType)
                                    validRepoFile = fileExtension !== '' && isValidRepositoryFileUpload(fileExtension)

                                    if (validRepoFile === false) {
                                        setInvalidFileFormat(true)
                                    } else {
                                        setInvalidFileFormat(false)
                                    }
                                }
                            } else {
                                setInvalidFileFormat(false)
                            }
                        } else {
                            validFile = false;
                            setInvalidFileFormat(false)
                            driveFileUploaded(file?.mimeType)
                        }
                    }
                    setDocument(data?.docs);
                    setDriveFile(data && data?.docs[0].name);
                    setDriveFilePayload({
                        'fileId': data.docs[0].id,
                        'fileName': validFile ? file?.name : file?.name + fileExtension,
                        'url': data.docs[0].url,
                        'mimetype': data.docs[0].mimeType,
                        'token': driveAuthToken,
                        'fileSize': data.docs[0].sizeBytes
                    });
                }
            }
        });
    };

    const handleSubmit = (data) => {
        if (!isRepository) {
            let bodyFormData = new FormData();
            documnet?.map((item, i) => {
                bodyFormData.append("authorName", data["authorName" + item[0]]);
                bodyFormData.append("title", data["title" + item[0]]);
                bodyFormData.append('documentType', data.documentType0);
                bodyFormData.append('plagiarismCheck', 'YES');
                bodyFormData.append('grammarCheck', 'NO');
                bodyFormData.append('language', 'English');
                bodyFormData.append('fileId', driveFilePayload?.fileId);
                bodyFormData.append('fileName', driveFilePayload?.fileName);
                bodyFormData.append('token', driveAuthToken);
                bodyFormData.append('fileSize', driveFilePayload?.fileSize);
            });
            UploadFileDrive(fileUploadAPI, bodyFormData);
        } else {
            let bodyFormData = new FormData();
            documnet?.map((item, i) => {
                bodyFormData.append("name", data["authorName" + item[0]]);
                bodyFormData.append("title", data["title" + item[0]]);
                bodyFormData.append("year", data["year" + item[0]]);
                bodyFormData.append('repository', (data.repository0 === 'Global') ? 'GLOBAL' : 'LOCAL');
                bodyFormData.append('language', data.language0);
                bodyFormData.append('fileId', driveFilePayload?.fileId);
                bodyFormData.append('fileName', driveFilePayload?.fileName);
                bodyFormData.append('token', driveAuthToken);
                bodyFormData.append('fileSize', driveFilePayload?.fileSize);
            })
            UploadFileDrive(fileUploadAPI, bodyFormData);
        }
    };

    useEffect(() => {
        if (uploadFileSuccess) {
            router.push(routerObj);
            UploadGdriveFileDataClear();
        }
    }, [uploadFileSuccess?.status === 200]);


    const handleBack = (e) => {
        e.preventDefault();
        router.push(routerObj);
    };

    return (
        <CardView>
            <ContentCenter>
                {/* <Title
                    color='#020B50'
                    title={title}
                /> */}

                <DragAreaPadding>
                    <div style={ { display: 'flex' } }>
                        <Tooltip title="Back" arrow style={ { marginTop: '-12px' } }>
                            <IconButton size="large" onClick={ handleBack }>
                                <ArrowBackOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                        { isRepository ?
                            <MainHeading title='Upload files to repository' /> :
                            <MainHeading title='Upload files for plagiarism check' /> }
                    </div>
                    <Grid container spacing={ 1 }>
                        <Grid item md={ 12 } xs={ 12 }>
                            <DragDropArea>
                                <div>
                                    <GoogleDriveIcon />
                                </div>
                                <SubTitle1 title={ allowedFormat.FILE_FORMATS } />
                                <SubTitle1 title={ allowedFormat.LENGTH } />
                                <SubTitle1 title={ allowedFormat.SIZE } />
                                <Link style={ { marginLeft: '5px' } }>
                                    <ChooseLabel onClick={ () => handleOpenPicker() }>
                                        { UPLOAD_TITLE_CONSTANT.GDRIVE }
                                    </ChooseLabel>
                                </Link>
                                <div>
                                    { !invalidFileFormat && driveFile !== '' &&
                                        <ChipContainer>
                                            <Chip
                                                label={ driveFile }
                                            />
                                        </ChipContainer> }
                                </div>
                                <InvalidFileFormatError>
                                    { invalidFileFormat && UPLOAD_SUPPORTED_FILES.INVALID_FILE_FORMAT_ERROR }
                                </InvalidFileFormatError>
                            </DragDropArea>

                            {
                                !invalidFileFormat &&
                                <>
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
                                                    isGDrive={ true }
                                                />
                                        }
                                    </>
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