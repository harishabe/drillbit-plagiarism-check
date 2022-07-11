import React, { useState, useEffect } from 'react'
import _ from 'lodash';
import styled from 'styled-components';
import Instructor from '../../layouts/Instructor'
import {
    CardView,
    CommonTable,
    AvatarName,
    CreateDrawer,
    WarningDialog,
} from '../../components'
import { Pagination, IconButton } from '@mui/material';
import { EditIcon, DeleteIcon, DeleteWarningIcon } from '../../assets/icon'
import StudentForm from './form/StudentForm';
import VpnKeyOffOutlinedIcon from '@mui/icons-material/VpnKeyOffOutlined';
import VpnKeyOutlinedIcon from '@mui/icons-material/VpnKeyOutlined';

const columns = [
    { id: 'id', label: 'Student ID', minWidth: 170 },
    { id: 'name', label: 'Student Name', minWidth: 170 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'department', label: 'Department', minWidth: 170 },
    { id: 'section', label: 'Section', minWidth: 170 },
    { id: 'action', label: 'Action', minWidth: 100 },
]

function createData(id, name, email, department, section, action) {
    return { id, name, email, department, section, action }
}

const AddButtonBottom = styled.div`
    position:absolute;
    bottom: 30px;
    right:30px;
`;

const Students = ({
    studentData,
    pageDetails,
    paginationPayload,
    setPaginationPayload,
    isLoadingStudent
}) => {

    const [rows, setRows] = useState([]);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);
    const [deleteRowData, setDeleteRowData] = useState('');
    const [showStatusWarning, setStatusWarning] = useState(false);
    const [statusRowData, setStatusRowData] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [showDeleteAllIcon, setShowDeleteAllIcon] = useState(false);
    // const [editStudent, setEditStudent] = useState(false);
    // const [editStudentData, setEditStudentData] = useState('');

    useEffect(() => {
        let row = '';
        let arr = [];
        studentData?.map((student) => {
            row =
                createData(
                    <AvatarName avatarText="S" title={student.id} color='#4795EE' />,
                    student.name,
                    student.username,
                    student.department,
                    student.section,
                    [{ 'component': <EditIcon />, 'type': 'edit' },
                    { 'component': <DeleteIcon />, 'type': 'delete' },
                    {
                        'component': student.status === 'active' ? <VpnKeyOutlinedIcon /> : <VpnKeyOffOutlinedIcon />,
                        'type': student.status === 'active' ? 'lock' : 'unlock'
                    }
                    ]
                );
            row['isSelected'] = false;
            arr.push(row)
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

    const handleStatusCloseWarning = () => {
        setStatusWarning(false);
    };

    const handleYesWarning = () => {
        DeleteData(deleteRowData, paginationPayload);
        setShowDeleteAllIcon(false);
        setTimeout(() => {
            setShowDeleteWarning(false);
        }, [100]);
    };

    const handleStatusWarning = () => {
        DeactivateData(statusRowData, paginationPayload);
        setTimeout(() => {
            setStatusWarning(false);
        }, [100]);
    };

    const handleAction = (event, icon, rowData) => {
        if (icon === 'edit') {
            setEditInstructor(true);
            setEditInstructorData(rowData);
        } else if (icon === 'delete') {
            setDeleteRowData(rowData?.id?.props?.title);
            setShowDeleteWarning(true);
        } else if (icon === 'lock') {
            let activateDeactive = {
                'id': rowData?.id?.props?.title,
                'status': 'inactive'
            }
            setStatusRowData(activateDeactive);
            setStatusWarning(true);
            setStatusMessage('inactive');
        } else if (icon === 'unlock') {
            let activateDeactive = {
                'id': rowData?.id?.props?.title,
                'status': 'active'
            };
            setStatusRowData(activateDeactive);
            setStatusWarning(true);
            setStatusMessage('active');
        }
    }

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

    const handleCheckboxSelect = () => {
        let rowData = rows?.map((rowItem) => {
            rowItem['isSelected'] = !rowItem['isSelected'];
            return rowItem;
        });
        setRows(rowData);
    }

    const handleSingleSelect = (e, row) => {
        let rowData = rows?.map((rowItem) => {
            if (rowItem?.id?.props?.title === row?.id?.props?.title) {
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
            rowsId += rowItem?.id?.props?.title + ',';
        });
        setDeleteRowData(removeCommaWordEnd(rowsId));
        setShowDeleteWarning(true);
    }

    return (
        <React.Fragment>

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
                showStatusWarning &&
                <WarningDialog
                    warningIcon={<DeleteWarningIcon />}
                    message={"Are you sure, you want to " + statusMessage + "?"}
                    handleYes={handleStatusWarning}
                    handleNo={handleStatusCloseWarning}
                    isOpen={true}
                />
            }
            <AddButtonBottom>
                <CreateDrawer
                    title="Add Student"
                    isShowAddIcon={true}>
                    <StudentForm />
                </CreateDrawer>
            </AddButtonBottom>

            <CardView>
                <>
                    {_.find(rows, function (o) { return o.isSelected === true }) && <div style={{ textAlign: 'right' }}>
                        <IconButton onClick={deleteAllStudent}>
                            <DeleteIcon />
                        </IconButton>
                    </div>}

                    <CommonTable
                        isCheckbox={true}
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

                    <div style={{ marginLeft: '35%', marginTop: '25px' }}>
                        <Pagination
                            count={pageDetails?.totalPages}
                            onChange={handleChange}
                            color="primary"
                            variant="outlined"
                            shape="rounded"
                        />
                    </div>
                </>
            </CardView>
        </React.Fragment>
    )
}

Students.layout = Instructor

export default Students
