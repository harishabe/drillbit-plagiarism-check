import React, { useState, useEffect, useMemo } from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { useRouter } from "next/router";
import debouce from "lodash.debounce";
import { Grid, Tooltip } from '@mui/material';
import { Skeleton } from '@mui/material';
import Box from '@mui/material/Box'
import { Pagination, IconButton } from '@mui/material';
import { TextField } from '@mui/material';
import Instructor from '../../layouts/Instructor';
import {
    CardView,
    CommonTable,
    BreadCrumb,
    MainHeading,
    CreateDrawer,
    WarningDialog
} from '../../components';
import { GetSubmissionList, DeleteSubmission, DownloadSubmissionList } from '../../redux/action/instructor/InstructorAction';
import { DeleteIcon, DeleteWarningIcon, DownloadIcon } from '../../assets/icon';
import { PaginationValue } from '../../utils/PaginationUrl';
import { formatDate, removeCommaWordEnd } from '../../utils/RegExp';
import SubmissionForm from './form/SubmissionForm';
import { PaginationContainer } from '../style/index';
import { NO_DATA_PLACEHOLDER, DOC_ERROR_PLACEHOLDER_1, DOC_ERROR_PLACEHOLDER_2 } from '../../constant/data/Constant'

const columns = [
    { id: 'name', label: 'Author Name' },
    { id: 'title', label: 'Paper Name' },
    { id: 'original_fn', label: 'Original File' },
    { id: 'grammar', label: 'Grammar' },
    { id: 'percent', label: 'Similarity' },
    { id: 'paper_id', label: 'Paper Id' },
    { id: 'date_up', label: 'Submission Date' },
    { id: 'action', label: 'Action' },
];

function createData(name, title, original_fn, grammar, percent, paper_id, date_up, action) {
    return {
        name, title, original_fn, grammar, percent, paper_id, date_up, action
    };
}

const AddButtonBottom = styled.div`
    position:fixed;
    bottom: 30px;
    right:30px;
`;

const DownloadCsv = styled.div`
    margin-top:-5px;
`;

const StudentList = ({
    GetSubmissionList,
    DownloadSubmissionList,
    DeleteSubmission,
    submissionData,
    isLoadingSubmission,
    isLoadingUpload,
    isLoadingDownload,
    pageDetails,
}) => {

    const router = useRouter();
    const [rows, setRows] = useState([]);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [deleteRowData, setDeleteRowData] = useState('');
    const [showDeleteAllIcon, setShowDeleteAllIcon] = useState(false);

    const folderId = router.query.folderId;
    const folderName = router.query.name;

    const InstructorBreadCrumb = [
        {
            name: 'Dashboard',
            link: '/instructor/dashboard',
            active: false,
        },
        {
            name: 'My folder',
            link: '/instructor/myfolder',
            active: false,
        },
        {
            name: folderName,
            link: '',
            active: true,
        },
    ]

    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: 'name',
        orderBy: PaginationValue?.orderBy,
    });

    useEffect(() => {
        let url = `myFolder/${folderId}/submissions?page=${PaginationValue?.page}&size=${PaginationValue?.size}&field=name&orderBy=${PaginationValue?.orderBy}`;
        GetSubmissionList(url);
    }, [folderId, paginationPayload]);

    useEffect(() => {
        let row = '';
        let arr = [];
        submissionData?.map((submission) => {
            row =
                createData(
                    submission.name,
                    submission.title,
                    submission.original_fn,
                    submission.grammar,
                    submission.percent !== NO_DATA_PLACEHOLDER && ((submission.percent !== DOC_ERROR_PLACEHOLDER_1) && (submission.percent !== DOC_ERROR_PLACEHOLDER_2)) ? submission.percent + '%' : submission.percent,
                    submission.paper_id,
                    formatDate(submission.date_up),
                    [
                        { 'component': <DeleteIcon />, 'type': 'delete' }
                    ]
                );
            row['isSelected'] = false;
            arr.push(row)
        });
        setRows([...arr]);
    }, [submissionData]);

    const handleAction = (event, icon, rowData) => {
        if (icon === 'delete') {
            setDeleteRowData(rowData?.paper_id);
            setShowDeleteWarning(true);
        }
    }

    const handleChange = (event, value) => {
        event.preventDefault();
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 });
    };

    const handleCloseWarning = () => {
        setShowDeleteWarning(false);
    };

    const handleYesWarning = () => {
        DeleteSubmission(`myFolder/${folderId}/submissions?paperId=${deleteRowData}`);
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
            paginationPayload['field'] = column.id
            paginationPayload['orderBy'] = 'asc';
        } else {
            paginationPayload['field'] = column.id
            paginationPayload['orderBy'] = 'desc';
        }
        setPaginationPayload({ ...paginationPayload, paginationPayload })
    }

    const handleSearch = (event) => {
        if (event.target.value !== '') {
            let url = `myFolder/${folderId}/submissions?page=${PaginationValue?.page}&size=${PaginationValue?.size}&field=name&orderBy=${PaginationValue?.orderBy}&search=${event.target.value}`;
            GetSubmissionList(url);
        } else {
            let url = `myFolder/${folderId}/submissions?page=${PaginationValue?.page}&size=${PaginationValue?.size}&field=name&orderBy=${PaginationValue?.orderBy}`;
            GetSubmissionList(url);
        }
    }

    const debouncedResults = useMemo(() => {
        return debouce(handleSearch, 300);
    }, []);

    useEffect(() => {
        return () => {
            debouncedResults.cancel();
        };
    });

    const handleCheckboxSelect = () => {
        let rowData = rows?.map((rowItem) => {
            rowItem['isSelected'] = !rowItem['isSelected'];
            return rowItem;
        });
        setRows(rowData);
    }

    const handleSingleSelect = (e, row) => {
        let rowData = rows?.map((rowItem) => {
            if (rowItem?.paper_id === row?.paper_id) {
                rowItem['isSelected'] = !rowItem['isSelected'];
            }
            return rowItem;
        });
        setRows(rowData);
    }

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
    }

    const handleDownload = () => {
        let url = `myFolder/${folderId}/downloadSubmissions`;
        DownloadSubmissionList(url)
    }

    return (
        <React.Fragment>
            <Box sx={{ flexGrow: 1 }}>
                <BreadCrumb item={InstructorBreadCrumb} />
                <Grid container spacing={1}>
                    <Grid item md={9} xs={7}>
                        <MainHeading title={`Submissions (${pageDetails?.totalElements !== undefined ? pageDetails?.totalElements : 0})`} />
                    </Grid>
                    <Grid item md={1} xs={1} align="right">
                        <DownloadCsv>
                            {submissionData?.length > 0 &&
                                <Tooltip title="Download csv">
                                    <IconButton
                                        color="primary"
                                        aria-label="download-file"
                                        size="large"
                                        onClick={handleDownload}>
                                        {isLoadingDownload ? <Skeleton width={50} /> : <DownloadIcon />}
                                    </IconButton>
                                </Tooltip>
                            }
                        </DownloadCsv>
                    </Grid>
                    <Grid item md={2} xs={12} align="right">
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

                {_.find(rows, function (o) { return o.isSelected === true }) && <div style={{ textAlign: 'right' }}>
                    <IconButton onClick={deleteAllSubmission}>
                        <DeleteIcon />
                    </IconButton>
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
                    isLoading={isLoadingSubmission}
                    charLength={17}
                    path=''
                />

                <AddButtonBottom>
                    <CreateDrawer
                        title="Upload File"
                        isShowAddIcon={true}>
                        <SubmissionForm
                            folderId={folderId}
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
    )
}

const mapStateToProps = (state) => ({
    pageDetails: state?.instructorMyFolders?.submissionData?.page,
    submissionData: state?.instructorMyFolders?.submissionData?._embedded?.submissionsList,
    isLoadingSubmission: state?.instructorMyFolders?.isLoadingSubmission,
    isLoadingUpload: state?.instructorMyFolders?.isLoadingUpload,
    isLoadingDownload: state?.instructorMyFolders?.isLoadingDownload,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetSubmissionList: (url) => dispatch(GetSubmissionList(url)),
        DeleteSubmission: (url) => dispatch(DeleteSubmission(url)),
        DownloadSubmissionList: (url) => dispatch(DownloadSubmissionList(url)),
    };
};

StudentList.layout = Instructor

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
