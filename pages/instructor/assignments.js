import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Instructor from '../../layouts/Instructor';
import {
  CardView,
  CommonTable,
  AvatarName,
  StatusDot,
  CreateDrawer,
} from '../../components';
import { EditIcon, DeleteIcon, TimerIcon } from '../../assets/icon';
import { GetAssignment } from '../../redux/action/instructor/InstructorAction';
import AssignmentForm from './form/AssignmentForm';
import { PaginationValue } from '../../utils/PaginationUrl';
import { Pagination } from '@mui/material';

const AddButtonBottom = styled.div`
    position: absolute;
    bottom: 30px;
    right: 30px;
`;

const columns = [
  { id: 'id', label: 'Id', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'status', label: 'Status', minWidth: 170 },
  { id: 'statstics', label: 'Stats', minWidth: 170 },
  { id: 'creation', label: 'Creation Date', minWidth: 170 },
  { id: 'end', label: 'End Date', minWidth: 170 },
  { id: 'action', label: 'Action', minWidth: 100 },
];

function createData(id, name, status, statstics, creation, end, action) {
  return { id, name, status, statstics, creation, end, action };
}

// const data = [
//   createData(
//     <AvatarName title='S101' color='#4795EE' />,
//     'Harisha B E',
//     <StatusDot color='#38BE62' title='Active' />,
//     '25/40',
//     '01/01/2022',
//     '06/02/2022',
//     [<TimerIcon />, <EditIcon />, <DeleteIcon />]
//   ),
//   createData(
//     <AvatarName title='S101' color='#5E47EE' />,
//     'Harisha B E',
//     <StatusDot color='#E9596F' title='In Active' />,
//     '32/40',
//     '01/01/2022',
//     '06/02/2022',
//     [<TimerIcon />, <EditIcon />, <DeleteIcon />]
//   ),
//   createData(
//     <AvatarName title='S101' color='#EE4747' />,
//     'Harisha B E',
//     <StatusDot color='#38BE62' title='Active' />,
//     '38/40',
//     '01/01/2022',
//     '06/02/2022',
//     [<TimerIcon />, <EditIcon />, <DeleteIcon />]
//   ),
//   createData(
//     <AvatarName title='S101' color='#4795EE' />,
//     'Harisha B E',
//     <StatusDot color='#38BE62' title='Active' />,
//     '26/40',
//     '01/01/2022',
//     '06/02/2022',
//     [<TimerIcon />, <EditIcon />, <DeleteIcon />]
//   ),
// ];

// const actionIcon = [<TimerIcon />, <EditIcon />, <DeleteIcon />];

const Assignments = ({
  GetAssignment,
  assignmentData,
  pageDetails,
  isLoadingAssignment,
}) => {
  const router = useRouter();
  const [clasId, setClasId] = useState(router.query.clasId);
  const [rows, setRows] = useState([]);
  const [paginationPayload, setPaginationPayload] = useState({
    page: PaginationValue?.page,
    size: PaginationValue?.size,
    field: 'ass_id',
    orderBy: PaginationValue?.orderBy,
  });

  useEffect(() => {
    GetAssignment(clasId, paginationPayload);
  }, [clasId, paginationPayload]);

  useEffect(() => {
    let row = '';
    let arr = [];
    assignmentData?.map((assignment) => {
      row = createData(
        <AvatarName
          avatarText='S'
          title={ assignment.ass_id }
          color='#4795EE'
        />,
        assignment.assignment_name,
        <StatusDot
          color={
            assignment.status === 'active' ? '#38BE62' : '#E9596F'
          }
          title={ assignment.status }
        />,
        assignment.ass_id,
        assignment.creation_date,
        assignment.end_date,
        [
          { 'component': <EditIcon />, 'type': 'edit' },
          { 'component': <DeleteIcon />, 'type': 'delete' },
        ]
      );
      row['isSelected'] = false;
      arr.push(row);
    });
    setRows([...arr]);
  }, [assignmentData]);

  const handlePagination = (event, value) => {
    event.preventDefault();
    setPaginationPayload({ ...paginationPayload, page: value - 1 });
  };

  const handleAction = (event, icon, rowData) => {
    if (icon === 'edit') {
      // setEditStudent(true);
      // setEditStudentData(rowData);
      console.log('edit');
    } else if (icon === 'delete') {
      // setDeleteRowData(rowData?.id?.props?.title);
      // setShowDeleteWarning(true);
      console.log('delete');
    }
  };

  return (
    <React.Fragment>
      <CardView>
        <AddButtonBottom>
          <CreateDrawer
            isShowAddIcon={ true }
            title='Create Assignment'
          >
            <AssignmentForm />
          </CreateDrawer>
        </AddButtonBottom>
        <CommonTable
          isCheckbox={ true }
          tableHeader={ columns }
          tableData={ rows }
          handleAction={ handleAction }
          isLoading={ isLoadingAssignment }
          path='/instructor/mysubmissions'
        />

        { pageDetails?.totalPages > 1 && (
          <div style={ { marginLeft: '35%', marginTop: '25px' } }>
            <Pagination
              count={ pageDetails?.totalPages }
              onChange={ handlePagination }
              color='primary'
              variant='outlined'
              shape='rounded'
            />
          </div>
        ) }
      </CardView>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  pageDetails: state?.instructorClasses?.assignmentData?.page,
  assignmentData: state?.instructorClasses?.assignmentData?._embedded?.assignmentDTOList,
  isLoadingAssignment: state?.instructorClasses?.isLoadingAssignment,
});

const mapDispatchToProps = (dispatch) => {
  return {
    GetAssignment: (ClasId, PaginationValue) => dispatch(GetAssignment(ClasId, PaginationValue)),
  };
};

Assignments.layout = Instructor;

export default connect(mapStateToProps, mapDispatchToProps)(Assignments);
