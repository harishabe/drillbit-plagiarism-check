import React, { useState, useEffect } from 'react';
import { Pagination } from '@mui/material';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import Instructor from '../../../layouts/Instructor';
import {
  CardView,
  CommonTable,
  AvatarName,
  StatusDot,
  CreateDrawer,
  ErrorBlock
} from '../../../components';
import { EditIcon, DeleteIcon, TimerIcon } from '../../../assets/icon';
import { GetAssignment } from '../../../redux/action/instructor/InstructorAction';
import AssignmentForms from './../form/AssignmentForms';
import { PaginationValue } from '../../../utils/PaginationUrl';
import { ASSIGNMENT_NOT_FOUND } from '../../../constant/data/ErrorMessage';

const AddButtonBottom = styled.div`
    position: absolute;
    bottom: 30px;
    right: 30px;
`;

const columns = [
  { id: 'id', label: 'Id' },
  { id: 'name', label: 'Name' },
  { id: 'status', label: 'Status' },
  { id: 'statstics', label: 'Stats' },
  { id: 'creation', label: 'Creation Date' },
  { id: 'end', label: 'End Date' },
  { id: 'action', label: 'Action' },
];

function createData(id, name, status, statstics, creation, end, action) {
  return { id, name, status, statstics, creation, end, action };
}

const Assignments = ({
  GetAssignment,
  assignmentData,
  pageDetails,
  isLoadingAssignment,
}) => {
  const router = useRouter();
  const [clasId, setClasId] = useState(router.query.clasId);
  const [assId, setAssId] = useState('');
  const [rows, setRows] = useState([]);
  const [paginationPayload, setPaginationPayload] = useState({
    page: PaginationValue?.page,
    size: PaginationValue?.size,
    field: 'ass_id',
    orderBy: PaginationValue?.orderBy,
  });

  // useEffect(() => {
  //   GetAssignment(clasId, paginationPayload);
  // }, [clasId, paginationPayload]);

  useEffect(() => {
    let row = '';
    let arr = [];
    assignmentData?.map((assignment) => {
      row = createData(
        assignment.ass_id,
        assignment.assignment_name,
        <StatusDot
          color={
            assignment.status === 'active' ? '#38BE62' : '#E9596F'
          }
          title={assignment.status}
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
      setEditStudent(true);
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
            isShowAddIcon={true}
            title='Create Assignment'
          >
            <AssignmentForms />
          </CreateDrawer>
        </AddButtonBottom>
        {assignmentData?.length > 0 ?
          <CommonTable
            isCheckbox={true}
            tableHeader={columns}
            tableData={rows}
            handleAction={handleAction}
            isLoading={isLoadingAssignment}
            path={{ pathname: '/instructor/mysubmissions', query: { isAssignment: true, clasId: clasId, assId: assId } }}
          // path='/instructor/mysubmissions'
          />
          : <ErrorBlock message={ASSIGNMENT_NOT_FOUND} />
        }

        {pageDetails?.totalPages > 1 && (
          <div style={{ marginLeft: '35%', marginTop: '25px' }}>
            <Pagination
              count={pageDetails?.totalPages}
              onChange={handlePagination}
              color='primary'
              variant='outlined'
              shape='rounded'
            />
          </div>
        )}
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
