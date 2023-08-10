import React, { useState, useEffect, useMemo } from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import HistoryIcon from '@mui/icons-material/History';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import Instructor from '../../../../layouts/Instructor';
import PageChange from '../../../../components/loader/PageChange';
import {
    CommonTable,
    CreateDrawer,
    WarningDialog,
    SimilarityStatus,
    DialogModal,
    Instructions,
    CardView,
} from '../../../../components';
import {
    DeleteWarningIcon,
    NonEnglishUploadIcon,
    EnglishUploadIcon
} from '../../../../assets/icon';
import { connect } from 'react-redux';
import {
    GetSubmissionList,
    DeleteSubmission,
    UploadFileDataClear,
    UploadZipFileDataClear,
} from '../../../../redux/action/instructor/InstructorAction';
import {
    DownloadCsv,
    SaveToRepoBulk,
    DownloadOriginalFile,
    GetGrammarReport,
    SubmissionReportDownload
} from '../../../../redux/action/common/Submission/SubmissionAction';
import { useRouter } from 'next/router';
import { TextField, Pagination } from '@mui/material';
import { Grid, Tooltip } from '@mui/material';
import debouce from 'lodash.debounce';
import { Skeleton } from '@mui/material';
import { PaginationValue } from '../../../../utils/PaginationUrl';
import { IconButton } from '@mui/material';
import styled from 'styled-components';
import SubmissionForm from '../form/SubmissionForm';
import AssignmentForm from '../form/AssignmentForm';
import SubmissionHistoryPage from './submissionHistory';
import { removeCommaWordEnd, formatDate, platform, windowOpen, getItemSessionStorage } from '../../../../utils/RegExp';
import { PaginationContainer } from '../../../../style/index';
import { BASE_URL_ANALYSIS_GATEWAY, BASE_URL_ANALYSIS, BASE_URL_EXTREM, BASE_URL_UPLOAD } from '../../../../utils/BaseUrl';
import END_POINTS from '../../../../utils/EndPoints';
import { DOWNLOAD_CSV, FILE_LANGUAGE, WARNING_MESSAGES, WINDOW_PLATFORM, NO_DATA_PLACEHOLDER, NA_DATA_PLACEHOLDER, SUBMISSION_DELAY } from '../../../../constant/data/Constant';
import { INSTRUCTIONS_STEPS } from '../../../../constant/data/InstructionMessage';

const columns = [
    { id: 'name', label: 'Name', maxWidth: 90 },
    { id: 'title', label: 'Title', maxWidth: 90 },
    { id: 'original_fn', label: 'File', isDownload: true, maxWidth: 120 },
    { id: 'lang1', label: 'Language', maxWidth: 80 },
    { id: 'grammar_url', label: 'Grammar', minWidth: 100 },
    { id: 'percent', label: 'Similarity', maxWidth: 120 },
    { id: 'paper_id', label: 'Paper ID', maxWidth: 70 },
    { id: 'date_up', label: 'Submission Date', maxWidth: 100 },
    { id: 'action', label: 'Action', maxWidth: 110 },
];

function createData(id, d_key, name, title, original_fn, lang1, grammar, grammar_url, lang, percent, paper_id, date_up, action, alert_msg, repository_status, user_id, flag) {
    return {
        id, d_key, name, title, original_fn, lang1, grammar, grammar_url, lang, percent, paper_id, date_up, action, alert_msg, repository_status, user_id, flag
    };
}

const AddButtonBottom = styled.div`
    position:fixed;
    bottom: 30px;
    right:30px;
    z-index:999;
`;


const SkeletonContainer = styled.div`
    margin-top: 16px;
    margin-right: 5px;
`;

const SearchField = styled.div`
    position:absolute;
    top: 125px;
    right:16px;
`;

const DownloadField = styled.div`
    position:absolute;
    top: 123px;
    right:205px;
`;

const DownloadButton = styled.div`
    margin-top:-5px;
    margin-right:${platform === WINDOW_PLATFORM ? '25px' : '0px'};
`;

const DeleteAllButton = styled.div`
    marginLeft: 10px;
    display: flex;
`;

const Submission = ({
    GetSubmissionList,
    DownloadCsv,
    DownloadOriginalFile,
    DeleteSubmission,
    SaveToRepoBulk,
    submissionData,
    isLoading,
    isLoadingUpload,
    isLoadingDownload,
    pageDetails,
    UploadFileDataClear,
    extractedFileData,
    uploadData,
    UploadZipFileDataClear,
    isLoadingGrammarReport,
    GetGrammarReport,
    SubmissionReportDownload,
    isLoadingSubmissionReport
}) => {
    const router = useRouter();
    const clasId = router.query.clasId;
    const assId = router.query.assId;
    const [rows, setRows] = useState([]);
    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: 'paper_id',
        orderBy: PaginationValue?.orderBy,
    });
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [search, setSearch] = useState(false);
    const [showSubmissionReport, setShowSubmissionReport] = useState(false);
    const [submissionReportData, setSubmissionReportData] = useState('');
    const [editAssignment, setEditAssignment] = useState(false);
    const [editAssignmentData, setEditAssignmentData] = useState('');
    const [deleteRowData, setDeleteRowData] = useState('');
    const [historyUserId, setHistoryUserId] = useState('');
    const [showDialogModal, setShowDialogModal] = useState(false);
    const [saveRowData, setSaveRowData] = useState('');
    const [showSaveIcon, setShowSaveIcon] = useState(false);
    const [showDeleteAllIcon, setShowDeleteAllIcon] = useState(false);
    const [showDownloadWarning, setShowDownloadWarning] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        if (router.isReady) {
            let url = `classes/${clasId}/assignments/${assId}/submissions?page=${paginationPayload?.page}&size=${paginationPayload?.size}&field=${paginationPayload?.field}&orderBy=${paginationPayload?.orderBy}`;
            GetSubmissionList(url);
        }
    }, [router.isReady, paginationPayload]);

    useEffect(() => {
        if (isLoading) {
            setRows([])
        }
    }, [isLoading]);

    useEffect(() => {
        const result = rows?.some((item) => item?.percent?.props?.percent === '--');
        if (result) {
            const intervalId = setInterval(() => {
                let url = `classes/${clasId}/assignments/${assId}/submissions?page=${paginationPayload?.page}&size=${paginationPayload?.size}&field=${paginationPayload?.field}&orderBy=${paginationPayload?.orderBy}`;
                GetSubmissionList(url);
            }, SUBMISSION_DELAY);

            return () => {
                clearInterval(intervalId);
            };
        }
    }, [rows]);

    /**
   * table submission data
   */
    useEffect(() => {
        let row = '';
        let arr = [];
        submissionData?.map((submission) => {
            row = createData(
                submission.ass_id,
                submission.d_key,
                submission.name,
                submission.title,
                submission.original_fn,
                submission.lang1,
                submission.grammar,
                submission.grammar_url,
                submission.lang,
                <SimilarityStatus percent={ submission.percent } flag={ submission.flag } />,
                submission.paper_id,
                formatDate(submission.date_up),
                [
                    { 'component': <DeleteOutlineOutlinedIcon fontSize='small' />, 'type': 'delete', 'title': 'Delete' },
                    { 'component': <HistoryIcon fontSize='small' />, 'type': 'history', 'title': 'Submission History' },
                    (submission.percent === (NO_DATA_PLACEHOLDER || NA_DATA_PLACEHOLDER)) ?
                        {
                            'component': <FileDownloadOutlinedIcon fontSize='small' />,
                            'title': 'Similarity report not ready'
                        } :
                        {
                            'component': <FileDownloadOutlinedIcon fontSize='small' />,
                            'type': 'download',
                            'title': 'Similarity report download'
                        }
                ],
                submission.alert_msg,
                submission.rep_status,
                submission.user_id,
            );
            row['isSelected'] = false;
            arr.push(row);
        });
        setRows([...arr]);
    }, [submissionData]);

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

    /**
   * handle pagination
   * @param {*} event 
   * @param {*} value 
   */
    const handlePagination = (event, value) => {
        event.preventDefault();
        setPaginationPayload({ ...paginationPayload, page: value - 1 });
    };

    /**
   * search submissions
   * @param {*} event 
   */
    const handleSearch = (event) => {
        if (event.target.value !== '') {
            let url = `classes/${clasId}/assignments/${assId}/submissions?page=${PaginationValue?.page}&size=${PaginationValue?.size}&field=name&orderBy=${PaginationValue?.orderBy}&search=${event.target.value}`;
            setSearch(true)
            GetSubmissionList(url);
        } else {
            let url = `classes/${clasId}/assignments/${assId}/submissions?page=${PaginationValue?.page}&size=${PaginationValue?.size}&field=name&orderBy=${PaginationValue?.orderBy}`;
            setSearch(false)
            GetSubmissionList(url);
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


    const handleAction = (event, icon, rowData) => {
        if (icon === 'edit') {
            setEditAssignment(true);
            setEditAssignmentData(rowData);
        } else if (icon === 'delete') {
            setDeleteRowData(rowData?.paper_id);
            setShowDeleteWarning(true);
        } else if (icon === 'history') {
            setHistoryUserId(rowData?.user_id);
            setShowDialogModal(true);
        } else if (icon === 'download') {
            setSubmissionReportData(rowData);
            setShowSubmissionReport(true);
        }
    };

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

    /**
   * file upload single, multiple and zip file
   */
    const handleUploadFile = () => {
        if (extractedFileData) {
            UploadFileDataClear();
        }
        if (uploadData) {
            UploadZipFileDataClear();
        }
        router.push({ pathname: '/extream/instructor/uploadFile', query: router.query });
    };

    const handleCloseDialog = () => {
        setShowDialogModal(false);
    };

    /**
   * table sorting order - ascending and descending
   * @param {*} e 
   * @param {*} column 
   * @param {*} sortToggle 
   */
    const handleTableSort = (e, column, sortToggle) => {
        if (sortToggle) {
            paginationPayload['field'] = column.id;
            paginationPayload['orderBy'] = 'asc';
        } else {
            paginationPayload['field'] = column.id;
            paginationPayload['orderBy'] = 'desc';
        }
        setPaginationPayload({ ...paginationPayload, paginationPayload });
    };

    const handleOriginalFileDownload = (e, data) => {
        e.preventDefault();
        setShowDownloadWarning(true);
        setData(data);
    };

    const handleFileDownloadCloseWarning = () => {
        setShowDownloadWarning(false);
    };

    const handleCloseWarning = () => {
        setShowDeleteWarning(false);
    };

    const handleCloseSaveWarning = () => {
        setShowSaveIcon(false);
    };

    const handleSubmissionDownloadCloseWarning = () => {
        setShowSubmissionReport(false);
    };

    const handleYesWarning = () => {
        DeleteSubmission(`classes/${clasId}/assignments/${assId}/submissions?paperId=${deleteRowData}`);
        setShowDeleteAllIcon(false);
        setTimeout(() => {
            setShowDeleteWarning(false);
        }, [100]);
    };

    const handleYesSaveWarning = () => {
        SaveToRepoBulk(BASE_URL_EXTREM + END_POINTS.CREATE_ASSIGNMENT + `${clasId}/assignments/${assId}/repository?paperId=${saveRowData}`);
        setShowDeleteAllIcon(false);
        setTimeout(() => {
            setShowSaveIcon(false);
        }, [100]);
    };

    const handleFileDownloadYesWarning = () => {
        let detailedData = {
            clasId: clasId,
            assId: assId,
            paperId: data?.paper_id,
            name: data?.original_fn,
            path: 'assignmentSubmission'
        };
        DownloadOriginalFile(detailedData);
        setShowDownloadWarning(false);
        setTimeout(() => {
            setShowDownloadWarning(false);
        }, [100]);
    };

    const handleSubmissionDownloadYesWarning = () => {
        SubmissionReportDownload(BASE_URL_ANALYSIS_GATEWAY + END_POINTS.SIMILARITY_REPORT_SINGLE_DOWNLOAD + `${submissionReportData?.paper_id}/${submissionReportData?.d_key}`, submissionReportData);
        setShowSubmissionReport(false);
    };

    /**
   * show analysis page
   */

    const handleShowAnalysisPage = (e, row) => {
        let token = getItemSessionStorage('token');
        let url = BASE_URL_ANALYSIS + row.paper_id + '/' + row.d_key + '/' + token;
        windowOpen(url);
    };

    const handleDownload = () => {
        DownloadCsv(BASE_URL_EXTREM + END_POINTS.CREATE_ASSIGNMENT + `${clasId}/assignments/${assId}/downloadSubmissions`, DOWNLOAD_CSV.SUBMISSION_REPORT);
    };

    const handleRefresh = () => {
        let url = `classes/${clasId}/assignments/${assId}/submissions?page=${paginationPayload?.page}&size=${paginationPayload?.size}&field=${paginationPayload?.field}&orderBy=${paginationPayload?.orderBy}`;
        GetSubmissionList(url);
    };

    const handlGrammarReport = (grammar) => {
        GetGrammarReport(BASE_URL_UPLOAD + END_POINTS.GRAMMAR_REPORT + grammar);
    }

    const handleShow = (e, info) => {
        if (info?.title === 'English') {
            router.push({ pathname: '/extream/instructor/uploadFile/englishFile', query: router.query });
        } else if (info?.title === 'Non English') {
            router.push({ pathname: '/extream/instructor/uploadFile/nonEnglishFile', query: router.query });
        }
    };

    return (
        <React.Fragment>
            <Grid item container direction='row' justifyContent={ 'right' }>
                <DownloadField>
                    <DownloadButton>
                        <Tooltip title="Refresh" arrow>
                            <IconButton
                                aria-label="download-file"
                                size="large"
                                onClick={ handleRefresh }
                            >
                                <RefreshOutlinedIcon fontSize='medium' />
                            </IconButton>
                        </Tooltip>
                        { submissionData?.length > 0 &&
                            isLoadingDownload ?
                            <SkeletonContainer>
                                <Skeleton width={ 40 } />
                            </SkeletonContainer>
                            :
                            <Tooltip title="Download csv" arrow>
                                <IconButton
                                    aria-label="download-file"
                                    size="large"
                                    onClick={ handleDownload }>
                                    <FileDownloadOutlinedIcon fontSize='medium' />
                                </IconButton>
                            </Tooltip>
                        }
                    </DownloadButton>
                </DownloadField>
                <SearchField>
                    <TextField
                        placeholder='Search by Paper ID'
                        onChange={ debouncedResults }
                        inputProps={ {
                            style: {
                                padding: 5,
                                display: 'inline-flex',
                            },
                        } }
                    />
                </SearchField>
            </Grid>
            <AddButtonBottom>
                <CreateDrawer
                    options={ [
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
                //handleNavigateMultiFile={handleUploadFile}
                >
                    <SubmissionForm
                        clasId={ clasId }
                        folderId={ assId }
                        isLoadingUpload={ isLoadingUpload }
                    />
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
                editAssignment &&
                <CreateDrawer
                    title="Edit Student"
                        isShowAddIcon={ false }
                        showDrawer={ editAssignment }
                >
                    <AssignmentForm
                            editData={ editAssignmentData }
                    />
                </CreateDrawer>
            }

            { showDialogModal &&
                <>
                    <DialogModal
                        headingTitle="Submission history"
                        isOpen={ true }
                        fullWidth="xl"
                        maxWidth="xl"
                        handleClose={ handleCloseDialog }
                    >
                        <SubmissionHistoryPage
                            clasId={ clasId }
                            folderId={ assId }
                            historyUserId={ historyUserId }
                            handleOriginalFileDownload={ handleOriginalFileDownload }
                            handleShowAnalysisPage={ handleShowAnalysisPage }
                            handlGrammarReport={ handlGrammarReport }
                            isLoadingGrammarReport={ isLoadingGrammarReport }
                        />
                    </DialogModal>
                </>
            }

            { _.find(rows, function (o) { return o.isSelected === true; }) && <DeleteAllButton>
                <Tooltip title='Delete' arrow>
                    <IconButton onClick={ deleteAllSubmission }>
                        <DeleteOutlineOutlinedIcon fontSize='small' />
                    </IconButton>
                </Tooltip>
                <Tooltip title='Save to repositary' arrow>
                    <IconButton onClick={ saveAllSubmission }>
                        <SaveOutlinedIcon fontSize='small' />
                    </IconButton>
                </Tooltip>
            </DeleteAllButton> }

            { search ?
                <CommonTable
                    isCheckbox={ true }
                    isSorting={ true }
                    isSubmission={ true }
                    tableHeader={ columns }
                    tableData={ rows }
                    handleAction={ handleAction }
                    handleCheckboxSelect={ handleCheckboxSelect }
                    handleSingleSelect={ handleSingleSelect }
                    handleTableSort={ handleTableSort }
                    downloadSubmissionFile={ handleOriginalFileDownload }
                    showAnalysisPage={ handleShowAnalysisPage }
                    showGrammarReport={ handlGrammarReport }
                    // isLoading={ isLoading }
                    isLoadingGrammarReport={ isLoadingGrammarReport }
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
                            handleCheckboxSelect={ handleCheckboxSelect }
                            handleSingleSelect={ handleSingleSelect }
                            handleTableSort={ handleTableSort }
                            downloadSubmissionFile={ handleOriginalFileDownload }
                            showAnalysisPage={ handleShowAnalysisPage }
                            showGrammarReport={ handlGrammarReport }
                            // isLoading={ isLoading }
                            isLoadingGrammarReport={ isLoadingGrammarReport }
                        /> :
                        <CardView>
                            <Instructions message={ Object.values(INSTRUCTIONS_STEPS.SUBMISSION) } />
                        </CardView>
                    }
                </>
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
                    page={ pageDetails?.number + 1 }
                    onChange={ handlePagination }
                    color='primary'
                    variant='outlined'
                    shape='rounded'
                />
            </PaginationContainer>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    pageDetails: state?.instructorMyFolders?.submissionData?.page,
    isLoading: state?.instructorMyFolders?.isLoadingSubmission,
    isLoadingUpload: state?.instructorMyFolders?.isLoadingUpload,
    submissionData: state?.instructorMyFolders?.submissionData?._embedded?.submissionsList,
    extractedFileData: state?.instructorMyFolders?.extractedFileData,
    uploadData: state?.instructorMyFolders?.uploadData,
    isLoadingDownload: state?.submission?.isLoadingDownload,
    isLoadingGrammarReport: state?.submission?.isLoadingGrammarReport,
    isLoadingSubmissionReport: state?.submission?.isLoadingSubmissionReport
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetSubmissionList: (url) => dispatch(GetSubmissionList(url)),
        DeleteSubmission: (url) => dispatch(DeleteSubmission(url)),
        SaveToRepoBulk: (url) => dispatch(SaveToRepoBulk(url)),
        DownloadOriginalFile: (data) => dispatch(DownloadOriginalFile(data)),
        UploadFileDataClear: () => dispatch(UploadFileDataClear()),
        UploadZipFileDataClear: () => dispatch(UploadZipFileDataClear()),
        DownloadCsv: (url, title) => dispatch(DownloadCsv(url, title)),
        GetGrammarReport: (url) => dispatch(GetGrammarReport(url)),
        SubmissionReportDownload: (url, data) => dispatch(SubmissionReportDownload(url, data)),
    };
};

Submission.layout = Instructor;

export default connect(mapStateToProps, mapDispatchToProps)(Submission);
