import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useRouter } from "next/router";
import Chip from '@mui/material/Chip';
import { Grid, Link, Button } from '@mui/material';
import useDrivePicker from "react-google-drive-picker";
import BeatLoader from "react-spinners/BeatLoader";
import FileForm from './FileForm';
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
import { UploadFileDrive } from '../../redux/action/common/UploadFile/UploadFileAction';

const GDriveFileUpload = ({
    isLoadingUpload,
    title,
    UploadFileDrive
}) => {
    const router = useRouter();
    const [driveFile, setDriveFile] = useState('');
    const [driveFilePayload, setDriveFilePayload] = useState('');
    const [documnet, setDocument] = useState('');
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
                    setDocument(data?.docs);
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

    const handleSubmit = (e) => {
        console.log('doc',documnet);
        let bodyFormData = new FormData();
        bodyFormData.append('authorName', 'AAAAA');
        bodyFormData.append('title', 'AAAA');
        bodyFormData.append('documentType', 'Thesis');
        bodyFormData.append('plagiarismCheck', 'YES');
        bodyFormData.append('grammarCheck', 'YES');
        bodyFormData.append('language', 'English');
        bodyFormData.append('file', document);
        UploadFileDrive(router.query.clasId, router.query.assId, bodyFormData);
    }

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
                            {driveFile && driveFile?.length > 0 &&
                                <FileForm
                                    handleSubmitFile={handleSubmit}
                                    files={documnet}
                                    btnTitle='Submit'
                                    isLoading={isLoadingUpload}
                                />
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
        UploadFileDrive: (clasId, assId, data) => dispatch(UploadFileDrive(clasId, assId, data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GDriveFileUpload);