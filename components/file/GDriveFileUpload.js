import React, { useState, useEffect } from 'react';
import Chip from '@mui/material/Chip';
import { Grid, Link, Button } from '@mui/material';
import useDrivePicker from "react-google-drive-picker";
import BeatLoader from "react-spinners/BeatLoader";
import {
    Title,
    CardView
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

const GDriveFileUpload = ({
    isLoadingUpload,
}) => {
    const [driveFile, setDriveFile] = useState('');
    const [driveFilePayload, setDriveFilePayload] = useState('');
    const [driveAuthToken, setDriveAuthToken] = useState('');
    const [openPicker, tokenData] = useDrivePicker();


    useEffect(() => {
        setDriveAuthToken(tokenData?.access_token)
    }, [tokenData]);

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

    const handleGoogleDriveFile = (e) => {
        e.preventDefault();
        console.log('driverFile', driveFilePayload);
    }

    return (
        <CardView>
            <ContentCenter>
                <Title
                    color='#020B50'
                    title='Upload your files here to check plagiarism'
                />
                <DragAreaPadding>
                    <Grid container spacing={1}>
                        <Grid item md={12} xs={12}>
                            <DragDropArea>
                                <GoogleDriveIcon />
                            </DragDropArea>
                            <Link style={{ marginLeft: '5px' }}>
                                <ChooseLabel onClick={() => handleOpenPicker()}>
                                    Browse your file from google drive
                                </ChooseLabel>
                            </Link>
                            {driveFile !== '' &&
                                <ChipContainer>
                                    <Chip
                                        label={driveFile}
                                    />
                                </ChipContainer>}
                            {driveFile && driveFile?.length > 0 &&
                                <div style={{ textAlign: 'center', marginTop: '10px' }}>
                                    <Button type="submit" onClick={handleGoogleDriveFile} variant="contained" size="large">
                                        {isLoadingUpload ? <BeatLoader color="#fff" /> : 'Process File'}
                                    </Button>
                                </div>
                            }
                        </Grid>
                    </Grid>
                </DragAreaPadding>
            </ContentCenter>
        </CardView>
    )
};

export default GDriveFileUpload;