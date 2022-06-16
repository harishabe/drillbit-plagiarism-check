import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Instructor from '../../layouts/Instructor';
import { CardView, CommonTable, AvatarName, StatusDot, CreateDrawer } from '../../components';
import { EditIcon, DeleteIcon, TimerIcon } from '../../assets/icon';
import AssignmentForm from './form/AssignmentForm';

const AddButtonBottom = styled.div`
    position:absolute;
    bottom: 30px;
    right:30px;
`;

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
  const router = useRouter();

  return (
    <React.Fragment>
      <CardView>
        <AddButtonBottom>
          <CreateDrawer title="Create Assignment">
            <AssignmentForm />
          </CreateDrawer>
        </AddButtonBottom>
        <Link href={'/instructor/mysubmissions'}>
          <CommonTable
            onClick={() => router.push('/instructor/mysubmissions')}
            isCheckbox={true}
            tableHeader={columns}
            tableData={rows}
            actionIcon={actionIcon}
            isActionIcon={true}
            path='/instructor/mysubmissions'
          />
        </Link>
      </CardView>
    </React.Fragment>
  );
};

Assignments.layout = Instructor;

export default Assignments;
