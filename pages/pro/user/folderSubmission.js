import React, { useState, useEffect, useMemo } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import debouce from 'lodash.debounce';
import { Grid, Tooltip } from '@mui/material';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import { Pagination, IconButton } from '@mui/material';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import { TextField } from '@mui/material';
import ProUser from '../../../layouts/ProUser';
import {
    CommonTable,
    BreadCrumb,
    MainHeading,
    CreateDrawer,
    WarningDialog,
    SimilarityStatus
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
} from '../../../redux/action/common/Submission/SubmissionAction';
import { DeleteIcon, DeleteWarningIcon, DownloadIcon, RegionalUploadIcon, NonEnglishUploadIcon, EnglishUploadIcon } from '../../../assets/icon';
import { PaginationValue } from '../../../utils/PaginationUrl';
import { formatDate, removeCommaWordEnd } from '../../../utils/RegExp';
import { PaginationContainer } from '../../style/index';
import { BASE_URL_PRO, BASE_URL_ANALYSIS, BASE_URL_UPLOAD, BASE_URL_REGIONAL_ANALYSIS } from '../../../utils/BaseUrl';
import END_POINTS_PRO from '../../../utils/EndPointPro';
import { DOWNLOAD_CSV, WARNING_MESSAGES, FILE_LANGUAGE } from '../../../constant/data/Constant';

const columns = [
    { id: 'name', label: 'Author Name' },
    { id: 'title', label: 'Paper Title' },
    { id: 'original_fn', label: 'Original File', isDownload: true },
    { id: 'grammar_url', label: 'Grammar' },
    { id: 'percent', label: 'Similarity' },
    { id: 'paper_id', label: 'Paper ID' },
    { id: 'date_up', label: 'Submission Date' },
    { id: 'action', label: 'Action' },
];

function createData(id, name, title, original_fn, grammar, grammar_url, percent, paper_id, date_up, action, d_key, alert_msg, repository_status, language) {
    return {
        id, name, title, original_fn, grammar, grammar_url, percent, paper_id, date_up, action, d_key, alert_msg, repository_status, language
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
    GetGrammarReport
}) => {

    const router = useRouter();
    const [rows, setRows] = useState([]);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [deleteRowData, setDeleteRowData] = useState('');
    const [saveRowData, setSaveRowData] = useState('');
    const [showSaveIcon, setShowSaveIcon] = useState(false);
    const [showDeleteAllIcon, setShowDeleteAllIcon] = useState(false);
    const [showDownloadWarning, setShowDownloadWarning] = useState(false);
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
                    submission.grammar,
                    submission.grammar_url,
                    <SimilarityStatus percent={submission.percent} />,
                    submission.paper_id,
                    formatDate(submission.date_up),
                    [
                        { 'component': <DeleteIcon />, 'type': 'delete', 'title': 'Delete' }
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

    const handleAction = (event, icon, rowData) => {
        if (icon === 'delete') {
            setDeleteRowData(rowData?.paper_id);
            setShowDeleteWarning(true);
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
            setPaginationPayload({ ...paginationPayload, paginationPayload });
        } else {
            delete paginationPayload['search'];
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

    /**
  * show analysis page
  */
    const handleShowAnalysisPage = (e, row) => {
        if (row?.language === FILE_LANGUAGE.REGIONAL) {
            let url = BASE_URL_REGIONAL_ANALYSIS + row.paper_id + '/' + row.d_key;
            window.open(url, '_blank', 'location=yes,scrollbars=yes,status=yes');
        } else {
            let token = localStorage.getItem('token');
            let url = BASE_URL_ANALYSIS + row.paper_id + '/' + row.d_key + '/' + token;
            window.open(url, '_blank', 'location=yes,scrollbars=yes,status=yes');
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

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <BreadCrumb item={UserBreadCrumb} />
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
                            placeholder='Search'
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

                <CommonTable
                    isCheckbox={true}
                    isSorting={true}
                    tableHeader={columns}
                    tableData={rows}
                    handleAction={handleAction}
                    handleTableSort={handleTableSort}
                    handleCheckboxSelect={handleCheckboxSelect}
                    handleSingleSelect={handleSingleSelect}
                    downloadSubmissionFile={handleOriginalFileDownload}
                    showAnalysisPage={handleShowAnalysisPage}
                    showGrammarReport={handlGrammarReport}
                    isLoading={isLoadingSubmission}
                    isLoadingGrammarReport={isLoadingGrammarReport}
                    charLength={10}
                    path=''
                />

                <AddButtonBottom>
                    <CreateDrawer
                        options={[
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

                <PaginationContainer>
                    <Pagination
                        count={pageDetails?.totalPages}
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
    folderSubmissionData: state?.submission?.folderSubmissionData?._embedded?.submissionsDTOList,
    isLoadingSubmission: state?.submission?.isLoadingSubmission,
    isLoadingUpload: state?.instructorMyFolders?.isLoadingUpload,
    isLoadingDownload: state?.submission?.isLoadingDownload,
    extractedFileData: state?.instructorMyFolders?.extractedFileData,
    uploadData: state?.instructorMyFolders?.uploadData,
    isLoadingGrammarReport: state?.submission?.isLoadingGrammarReport
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
    };
};

folderSubmission.layout = ProUser;

export default connect(mapStateToProps, mapDispatchToProps)(folderSubmission);
