import React, { useState, useEffect, createRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { useRouter } from "next/router";
import Chip from "@mui/material/Chip";
import FormControlLabel from "@mui/material/FormControlLabel";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { Grid, Link, Checkbox, IconButton, Tooltip } from "@mui/material";
import { Title, CardView, Heading } from "./../../components";
import FileForm from "./FileForm";
import RepositoryFileForm from "./RepositoryFileForm";
import {
  Input,
  DragAreaPadding,
  DragDropArea,
  ChooseLabel,
  ChipContainer,
} from "./FileStyle";

import {
  SubmissionListUpload,
  UploadZipFileDataClear,
} from "../../redux/action/instructor/InstructorAction";

import { UploadNonEnglishDataClear } from "../../redux/action/common/UploadFile/UploadFileAction";

import {
  LanguageList,
  UploadNonEnglish,
} from "../../redux/action/common/UploadFile/UploadFileAction";

import {
  UPLOAD_FILE_MAX_LIMIT,
  UPLOAD_NON_ENGLISH_FILE_MULTIFILE,
} from "../../constant/data/ErrorMessage";
import {
  getItemSessionStorage,
} from "../../utils/RegExp";

const ErrorMessageContainer = styled.div`
  margin-top: 10px;
  color: red;
`;

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
  LanguageList,
  UploadNonEnglish,
  isLoadingNonEng,
  isRegionalFile,
  isCrossLangDropdown,
  uploadFileNonEng,
  langType,
  isStudent,
}) => {
  const router = useRouter();
  const [fileData, setFileData] = useState([]);
  const [fileWarning, setFileWarning] = useState(false);
  const [isUploadInProgress, setUploadInProgress] = useState(false);
  const [language, setLanguage] = useState("English");
  const [exemptCheck, setExemptCheck] = useState(
    fileData.reduce((acc, file) => {
      acc[file.id] = false;
      return acc;
    }, {})
  );
  const ref = createRef();

  useEffect(() => {
    if (router.isReady) {
      setGrammarPlagiarismCheck({
        ...grammarPlagiarismCheck,
        grammarCheck: router.query.grammar === "YES" ? true : false,
      });
    }
  }, [router.isReady]);

  const [grammarPlagiarismCheck, setGrammarPlagiarismCheck] = useState({
    grammarCheck: false,
    plagiarismCheck: true,
  });
  const { grammarCheck, plagiarismCheck } = grammarPlagiarismCheck;

  const handleDelete = (e, item) => {
    ref.current.value = '';
    e.preventDefault();
    let a = fileData.filter((filterItem) => {
      if (filterItem[1].name !== item[1].name) {
        return filterItem;
      }
    });
    setFileData(a);
    setExemptCheck((prevState) => {
      const newState = { ...prevState };
      delete newState[item[0]];
      return newState;
    });
  };

  const checkFileFormat = (files) => {
    if (Object.entries(files).length > 15) {
      setFileWarning(true);
      setFileData([])
    } else {
      setFileData(Object.entries(files));
      setFileWarning(false);
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0){
      setUploadInProgress(true);
      checkFileFormat(e.target.files)
    } else {
      setUploadInProgress(false);
    }
  };

  const handleSubmit = (data) => {
    if (
      fileData.length === 1 &&
      langType === "English" &&
      !isRegionalFile &&
      !isStudent
    ) {
      singleFileUpload(fileData, data);
    } else if (
      fileData.length === 1 &&
      langType === "English" &&
      !isRegionalFile &&
      isStudent
    ) {
      singleFileUploadStudent(fileData, data);
    } else if (
      fileData.length === 1 &&
      langType === "Non English" &&
      !isRegionalFile &&
      !isStudent
    ) {
      singleFileUploadNonEnglish(fileData, data);
    } else if (
      fileData.length === 1 &&
      langType === "Non English" &&
      !isRegionalFile &&
      isStudent
    ) {
      singleFileUploadNonEnglishStudent(fileData, data);
    } else if (fileData.length === 1 && isRegionalFile && !isCrossLangDropdown) {
      regionalFileUpload(fileData, data);
    } else if (fileData.length === 1 && isRegionalFile && isCrossLangDropdown) {
      regionalCrossLangFileUpload(fileData, data);
    } else if (
      fileData.length > 1 &&
      langType === "English" &&
      !isRegionalFile
    ) {
      multiFileUpload(fileData, data);
    } else if (
      fileData.length > 1 &&
      langType === "Non English"
    ) {
      multiNonEngFileUpload(fileData, data);
    }
    else if (fileData.length === 1 &&
      langType === "ScannedPDF"
    ) {
      scannedPdfFileUpload(fileData, data);
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
    fileData?.map((item, i) => {
      bodyFormData.append("authorName", data["authorName" + item[0]]);
      bodyFormData.append("title", data["title" + item[0]]);
      bodyFormData.append("documentType", data["documentType" + item[0]]);
    })
    bodyFormData.append("plagiarismCheck", plagiarismCheck ? "YES" : "NO");
    bodyFormData.append("grammarCheck", grammarCheck ? "YES" : "NO");
    bodyFormData.append("language", langType);
    bodyFormData.append("file", files[0][1]);
    SubmissionListUpload(singleFileUploadAPI, bodyFormData);
  };

  const singleFileUploadStudent = (files, data) => {
    let bodyFormData = new FormData();
    bodyFormData.append("authorName", getItemSessionStorage("name"));
    bodyFormData.append("title", router.query.assName);
    bodyFormData.append("language", langType);
    bodyFormData.append("file", files[0][1]);
    SubmissionListUpload(singleFileUploadAPI, bodyFormData);
  };

  const singleFileUploadNonEnglish = (files, data) => {
    let bodyFormData = new FormData();
    fileData?.map((item, i) => {
      bodyFormData.append("authorName", data["authorName" + item[0]]);
      bodyFormData.append("title", data["title" + item[0]]);
      bodyFormData.append("documentType", data["documentType" + item[0]]);
      bodyFormData.append("language", data["nonEnglishLang" + item[0]]);
    })
    bodyFormData.append("plagiarismCheck", plagiarismCheck ? "YES" : "NO");
    bodyFormData.append("grammarCheck", grammarCheck ? "YES" : "NO");
    bodyFormData.append("file", files[0][1]);
    UploadNonEnglish(singleFileUploadAPI, bodyFormData);
  };

  const singleFileUploadNonEnglishStudent = (files, data) => {
    let bodyFormData = new FormData();
    bodyFormData.append("authorName", getItemSessionStorage("name"));
    bodyFormData.append("title", router.query.assName);
    fileData?.map((item, i) => {
      bodyFormData.append("language", data["nonEnglishLang" + item[0]]);
    })
    bodyFormData.append("file", files[0][1]);
    UploadNonEnglish(singleFileUploadAPI, bodyFormData);
  };

  const singleFileUploadRepository = (files, data) => {
    let bodyFormData = new FormData();
    fileData?.map((item, i) => {
      bodyFormData.append(
        router.route.includes("pro/admin") ? "author_name" : "name",
        data["authorName" + item[0]]
      );
      bodyFormData.append("title", data["title" + item[0]]);
      bodyFormData.append("year", data["year" + item[0]]);
      bodyFormData.append(
        "repository",
        data["repository" + item[0]] === "Institution" ? "LOCAL" : "GLOBAL"
      );
      bodyFormData.append("language", data["language" + item[0]]);
      bodyFormData.append("rep_ex",
        data["rep_ex" + item[0]] === true ? 1 : 0
      );
      bodyFormData.append("file", files[0][1]);
    })
    SubmissionListUpload(singleFileUploadAPI, bodyFormData);
  };

  const multiFileUpload = (files, data) => {
    let authorNameArr = [],
      titleArr = [],
      documentTypeArr = [];
    let bodyFormData = new FormData();
    fileData?.map((item, i) => {
      authorNameArr.push(data["authorName" + item[0]]);
      titleArr.push(data["title" + item[0]]);
      documentTypeArr.push(data["documentType" + item[0]]);
    });

    bodyFormData.append("authorName", authorNameArr?.map((item) => {
      return item?.replace(/,/g, "@@@");
    }));
    bodyFormData.append("title", titleArr?.map((item) => {
      return item?.replace(/,/g, "@@@");
    }));
    bodyFormData.append("documentType", documentTypeArr);
    for (let i = 0; i < files.length; i++) {
      bodyFormData.append("file", files[i][1]);
    }
    SubmissionListUpload(multiFileUploadAPI, bodyFormData);
  };

  const multiNonEngFileUpload = (files, data) => {
    let authorNameArr = [],
      titleArr = [],
      documentTypeArr = [],
      LanguageArr = [];
    let bodyFormData = new FormData();
    fileData?.map((item, i) => {
      authorNameArr.push(data["authorName" + item[0]]);
      titleArr.push(data["title" + item[0]]);
      documentTypeArr.push(data["documentType" + item[0]]);
      LanguageArr.push(data["nonEnglishLang" + item[0]]);
    });

    bodyFormData.append("authorName", authorNameArr?.map((item) => {
      return item?.replace(/,/g, "@@@");
    }));
    bodyFormData.append("title", titleArr?.map((item) => {
      return item?.replace(/,/g, "@@@");
    }));
    bodyFormData.append("documentType", documentTypeArr);
    bodyFormData.append("language", LanguageArr);
    for (let i = 0; i < files.length; i++) {
      bodyFormData.append("file", files[i][1]);
    }
    SubmissionListUpload(multiFileUploadAPI, bodyFormData);
  };

  const multiFileUploadRepository = (files, data) => {
    let authorNameArr = [],
      titleArr = [],
      yearArr = [],
      repositoryArr = [],
      languageArr = [],
      regExArr = [];
    let bodyFormData = new FormData();
    fileData?.map((item, i) => {
      authorNameArr.push(data["authorName" + item[0]]);
      titleArr.push(data["title" + item[0]]);
      yearArr.push(data["year" + item[0]]);
      if (data["repository" + item[0]] === "Institution") {
        let local = "LOCAL";
        repositoryArr.push(local);
      } else {
        repositoryArr.push(data["repository" + item[0]]?.toUpperCase());
      }
      if (data["rep_ex" + item[0]] === true) {
        regExArr.push(1);
      } else {
        regExArr.push(0);
      }
      languageArr.push(data["language" + item[0]]);
    });

    bodyFormData.append("name", authorNameArr?.map((item) => {
      return item?.replace(/,/g, "@@@");
    })
    );
    bodyFormData.append("title", titleArr?.map((item) => {
      return item?.replace(/,/g, "@@@");
    }));

    bodyFormData.append("year", yearArr);
    bodyFormData.append("repository", repositoryArr);
    bodyFormData.append("language", languageArr);
    bodyFormData.append("rep_ex", regExArr);
    for (let i = 0; i < files.length; i++) {
      bodyFormData.append("files", files[i][1]);
    }
    SubmissionListUpload(multiFileUploadAPI, bodyFormData);
  };

  const regionalFileUpload = (files, data) => {
    let bodyFormData = new FormData();
    fileData?.map((item, i) => {
      bodyFormData.append("authorName", data["authorName" + item[0]]);
      bodyFormData.append("title", data["title" + item[0]]);
      bodyFormData.append("documentType", data["documentType" + item[0]]);
    })
    bodyFormData.append("language", data.regionalLanguage);
    bodyFormData.append("file", files[0][1]);
    SubmissionListUpload(singleFileUploadAPI, bodyFormData);
  };

  const regionalCrossLangFileUpload = (files, data) => {
    let bodyFormData = new FormData();
    bodyFormData.append("authorName", data.authorName0);
    bodyFormData.append("title", data.title0);
    bodyFormData.append("documentType", data.documentType0);
    bodyFormData.append("language", data.regionalLanguage);
    bodyFormData.append("destination_language", data.destinationLanguage);
    bodyFormData.append("file", files[0][1]);
    SubmissionListUpload(singleFileUploadAPI, bodyFormData);
  };

  const scannedPdfFileUpload = (files, data) => {
    let bodyFormData = new FormData();
    fileData?.map((item, i) => {
      bodyFormData.append("authorName", data["authorName" + item[0]]);
      bodyFormData.append("title", data["title" + item[0]]);
    })
    bodyFormData.append("documentType", data.documentType0);
    bodyFormData.append("file", files[0][1]);
    SubmissionListUpload(singleFileUploadAPI, bodyFormData);
  };

  useEffect(() => {
    if (uploadData?.status === 200) {
      setTimeout(() => {
        router.push(routerObj);
        UploadZipFileDataClear();
      }, 1000);
    }
  }, [uploadData && uploadData?.status]);

  useEffect(() => {
    if (uploadFileNonEng?.status === 200) {
      setTimeout(() => {
        router.push(routerObj);
        UploadNonEnglishDataClear();
      }, 1000);
    }
  }, [uploadFileNonEng && uploadFileNonEng?.status]);

  const handleGrammarPlagiarismChange = (event) => {
    setGrammarPlagiarismCheck({
      ...grammarPlagiarismCheck,
      [event.target.name]: event.target.checked,
    });
  };

  const handleExemptCheckChange = (event, index) => {
    const checked = event.target.checked;
    setExemptCheck(prevState => {
      return { ...prevState, [index]: checked }
    });
  };

  useEffect(() => {
    if (language === "Non English" || isRegionalFile) {
      LanguageList();
    }
  }, [language === "Non English" || isRegionalFile]);

  const handleBack = (e) => {
    e.preventDefault();
    router.push(routerObj);
  };

  return (
    <>
      <CardView>
        <DragAreaPadding>
          <div style={ { display: "flex" } }>
            <Tooltip title="Back" arrow style={ { marginTop: "-10px" } }>
              <IconButton size="large" onClick={ handleBack }>
                <ArrowBackOutlinedIcon />
              </IconButton>
            </Tooltip>
            { isRepository ? (
              <Heading title="Upload files to repository" />
            ) : (
              <Heading title="Upload files for plagiarism check" />
            ) }
          </div>
          <Grid container spacing={ 1 }>
            <Grid item md={ 12 } xs={ 12 }>
              <DragDropArea>
                { fileIcon }
                <Title title={ allowedFormat.FILE_FORMATS } />
                { !isStudent && !isRegionalFile && <Title title={ allowedFormat.MAX_FILES } /> }
                <Title title={ allowedFormat.LENGTH } />
                <Title title={ allowedFormat.SIZE } />
                <div style={ { display: "flex", justifyContent: "center" } }>
                  <Link style={ { marginLeft: "5px" } }>
                    <ChooseLabel for="file-upload">
                      { choseFileTitle }
                    </ChooseLabel>
                  </Link>
                  <Input
                    multiple
                    onChange={ handleUpload }
                    id="file-upload"
                    type="file"
                    accept={ allowedFormat.ALLOW_FILE_FORMATS }
                    ref={ ref }
                  />
                </div>

                { fileData?.length > 0 &&
                  fileData?.map((item, index) => (
                    <ChipContainer key={ index }>
                      <Tooltip title={ item[1]?.name } arrow>
                        <Chip
                          label={ item[1]?.name.slice(0, 15) + '...' }
                          onDelete={ (e) => handleDelete(e, item) }
                        />
                      </Tooltip>
                    </ChipContainer>
                  )) }
                { fileData?.length > 1 && !isRepository && isRegionalFile && (
                  <ErrorMessageContainer>
                    { UPLOAD_NON_ENGLISH_FILE_MULTIFILE }
                  </ErrorMessageContainer>
                ) }
                { fileData?.length > 1 && langType === "ScannedPDF" && (
                  <ErrorMessageContainer>
                    { UPLOAD_NON_ENGLISH_FILE_MULTIFILE }
                  </ErrorMessageContainer>
                ) }
                { (fileData?.length > 1 || fileWarning) && !isRepository && isStudent && (
                  <ErrorMessageContainer>
                    { UPLOAD_NON_ENGLISH_FILE_MULTIFILE }
                  </ErrorMessageContainer>
                ) }
                { fileWarning && !isStudent &&(
                  <ErrorMessageContainer>
                    { UPLOAD_FILE_MAX_LIMIT }
                  </ErrorMessageContainer>
                ) }
              </DragDropArea>

              { fileData?.length === 1 &&
                !isRepository &&
                !isStudent &&
                langType === "English" && (
                  <Grid container style={ { justifyContent: "center" } }>
                    { !isRegionalFile && (
                      <div>
                        <FormControlLabel
                          control={
                            <Checkbox
                              disabled={
                                router?.query?.grammar?.toUpperCase() === "NO"
                              }
                              checked={ grammarCheck }
                              onChange={ handleGrammarPlagiarismChange }
                              name="grammarCheck"
                            />
                          }
                          label="Grammar Check"
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={ plagiarismCheck }
                              onChange={ handleGrammarPlagiarismChange }
                              name="plagiarismCheck"
                            />
                          }
                          label="Plagiarism Check"
                        />
                      </div>
                    ) }
                  </Grid>
                ) }

              { fileData?.length > 0 && isRepository && (
                <RepositoryFileForm
                  handleSubmitRepository={ handleSubmitRepository }
                  files={ fileData }
                  isUploadInProgress={ isUploadInProgress }
                  btnTitle="Submit"
                  isLoading={ isLoadingUpload }
                  exemptCheck={ exemptCheck }
                  handleExemptCheckChange={ handleExemptCheckChange }
                />
              ) }
              { fileData?.length > 0 &&
                !isRepository &&
                !isStudent &&
                langType === "English" && (
                  <FileForm
                    handleSubmitFile={ handleSubmit }
                    files={ fileData }
                    isUploadInProgress={ isUploadInProgress }
                    btnTitle="Submit"
                    isLoading={ isLoadingUpload || isLoadingNonEng }
                    langType={ langType }
                  />
                ) }
              { fileData?.length > 0 &&
                !isRepository &&
                !isStudent &&
                langType === "Non English" && (
                  <FileForm
                    handleSubmitFile={ handleSubmit }
                    files={ fileData }
                    isUploadInProgress={ isUploadInProgress }
                    btnTitle="Submit"
                    isLoading={ isLoadingUpload || isLoadingNonEng }
                    langType={ langType }
                  />
                ) }
              { fileData?.length === 1 &&
                langType === "ScannedPDF" && (
                  <FileForm
                    handleSubmitFile={ handleSubmit }
                    files={ fileData }
                    isUploadInProgress={ isUploadInProgress }
                    btnTitle="Submit"
                    isLoading={ isLoadingUpload || isLoadingNonEng }
                    langType={ langType }
                  />
                ) }
              { fileData?.length === 1 &&
                !isRepository &&
                isStudent &&
                langType === "English" && (
                  <FileForm
                    handleSubmitFile={ handleSubmit }
                    files={ fileData }
                    isUploadInProgress={ isUploadInProgress }
                    btnTitle="Submit"
                    isStudent={ isStudent }
                    assName={ router.query.assName }
                    isLoading={ isLoadingUpload || isLoadingNonEng }
                    langType={ langType }
                  />
                ) }
              { fileData?.length === 1 &&
                !isRepository &&
                isStudent &&
                langType === "Non English" && (
                  <FileForm
                    handleSubmitFile={ handleSubmit }
                    files={ fileData }
                    isUploadInProgress={ isUploadInProgress }
                    btnTitle="Submit"
                    isStudent={ isStudent }
                    assName={ router.query.assName }
                    isLoading={ isLoadingUpload || isLoadingNonEng }
                    langType={ langType }
                  />
                ) }
              { fileData?.length === 1 && !isRepository && isRegionalFile && (
                <FileForm
                  handleSubmitFile={ handleSubmit }
                  files={ fileData }
                  isUploadInProgress={ isUploadInProgress }
                  isRegionalFile={ isRegionalFile }
                  btnTitle="Submit"
                  isLoading={ isLoadingUpload || isLoadingNonEng }
                  langType={ langType }
                  isCrossLangDropdown={ isCrossLangDropdown }
                />
              ) }
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
    SubmissionListUpload: (apiUrl, data) =>
      dispatch(SubmissionListUpload(apiUrl, data)),
    UploadNonEnglish: (apiUrl, data) =>
      dispatch(UploadNonEnglish(apiUrl, data)),
    UploadZipFileDataClear: () => dispatch(UploadZipFileDataClear()),
    UploadNonEnglishDataClear: () => dispatch(UploadNonEnglishDataClear()),
    LanguageList: () => dispatch(LanguageList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadFiles);
