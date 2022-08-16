import React, { useState } from 'react';
import Chip from '@mui/material/Chip';
import { Grid, Link } from '@mui/material';
import {
    GoogleDriveIcon
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

const GoogleDriveFileUpload = () => {

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
        let bodyFormData = new FormData();
        let fileArr = [];
        fileData?.map((item) => {
            fileArr.push(item[1]);
        });
        bodyFormData.append('file', fileArr);
        Object.entries(data).map((item) => {
            bodyFormData.append(item[0], item[1]);
        });
    }

    return (
        <>
            <CardView>
                <ContentCenter>
                    <Title
                        color='#020B50'
                        title='Google Drive'
                    />
                </ContentCenter>
                <DragAreaPadding>
                    <Grid container spacing={1}>
                        <Grid item md={12} xs={12}>
                            <DragDropArea>
                                <GoogleDriveIcon />                                
                                <Input
                                    multiple
                                    onChange={handleUpload}
                                    id="file-upload"
                                    type="file"
                                />
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
                            {/* {fileData && fileData?.length > 0 &&
                                <FileForm
                                    handleSubmitFile={handleSubmit}
                                    files={fileData}
                                    btnTitle='Process File'
                                />} */}
                        </Grid>
                    </Grid>
                </DragAreaPadding>
            </CardView>
        </>
    )
};

export default GoogleDriveFileUpload;