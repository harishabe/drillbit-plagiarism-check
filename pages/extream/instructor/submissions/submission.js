import React, { useState, useEffect, useMemo } from 'react';
import _ from 'lodash';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import Instructor from '../../../../layouts/Instructor';
import {
    CardView,
    CommonTable,
    CreateDrawer,
    WarningDialog,
    SimilarityStatus
} from '../../../../components';
import { DeleteIcon, DeleteWarningIcon, DownloadIcon } from '../../../../assets/icon';
import { connect } from 'react-redux';
import {
    GetSubmissionList,
    DeleteSubmission,
    UploadFileDataClear,
    UploadZipFileDataClear,
} from '../../../../redux/action/instructor/InstructorAction';
import {
    DownloadCsv,
} from '../../../../redux/action/common/Submission/SubmissionAction';
import { DownloadOriginalFile } from '../../../../redux/action/common/Submission/SubmissionAction';
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
import { removeCommaWordEnd, formatDate } from '../../../../utils/RegExp';
import { PaginationContainer } from '../../../style/index';
import { BASE_URL_ANALYSIS } from '../../../../utils/BaseUrl';
import { BASE_URL_EXTREM } from '../../../../utils/BaseUrl';
import END_POINTS from '../../../../utils/EndPoints';
import { DOWNLOAD_CSV } from '../../../../constant/data/Constant';

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

function createData(id, d_key, name, title, original_fn, grammar, percent, paper_id, date_up, action) {
    return {
        id, d_key, name, title, original_fn, grammar, percent, paper_id, date_up, action
    };
}

const AddButtonBottom = styled.div`
    position:fixed;
    bottom: 30px;
    right:30px;
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
    top: 125px;
    right:225px;
`;

const DownloadButton = styled.div`
    margin-top:-5px;
`;

const Submission = ({
    GetSubmissionList,
    DownloadCsv,
    DownloadOriginalFile,
    DeleteSubmission,
    submissionData,
    isLoading,
    isLoadingUpload,
    isLoadingDownload,
    pageDetails,
    UploadFileDataClear,
    extractedFileData,
    uploadData,
    UploadZipFileDataClear
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
    const [editAssignment, setEditAssignment] = useState(false);
    const [editAssignmentData, setEditAssignmentData] = useState('');
    const [deleteRowData, setDeleteRowData] = useState('');
    const [showDeleteAllIcon, setShowDeleteAllIcon] = useState(false);
    const [showDownloadWarning, setShowDownloadWarning] = useState(false);
    const [data, setData] = useState();

    useEffect(() => {
        let url = `classes/${clasId}/assignments/${assId}/submissions?page=${paginationPayload?.page}&size=${paginationPayload?.size}&field=${paginationPayload?.field}&orderBy=${paginationPayload?.orderBy}`;
        GetSubmissionList(url);
    }, [, paginationPayload]);

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
                submission.grammar,
                <SimilarityStatus percent={submission.percent} />,
                submission.paper_id,
                formatDate(submission.date_up),
                [
                    { 'component': <DeleteIcon />, 'type': 'delete', 'title': 'Delete' },
                ]
            );
            row['isSelected'] = false;
            arr.push(row);
        });
        setRows([...arr]);
    }, [submissionData]);

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
            GetSubmissionList(url);
        } else {
            let url = `classes/${clasId}/assignments/${assId}/submissions?page=${PaginationValue?.page}&size=${PaginationValue?.size}&field=name&orderBy=${PaginationValue?.orderBy}`;
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
   * delete all assignments
   */
    const deleteAllAssignment = () => {
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

    const handleYesWarning = () => {
        DeleteSubmission(`classes/${clasId}/assignments/${assId}/submissions?paperId=${deleteRowData}`);
        setShowDeleteAllIcon(false);
        setTimeout(() => {
            setShowDeleteWarning(false);
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

    /**
   * show analysis page
   */
    const handleShowAnalysisPage = (e, row) => {
        let token = localStorage.getItem('token');
        let url = BASE_URL_ANALYSIS + row.paper_id + '/' + row.d_key + '/' + token;
        window.open(url, '_blank', 'location=yes,scrollbars=yes,status=yes');
    };

    const handleDownload = () => {
        DownloadCsv(BASE_URL_EXTREM + END_POINTS.CREATE_ASSIGNMENT + `${clasId}/assignments/${assId}/downloadSubmissions`, DOWNLOAD_CSV.SUBMISSION_REPORT);
    };

    const handleRefresh = () => {
        let url = `classes/${clasId}/assignments/${assId}/submissions?page=${paginationPayload?.page}&size=${paginationPayload?.size}&field=${paginationPayload?.field}&orderBy=${paginationPayload?.orderBy}`;
        GetSubmissionList(url);
    };

    return (
        <React.Fragment>
            <Grid item container direction='row' justifyContent={'right'}>
                <DownloadField>
                    <DownloadButton>
                        <Tooltip title="Refresh" arrow>
                            <IconButton
                                aria-label="download-file"
                                size="large"
                                onClick={handleRefresh}
                            >
                                <RefreshOutlinedIcon />
                            </IconButton>
                        </Tooltip>
                        {submissionData?.length > 0 &&
              isLoadingDownload ?
                            <Skeleton width={40} />
                            :
                            <Tooltip title="Download csv" arrow>
                                <IconButton
                                    aria-label="download-file"
                                    size="large"
                                    onClick={handleDownload}>
                                    <DownloadIcon />
                                </IconButton>
                            </Tooltip>
                        }
                    </DownloadButton>
                </DownloadField>
                <SearchField>
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
                </SearchField>
            </Grid>
            <AddButtonBottom>
                <CreateDrawer
                    title="Upload File"
                    isShowAddIcon={true}
                    navigateToMultiFile={true}
                    handleNavigateMultiFile={handleUploadFile}
                >
                    <SubmissionForm
                        clasId={clasId}
                        folderId={assId}
                        isLoadingUpload={isLoadingUpload}
                    />
                </CreateDrawer>
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
                editAssignment &&
        <CreateDrawer
            title="Edit Student"
            isShowAddIcon={false}
            showDrawer={editAssignment}
        >
            <AssignmentForm
                editData={editAssignmentData}
            />
        </CreateDrawer>
            }
      
            <CardView>
                {_.find(rows, function (o) { return o.isSelected === true; }) && <div style={{ textAlign: 'right' }}>
                    <Tooltip title='Delete' arrow>
                        <IconButton onClick={deleteAllAssignment}>
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
                    handleCheckboxSelect={handleCheckboxSelect}
                    handleSingleSelect={handleSingleSelect}
                    handleTableSort={handleTableSort}
                    downloadSubmissionFile={handleOriginalFileDownload}
                    showAnalysisPage={handleShowAnalysisPage}
                    isLoading={isLoading}
                    charLength={10}
                />

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
                        onChange={handlePagination}
                        color='primary'
                        variant='outlined'
                        shape='rounded'
                    />
                </PaginationContainer>

            </CardView>
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
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetSubmissionList: (url) => dispatch(GetSubmissionList(url)),
        DeleteSubmission: (url) => dispatch(DeleteSubmission(url)),
        DownloadOriginalFile: (data) => dispatch(DownloadOriginalFile(data)),
        UploadFileDataClear: () => dispatch(UploadFileDataClear()),
        UploadZipFileDataClear: () => dispatch(UploadZipFileDataClear()),
        DownloadCsv: (url, title) => dispatch(DownloadCsv(url, title)),
    };
};

Submission.layout = Instructor;

export default connect(mapStateToProps, mapDispatchToProps)(Submission);
