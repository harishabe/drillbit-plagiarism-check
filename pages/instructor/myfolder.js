import React from 'react'
import Instructor from '../../layouts/Instructor'
import { CardView, CommonTable } from '../../components';
import { EditIcon, DeleteIcon, RefreshTimerIcon } from '../../assets/icon';

const columns = [
  { id: 'id', label: 'Student ID', minWidth: 170 },
  { id: 'name', label: 'Student Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'department', label: 'Department', minWidth: 170 },
  { id: 'section', label: 'Section', minWidth: 170 },
];

function createData(id, name, email, department, section) {
  return { id, name, email, department, section };
}

const rows = [
  createData(1001, 'Harisha B E', 'harish@drillbit.com', 'CS', 'A'),
  createData(1001, 'Harisha B E', 'harish@drillbit.com', 'CS', 'A'),
  createData(1001, 'Harisha B E', 'harish@drillbit.com', 'CS', 'A'),
  createData(1001, 'Harisha B E', 'harish@drillbit.com', 'CS', 'A')
];

const actionIcon = [<RefreshTimerIcon />, <EditIcon />, <DeleteIcon />]

const MyFolder = () => {
  return (
    <>
      <CardView>
        <CommonTable
          isCheckbox={true}
          tableHeader={columns}
          tableData={rows}
          actionIcon={actionIcon}
        />
      </CardView>
    </>
  )
}

MyFolder.layout = Instructor

export default MyFolder