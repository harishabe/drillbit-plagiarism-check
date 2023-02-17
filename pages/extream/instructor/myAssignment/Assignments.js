import React, { useState, useEffect, useMemo } from 'react';
import _ from 'lodash';
import { Pagination } from '@mui/material';
import { IconButton } from '@mui/material';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { TextField } from '@mui/material';
import debouce from 'lodash.debounce';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import Box from '@mui/material/Box';
import { Grid, Tooltip } from '@mui/material';
import { Skeleton } from '@mui/material';
import styled from 'styled-components';
import Instructor from '../../../../layouts/Instructor';
import {
    CommonTable,
    StatusDot,
    CreateDrawer,
    WarningDialog
} from '../../../../components';
import {
    EditIcon,
    DeleteIcon,
    DeleteWarningIcon,
    DownloadIcon
} from '../../../../assets/icon';
import {
    GetAssignment,
    DeleteAssignment,
} from '../../../../redux/action/instructor/InstructorAction';
import {
    DownloadCsv,
} from '../../../../redux/action/common/Submission/SubmissionAction';
import AssignmentForms from './../form/AssignmentForms';
import { removeCommaWordEnd, setItemLocalStorage } from '../../../../utils/RegExp';
import { PaginationValue } from '../../../../utils/PaginationUrl';
import { PaginationContainer } from '../../../../style/index';
import { BASE_URL_EXTREM } from '../../../../utils/BaseUrl';
import END_POINTS from '../../../../utils/EndPoints';
import { DOWNLOAD_CSV, WARNING_MESSAGES, WINDOW_PLATFORM } from '../../../../constant/data/Constant';
import { formatDate, platform } from '../../../../utils/RegExp';

const AddButtonBottom = styled.div`
    position: fixed;
    bottom: 30px;
    right: 30px;
    z-index:999;
`;

const SkeletonContainer = styled.div`
    marginTop: 10px;
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
    right:${platform === WINDOW_PLATFORM ? '245px' : '225px'};
`;

const DownloadButton = styled.div`
    margin-top:-5px;
`;

const DeleteAllButton = styled.div`
    marginLeft: 10px;
`;

const columns = [
    { id: 'ass_id', label: 'Assignment ID' },
    { id: 'assignment_name', label: 'Assignment Name' },
    { id: 'status', label: 'Status' },
    { id: 'start_date', label: 'Start Date' },
    { id: 'end_date', label: 'End Date' },
    { id: 'action', label: 'Actions' },
];

function createData(assignmentData, ass_id, assignment_name, status, start_date, end_date, action) {
    return { assignmentData, ass_id, assignment_name, status, start_date, end_date, action };
}

const Assignments = ({
    GetAssignment,
    DownloadCsv,
    DeleteAssignment,
    assignmentData,
    grammarSubscription,
    pageDetailsAssignment,
    isLoadingAssignment,
    isLoadingDownload,
    activeTab
}) => {
    const router = useRouter();
    const [rows, setRows] = useState([]);
    const [assId, setAssId] = useState('');
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [showDeleteAllIcon, setShowDeleteAllIcon] = useState(false);
    const [deleteRowData, setDeleteRowData] = useState('');
    const [editAssignment, setEditAssignment] = useState(false);
    const [editAssignmentData, setEditAssignmentData] = useState('');
    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: 'ass_id',
        orderBy: PaginationValue?.orderBy,
    });

    useEffect(() => {
        if (router.isReady) {
            GetAssignment(router.query.clasId, paginationPayload);
            setItemLocalStorage('tab', activeTab)
        }
    }, [router.isReady, paginationPayload]);

    useEffect(() => {
        let row = '';
        let arr = [];
        assignmentData?.map((assignment) => {
            row = createData(
                assignment,
                assignment.ass_id,
                assignment.assignment_name,
                <StatusDot
                    color={
                        assignment.status === 'active' ? '#38BE62' : '#E9596F'
                    }
                    title={ assignment.status }
                />,
                formatDate(assignment.start_date),
                formatDate(assignment.end_date),
                [
                    { 'component': <EditIcon />, 'type': 'edit', 'title': 'Edit' },
                    { 'component': <DeleteIcon />, 'type': 'delete', 'title': 'Delete' },
                    { 'component': <ArrowForwardOutlinedIcon />, 'type': 'nextPath', 'title': 'Next' }
                ]
            );
            row['isSelected'] = false;
            arr.push(row);
        });
        setRows([...arr]);
    }, [assignmentData]);

    const handlePagination = (event, value) => {
        event.preventDefault();
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 });
    };

    const handleAction = (e, icon, rowData) => {
        e.preventDefault();
        if (icon === 'edit') {
            setEditAssignment(true);
            setEditAssignmentData(rowData);
        } else if (icon === 'delete') {
            setDeleteRowData(rowData?.ass_id);
            setShowDeleteWarning(true);
        } else if (icon === 'nextPath') {
            router.push({
                pathname: '/extream/instructor/mysubmissions',
                query: {
                    clasId: router.query.clasId, clasName: router.query.clasName,
                    assId: rowData?.assignmentData?.ass_id, assName: rowData?.assignmentData?.assignment_name, grammar: grammarSubscription?.toUpperCase() === 'YES' ? rowData?.assignmentData?.grammar : grammarSubscription
                }
            });
        }
    };

    const handleYesWarning = () => {
        DeleteAssignment(router.query.clasId, deleteRowData);
        setShowDeleteAllIcon(false);
        setTimeout(() => {
            setShowDeleteWarning(false);
        }, [100]);
    };

    const handleCloseWarning = () => {
        setShowDeleteWarning(false);
    };

    const handleTableSort = (e, column, sortToggle) => {
        e.preventDefault();
        if (sortToggle) {
            paginationPayload['field'] = column.id;
            paginationPayload['orderBy'] = 'asc';
        } else {
            paginationPayload['field'] = column.id;
            paginationPayload['orderBy'] = 'desc';
        }
        setPaginationPayload({ ...paginationPayload, paginationPayload });
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
            if (rowItem?.ass_id === row?.ass_id) {
                rowItem['isSelected'] = !rowItem['isSelected'];
            }
            return rowItem;
        });
        setRows(rowData);
    };

    const deleteAllAssignment = () => {
        let rowsId = '';
        _.filter(rows, function (o) {
            if (o.isSelected === true) {
                return rows;
            }
        }).map((rowItem) => {
            rowsId += rowItem?.ass_id + ',';
        });
        setDeleteRowData(removeCommaWordEnd(rowsId));
        setShowDeleteWarning(true);
    };

    const handleSearchAssignment = (event) => {
        if (event.target.value !== '') {
            paginationPayload['search'] = event.target.value;
            setPaginationPayload({ ...paginationPayload, paginationPayload });
        } else {
            delete paginationPayload['search'];
            setPaginationPayload({ ...paginationPayload, paginationPayload });
        }
    };

    const searchAssignment = useMemo(() => {
        return debouce(handleSearchAssignment, 300);
    }, []);

    useEffect(() => {
        return () => {
            searchAssignment.cancel();
        };
    });

    const handleCloseDrawer = (drawerClose) => {
        setEditAssignment(drawerClose);
    };

    const handleDownload = () => {
        DownloadCsv(BASE_URL_EXTREM + END_POINTS.CREATE_ASSIGNMENT + `${router.query.clasId}/assignments/download`, DOWNLOAD_CSV.ASSIGNMENTS_LISTS);
    };

    return (
        <React.Fragment>
            <Box sx={ { flexGrow: 1 } }>
                <Grid container spacing={ 1 }>
                    <Grid item container direction='row' justifyContent={ 'right' }>
                        <DownloadField>
                            <DownloadButton>
                                { assignmentData?.length > 0 &&
                                    isLoadingDownload ?
                                    <SkeletonContainer>
                                        <Skeleton style={ { marginTop: '10px' } } width={ 50 } />
                                    </SkeletonContainer>
                                    : <Tooltip title="Download csv" arrow>
                                        <IconButton
                                            color="primary"
                                            aria-label="download-file"
                                            size="large"
                                            onClick={ handleDownload }>
                                            <DownloadIcon />
                                        </IconButton>
                                    </Tooltip>
                                }
                            </DownloadButton>
                        </DownloadField>
                        <SearchField>
                            <TextField
                                placeholder='Search'
                                onChange={ searchAssignment }
                                inputProps={ {
                                    style: {
                                        padding: 5,
                                        display: 'inline-flex'
                                    }
                                } }
                            />
                        </SearchField>
                    </Grid>
                </Grid>
            </Box>
            <AddButtonBottom>
                <CreateDrawer
                    isShowAddIcon={ true }
                    title='Create Assignment'
                >
                    <AssignmentForms
                        grammarSubscription={ grammarSubscription }
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
                        handleDrawerClose={ handleCloseDrawer }
                >
                    <AssignmentForms
                            editData={ editAssignmentData }
                            grammarSubscription={ grammarSubscription }
                    />
                </CreateDrawer>
            }
            <>
                <AddButtonBottom>
                    <CreateDrawer
                        isShowAddIcon={ true }
                        title='Create Assignment'
                    >
                        <AssignmentForms />
                    </CreateDrawer>
                </AddButtonBottom>
                { _.find(rows, function (o) { return o.isSelected === true; }) && <DeleteAllButton>
                    <Tooltip title='Delete' arrow>
                        <IconButton onClick={ deleteAllAssignment }>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                </DeleteAllButton> }
                <CommonTable
                    isCheckbox={ true }
                    isSorting={ true }
                    tableHeader={ columns }
                    tableData={ rows }
                    handleAction={ handleAction }
                    handleTableSort={ handleTableSort }
                    handleCheckboxSelect={ handleCheckboxSelect }
                    handleSingleSelect={ handleSingleSelect }
                    isLoading={ isLoadingAssignment }
                    charLength={ 9 }
                />
                <PaginationContainer>
                    <Pagination
                        count={ pageDetailsAssignment?.totalPages }
                        onChange={ handlePagination }
                        color='primary'
                        variant='outlined'
                        shape='rounded'
                    />
                </PaginationContainer>
            </>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => ({
    isLoadingDownload: state?.submission?.isLoadingDownload,
});

const mapDispatchToProps = (dispatch) => {
    return {
        DeleteAssignment: (ClasId, assId) => dispatch(DeleteAssignment(ClasId, assId)),
        GetAssignment: (ClasId, PaginationValue) => dispatch(GetAssignment(ClasId, PaginationValue)),
        DownloadCsv: (url, title) => dispatch(DownloadCsv(url, title)),
    };
};

Assignments.layout = Instructor;

export default connect(mapStateToProps, mapDispatchToProps)(Assignments);
