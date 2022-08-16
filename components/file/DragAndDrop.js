import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useRouter } from "next/router";
import Chip from '@mui/material/Chip';
import { Grid, Link } from '@mui/material';
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

import { SubmissionListUpload } from '../../redux/action/instructor/InstructorAction';

const DragAndDrop = ({
    btnTitle,
    fileIcon,
    choseFileTitle,
    isUploadFile,
    isGoogleDriveFile,
    isZipFile,
    SubmissionListUpload
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
        bodyFormData.append('file', files[0][1]);
        SubmissionListUpload(`classes/${router.query.clasId}/assignments/${router.query.assId}/singleFile`, bodyFormData);
    }

    const multiFileUpload = (files, data) => {
        let fileArr = [];
        let bodyFormData = new FormData();
        fileData?.map((item, i) => {
            let obj = {};
            obj['authorName'] = data['authorName' + i];
            obj['title'] = data['title' + i];
            obj['documentType'] = data['documentType' + i];
            obj['file'] = item[1];
            console.log('9999', obj);
            fileArr.push(obj);
        });
        bodyFormData.append('multiFile', fileArr);
        SubmissionListUpload(`classes/${router.query.clasId}/assignments/${router.query.assId}/multipleFiles`, bodyFormData);
    }

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
                                </div>}
                            <div>
                                {fileData?.length > 0 && fileData?.map((item) => (
                                    <ChipContainer>
                                        <Chip
                                            label={item[1]?.name}
                                            onDelete={(e) => handleDelete(e, item)}
                                        />
                                    </ChipContainer>
                                ))}
                            </div>
                            {fileWarning && <div style={{ color: 'red' }}>{UPLOAD_FILE_MAX_LIMIT}</div>}
                        </DragDropArea>
                        {fileData && fileData?.length > 0 &&
                            <FileForm
                                handleSubmitFile={handleSubmit}
                                files={fileData}
                                btnTitle={btnTitle}
                            />}
                    </Grid>
                </Grid>
            </DragAreaPadding>
        </CardView>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        SubmissionListUpload: (apiUrl, data) => dispatch(SubmissionListUpload(apiUrl, data)),
    };
};

export default connect(null, mapDispatchToProps)(DragAndDrop);