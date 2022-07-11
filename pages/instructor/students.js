import React from 'react'
import styled from 'styled-components';
import Instructor from '../../layouts/Instructor'
import { CardView, CommonTable, AvatarName, CreateDrawer } from '../../components'
import { EditIcon, DeleteIcon, LockIcon } from '../../assets/icon'
import StudentForm from './form/StudentForm';

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

const rows = [
    createData(
        <AvatarName title='S101' color='#4795EE' />,
        'Harisha B E',
        'harish@drillbit.com',
        'CS',
        'A',
        [<EditIcon />, <DeleteIcon />, <LockIcon />]
    ),
    createData(
        <AvatarName title='S101' color='#5E47EE' />,
        'Harisha B E',
        'harish@drillbit.com',
        'CS',
        'A',
        [<EditIcon />, <DeleteIcon />, <LockIcon />]
    ),
    createData(
        <AvatarName title='S101' color='#EE4747' />,
        'Harisha B E',
        'harish@drillbit.com',
        'CS',
        'A',
        [<EditIcon />, <DeleteIcon />, <LockIcon />]
    ),
    createData(
        <AvatarName title='S101' color='#4795EE' />,
        'Harisha B E',
        'harish@drillbit.com',
        'CS',
        'A',
        [<EditIcon />, <DeleteIcon />, <LockIcon />]
    ),
    createData(
        <AvatarName title='S101' color='#5E47EE' />,
        'Harisha B E',
        'harish@drillbit.com',
        'CS',
        'A',
        [<EditIcon />, <DeleteIcon />, <LockIcon />]
    ),
    createData(
        <AvatarName title='S101' color='#EE4747' />,
        'Harisha B E',
        'harish@drillbit.com',
        'CS',
        'A',
        [<EditIcon />, <DeleteIcon />, <LockIcon />]
    ),
]

const actionIcon = [<EditIcon />, <DeleteIcon />, <LockIcon />]

const Students = () => {
    return (
        <React.Fragment>
            <CardView>
                <AddButtonBottom>
                    <CreateDrawer isShowAddIcon={true} title="Add Student">
                        <StudentForm />
                    </CreateDrawer>
                </AddButtonBottom> 
                <CommonTable
                    isCheckbox={true}
                    tableHeader={columns}
                    tableData={rows}
                    actionIcon={actionIcon}
                    isActionIcon={true}
                />
            </CardView>
        </React.Fragment>
    )
}

Students.layout = Instructor

export default Students
