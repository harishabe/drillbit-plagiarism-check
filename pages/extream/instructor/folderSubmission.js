import React, { useState, useEffect, useMemo } from 'react';
import _ from 'lodash';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import debouce from 'lodash.debounce';
import { Grid, Tooltip } from '@mui/material';
import { Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import { Pagination, IconButton } from '@mui/material';
import { TextField } from '@mui/material';
import Instructor from '../../../layouts/Instructor';
import PageChange from '../../../components/loader/PageChange';
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
    folderSubmissionsFileData,
    DeletefolderSubmissionData,
    SubmissionReportDownload
} from '../../../redux/action/common/Submission/SubmissionAction';
import { DeleteIcon, DeleteWarningIcon, DownloadIcon, AddFromListIcon, AddMultipleIcon } from '../../../assets/icon';
import { PaginationValue } from '../../../utils/PaginationUrl';
import { formatDate, removeCommaWordEnd, windowOpen, getItemSessionStorage } from '../../../utils/RegExp';
import { PaginationContainer } from '../../../style/index';
import { BASE_URL_ANALYSIS_GATEWAY, BASE_URL_EXTREM, BASE_URL_ANALYSIS, BASE_URL_UPLOAD } from '../../../utils/BaseUrl';
import END_POINTS from '../../../utils/EndPoints';
import { DOWNLOAD_CSV, WARNING_MESSAGES, NO_DATA_PLACEHOLDER, NA_DATA_PLACEHOLDER, SUBMISSION_DELAY } from '../../../constant/data/Constant';
import { INSTRUCTIONS_STEPS } from '../../../constant/data/InstructionMessage';

const columns = [
    { id: 'name', label: 'Name', maxWidth: 90 },
    { id: 'title', label: 'Title', maxWidth: 90 },
    { id: 'original_fn', label: 'File', isDownload: true, maxWidth: 90 },
    { id: 'lang1', label: 'Language', maxWidth: 70 },
    { id: 'grammar_url', label: 'Grammar', maxWidth: 100 },
    { id: 'percent', label: 'Similarity', maxWidth: 100 },
    { id: 'paper_id', label: 'Paper ID', maxWidth: 80 },
    { id: 'date_up', label: 'Submission Date', maxWidth: 100 },
    { id: 'action', label: 'Action', maxWidth: 250 },
];

function createData(id, name, title, original_fn, lang1, grammar, grammar_url, percent, paper_id, date_up, action, d_key, alert_msg, repository_status, flag) {
    return {
        id, name, title, original_fn, lang1, grammar, grammar_url, percent, paper_id, date_up, action, d_key, alert_msg, repository_status, flag
    };
}

const AddButtonBottom = styled.div`
    position:fixed;
    bottom: 30px;
    right:30px;
    z-index:999;
`;

const DownloadField = styled.div`
    position:absolute;
    top: 115px;
    right:225px;
`;

const RefreshButton = styled.div`
    position:absolute;
    top: 115px;
    right:265px;
`;

const SkeletonContainer = styled.div`
    margin-top: 16px;
    margin-right: 5px;
`;

const DeleteAllButton = styled.div`
    marginLeft: 10px;
    display: flex
`;

const folderSubmission = ({
    folderSubmissionsFileData,
    DownloadCsv,
    SaveToRepoBulk,
    DownloadOriginalFile,
    DeletefolderSubmissionData,
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
    SubmissionReportDownload,
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

    const InstructorBreadCrumb = [
        {
            name: 'Dashboard',
            link: '/extream/instructor/dashboard',
            active: false,
        },
        {
            name: 'My folder',
            link: '/extream/instructor/myfolder',
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
            folderSubmissionsFileData(BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_SUBMISSION_GRADING_QNA + 'myFolder/' + folderId + '/submissions', paginationPayload);
        }
    }, [router.isReady, paginationPayload]);

    useEffect(() => {
        const result = rows?.some((item) => item?.percent?.props?.percent === '--');
        if (result) {
            const intervalId = setInterval(() => {
                folderSubmissionsFileData(BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_SUBMISSION_GRADING_QNA + 'myFolder/' + folderId + '/submissions', paginationPayload);
            }, SUBMISSION_DELAY);

            return () => {
                clearInterval(intervalId);
            };
        }
    }, [rows]);

    useEffect(() => {
        let row = '';
        let arr = [];
        folderSubmissionData?.map((submission) => {
            row =
                createData(
                    submission.ass_id,
                    submission.name,
                    submission.title,
                    submission.original_fn,
                    submission.lang1,
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
                    submission.rep_status
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

    const handleFileDownloadCloseWarning = () => {
        setShowDownloadWarning(false);
    };

    const handleSubmissionDownloadCloseWarning = () => {
        setShowSubmissionReport(false);
    };

    const handleYesWarning = () => {
        DeletefolderSubmissionData(BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_SUBMISSION_GRADING_QNA + `myFolder/${folderId}/submissions?paperId=${deleteRowData}`);
        setShowDeleteAllIcon(false);
        setTimeout(() => {
            setShowDeleteWarning(false);
        }, [100]);
    };

    const handleYesSaveWarning = () => {
        SaveToRepoBulk(BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_SUBMISSION_GRADING_QNA + `myFolder/${folderId}/repository?paperId=${saveRowData}`);
        setShowDeleteAllIcon(false);
        setTimeout(() => {
            setShowSaveIcon(false);
        }, [100]);
    };

    const handleSubmissionDownloadYesWarning = () => {
        SubmissionReportDownload(BASE_URL_ANALYSIS_GATEWAY + END_POINTS.SIMILARITY_REPORT_SINGLE_DOWNLOAD + `${submissionReportData?.paper_id}/${submissionReportData?.d_key}`, submissionReportData);
        setShowSubmissionReport(false);
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
        DownloadCsv(BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_SUBMISSION_GRADING_QNA + `myFolder/${folderId}/downloadSubmissions`, DOWNLOAD_CSV.SUBMISSION_REPORT);
    };

    const handleOriginalFileDownload = (e, data) => {
        e.preventDefault();
        setShowDownloadWarning(true);
        setData(data);
    };

    const handleFileDownloadYesWarning = () => {
        let detailedData = {
            folderId: folderId,
            paperId: data?.paper_id,
            name: data?.original_fn,
            path: 'folderSubmission'
        };
        DownloadOriginalFile(detailedData);
        setShowDownloadWarning(false);
        setTimeout(() => {
            setShowDownloadWarning(false);
        }, [100]);
    };

    //     /**
    //    * file upload single, multiple and zip file
    //    */
    //     const handleUploadFile = () => {
    //         if (extractedFileData) {
    //             UploadFileDataClear();
    //         }
    //         if (uploadData) {
    //             UploadZipFileDataClear();
    //         }
    //         router.push({ pathname: '/extream/instructor/uploadFileFolderSubmission', query: router.query });
    //     };

    useEffect(() => {
        if (extractedFileData) {
            UploadFileDataClear();
        }
        if (uploadData) {
            UploadZipFileDataClear();
        }
    }, [uploadData, extractedFileData]);

    const handleRefresh = () => {
        folderSubmissionsFileData(BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_SUBMISSION_GRADING_QNA + 'myFolder/' + folderId + '/submissions', paginationPayload);
    };

    /**
     * show analysis page
     */
    const handleShowAnalysisPage = (e, row) => {
        let token = getItemSessionStorage('token');
        let url = BASE_URL_ANALYSIS + row.paper_id + '/' + row.d_key + '/' + token;
        windowOpen(url);
    };

    const handlGrammarReport = (grammar) => {
        GetGrammarReport(BASE_URL_UPLOAD + END_POINTS.GRAMMAR_REPORT + grammar);
    }

    const handleShow = (e, info) => {
        if (info?.title === 'English') {
            router.push({ pathname: '/extream/instructor/uploadFileFolder/englishFile', query: router.query });
        } else if (info?.title === 'Non English') {
            router.push({ pathname: '/extream/instructor/uploadFileFolder/nonEnglishFile', query: router.query });
        }
    };

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <BreadCrumb item={InstructorBreadCrumb} />
                <Grid container spacing={1}>
                    <Grid item md={5} xs={5}>
                        <MainHeading title={`Submissions (${pageDetails?.totalElements !== undefined ? pageDetails?.totalElements : 0})`} />
                    </Grid>
                    <Grid item md={7} xs={7} style={{ textAlign: 'right' }}>

                        <Tooltip title="Refresh" arrow>
                            <IconButton
                                aria-label="download-file"
                                size="large"
                                onClick={handleRefresh}
                            >
                                <RefreshOutlinedIcon />
                            </IconButton>
                        </Tooltip>

                        {folderSubmissionData?.length > 0 &&
                            isLoadingDownload ?
                            <Skeleton width={50} style={{ display: 'inline-block', marginRight: '10px' }} />
                            :
                            <Tooltip title="Submission report download" arrow>
                                <IconButton
                                    aria-label="download-file"
                                    size="large"
                                    onClick={handleDownload}>
                                    <DownloadIcon />
                                </IconButton>
                            </Tooltip>
                        }

                        <TextField
                            sx={{ width: '40%', marginTop: '8px' }}
                            placeholder='Search by Paper ID'
                            onChange={debouncedResults}
                            inputProps={{
                                style: {
                                    padding: 5,
                                    display: 'inline-flex',
                                },
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
            <>

                {_.find(rows, function (o) { return o.isSelected === true; }) && <DeleteAllButton>
                    <Tooltip title='Delete' arrow>
                        <IconButton onClick={deleteAllSubmission}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title='Save to repository' arrow>
                        <IconButton onClick={saveAllSubmission}>
                            <SaveOutlinedIcon />
                        </IconButton>
                    </Tooltip>
                </DeleteAllButton>}
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
                        // isLoading={isLoadingSubmission}
                        isLoadingGrammarReport={ isLoadingGrammarReport }
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
                                // isLoading={isLoadingSubmission}
                                isLoadingGrammarReport={ isLoadingGrammarReport }
                                path=''
                            /> :
                            <CardView>
                                <Instructions message={ Object.values(INSTRUCTIONS_STEPS.SUBMISSION) } />
                            </CardView>
                        }
                    </>
                }

                <AddButtonBottom>
                    <CreateDrawer
                        options={[
                            {
                                icon: <AddMultipleIcon />,
                                title: 'Non English',
                                handleFromCreateDrawer: true
                            },
                            {
                                icon: <AddFromListIcon />,
                                title: 'English',
                                handleFromCreateDrawer: true
                            }]}
                        handleMultiData={handleShow}
                        isShowAddIcon={true}
                        title="Upload File"
                        navigateToMultiFile={true}
                    >
                    </CreateDrawer>
                </AddButtonBottom>

                {
                    showDeleteWarning &&
                    <WarningDialog
                        warningIcon={<DeleteWarningIcon />}
                        message={WARNING_MESSAGES.DELETE}
                        handleYes={handleYesWarning}
                        handleNo={handleCloseWarning}
                        isOpen={true}
                    />
                }

                {
                    showSaveIcon &&
                    <WarningDialog
                        warningIcon={<DeleteWarningIcon />}
                        message={WARNING_MESSAGES.REPOSITORY}
                        handleYes={handleYesSaveWarning}
                        handleNo={handleCloseSaveWarning}
                        isOpen={true}
                    />
                }

                {
                    showDownloadWarning &&
                    <WarningDialog
                        message={WARNING_MESSAGES.DOWNLOAD}
                        handleYes={handleFileDownloadYesWarning}
                        handleNo={handleFileDownloadCloseWarning}
                        isOpen={true}
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
                        count={pageDetails?.totalPages}
                        page={ pageDetails?.number + 1 }
                        onChange={handleChange}
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
    folderSubmissionData: state?.submission?.folderSubmissionData?._embedded?.submissionsList,
    isLoadingSubmission: state?.submission?.isLoadingSubmission,
    isLoadingUpload: state?.instructorMyFolders?.isLoadingUpload,
    isLoadingDownload: state?.submission?.isLoadingDownload,
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
        DownloadCsv: (url, title) => dispatch(DownloadCsv(url, title)),
        SaveToRepoBulk: (url) => dispatch(SaveToRepoBulk(url)),
        UploadFileDataClear: () => dispatch(UploadFileDataClear()),
        UploadZipFileDataClear: () => dispatch(UploadZipFileDataClear()),
        GetGrammarReport: (url) => dispatch(GetGrammarReport(url)),
        SubmissionReportDownload: (url, data) => dispatch(SubmissionReportDownload(url, data)),
    };
};

folderSubmission.layout = Instructor;

export default connect(mapStateToProps, mapDispatchToProps)(folderSubmission);
