import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useRouter } from "next/router";
import Chip from '@mui/material/Chip';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Grid, Link, Autocomplete, Checkbox, TextField } from '@mui/material';
import {
    Title,
    Title1,
    SubTitle1,
    CardView
} from './../../components';
import FileForm from './FileForm';
import RepositoryFileForm from './RepositoryFileForm';
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
    LanguageList
} from '../../redux/action/common/UploadFile/UploadFileAction';

import {
    UPLOAD_FILE_MAX_LIMIT
} from '../../constant/data/ErrorMessage';

export const LabelContainer = styled.div`
    font-size: 14px,
    font-weight:400,
    font-style:normal,
    margin-bottom:10px;
    color:#000
`;

const UploadFiles = ({
    fileIcon,
    choseFileTitle,
    isLoadingUpload,
    SubmissionListUpload,
    UploadFileDataClear,
    uploadData,
    singleFileUploadAPI,
    multiFileUploadAPI,
    routerObj,
    isRepository,
    title,
    LanguageList,
    nonEnglishLang,
    isLoadingLang
}) => {
    const router = useRouter();
    const [fileData, setFileData] = useState([]);
    const [fileWarning, setFileWarning] = useState(false);
    const [value, setValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [language, setLanguage] = useState('English');
    const [nonEnglishLanguage, setNonEnglishLanguage] = useState('');

    const [grammarPlagiarismCheck, setGrammarPlagiarismCheck] = useState({
        grammarCheck: false,
        plagiarismCheck: true
    });
    const { grammarCheck, plagiarismCheck } = grammarPlagiarismCheck;

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

    const handleSubmitRepository = (data) => {
        if (fileData.length === 1) {
            singleFileUploadRepository(fileData, data);
        } else {
            multiFileUploadRepository(fileData, data);
        }
    }

    const singleFileUpload = (files, data) => {
        let bodyFormData = new FormData();
        bodyFormData.append('authorName', data.authorName0);
        bodyFormData.append('title', data.title0);
        bodyFormData.append('documentType', data.documentType0);
        bodyFormData.append('plagiarismCheck', plagiarismCheck ? 'YES' : 'NO');
        bodyFormData.append('grammarCheck', grammarCheck ? 'YES' : 'NO');
        bodyFormData.append('language', language);
        bodyFormData.append('file', files[0][1]);
        SubmissionListUpload(singleFileUploadAPI, bodyFormData);
    }

    const singleFileUploadRepository = (files, data) => {
        let bodyFormData = new FormData();
        bodyFormData.append((router.route.includes('pro/admin')) ? 'author_name' : 'name', data.authorName0);
        bodyFormData.append('title', data.title0);
        bodyFormData.append('year', data.year0);
        bodyFormData.append('repository', data.repository0 === 'Institution' ? 'LOCAL' : 'GLOBAL');
        bodyFormData.append('language', data.language0);
        bodyFormData.append('file', files[0][1]);
        SubmissionListUpload(singleFileUploadAPI, bodyFormData);
    }

    const multiFileUpload = (files, data) => {
        let authorNameArr = [], titleArr = [], documentTypeArr = [];
        let bodyFormData = new FormData();
        fileData?.map((item, i) => {
            authorNameArr.push(data['authorName' + i]);
            titleArr.push(data['title' + i]);
            documentTypeArr.push(data['documentType' + i]);
        });

        bodyFormData.append('authorName', authorNameArr);
        bodyFormData.append('title', titleArr);
        bodyFormData.append('documentType', documentTypeArr);
        for (let i = 0; i < files.length; i++) {
            bodyFormData.append("file", files[i][1]);
        }
        SubmissionListUpload(multiFileUploadAPI, bodyFormData);
    }

    const multiFileUploadRepository = (files, data) => {
        let authorNameArr = [], titleArr = [], yearArr = [], repositoryArr = [], languageArr = [];
        let bodyFormData = new FormData();
        fileData?.map((item, i) => {
            authorNameArr.push(data['authorName' + i]);
            titleArr.push(data['title' + i]);
            yearArr.push(data['year' + i]);
            repositoryArr.push(data['repository' + i]);
            languageArr.push(data['language' + i]);
        });

        bodyFormData.append('name', authorNameArr);
        bodyFormData.append('title', titleArr);
        bodyFormData.append('year', yearArr);
        bodyFormData.append('repository', repositoryArr);
        bodyFormData.append('language', languageArr);
        for (let i = 0; i < files.length; i++) {
            bodyFormData.append("files", files[i][1]);
        }
        SubmissionListUpload(multiFileUploadAPI, bodyFormData);
    }

    useEffect(() => {
        if (uploadData) {
            UploadFileDataClear();
            router.push(routerObj);
        }
    }, [uploadData && uploadData !== '']);

    const handleGrammarPlagiarismChange = (event) => {
        setGrammarPlagiarismCheck({
            ...grammarPlagiarismCheck,
            [event.target.name]: event.target.checked,
        });
    }

    useEffect(() => {
        console.log('non-english-RENDER');
        if (language === 'Non English') {
            LanguageList();
        }
    }, [language === 'Non English']);

    return (
        <>
            <CardView>
                <ContentCenter>
                    <Title
                        color='#020B50'
                        title={title}
                    />
                </ContentCenter>
                <DragAreaPadding>
                    <Grid container spacing={1}>
                        <Grid item md={12} xs={12}>
                            <DragDropArea>
                                {fileIcon}
                                <SubTitle1 title='Multiple file formats support: pdf, doc, docx, txt, rtf, dot, dotx, html, odt, pptx ' />
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
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

                                {fileData?.length === 1 &&
                                    <Grid container spacing={3} style={{ marginTop: '5px', display: 'flex', justifyContent: 'center' }}>
                                        <Grid item md={3}>
                                            <Autocomplete
                                                disablePortal
                                                value={language}
                                                id="language"
                                                options={[{
                                                    'label': 'English',
                                                }, {
                                                    'label': 'Non English',
                                                }]}
                                                size="small"
                                                onChange={(event, newValue) => {
                                                    setValue(newValue);
                                                }}
                                                inputValue={language}
                                                onInputChange={(event, newInputValue) => {
                                                    setLanguage(newInputValue);
                                                }}
                                                renderInput={(params) => <TextField {...params} label="Select Language" />}
                                            />
                                        </Grid>
                                        {language === 'Non English' &&
                                            <Grid item md={3}>
                                                <Autocomplete
                                                    disablePortal
                                                    id="language"
                                                    options={nonEnglishLang?.non_english_languages}
                                                    size="small"
                                                    onChange={(event, newValue) => {
                                                        setValue(newValue);
                                                    }}
                                                    inputValue={nonEnglishLanguage}
                                                    onInputChange={(event, newInputValue) => {
                                                        setNonEnglishLanguage(newInputValue);
                                                    }}
                                                    renderInput={(params) => <TextField {...params} label="Select non english language" />}
                                                />
                                            </Grid>
                                        }
                                        <Grid item md={6}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={grammarCheck} onChange={handleGrammarPlagiarismChange} name="grammarCheck" />
                                                }
                                                label="Grammar Check"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={plagiarismCheck} onChange={handleGrammarPlagiarismChange} name="plagiarismCheck" />
                                                }
                                                label="Plagiarism Check"
                                            />

                                        </Grid>
                                    </Grid>
                                }

                            </DragDropArea>

                            {fileData?.length > 0 && isRepository &&
                                <RepositoryFileForm
                                    handleSubmitRepository={handleSubmitRepository}
                                    files={fileData}
                                    btnTitle='Submit'
                                    isLoading={isLoadingUpload}
                                />

                            }
                            {fileData?.length > 0 && !isRepository &&
                                <FileForm
                                    handleSubmitFile={handleSubmit}
                                    files={fileData}
                                    btnTitle='Submit'
                                    isLoading={isLoadingUpload}
                                />

                            }
                        </Grid>
                    </Grid>
                </DragAreaPadding>
            </CardView>
        </>
    )
};


const mapStateToProps = (state) => ({
    uploadData: state?.instructorMyFolders?.uploadData,
    nonEnglishLang: state?.uploadFile?.nonEnglishLang,
    isLoadingLang: state?.uploadFile?.isLoadingLang,
    isLoadingUpload: state?.instructorMyFolders?.isLoadingUpload,
    isLoadingUploadFile: state?.instructorMyFolders?.isLoadingSubmission,
});

const mapDispatchToProps = (dispatch) => {
    return {
        SubmissionListUpload: (apiUrl, data) => dispatch(SubmissionListUpload(apiUrl, data)),
        UploadFileDataClear: () => dispatch(UploadFileDataClear()),
        LanguageList: () => dispatch(LanguageList())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadFiles);