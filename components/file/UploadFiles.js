import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Chip from '@mui/material/Chip';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Grid, Link, Autocomplete, Checkbox, TextField, Skeleton } from '@mui/material';
import {
    Title,
    SubTitle,
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
    UploadZipFileDataClear
} from '../../redux/action/instructor/InstructorAction';

import { UploadNonEnglishDataClear } from '../../redux/action/common/UploadFile/UploadFileAction';

import {
    LanguageList,
    UploadNonEnglish
} from '../../redux/action/common/UploadFile/UploadFileAction';

import {
    UPLOAD_FILE_MAX_LIMIT,
    UPLOAD_NON_ENGLISH_FILE_MULTIFILE
} from '../../constant/data/ErrorMessage';
import { getItemLocalStorage } from '../../utils/RegExp';

const SkeletonStyle = styled.div`
    margin-top: 20px;
    margin-left: 5px;
`;

const ErrorMessageContainer = styled.div`
    margin-top:10px;
    color:red;
`

const UploadFiles = ({
    fileIcon,
    choseFileTitle,
    allowedFormat,
    isLoadingUpload,
    SubmissionListUpload,
    UploadNonEnglishDataClear,
    UploadZipFileDataClear,
    uploadData,
    singleFileUploadAPI,
    multiFileUploadAPI,
    routerObj,
    isRepository,
    title,
    LanguageList,
    nonEnglishLang,
    isLoadingLang,
    UploadNonEnglish,
    isLoadingNonEng,
    isRegionalFile,
    uploadFileNonEng,
    langType,
    isStudent
}) => {
    const router = useRouter();
    const [fileData, setFileData] = useState([]);
    const [fileWarning, setFileWarning] = useState(false);
    const [value, setValue] = useState('');
    const [inputValue, setInputValue] = useState('');
    const [language, setLanguage] = useState('English');
    const [nonEnglishLanguage, setNonEnglishLanguage] = useState('');
    const [nonEnglishLangValue, setNonEnglishLangValue] = useState('');
    const [regionalLang, setRegionalLang] = useState('');

    useEffect(() => {
        if (router.isReady) {
            setGrammarPlagiarismCheck({
                ...grammarPlagiarismCheck,
                'grammarCheck': router.query.grammar === 'YES' ? true : false,
            });

        }
    }, [router.isReady]);

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
    };

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
        if (fileData.length === 1 && langType === 'English' && !isRegionalFile && !isStudent) {
            singleFileUpload(fileData, data);
        } else if (fileData.length === 1 && langType === 'English' && !isRegionalFile && isStudent) {
            singleFileUploadStudent(fileData, data);
        } else if (fileData.length === 1 && langType === 'Non English' && !isRegionalFile && !isStudent) {
            singleFileUploadNonEnglish(fileData, data);
        } else if (fileData.length === 1 && langType === 'Non English' && !isRegionalFile && isStudent) {
            singleFileUploadNonEnglishStudent(fileData, data);
        } else if (fileData.length === 1 && isRegionalFile) {
            regionalFileUpload(fileData, data);
        } else if (fileData.length > 1 && langType === 'English' && !isRegionalFile) {
            multiFileUpload(fileData, data);
        }
    };

    const handleSubmitRepository = (data) => {
        if (fileData.length === 1) {
            singleFileUploadRepository(fileData, data);
        } else {
            multiFileUploadRepository(fileData, data);
        }
    };

    const singleFileUpload = (files, data) => {
        let bodyFormData = new FormData();
        bodyFormData.append('authorName', data.authorName0);
        bodyFormData.append('title', data.title0);
        bodyFormData.append('documentType', data.documentType0);
        bodyFormData.append('plagiarismCheck', plagiarismCheck ? 'YES' : 'NO');
        bodyFormData.append('grammarCheck', grammarCheck ? 'YES' : 'NO');
        bodyFormData.append('language', langType);
        bodyFormData.append('file', files[0][1]);
        SubmissionListUpload(singleFileUploadAPI, bodyFormData);
    };

    const singleFileUploadStudent = (files, data) => {
        let bodyFormData = new FormData();
        bodyFormData.append('authorName', getItemLocalStorage('name'));
        bodyFormData.append('title', router.query.assName);
        bodyFormData.append('language', langType);
        bodyFormData.append('file', files[0][1]);
        SubmissionListUpload(singleFileUploadAPI, bodyFormData);
    };

    const singleFileUploadNonEnglish = (files, data) => {
        let bodyFormData = new FormData();
        bodyFormData.append('authorName', data.authorName0);
        bodyFormData.append('title', data.title0);
        bodyFormData.append('documentType', data.documentType0);
        bodyFormData.append('plagiarismCheck', plagiarismCheck ? 'YES' : 'NO');
        bodyFormData.append('grammarCheck', grammarCheck ? 'YES' : 'NO');
        bodyFormData.append('language', data.nonEnglishLang);
        bodyFormData.append('file', files[0][1]);
        UploadNonEnglish(singleFileUploadAPI, bodyFormData);
    };

    const singleFileUploadNonEnglishStudent = (files, data) => {
        let bodyFormData = new FormData();
        bodyFormData.append('authorName', getItemLocalStorage('name'));
        bodyFormData.append('title', router.query.assName);
        bodyFormData.append('language', data.nonEnglishLang);
        bodyFormData.append('file', files[0][1]);
        UploadNonEnglish(singleFileUploadAPI, bodyFormData);
    };

    const singleFileUploadRepository = (files, data) => {
        let bodyFormData = new FormData();
        bodyFormData.append((router.route.includes('pro/admin')) ? 'author_name' : 'name', data.authorName0);
        bodyFormData.append('title', data.title0);
        bodyFormData.append('year', data.year0);
        bodyFormData.append('repository', data.repository0 === 'Institution' ? 'LOCAL' : 'GLOBAL');
        bodyFormData.append('language', data.language0);
        bodyFormData.append('file', files[0][1]);
        SubmissionListUpload(singleFileUploadAPI, bodyFormData);
    };

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
            bodyFormData.append('file', files[i][1]);
        }
        SubmissionListUpload(multiFileUploadAPI, bodyFormData);
    };

    const multiFileUploadRepository = (files, data) => {
        let authorNameArr = [], titleArr = [], yearArr = [], repositoryArr = [], languageArr = [];
        let bodyFormData = new FormData();
        fileData?.map((item, i) => {
            authorNameArr.push(data['authorName' + i]);
            titleArr.push(data['title' + i]);
            yearArr.push(data['year' + i]);
            if (data['repository' + i] === 'Institution') {
                let local = 'LOCAL';
                repositoryArr.push(local);
            } else {
                repositoryArr.push(data['repository' + i].toUpperCase());
            }
            languageArr.push(data['language' + i]);
        });

        bodyFormData.append('name', authorNameArr);
        bodyFormData.append('title', titleArr);
        bodyFormData.append('year', yearArr);
        bodyFormData.append('repository', repositoryArr);
        bodyFormData.append('language', languageArr);
        for (let i = 0; i < files.length; i++) {
            bodyFormData.append('files', files[i][1]);
        }
        SubmissionListUpload(multiFileUploadAPI, bodyFormData);
    };

    const regionalFileUpload = (files, data) => {
        let bodyFormData = new FormData();
        bodyFormData.append('authorName', data.authorName0);
        bodyFormData.append('title', data.title0);
        bodyFormData.append('documentType', data.documentType0);
        bodyFormData.append('language', data.regionalLanguage);
        bodyFormData.append('file', files[0][1]);
        SubmissionListUpload(singleFileUploadAPI, bodyFormData);
    };

    useEffect(() => {
        if (uploadData) {
            UploadZipFileDataClear();
            router.push(routerObj);
        }
    }, [uploadData && uploadData !== '']);

    useEffect(() => {
        if (uploadFileNonEng) {
            UploadNonEnglishDataClear();
            router.push(routerObj);
        }
    }, [uploadFileNonEng && uploadFileNonEng !== '']);

    const handleGrammarPlagiarismChange = (event) => {
        setGrammarPlagiarismCheck({
            ...grammarPlagiarismCheck,
            [event.target.name]: event.target.checked,
        });
    };

    useEffect(() => {
        if (language === 'Non English' || isRegionalFile) {
            LanguageList();
        }
    }, [language === 'Non English' || isRegionalFile]);

    return (
        <>
            <CardView>
                <ContentCenter>
                    <Title
                        color='#020B50'
                        title={ title }
                    />
                </ContentCenter>
                <DragAreaPadding>
                    <Grid container spacing={ 1 }>
                        <Grid item md={ 12 } xs={ 12 }>
                            <DragDropArea>
                                { fileIcon }
                                <SubTitle1 title={ allowedFormat } />
                                <div style={ { display: 'flex', justifyContent: 'center' } }>
                                    <Link style={ { marginLeft: '5px' } }>
                                        <ChooseLabel for="file-upload">
                                            { choseFileTitle }
                                        </ChooseLabel>
                                    </Link>
                                    <Input
                                        multiple
                                        onChange={ handleUpload }
                                        id="file-upload"
                                        type="file"
                                    />
                                </div>
                                { (fileData?.length > 0) && fileData?.map((item, index) => (
                                    <ChipContainer key={ index }>
                                        <Chip
                                            label={ item[1]?.name }
                                            onDelete={ (e) => handleDelete(e, item) }
                                        />
                                    </ChipContainer>
                                )) }
                                { (fileData?.length > 1 && !isRepository && langType === 'Non English') && <ErrorMessageContainer>{ UPLOAD_NON_ENGLISH_FILE_MULTIFILE }</ErrorMessageContainer> }
                                { fileWarning && <ErrorMessageContainer>{ UPLOAD_FILE_MAX_LIMIT }</ErrorMessageContainer> }

                            </DragDropArea>

                            { (fileData?.length === 1 && !isRepository && !isStudent && langType === 'English') &&
                                <Grid container style={ { justifyContent: 'center' } }>
                                    { !isRegionalFile &&
                                        <div>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox disabled={ router.query.grammar === 'NO' } checked={ grammarCheck } onChange={ handleGrammarPlagiarismChange } name="grammarCheck" />
                                                }
                                                label="Grammar Check"
                                            />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox checked={ plagiarismCheck } onChange={ handleGrammarPlagiarismChange } name="plagiarismCheck" />
                                                }
                                                label="Plagiarism Check"
                                            />
                                        </div>
                                    }
                                </Grid> }


                            { fileData?.length > 0 && isRepository &&
                                <RepositoryFileForm
                                handleSubmitRepository={ handleSubmitRepository }
                                files={ fileData }
                                    btnTitle='Submit'
                                isLoading={ isLoadingUpload }
                                />

                            }
                            { (fileData?.length > 0 && !isRepository && !isStudent && langType === 'English') &&
                                <FileForm
                                    handleSubmitFile={ handleSubmit }
                                    files={ fileData }
                                    btnTitle='Submit'
                                    isLoading={ isLoadingUpload || isLoadingNonEng }
                                    langType={ langType }
                                />
                            }
                            { (fileData?.length > 0 && !isRepository && isStudent && langType === 'English') &&
                                <FileForm
                                    handleSubmitFile={ handleSubmit }
                                    files={ fileData }
                                    btnTitle='Submit'
                                    isStudent={ isStudent }
                                    assName={ router.query.assName }
                                    isLoading={ isLoadingUpload || isLoadingNonEng }
                                    langType={ langType }
                                />
                            }
                            { (fileData?.length === 1 && !isRepository && !isStudent && langType === 'Non English') &&
                                <FileForm
                                handleSubmitFile={ handleSubmit }
                                files={ fileData }
                                    btnTitle='Submit'
                                isLoading={ isLoadingUpload || isLoadingNonEng }
                                langType={ langType }
                                />
                            }
                            { (fileData?.length === 1 && !isRepository && isStudent && langType === 'Non English') &&
                                <FileForm
                                handleSubmitFile={ handleSubmit }
                                files={ fileData }
                                    btnTitle='Submit'
                                isStudent={ isStudent }
                                assName={ router.query.assName }
                                    isLoading={ isLoadingUpload || isLoadingNonEng }
                                    langType={ langType }
                                />
                            }
                            { (fileData?.length === 1 && !isRepository && isRegionalFile) &&
                                <FileForm
                                    handleSubmitFile={ handleSubmit }
                                    files={ fileData }
                                    isRegionalFile={ isRegionalFile }
                                    btnTitle='Submit'
                                    isLoading={ isLoadingUpload || isLoadingNonEng }
                                    langType={ langType }
                                />
                            }
                        </Grid>
                    </Grid>
                </DragAreaPadding>
            </CardView>
        </>
    );
};


const mapStateToProps = (state) => ({
    uploadData: state?.instructorMyFolders?.uploadData,
    nonEnglishLang: state?.uploadFile?.nonEnglishLang,
    uploadFileNonEng: state?.uploadFile?.uploadFileNonEng,
    isLoadingLang: state?.uploadFile?.isLoadingLang,
    isLoadingNonEng: state?.uploadFile?.isLoadingNonEng,
    isLoadingUpload: state?.instructorMyFolders?.isLoadingUpload,
    isLoadingUploadFile: state?.instructorMyFolders?.isLoadingSubmission,
});

const mapDispatchToProps = (dispatch) => {
    return {
        SubmissionListUpload: (apiUrl, data) => dispatch(SubmissionListUpload(apiUrl, data)),
        UploadNonEnglish: (apiUrl, data) => dispatch(UploadNonEnglish(apiUrl, data)),
        UploadZipFileDataClear: () => dispatch(UploadZipFileDataClear()),
        UploadNonEnglishDataClear: () => dispatch(UploadNonEnglishDataClear()),
        LanguageList: () => dispatch(LanguageList())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadFiles);