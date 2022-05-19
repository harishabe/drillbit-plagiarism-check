import React from 'react';
import Instructor from '../../layouts/Instructor';
import { CardView, CommonTable, AvatarName, StatusDot } from '../../components';
import { EditIcon, DeleteIcon, TimerIcon } from '../../assets/icon';

const columns = [
  { id: 'id', label: 'Assignment ID', minWidth: 170 },
  { id: 'name', label: 'Assignment Name', minWidth: 170 },
  { id: 'status', label: 'Status', minWidth: 170 },
  { id: 'stats', label: 'Stats', minWidth: 170 },
  { id: 'creation', label: 'Creation Date', minWidth: 170 },
  { id: 'end', label: 'End Date', minWidth: 170 },
  { id: 'action', label: 'Action', minWidth: 100 },
];

function createData(id, name, status, stats, creation, end, action) {
  return { id, name, status, stats, creation, end, action };
}

const rows = [
  createData(
    <AvatarName title='S101' color='#4795EE' />,
    'Harisha B E',
    <StatusDot color='#38BE62' title='Active' />,
    '25/40',
    '01/01/2022',
    '06/02/2022',
    [<TimerIcon />, <EditIcon />, <DeleteIcon />]
  ),
  createData(
    <AvatarName title='S101' color='#5E47EE' />,
    'Harisha B E',
    <StatusDot color='#E9596F' title='In Active' />,
    '32/40',
    '01/01/2022',
    '06/02/2022',
    [<TimerIcon />, <EditIcon />, <DeleteIcon />]
  ),
  createData(
    <AvatarName title='S101' color='#EE4747' />,
    'Harisha B E',
    <StatusDot color='#38BE62' title='Active' />,
    '38/40',
    '01/01/2022',
    '06/02/2022',
    [<TimerIcon />, <EditIcon />, <DeleteIcon />]
  ),
  createData(
    <AvatarName title='S101' color='#4795EE' />,
    'Harisha B E',
    <StatusDot color='#38BE62' title='Active' />,
    '26/40',
    '01/01/2022',
    '06/02/2022',
    [<TimerIcon />, <EditIcon />, <DeleteIcon />]
  ),
];

const actionIcon = [<TimerIcon />, <EditIcon />, <DeleteIcon />];

const Assignments = () => {
  return (
    <React.Fragment>
      <CardView>
        <CommonTable
          isCheckbox={true}
          tableHeader={columns}
          tableData={rows}
          actionIcon={actionIcon}
          isActionIcon={true}
        />
      </CardView>
    </React.Fragment>
  );
};

Assignments.layout = Instructor;

export default Assignments;
