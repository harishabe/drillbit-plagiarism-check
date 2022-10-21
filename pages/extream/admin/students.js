import React, { useEffect, useState, useMemo } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import Box from '@mui/material/Box';
import debouce from 'lodash.debounce';
import { Grid, Tooltip, TextField, Pagination, IconButton } from '@mui/material';
import {
    CommonTable,
    MainHeading,
    WarningDialog,
    DialogModal,
    CreateDrawer,
    BreadCrumb
} from '../../../components';
import Admin from '../../../layouts/Admin';
import { EditIcon, DeleteIcon, StatsIcon, DeleteWarningIcon } from '../../../assets/icon';
import {
    GetStudnetData,
    // EditData, 
    DeleteStudentData
} from '../../../redux/action/admin/AdminAction';
import { PaginationValue } from '../../../utils/PaginationUrl';
import StudentForm from './form/StudentForm';
import StudentStats from './student/StudentStats';
import { removeCommaWordEnd } from '../../../utils/RegExp';
import { WARNING_MESSAGES } from '../../../constant/data/Constant';
import { PaginationContainer } from '../../../style/index';

const columns = [
    { id: 'name', label: 'Name' },
    { id: 'user_id', label: 'ID' },
    { id: 'email', label: 'Email' },
    { id: 'department', label: 'Department' },
    { id: 'section', label: 'Section' },
    { id: 'stats', label: 'Statistics' },
    { id: 'action', label: 'Actions' },
];

function createData(id, name, user_id, email, department, section, stats, action) {
    return { id, name, user_id, email, department, section, stats, action };
}

const IntegrationBreadCrumb = [
    {
        name: 'Dashboard',
        link: '/extream/admin/dashboard',
        active: false,
    },
    {
        name: 'Students',
        link: '',
        active: true,
    },
];

const Students = ({
    GetStudnetData,
    studentData,
    pageDetails,
    // EditData,
    DeleteStudentData,
    isLoading
}) => {
    const [rows, setRows] = useState([]);

    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [showDialogModal, setShowDialogModal] = useState(false);
    const [studentId, setStudentId] = useState('');
    const [deleteRowData, setDeleteRowData] = useState('');
    const [editStudent, setEditStudent] = useState(false);
    const [editStudentData, setEditStudentData] = useState('');
    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: PaginationValue?.field,
        orderBy: PaginationValue?.orderBy,
    });

    useEffect(() => {
        GetStudnetData(paginationPayload);
    }, [, paginationPayload]);

    useEffect(() => {
        let row = '';
        let arr = [];
        studentData?.map((student) => {
            row =
                createData(
                    student.id,
                    student.name,
                    student.student_id,
                    student.username,
                    student.department,
                    student.section,
                    [{ 'component': <StatsIcon />, 'type': 'stats', 'title': 'Stats' }],
                    [{ 'component': <EditIcon />, 'type': 'edit', 'title': 'Edit' }, { 'component': <DeleteIcon />, 'type': 'delete', 'title': 'Delete' }]
                );
            row['isSelected'] = false;
            arr.push(row);
        });
        setRows([...arr]);
    }, [studentData]);

    const handleChange = (event, value) => {
        event.preventDefault();
        setPaginationPayload({ ...paginationPayload, 'page': value - 1 });
    };

    const handleCloseWarning = () => {
        setShowDeleteWarning(false);
    };

    const handleYesWarning = () => {
        DeleteStudentData(deleteRowData, paginationPayload);
        setTimeout(() => {
            setShowDeleteWarning(false);
        }, [100]);
    };

    const handleAction = (event, icon, rowData) => {
        const student = studentData.filter((s) => {
            if (s.student_id === rowData?.user_id) {
                return s.id;
            }
        });
        if (icon === 'edit') {
            setEditStudent(true);
            setEditStudentData(rowData);

        } else if (icon === 'delete') {
            setDeleteRowData(student[0].id);
            setShowDeleteWarning(true);

        } else if (icon === 'stats') {
            setStudentId(rowData.id);
            setShowDialogModal(true);
        }
    };

    const handleCloseDialog = () => {
        setShowDialogModal(false);
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

    /** end debounce concepts */

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
            if (rowItem?.id === row?.id) {
                rowItem['isSelected'] = !rowItem['isSelected'];
            }
            return rowItem;
        });
        setRows(rowData);
    };

    const deleteAllInstructor = () => {
        let rowsId = '';
        _.filter(rows, function (o) {
            if (o.isSelected === true) {
                return rows;
            }
        }).map((rowItem) => {
            rowsId += rowItem?.id + ',';
        });
        setDeleteRowData(removeCommaWordEnd(rowsId));
        setShowDeleteWarning(true);
    };

    const handleCloseDrawer = (value) => {
        setEditStudent(value);
    };

    return (
        <React.Fragment>

            {showDeleteWarning &&
                <WarningDialog
                    warningIcon={<DeleteWarningIcon />}
                message={ WARNING_MESSAGES.DELETE }
                    handleYes={handleYesWarning}
                    handleNo={handleCloseWarning}
                    isOpen={true}
                />}

            {editStudent &&
                <CreateDrawer
                    title="Edit Instructor"
                    isShowAddIcon={false}
                    showDrawer={editStudent}
                    handleDrawerClose={handleCloseDrawer}
                >
                    <StudentForm
                        editData={editStudentData}
                    />
                </CreateDrawer>}

            {showDialogModal &&
                <>
                    <DialogModal
                        headingTitle="Students Statistics"
                        isOpen={true}
                        fullWidth="lg"
                        maxWidth="lg"
                        handleClose={handleCloseDialog}
                    >
                        <StudentStats studentId={studentId} />
                    </DialogModal>
                </>
            }

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={10} xs={10}>
                        <BreadCrumb item={IntegrationBreadCrumb} />
                    </Grid>
                </Grid>
            </Box>

            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item md={ 5 } xs={ 5 }>
                        <MainHeading title={`Students(${pageDetails?.totalElements !== undefined ? pageDetails?.totalElements : 0})`} />
                    </Grid>
                    <Grid item md={ 7 } xs={ 7 } style={ { textAlign: 'right' } }>
                        <TextField
                            sx={ { width: '40%', marginTop: '8px' } }
                            placeholder='Search'
                            onChange={debouncedResults}
                            inputProps={{
                                style: {
                                    padding: 5,
                                    display: 'inline-flex',
                                },
                            }}
                        />
                        {/* <SubTitle title='6/10 users &nbsp;' />
                        <InfoIcon /> */}
                    </Grid>
                </Grid>
            </Box>

            <>
                {_.find(rows, function (o) { return o.isSelected === true; }) && <div style={{ marginLeft: '10px' }}>
                    <Tooltip title='Delete' arrow>
                        <IconButton onClick={deleteAllInstructor}>
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
                    isLoading={isLoading}
                    charLength={10}
                    path=''
                />


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
    pageDetails: state?.detailsData?.studentData?.page,
    studentData: state?.detailsData?.studentData?._embedded?.studentDTOList,
    isLoading: state?.detailsData?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
    return {
        GetStudnetData: (paginationPayload) => dispatch(GetStudnetData(paginationPayload)),
        // EditData: (data) => dispatch(EditData(data)),
        DeleteStudentData: (deleteRowData, paginationPayload) => dispatch(DeleteStudentData(deleteRowData, paginationPayload))
    };
};

Students.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(Students);