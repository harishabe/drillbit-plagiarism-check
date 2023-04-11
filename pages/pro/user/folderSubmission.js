import React, { useState, useEffect, useMemo } from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import debouce from 'lodash.debounce';
import { Grid, Tooltip } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import { Pagination, IconButton } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import { TextField } from '@mui/material';
import ProUser from '../../../layouts/ProUser';
import {
    CommonTable,
    BreadCrumb,
    MainHeading,
    CreateDrawer,
    WarningDialog,
    SimilarityStatus,
    Instructions,
    CardView
} from '../../../components';
import {
    UploadFileDataClear,
    UploadZipFileDataClear
} from '../../../redux/action/instructor/InstructorAction';
import {
    DownloadCsv,
    SaveToRepoBulk,
    DownloadOriginalFile,
    GetGrammarReport,
    DeletefolderSubmissionData,
    folderSubmissionsFileData,
    SubmissionReportBulkDownload,
    SubmissionReportDownload
} from '../../../redux/action/common/Submission/SubmissionAction';
import { DeleteIcon, DeleteWarningIcon, DownloadIcon, RegionalUploadIcon, NonEnglishUploadIcon, EnglishUploadIcon } from '../../../assets/icon';
import { PaginationValue } from '../../../utils/PaginationUrl';
import { formatDate, removeCommaWordEnd, windowOpen, getItemSessionStorage } from '../../../utils/RegExp';
import { PaginationContainer } from '../../../style/index';
import { BASE_URL, BASE_URL_PRO, BASE_URL_ANALYSIS, BASE_URL_UPLOAD, BASE_URL_REGIONAL_ANALYSIS } from '../../../utils/BaseUrl';
import END_POINTS_PRO from '../../../utils/EndPointPro';
import { DOWNLOAD_CSV, WARNING_MESSAGES, FILE_LANGUAGE, NO_DATA_PLACEHOLDER, NA_DATA_PLACEHOLDER, SUBMISSION_DELAY } from '../../../constant/data/Constant';
import PageChange from '../../../components/loader/PageChange';
import { INSTRUCTIONS_STEPS } from '../../../constant/data/InstructionMessage';

const columns = [
    { id: 'name', label: 'Name' },
    { id: 'title', label: 'Title' },
    { id: 'original_fn', label: 'File', isDownload: true },
    { id: 'lang1', label: 'Language' },
    { id: 'grammar_url', label: 'Grammar' },
    { id: 'percent', label: 'Similarity' },
    { id: 'paper_id', label: 'ID' },
    { id: 'date_up', label: 'Submission Date' },
    { id: 'action', label: 'Action', minWidth: 103 },
];

function createData(id, name, title, original_fn, lang1, grammar, grammar_url, percent, paper_id, date_up, action, d_key, alert_msg, repository_status, language, flag) {
    return {
        id, name, title, original_fn, lang1, grammar, grammar_url, percent, paper_id, date_up, action, d_key, alert_msg, repository_status, language, flag
    };
}

const AddButtonBottom = styled.div`
    position:fixed;
    bottom: 30px;
    right:30px;
`;

// const DownloadField = styled.div`
//     position:absolute;
//     top: 115px;
//     right:295px;
// `;

// const RefreshButton = styled.div`
//     position:absolute;
//     top: 115px;
//     right:335px;
// `;

// const SkeletonContainer = styled.div`
//     margin-top: 16px;
//     margin-right: 5px;
// `;

const DeleteAllButton = styled.div`
    marginLeft: 10px;
    display: flex;
`;

const folderSubmission = ({
    folderSubmissionsFileData,
    DownloadCsv,
    DownloadOriginalFile,
    DeletefolderSubmissionData,
    SaveToRepoBulk,
    folderSubmissionData,
    isLoadingSubmission,
    isLoadingUpload,
    isLoadingDownload,
    pageDetails,
    UploadFileDataClear,
    extractedFileData,
    uploadData,
    UploadZipFileDataClear,
    isLoadingGrammarReport,
    GetGrammarReport,
    SubmissionReportBulkDownload,
    SubmissionReportDownload,
    isLoadingBulkDownload,
    isLoadingSubmissionReport
}) => {

    const router = useRouter();
    const [rows, setRows] = useState([]);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [showSubmissionReport, setShowSubmissionReport] = useState(false);
    const [submissionReportData, setSubmissionReportData] = useState('');
    const [deleteRowData, setDeleteRowData] = useState('');
    const [saveRowData, setSaveRowData] = useState('');
    const [showSaveIcon, setShowSaveIcon] = useState(false);
    const [showDeleteAllIcon, setShowDeleteAllIcon] = useState(false);
    const [showDownloadWarning, setShowDownloadWarning] = useState(false);
    const [search, setSearch] = useState(false);
    const [data, setData] = useState();

    const folderId = router.query.folderId;
    const folderName = router.query.name;

    const UserBreadCrumb = [
        {
            name: 'Dashboard',
            link: '/pro/user/dashboard',
            active: false,
        },
        {
            name: 'My folder',
            link: '/pro/user/myfolder',
            active: false,
        },
        {
            name: folderName,
            link: '',
            active: true,
        },
    ];

    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: 'paper_id',
        orderBy: PaginationValue?.orderBy,
    });

    useEffect(() => {
        if (router.isReady) {
            folderSubmissionsFileData(BASE_URL_PRO + END_POINTS_PRO.USER_SUBMISSION + folderId + '/submissions', paginationPayload);
        }
    }, [router.isReady, paginationPayload]);

    useEffect(() => {
        const result = rows?.some((item) => item?.percent?.props?.percent === '--');
        if (result) {
            const intervalId = setInterval(() => {
                folderSubmissionsFileData(BASE_URL_PRO + END_POINTS_PRO.USER_SUBMISSION + folderId + '/submissions', paginationPayload);
            }, SUBMISSION_DELAY);

            return () => {
                clearInterval(intervalId);
            };
        }
    }, [rows]);

    useEffect(() => {
        if (extractedFileData) {
            UploadFileDataClear();
        }
        if (uploadData) {
            UploadZipFileDataClear();
        }
    }, [uploadData, extractedFileData]);

    const handleRefresh = () => {
        folderSubmissionsFileData(BASE_URL_PRO + END_POINTS_PRO.USER_SUBMISSION + folderId + '/submissions', paginationPayload);
    };

    useEffect(() => {
        let row = '';
        let arr = [];
        folderSubmissionData?.map((submission) => {
            row =
                createData(
                    submission.folder_id,
                    submission.name,
                    submission.title,
                    submission.original_file_name,
                    submission.language1,
                    submission.grammar,
                    submission.grammar_url,
                    <SimilarityStatus percent={ submission.percent } flag={ submission.flag } />,
                    submission.paper_id,
                    formatDate(submission.date_up),
                    [
                        { 'component': <DeleteIcon />, 'type': 'delete', 'title': 'Delete' },
                        (submission.percent === (NO_DATA_PLACEHOLDER || NA_DATA_PLACEHOLDER)) ?
                            {
                                'component': <FileDownloadOutlinedIcon />,
                                'title': 'Similarity report not ready'
                            } :
                            {
                                'component': <FileDownloadOutlinedIcon />,
                                'type': 'download',
                                'title': 'Similarity report download'
                            }
                    ],
                    submission.d_key,
                    submission.alert_msg,
                    submission.repository_status,
                    submission.language
                );
            row['isSelected'] = false;
            arr.push(row);
        });
        setRows([...arr]);
    }, [folderSubmissionData]);

    useEffect(() => {
        if (isLoadingSubmissionReport) {
            document.body.classList.add('body-page-transition');
            ReactDOM.render(
                <PageChange />,
                document.getElementById('page-transition')
            );
        }
        else {
            ReactDOM.unmountComponentAtNode(document.getElementById('page-transition'));
            document.body.classList.remove('body-page-transition');
        }
    }, [isLoadingSubmissionReport])

    const handleAction = (event, icon, rowData) => {
        if (icon === 'delete') {
            setDeleteRowData(rowData?.paper_id);
            setShowDeleteWarning(true);
        } else if (icon === 'download') {
            setSubmissionReportData(rowData);
            setShowSubmissionReport(true);
        }
    };

    const handleChange = (event, value) => {
        event.preventDefault();
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 });
    };

    const handleCloseWarning = () => {
        setShowDeleteWarning(false);
    };

    const handleCloseSaveWarning = () => {
        setShowSaveIcon(false);
    };

    const handleYesWarning = () => {
        DeletefolderSubmissionData(BASE_URL_PRO + END_POINTS_PRO.USER_SUBMISSION + `${folderId}/submissions?paperId=${deleteRowData}`);
        setShowDeleteAllIcon(false);
        setTimeout(() => {
            setShowDeleteWarning(false);
        }, [100]);
    };

    const handleYesSaveWarning = () => {
        SaveToRepoBulk(BASE_URL_PRO + END_POINTS_PRO.USER_SUBMISSION + `${folderId}/submissions/repository?paperId=${saveRowData}`);
        setShowDeleteAllIcon(false);
        setTimeout(() => {
            setShowSaveIcon(false);
        }, [100]);
    };

    /**
   * table sorting order - ascending and descending
   * @param {*} e 
   * @param {*} column 
   * @param {*} sortToggle 
   */
    const handleTableSort = (e, column, sortToggle) => {
        if (sortToggle) {
            setPaginationPayload({ ...paginationPayload, 'field': column.id, 'orderBy': 'asc' });
        } else {
            setPaginationPayload({ ...paginationPayload, 'field': column.id, 'orderBy': 'desc' });
        }
    };

    const handleSearch = (event) => {
        if (event.target.value !== '') {
            paginationPayload['search'] = event.target.value;
            setSearch(true)
            setPaginationPayload({ ...paginationPayload, paginationPayload });
        } else {
            delete paginationPayload['search'];
            setSearch(false)
            setPaginationPayload({ ...paginationPayload, paginationPayload });
        }
    };

    const debouncedResults = useMemo(() => {
        return debouce(handleSearch, 300);
    }, []);

    useEffect(() => {
        return () => {
            debouncedResults.cancel();
        };
    });

    const handleCheckboxSelect = (e, value) => {
        e.preventDefault();
        if (value) {
            let rowData = rows?.map((rowItem) => {
                rowItem['isSelected'] = false;
                return rowItem;
            });
            setRows(rowData);
        } else {
            let rowData = rows?.map((rowItem) => {
                rowItem['isSelected'] = !rowItem['isSelected'];
                return rowItem;
            });
            setRows(rowData);
        }
    };

    const handleSingleSelect = (e, row) => {
        let rowData = rows?.map((rowItem) => {
            if (rowItem?.paper_id === row?.paper_id) {
                rowItem['isSelected'] = !rowItem['isSelected'];
            }
            return rowItem;
        });
        setRows(rowData);
    };

    /**
     * delete all submission
     */
    const deleteAllSubmission = () => {
        let rowsId = '';
        _.filter(rows, function (o) {
            if (o.isSelected === true) {
                return rows;
            }
        }).map((rowItem) => {
            rowsId += rowItem?.paper_id + ',';
        });
        setDeleteRowData(removeCommaWordEnd(rowsId));
        setShowDeleteWarning(true);
    };

    /**
     * save all submission
     */
    const saveAllSubmission = () => {
        let rowsId = '';
        _.filter(rows, function (o) {
            if (o.isSelected === true) {
                return rows;
            }
        }).map((rowItem) => {
            rowsId += rowItem?.paper_id + ',';
        });
        setSaveRowData(removeCommaWordEnd(rowsId));
        setShowSaveIcon(true);
    };

    const handleDownload = () => {
        DownloadCsv(BASE_URL_PRO + END_POINTS_PRO.USER_SUBMISSION_LIST_DOWNLOAD + folderId, DOWNLOAD_CSV.SUBMISSION_REPORT);
    };

    const handleOriginalFileDownload = (e, data) => {
        e.preventDefault();
        setShowDownloadWarning(true);
        setData(data);
    };

    const handleFileDownloadCloseWarning = () => {
        setShowDownloadWarning(false);
    };

    const handleSubmissionDownloadCloseWarning = () => {
        setShowSubmissionReport(false);
    };

    const handleFileDownloadYesWarning = () => {
        let detailedData = {
            folderId: folderId,
            paperId: data?.paper_id,
            name: data?.original_fn,
            path: 'proFolderSubmission'
        };
        DownloadOriginalFile(detailedData);
        setShowDownloadWarning(false);
        setTimeout(() => {
            setShowDownloadWarning(false);
        }, [100]);
    };

    const handleSubmissionDownloadYesWarning = () => {
        SubmissionReportDownload(BASE_URL + END_POINTS_PRO.SIMILARITY_REPORT_SINGLE_DOWNLOAD + `${submissionReportData?.paper_id}/${submissionReportData?.d_key}`, submissionReportData);
        setShowSubmissionReport(false);
    };

    /**
    * show analysis page
    */
    const handleShowAnalysisPage = (e, row) => {
        if (row?.language === FILE_LANGUAGE.REGIONAL) {
            if (row?.paper_id > 657600) {
                let token = getItemSessionStorage('token');
                let url = BASE_URL_ANALYSIS + row.paper_id + '/' + row.d_key + '/' + token;
                windowOpen(url);
            } else {
                let url = BASE_URL_REGIONAL_ANALYSIS + row.paper_id + '/' + row.d_key;
                windowOpen(url);
            }
        } else {
            let token = getItemSessionStorage('token');
            let url = BASE_URL_ANALYSIS + row.paper_id + '/' + row.d_key + '/' + token;
            windowOpen(url);
        }
    };

    const handlGrammarReport = (grammar) => {
        GetGrammarReport(BASE_URL_UPLOAD + END_POINTS_PRO.GRAMMAR_REPORT + grammar);
    }

    const handleShow = (e, info) => {
        if (info?.title === 'English') {
            router.push({ pathname: '/pro/user/uploadFile/englishFile', query: router.query });
        } else if (info?.title === 'Non English') {
            router.push({ pathname: '/pro/user/uploadFile/nonEnglishFile', query: router.query });
        } else if (info?.title === 'Regional') {
            router.push({ pathname: '/pro/user/uploadFile/regionalFile', query: router.query });
        }
    };

    const submissionBulkDownload = () => {
        let rowsId = '';
        _.filter(rows, function (o) {
            if (o.isSelected === true) {
                return rows;
            }
        }).map((rowItem) => {
            rowsId += rowItem?.paper_id + ',';
        });
        let requestPayload = {};
        requestPayload['paperId'] = removeCommaWordEnd(rowsId);
        SubmissionReportBulkDownload(BASE_URL_PRO + END_POINTS_PRO.SIMILARITY_REPORT_DOWNLOAD, requestPayload);
    }

    return (
        <React.Fragment>
            <Box sx={ { flexGrow: 1 } }>
                <BreadCrumb item={ UserBreadCrumb } />
                <Grid container spacing={ 1 }>
                    <Grid item md={ 5 } xs={ 5 }>
                        <MainHeading title={ `Submissions (${pageDetails?.totalElements !== undefined ? pageDetails?.totalElements : 0})` } />
                    </Grid>
                    <Grid item md={ 7 } xs={ 7 } style={ { textAlign: 'right' } }>
                        <Tooltip title="Refresh" arrow>
                            <IconButton
                                aria-label="download-file"
                                size="large"
                                onClick={ handleRefresh }
                            >
                                <RefreshOutlinedIcon />
                            </IconButton>
                        </Tooltip>

                        { folderSubmissionData?.length > 0 &&
                            isLoadingDownload ?
                            <Skeleton width={ 50 } style={ { display: 'inline-block', marginRight: '10px' } } />
                            :
                            <Tooltip title="Submission report download" arrow>
                                <IconButton
                                    aria-label="download-file"
                                    size="large"
                                    onClick={ handleDownload }>
                                    <DownloadIcon />
                                </IconButton>
                            </Tooltip>
                        }
                        <TextField
                            sx={ { width: '40%', marginTop: '8px' } }
                            placeholder='Search'
                            onChange={ debouncedResults }
                            inputProps={ {
                                style: {
                                    padding: 5,
                                    display: 'inline-flex',
                                },
                            } }
                        />
                    </Grid>
                </Grid>
            </Box>
            <>

                { _.find(rows, function (o) { return o.isSelected === true; }) && <DeleteAllButton>
                    <Tooltip title='Delete' arrow>
                        <IconButton onClick={ deleteAllSubmission }>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Save to repository' arrow>
                        <IconButton onClick={ saveAllSubmission }>
                            <SaveOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                    { isLoadingBulkDownload ? <Skeleton width={ 200 } /> : <Tooltip title='Submission report bulk download' arrow>
                        <IconButton onClick={ submissionBulkDownload }>
                            <FileDownloadOutlinedIcon />
                        </IconButton>
                    </Tooltip> }

                </DeleteAllButton> }

                { search ?
                    <CommonTable
                        isCheckbox={ true }
                        isSorting={ true }
                        isSubmission={ true }
                        tableHeader={ columns }
                        tableData={ rows }
                        handleAction={ handleAction }
                        handleTableSort={ handleTableSort }
                        handleCheckboxSelect={ handleCheckboxSelect }
                        handleSingleSelect={ handleSingleSelect }
                        downloadSubmissionFile={ handleOriginalFileDownload }
                        showAnalysisPage={ handleShowAnalysisPage }
                        showGrammarReport={ handlGrammarReport }
                        // isLoading={ isLoadingSubmission }
                        isLoadingGrammarReport={ isLoadingGrammarReport }
                        charLength={ 10 }
                        path=''
                    />
                    :
                    <>
                        { rows.length > 0 ?
                            <CommonTable
                                isCheckbox={ true }
                                isSorting={ true }
                                isSubmission={ true }
                                tableHeader={ columns }
                                tableData={ rows }
                                handleAction={ handleAction }
                                handleTableSort={ handleTableSort }
                                handleCheckboxSelect={ handleCheckboxSelect }
                                handleSingleSelect={ handleSingleSelect }
                                downloadSubmissionFile={ handleOriginalFileDownload }
                                showAnalysisPage={ handleShowAnalysisPage }
                                showGrammarReport={ handlGrammarReport }
                                // isLoading={ isLoadingSubmission }
                                isLoadingGrammarReport={ isLoadingGrammarReport }
                                charLength={ 10 }
                                path=''
                            /> :
                            <CardView>
                                <Instructions message={ Object.values(INSTRUCTIONS_STEPS.REPOSITORY) } />
                            </CardView>
                        }
                    </>
                }

                <AddButtonBottom>
                    <CreateDrawer
                        options={ [
                            {
                                icon: <RegionalUploadIcon />,
                                title: 'Regional',
                                handleFromCreateDrawer: true
                            },
                            {
                                icon: <NonEnglishUploadIcon />,
                                title: 'Non English',
                                handleFromCreateDrawer: true
                            },
                            {
                                icon: <EnglishUploadIcon />,
                                title: 'English',
                                handleFromCreateDrawer: true
                            }] }
                        handleMultiData={ handleShow }
                        isShowAddIcon={ true }
                        title="Upload File"
                        navigateToMultiFile={ true }
                    >
                    </CreateDrawer>
                </AddButtonBottom>

                {
                    showDeleteWarning &&
                    <WarningDialog
                        warningIcon={ <DeleteWarningIcon /> }
                        message={ WARNING_MESSAGES.DELETE }
                        handleYes={ handleYesWarning }
                        handleNo={ handleCloseWarning }
                        isOpen={ true }
                    />
                }

                {
                    showSaveIcon &&
                    <WarningDialog
                        warningIcon={ <DeleteWarningIcon /> }
                        message={ WARNING_MESSAGES.REPOSITORY }
                        handleYes={ handleYesSaveWarning }
                        handleNo={ handleCloseSaveWarning }
                        isOpen={ true }
                    />
                }

                {
                    showDownloadWarning &&
                    <WarningDialog
                        message={ WARNING_MESSAGES.DOWNLOAD }
                        handleYes={ handleFileDownloadYesWarning }
                        handleNo={ handleFileDownloadCloseWarning }
                        isOpen={ true }
                    />
                }

                {
                    showSubmissionReport &&
                    <WarningDialog
                        message={ WARNING_MESSAGES.DOWNLOAD }
                        handleYes={ handleSubmissionDownloadYesWarning }
                        handleNo={ handleSubmissionDownloadCloseWarning }
                        isOpen={ true }
                    />
                }

                <PaginationContainer>
                    <Pagination
                        count={ pageDetails?.totalPages }
                        onChange={ handleChange }
                        color="primary"
                        variant="outlined"
                        shape="rounded"
                    />
                </PaginationContainer>
            </>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    pageDetails: state?.submission?.folderSubmissionData?.page,
    folderSubmissionData: state?.submission?.folderSubmissionData?._embedded?.submissionsDTOList,
    isLoadingSubmission: state?.submission?.isLoadingSubmission,
    isLoadingUpload: state?.instructorMyFolders?.isLoadingUpload,
    isLoadingDownload: state?.submission?.isLoadingDownload,
    isLoadingBulkDownload: state?.submission?.isLoadingBulkDownload,
    extractedFileData: state?.instructorMyFolders?.extractedFileData,
    uploadData: state?.instructorMyFolders?.uploadData,
    isLoadingGrammarReport: state?.submission?.isLoadingGrammarReport,
    isLoadingSubmissionReport: state?.submission?.isLoadingSubmissionReport
});

const mapDispatchToProps = (dispatch) => {
    return {
        folderSubmissionsFileData: (url, PaginationValue) => dispatch(folderSubmissionsFileData(url, PaginationValue)),
        DownloadOriginalFile: (data) => dispatch(DownloadOriginalFile(data)),
        DeletefolderSubmissionData: (url) => dispatch(DeletefolderSubmissionData(url)),
        SaveToRepoBulk: (url) => dispatch(SaveToRepoBulk(url)),
        DownloadCsv: (url, title) => dispatch(DownloadCsv(url, title)),
        UploadFileDataClear: () => dispatch(UploadFileDataClear()),
        UploadZipFileDataClear: () => dispatch(UploadZipFileDataClear()),
        GetGrammarReport: (url) => dispatch(GetGrammarReport(url)),
        SubmissionReportBulkDownload: (url, requestPayload) => dispatch(SubmissionReportBulkDownload(url, requestPayload)),
        SubmissionReportDownload: (url, data) => dispatch(SubmissionReportDownload(url, data)),
    };
};

folderSubmission.layout = ProUser;

export default connect(mapStateToProps, mapDispatchToProps)(folderSubmission);
