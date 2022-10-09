import React, { useState, useEffect, useMemo } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import debouce from 'lodash.debounce';
import { Grid, Tooltip } from '@mui/material';
import { Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import { Pagination, IconButton } from '@mui/material';
import { TextField } from '@mui/material';
import Instructor from '../../../layouts/Instructor';
import {
    CardView,
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
} from '../../../redux/action/common/Submission/SubmissionAction';
import {
    folderSubmissionsFileData,
    DeletefolderSubmissionData,
    DownloadOriginalFile
} from '../../../redux/action/common/Submission/SubmissionAction';
import { DeleteIcon, DeleteWarningIcon, DownloadIcon } from '../../../assets/icon';
import { PaginationValue } from '../../../utils/PaginationUrl';
import { formatDate, removeCommaWordEnd } from '../../../utils/RegExp';
import { PaginationContainer } from '../../style/index';
import { BASE_URL_EXTREM, BASE_URL_ANALYSIS } from '../../../utils/BaseUrl';
import END_POINTS from '../../../utils/EndPoints';
import { DOWNLOAD_CSV } from '../../../constant/data/Constant';

const columns = [
    { id: 'name', label: 'Author Name' },
    { id: 'title', label: 'Paper Title' },
    { id: 'original_fn', label: 'Original File', isDownload: true },
    { id: 'grammar', label: 'Grammar' },
    { id: 'percent', label: 'Similarity' },
    { id: 'paper_id', label: 'Paper ID' },
    { id: 'date_up', label: 'Submission Date' },
    { id: 'action', label: 'Action' },
];

function createData(id, name, title, original_fn, grammar, percent, paper_id, date_up, action, d_key) {
    return {
        id, name, title, original_fn, grammar, percent, paper_id, date_up, action, d_key
    };
}

const AddButtonBottom = styled.div`
    position:fixed;
    bottom: 30px;
    right:30px;
`;

const SkeletonContainer = styled.div`
    margin-top: 10px;
    margin-right: 5px;
`;

const DownloadField = styled.div`
    position:absolute;
    top: 125px;
    right:225px;
`;

const DownloadButton = styled.div`
    margin-top:-5px;
`;

const folderSubmission = ({
    folderSubmissionsFileData,
    DownloadCsv,
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
    UploadZipFileDataClear
}) => {

    const router = useRouter();
    const [rows, setRows] = useState([]);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [deleteRowData, setDeleteRowData] = useState('');
    const [showDeleteAllIcon, setShowDeleteAllIcon] = useState(false);
    const [showDownloadWarning, setShowDownloadWarning] = useState(false);
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
        field: 'name',
        orderBy: PaginationValue?.orderBy,
    });

    useEffect(() => {
        if (router.isReady) {
            folderSubmissionsFileData(BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_SUBMISSION_GRADING_QNA + 'myFolder/' + folderId + '/submissions', paginationPayload);
        }
    }, [router.isReady, paginationPayload]);

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
                    submission.grammar,
                    < SimilarityStatus percent={submission.percent} />,
                    submission.paper_id,
                    formatDate(submission.date_up),
                    [
                        { 'component': <DeleteIcon />, 'type': 'delete', 'title': 'Delete' }
                    ],
                    submission.d_key
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

    const handleYesWarning = () => {
        DeletefolderSubmissionData(BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_SUBMISSION_GRADING_QNA + `myFolder/${folderId}/submissions?paperId=${deleteRowData}`);
        setShowDeleteAllIcon(false);
        setTimeout(() => {
            setShowDeleteWarning(false);
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

    const handleDownload = () => {
        DownloadCsv(BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_SUBMISSION_GRADING_QNA + `myFolder/${folderId}/downloadSubmissions`, DOWNLOAD_CSV.SUBMISSION_REPORT);
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
            path: 'folderSubmission'
        };
        DownloadOriginalFile(detailedData);
        setShowDownloadWarning(false);
        setTimeout(() => {
            setShowDownloadWarning(false);
        }, [100]);
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
        router.push({ pathname: '/extream/instructor/uploadFileFolderSubmission', query: router.query });
    };

    const handleRefresh = () => {
        folderSubmissionsFileData(BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_SUBMISSION_GRADING_QNA + 'myFolder/' + folderId + '/submissions', paginationPayload);
    };

    /**
 * show analysis page
 */
    const handleShowAnalysisPage = (e, row) => {
        let token = localStorage.getItem('token');
        let url = BASE_URL_ANALYSIS + row.paper_id + '/' + row.d_key + '/' + token;
        window.open(url, '_blank', 'location=yes,scrollbars=yes,status=yes');
    };

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <BreadCrumb item={InstructorBreadCrumb} />
                <Grid container spacing={1}>
                    <Grid item md={8} xs={7}>
                        <MainHeading title={`Submissions (${pageDetails?.totalElements !== undefined ? pageDetails?.totalElements : 0})`} />
                    </Grid>
                    <Grid item md={4} xs={12} container direction='row' justifyContent={'right'}>
                        <DownloadField>
                            <DownloadButton>
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
                                    <Skeleton width={ 40 } />
                                    :
                                    <Tooltip title="Download csv" arrow>
                                        <IconButton
                                            aria-label="download-file"
                                            size="large"
                                            onClick={ handleDownload }>
                                            <DownloadIcon />
                                        </IconButton>
                                    </Tooltip>
                                }
                            </DownloadButton>
                        </DownloadField>
                        {/* <DownloadField>
                            {folderSubmissionData?.length > 0 &&
                                isLoadingDownload ? <SkeletonContainer>
                                    <Skeleton width={50} />
                                </SkeletonContainer> :
                                <Tooltip title="Download csv" arrow>
                                    <IconButton
                                        color="primary"
                                        aria-label="download-file"
                                        size="large"
                                        onClick={handleDownload}>
                                        <DownloadIcon />
                                    </IconButton>
                                </Tooltip>
                            }
                        </DownloadField> */}
                        <TextField
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
            <CardView>

                {_.find(rows, function (o) { return o.isSelected === true; }) && <div style={{ textAlign: 'right' }}>
                    <Tooltip title='Delete' arrow>
                        <IconButton onClick={deleteAllSubmission}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </div>}

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
                    showAnalysisPage={ handleShowAnalysisPage }
                    isLoading={isLoadingSubmission}
                    charLength={10}
                    path=''
                />

                <AddButtonBottom>
                    <CreateDrawer
                        title="Upload File"
                        isShowAddIcon={true}
                        navigateToMultiFile={true}
                        handleNavigateMultiFile={handleUploadFile}
                    />
                </AddButtonBottom>

                {
                    showDeleteWarning &&
                    <WarningDialog
                        warningIcon={<DeleteWarningIcon />}
                        message="Are you sure you want to delete ?"
                        handleYes={handleYesWarning}
                        handleNo={handleCloseWarning}
                        isOpen={true}
                    />
                }

                {
                    showDownloadWarning &&
                    <WarningDialog
                        message="Are you sure you want to download ?"
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
            </CardView>
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
});

const mapDispatchToProps = (dispatch) => {
    return {
        folderSubmissionsFileData: (url, PaginationValue) => dispatch(folderSubmissionsFileData(url, PaginationValue)),
        DownloadOriginalFile: (data) => dispatch(DownloadOriginalFile(data)),
        DeletefolderSubmissionData: (url) => dispatch(DeletefolderSubmissionData(url)),
        DownloadCsv: (url, title) => dispatch(DownloadCsv(url, title)),
        UploadFileDataClear: () => dispatch(UploadFileDataClear()),
        UploadZipFileDataClear: () => dispatch(UploadZipFileDataClear())
    };
};

folderSubmission.layout = Instructor;

export default connect(mapStateToProps, mapDispatchToProps)(folderSubmission);
