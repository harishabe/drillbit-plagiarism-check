import React, { useState, useEffect, createRef } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Chip from '@mui/material/Chip';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import { Grid, Link, Button, Tooltip, IconButton } from '@mui/material';
import BeatLoader from 'react-spinners/BeatLoader';
import {
    UploadFileIcon
} from '../../assets/icon';
import {
    Title,
    CardView,    
    Heading
} from '../../components';
import ZipFileForm from './ZipFileForm';
import RepositoryFileFormZip from './RepositoryFileFormZip';
import {
    UPLOAD_FILE_REPO_MAX_LIMIT,
    UPLOAD_ZIP_FILES_ZERO
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
    UploadZipDataClear
} from '../../redux/action/instructor/InstructorAction';

const ZipFileUpload = ({
    SubmissionListUpload,
    SubmissionListExtractedFileUpload,
    uploadData,
    zipFileUploadAPI,
    confirmZipFileAPI,
    routerObj,
    isLoadingUpload,
    extractedFileData,
    isLoadingExtractedFile,
    UploadZipFileDataClear,
    UploadZipDataClear,
    isRepository,
    title,
    allowedFormat,
    notAllowedFormat,
    isNonEnglish
}) => {
    const router = useRouter();
    const [fileData, setFileData] = useState([]);
    const [fileWarning, setFileWarning] = useState(false);
    const ref = createRef();

    const handleDelete = (e, item) => {
        e.preventDefault();
        ref.current.value = '';
        let a = fileData.filter((filterItem) => {
            if (filterItem[1].name !== item[1].name) {
                return filterItem;
            }
        });
        setFileData(a);
        UploadZipFileDataClear();
    };

    const handleUpload = (e) => {
        e.preventDefault();
        if (Object.entries(e.target.files).length > 10) {
            setFileWarning(true);
        } else {
            setFileData(Object.entries(e.target.files));
            UploadZipFileDataClear();
            setFileWarning(false);
        }
    };

    const handleUploadZipFile = (e) => {
        e.preventDefault();
        if (isRepository) {
            let bodyFormData = new FormData();
            bodyFormData.append('repository', fileData[0][1]);
            bodyFormData.append('language', fileData[0][1]);
            bodyFormData.append('file', fileData[0][1]);
            SubmissionListUpload(zipFileUploadAPI, bodyFormData);
        } else {
            let bodyFormData = new FormData();
            bodyFormData.append('file', fileData[0][1]);
            SubmissionListUpload(zipFileUploadAPI, bodyFormData);
        }
    };

    const handleProcessZipFile = (data) => {
        let authorNameArr = [], titleArr = [], documentTypeArr = [], guideEmailArr = [], guideNameArr = [];
        uploadData?.fileNames?.map((item, i) => {
            authorNameArr.push(data['authorName' + i]);
            titleArr.push(data['title' + i]);
            documentTypeArr.push(data['documentType' + i]);
            guideEmailArr.push(data['guide_email' + i]);
            guideNameArr.push(data['guide_name' + i]);

        });
        uploadData['name'] = authorNameArr;
        uploadData['title'] = titleArr;
        uploadData['doc_type'] = documentTypeArr;
        uploadData['guide_email'] = guideEmailArr;
        uploadData['guide_name'] = guideNameArr;
        SubmissionListExtractedFileUpload(confirmZipFileAPI, uploadData);
    };

    const handleProcessZipFileNonEnglish = (data) => {
        let authorNameArr = [], titleArr = [], documentTypeArr = [], languageArr = [],  guideEmailArr = [], guideNameArr = [];
        uploadData?.fileNames?.map((item, i) => {
            authorNameArr.push(data['authorName' + i]);
            titleArr.push(data['title' + i]);
            documentTypeArr.push(data['documentType' + i]);
            languageArr.push(data['language' + i]);
            guideEmailArr.push(data['guide_email' + i]);
            guideNameArr.push(data['guide_name' + i]);
        });
        uploadData['name'] = authorNameArr;
        uploadData['title'] = titleArr;
        uploadData['doc_type'] = documentTypeArr;
        uploadData['languages'] = languageArr;
        uploadData['guide_email'] = guideEmailArr;
        uploadData['guide_name'] = guideNameArr;
        SubmissionListExtractedFileUpload(confirmZipFileAPI, uploadData);
    };

    const handleProcessZipFileRepo = (data) => {
        let bodyFormData = new FormData();
        bodyFormData.append('repository', data?.repository?.toUpperCase() === 'INSTITUTION' ? 'LOCAL' : 'GLOBAL');
        bodyFormData.append('language', data?.language);
        bodyFormData.append('file', fileData[0][1]);
        SubmissionListExtractedFileUpload(zipFileUploadAPI, bodyFormData);
    };

    useEffect(() => {
        if (extractedFileData?.status === 200) {
            setTimeout(() => {
                router.push(routerObj);
                UploadZipDataClear();
                UploadZipFileDataClear();
            }, 1000);
        }
    }, [extractedFileData && extractedFileData?.status]);

    useEffect(() => {
        if (fileData?.length === 0) {
            UploadZipFileDataClear();
        }
    }, [fileData?.length]);

    const handleBack = (e) => {
        e.preventDefault();
        UploadZipDataClear();
        UploadZipFileDataClear();
        router.push(routerObj);
    }

    return (
        <CardView>
            <DragAreaPadding>
                <div style={{ display: 'flex' }}>
                    <Tooltip title="Back" arrow style={{ marginTop: '-10px' }}>
                        <IconButton size="large" onClick={handleBack}>
                            <ArrowBackOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    {isRepository ?
                        <Heading title='Upload files to repository' /> : 
                        <Heading title='Upload files for plagiarism check' />}
                </div>
                <Grid container spacing={1}>
                    <Grid item md={12} xs={12}>
                        <DragDropArea>
                            <UploadFileIcon />
                            <Title title={ allowedFormat.FILE_FORMATS } />
                            <Title title={notAllowedFormat} />
                            <Title title={ allowedFormat.MAX_FILES } />
                            <Title title={ allowedFormat.LENGTH } />
                            <Title title={ allowedFormat.SIZE } />
                            <Link style={{ marginLeft: '5px', display: 'block' }}>
                                <ChooseLabel for="file-upload">
                                    Browse your zip here
                                </ChooseLabel>
                            </Link>
                            <Input
                                onChange={handleUpload}
                                id="file-upload"
                                type="file"
                                ref={ ref }
                                accept={ allowedFormat.ALLOW_FILE_FORMATS }
                            />
                            <div>
                                {(fileData?.length > 0) && fileData?.map((item, index) => (
                                    <ChipContainer key={ index }>
                                        <Tooltip title={ item[1]?.name } arrow>
                                            <Chip
                                                label={ item[1]?.name.slice(0, 15) + '...' }
                                                onDelete={ (e) => handleDelete(e, item) }
                                            />
                                        </Tooltip>
                                    </ChipContainer>
                                ))}
                            </div>
                            <div style={{ marginTop: '10px' }}>
                                {uploadData?.fileNames?.map((files, index) => (
                                    <ChipContainer key={index}>
                                        <Chip
                                            label={files}
                                        />
                                    </ChipContainer>
                                ))}
                            </div>
                            { fileWarning && <div style={ { color: 'red' } }>{ UPLOAD_FILE_REPO_MAX_LIMIT }</div> }
                            { uploadData?.fileNames?.length === 0 && <div style={ { color: 'red' } }>{ UPLOAD_ZIP_FILES_ZERO }</div> }
                        </DragDropArea>

                        {(fileData?.length > 0 && isRepository) &&
                            <RepositoryFileFormZip
                                handleSubmitRepositoryZip={handleProcessZipFileRepo}
                                files={fileData[0][1]}
                                btnTitle='Submit'
                                isLoading={isLoadingExtractedFile}
                            />}
                        { (uploadData?.fileNames?.length > 0 && !isRepository && !isNonEnglish) &&
                            <ZipFileForm
                                handleSubmitFile={handleProcessZipFile}
                                files={uploadData?.fileNames?.map((item) => ({ 'name': item }))}
                                btnTitle='Submit'
                                isLoading={isLoadingExtractedFile}
                            />}
                        { (uploadData?.fileNames?.length > 0 && !isRepository && isNonEnglish) &&
                            <ZipFileForm
                                handleSubmitFile={ handleProcessZipFileNonEnglish }
                                files={ uploadData?.fileNames?.map((item) => ({ 'name': item })) }
                                btnTitle='Submit'
                                isLoading={ isLoadingExtractedFile }
                                isNonEnglish={ isNonEnglish }
                            /> }

                        <div style={{ textAlign: 'center', marginTop: '10px' }}>
                            {(fileData?.length > 0 && (uploadData === '' || uploadData === undefined) && !isRepository)
                                &&
                                <Button color="primary" type="submit" disabled={isLoadingUpload} onClick={handleUploadZipFile} variant="contained" size="large">
                                    {isLoadingUpload ? <BeatLoader color="#fff" /> : 'Upload Zip File'}
                                </Button>
                            }
                        </div>
                    </Grid>
                </Grid>
            </DragAreaPadding>
        </CardView >
    );
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
        UploadZipDataClear: () => dispatch(UploadZipDataClear()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ZipFileUpload);