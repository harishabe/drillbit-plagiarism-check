import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from "next/router";
import Chip from '@mui/material/Chip';
import { Grid, Link, Button } from '@mui/material';
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
import RepositoryFileFormZip from './RepositoryFileFormZip';
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
    isRepository,
    title
}) => {
    const router = useRouter();
    const [fileData, setFileData] = useState([]);
    const [data, setData] = useState([]);
    const [fileWarning, setFileWarning] = useState(false);

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
    }
    console.log("data", data)
    const handleProcessZipFile = (data) => {
        let authorNameArr = [], titleArr = [], documentTypeArr = [];
        uploadData?.fileNames?.map((item, i) => {
            authorNameArr.push(data['authorName' + i]);
            titleArr.push(data['title' + i]);
            documentTypeArr.push(data['documentType' + i]);
        });
        uploadData['name'] = authorNameArr;
        uploadData['title'] = titleArr;
        uploadData['doc_type'] = documentTypeArr;
        SubmissionListExtractedFileUpload(confirmZipFileAPI, uploadData);
    }

    const handleProcessZipFileRepo = (data) => {

        let repositoryArr = [], languageArr = [], documentTypeArr = [];
        uploadData?.fileNames?.map((item, i) => {
            authorNameArr.push(data['repository' + i]);
            titleArr.push(data['language' + i]);
            documentTypeArr.push(data['documentType' + i]);
        });
        uploadData['repository'] = repositoryArr;
        uploadData['language'] = languageArr;
        uploadData['file'] = documentTypeArr;
        // uploadData['repository'] = data['repository'];
        // uploadData['language'] = data['language'];
        // uploadData['file'] = data['documentType'];
        setData(uploadData)
        SubmissionListExtractedFileUpload(zipFileUploadAPI, uploadData);
    }

    console.log("uploadData", uploadData)
    console.log("fileData", fileData)

    useEffect(() => {
        if (extractedFileData) {
            UploadZipFileDataClear();
            router.push(routerObj);
        }
    }, [extractedFileData && extractedFileData !== '']);

    return (
        <CardView>
            <ContentCenter>
                <Title
                    color='#020B50'
                    title={ title }
                />
            </ContentCenter>
            <DragAreaPadding>
                <Grid container spacing={1}>
                    <Grid item md={12} xs={12}>
                        <DragDropArea>
                            <UploadFileIcon />
                            <Title1 title='Drag and drop, or ' />
                            <Link style={{ marginLeft: '5px' }}>
                                <ChooseLabel for="file-upload">
                                    browse your zip here
                                </ChooseLabel>
                            </Link>
                            <Input
                                multiple
                                onChange={handleUpload}
                                id="file-upload"
                                type="file"
                            />
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
                                {uploadData?.fileNames?.map((files) => (
                                    <ChipContainer key={files}>
                                        <Chip
                                            label={files}
                                        />
                                    </ChipContainer>
                                ))}
                            </div>
                            {fileWarning && <div style={{ color: 'red' }}>{UPLOAD_FILE_MAX_LIMIT}</div>}
                        </DragDropArea>

                        { (fileData?.length > 0 && isRepository) &&
                            <RepositoryFileFormZip
                                handleSubmitRepositoryZip={ handleProcessZipFileRepo }
                                files={ fileData[0][1] }
                            // btnTitle='Process the file'
                            // isLoading={ isLoadingExtractedFile }
                            /> }
                        { (uploadData?.fileNames?.length > 0) &&
                            <FileForm
                                handleSubmitFile={ handleProcessZipFile }
                                files={ uploadData?.fileNames }
                                // btnTitle='Process the file'
                                isLoading={ isLoadingExtractedFile }
                            /> }

                        <div style={{ textAlign: 'center', marginTop: '10px' }}>
                            { (fileData?.length > 0 && uploadData === undefined)
                                &&
                                <Button type="submit" onClick={handleUploadZipFile} variant="contained" size="large">
                                    {isLoadingUpload ? <BeatLoader color="#fff" /> : 'Upload Zip File'}
                                </Button>
                            }
                        </div>
                        {/* { (uploadData?.fileNames?.length > 0 && isRepository) ?
                            <RepositoryFileFormZip
                                handleSubmitRepositoryZip={ handleProcessZipFileRepo }
                                files={ uploadData?.fileNames }
                                // btnTitle='Process the file'
                                isLoading={ isLoadingExtractedFile }
                            />
                            :
                            <FileForm
                                handleSubmitFile={ handleProcessZipFile }
                                files={ uploadData?.fileNames }
                                // btnTitle='Process the file'
                                isLoading={ isLoadingExtractedFile }
                            />
                        } */}
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ZipFileUpload);