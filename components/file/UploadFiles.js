import React, { useState,useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from "next/router";
import Chip from '@mui/material/Chip';
import { Grid, Link } from '@mui/material';
import {
    Title,
    Title1,
    CardView
} from '..';
import FileForm from './FileForm';

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
    UploadFileDataClear
} from '../../redux/action/instructor/InstructorAction';

import {
    UPLOAD_FILE_MAX_LIMIT
} from '../../constant/data/ErrorMessage';

const UploadFiles = ({
    fileIcon,
    choseFileTitle,
    isLoadingUpload,
    SubmissionListUpload,
    UploadFileDataClear,
    uploadData,
    singleFileUploadAPI,
    multiFileUploadAPI,
    routerObj
}) => {
    const router = useRouter();
    const [fileData, setFileData] = useState([]);
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
        console.log('dadfdfas', e.target.files);
        e.preventDefault();
        if (Object.entries(e.target.files).length > 10) {
            setFileWarning(true);
        } else {
            setFileData(Object.entries(e.target.files));
            setFileWarning(false);
        }
    };

    const handleSubmit = (data) => {
        console.log('datadatadata', data);
        console.log('fileDatafileDatafileData', fileData);
        if (fileData.length === 1) {
            singleFileUpload(fileData, data);
        } else {
            multiFileUpload(fileData, data);
        }
    }

    const singleFileUpload = (files, data) => {
        console.log('files', files);
        let bodyFormData = new FormData();
        bodyFormData.append('authorName', data.authorName0);
        bodyFormData.append('title', data.title0);
        bodyFormData.append('documentType', data.documentType0);
        bodyFormData.append('plagiarismCheck', 'YES');
        bodyFormData.append('grammarCheck', 'YES');
        bodyFormData.append('language', 'English');
        bodyFormData.append('file', files[0][1]);
        SubmissionListUpload(singleFileUploadAPI, bodyFormData);
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
        SubmissionListUpload(multiFileUploadAPI, bodyFormData);
    }

    
    useEffect(() => {
        if (uploadData) {
            UploadFileDataClear();
            router.push(routerObj);
        }
    }, [uploadData && uploadData !== '']);

    return (
        <>
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
                                <div style={{ display: 'flex',justifyContent:'center' }}>
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
                                {(fileData?.length > 0) && fileData?.map((item) => (
                                    <div>
                                        <ChipContainer>
                                            <Chip
                                                label={item[1]?.name}
                                                onDelete={(e) => handleDelete(e, item)}
                                            />
                                        </ChipContainer>
                                    </div>
                                ))}
                                {fileWarning && <div style={{ color: 'red' }}>{UPLOAD_FILE_MAX_LIMIT}</div>}
                            </DragDropArea>

                            {fileData?.length > 0 &&
                                <FileForm
                                    handleSubmitFile={handleSubmit}
                                    files={fileData}
                                    btnTitle='Process File'
                                    isLoading={isLoadingUpload}
                                />}
                        </Grid>
                    </Grid>
                </DragAreaPadding>
            </CardView>
        </>
    )
};


const mapStateToProps = (state) => ({
    uploadData: state?.instructorMyFolders?.uploadData,
    isLoadingUpload: state?.instructorMyFolders?.isLoadingUpload,
    isLoadingUploadFile: state?.instructorMyFolders?.isLoadingSubmission,
});

const mapDispatchToProps = (dispatch) => {
    return {
        SubmissionListUpload: (apiUrl, data) => dispatch(SubmissionListUpload(apiUrl, data)),
        UploadFileDataClear: () => dispatch(UploadFileDataClear())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadFiles);