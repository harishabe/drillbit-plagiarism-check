import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import _ from 'lodash';
import debouce from 'lodash.debounce';
import styled from 'styled-components';
import Box from '@mui/material/Box';
import { Grid, TextField } from '@mui/material';
import { Pagination } from '@mui/material';
import { IconButton } from '@mui/material';
import Instructor from '../../../../layouts/Instructor';
import {
    CardView,
    CommonTable,
    CreateDrawer,
    WarningDialog,
    DialogModal
} from '../../../../components';
import {
    EditIcon,
    DeleteIcon,
    DeleteWarningIcon,
    AddMultipleIcon,
    AddPersonIcon,
    AddFromListIcon
} from '../../../../assets/icon';
import StudentForm from '../form/StudentForm';
import {
    GetStudent,
    DeleteStudent,
    UploadFileDataClear,
} from '../../../../redux/action/instructor/InstructorAction';
import StudentInstitute from '../studentInstitute';
import { removeCommaWordEnd } from '../../../../utils/RegExp';
import { PaginationValue } from '../../../../utils/PaginationUrl';
import { PaginationContainer } from '../../../style/index';

const AddButtonBottom = styled.div`
    position:fixed;
    bottom: 30px;
    right:30px;
`;

const SearchField = styled.div`
    position:absolute;
    top: 125px;
    right:16px;
`;

const columns = [
    { id: 'student_id', label: 'Student ID' },
    { id: 'name', label: 'Student Name' },
    { id: 'username', label: 'Email' },
    { id: 'department', label: 'Department' },
    { id: 'section', label: 'Section' },
    { id: 'action', label: 'Actions' },
]

function createData(id, student_id, name, username, department, section, action) {
    return { id, student_id, name, username, department, section, action }
}

const Students = ({
    GetStudent,
    studentData,
    pageDetailsStudent,
    isLoadingStudent,
    DeleteStudent,
    setPaginationStudent,
    UploadFileDataClear
}) => {

    const router = useRouter();

    const [rows, setRows] = useState([]);
    const [showDialogModal, setShowDialogModal] = useState(false);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [showDeleteAllIcon, setShowDeleteAllIcon] = useState(false);
    const [deleteRowData, setDeleteRowData] = useState('');
    const [editStudent, setEditStudent] = useState(false);
    const [editStudentData, setEditStudentData] = useState('');
    const [paginationPayload, setPaginationPayload] = useState({
        page: PaginationValue?.page,
        size: PaginationValue?.size,
        field: 'user_id',
        orderBy: PaginationValue?.orderBy,
    });
    const [classId, setClassId] = useState('');

    useEffect(() => {
        GetStudent(router.query.clasId, paginationPayload);
        setClassId(router.query.clasId);
    }, [router.isReady, paginationPayload]);

    useEffect(() => {
        let row = '';
        let arr = [];
        studentData?.map((student) => {
            row =
                createData(
                    student.id,
                    student.student_id,
                    student.name,
                    student.username,
                    student.department,
                    student.section,
                    [{ 'component': <EditIcon />, 'type': 'edit' },
                    { 'component': <DeleteIcon />, 'type': 'delete' },
                    ]
                );
            row['isSelected'] = false;
            arr.push(row)
        });
        setRows([...arr]);
    }, [studentData]);

    const handleAction = (e, icon, rowData) => {
        e.preventDefault();
        if (icon === 'edit') {
            setEditStudent(true);
            setEditStudentData(rowData);
        } else if (icon === 'delete') {
            setDeleteRowData(rowData?.id);
            setShowDeleteWarning(true);
        }
    }

    const handleYesWarning = () => {
        DeleteStudent(classId, deleteRowData);
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
            paginationPayload['field'] = column.id
            paginationPayload['orderBy'] = 'asc';
        } else {
            paginationPayload['field'] = column.id
            paginationPayload['orderBy'] = 'desc';
        }
        setPaginationPayload({ ...paginationPayload, paginationPayload })
    }

    const handleCheckboxSelect = () => {
        let rowData = rows?.map((rowItem) => {
            rowItem['isSelected'] = !rowItem['isSelected'];
            return rowItem;
        });
        setRows(rowData);
    }

    const handleSingleSelect = (e, row) => {
        let rowData = rows?.map((rowItem) => {
            if (rowItem?.id === row?.id) {
                rowItem['isSelected'] = !rowItem['isSelected'];
            }
            return rowItem;
        });
        setRows(rowData);
    }

    const deleteAllStudent = () => {
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
    }

    const handleShow = (e, info) => {
        if (info?.title === 'Add From List') {
            setShowDialogModal(true);
        } else if (info?.title === 'Add Multiple Student') {
            UploadFileDataClear();
            router.push({ pathname: '/extream/instructor/addBulkStudent', query: { classId: classId } })
        }
    }

    const handleCloseDialog = () => {
        setShowDialogModal(false);
    }

    const handlePagination = (event, value) => {
        event.preventDefault();
        setPaginationStudent({ ...paginationPayload, 'page': value - 1 });
    };

    const handleSearchStudent = (event) => {
        if (event.target.value !== '') {
            paginationPayload['search'] = event.target.value;
            setPaginationPayload({ ...paginationPayload, paginationPayload });
        } else {
            delete paginationPayload['search'];
            setPaginationPayload({ ...paginationPayload, paginationPayload });
        }
    }

    const searchStudents = useMemo(() => {
        return debouce(handleSearchStudent, 300);
    }, []);

    useEffect(() => {
        return () => {
            searchStudents.cancel();
        };
    });

    const handleCloseDrawer = (drawerClose) => {
        setEditStudent(drawerClose);
    }

    return (
        <React.Fragment>
            {showDialogModal &&
                <>
                    <DialogModal
                        headingTitle={"Institute Students List"}
                        isOpen={true}
                        fullWidth="lg"
                        maxWidth="lg"
                        handleClose={handleCloseDialog}
                    >
                        <StudentInstitute
                            classId={router.query.clasId}
                        />
                    </DialogModal>
                </>
            }
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
            <AddButtonBottom>
                <CreateDrawer
                    options={[
                        {
                            icon: <AddPersonIcon />,
                            title: 'Add Student',
                            handleFromCreateDrawer: false
                        },
                        {
                            icon: <AddMultipleIcon />,
                            title: 'Add Multiple Student',
                            handleFromCreateDrawer: true
                        },
                        {
                            icon: <AddFromListIcon />,
                            title: 'Add From List',
                            handleFromCreateDrawer: true
                        }]}
                    title="Add Student"
                    handleMultiData={handleShow}
                    isShowAddIcon={true}>
                    <StudentForm />
                </CreateDrawer>
            </AddButtonBottom>
            {
                editStudent &&
                <CreateDrawer
                    title="Edit Student"
                    isShowAddIcon={false}
                    showDrawer={editStudent}
                    handleDrawerClose={handleCloseDrawer}
                >
                    <StudentForm
                        editData={editStudentData}
                    />
                </CreateDrawer>
            }
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={1}>
                    <Grid item container direction='row' justifyContent={'right'}>
                        <SearchField>
                            <TextField
                                placeholder='Search'
                                onChange={searchStudents}
                                inputProps={{
                                    style: {
                                        padding: 5,
                                        display: 'inline-flex'
                                    }
                                }}
                            />
                        </SearchField>
                    </Grid>
                </Grid>
            </Box>
            <CardView>
                <>
                    {_.find(rows, function (o) { return o.isSelected === true }) && <div style={{ textAlign: 'right' }}>
                        <IconButton onClick={deleteAllStudent}>
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
                        isLoading={isLoadingStudent}
                        charLength={17}
                        path=''
                    />
                    <PaginationContainer>
                        <Pagination
                            count={pageDetailsStudent?.totalPages}
                            onChange={handlePagination}
                            color="primary"
                            variant="outlined"
                            shape="rounded"
                        />
                    </PaginationContainer>
                </>
            </CardView>
        </React.Fragment>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        GetStudent: (ClasId, PaginationValue) => dispatch(GetStudent(ClasId, PaginationValue)),
        DeleteStudent: (ClasId, userId) => dispatch(DeleteStudent(ClasId, userId)),
        UploadFileDataClear: () => dispatch(UploadFileDataClear()),
    };
};

Students.layout = Instructor;

export default connect(null, mapDispatchToProps)(Students);