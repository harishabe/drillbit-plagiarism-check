import React, { useState, useEffect } from 'react';
import { Pagination } from '@mui/material';
import { IconButton } from '@mui/material';
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
  ErrorBlock,
  WarningDialog
} from '../../../components';
import { EditIcon, DeleteIcon, DeleteWarningIcon, TimerIcon } from '../../../assets/icon';
import { GetAssignment, DeleteAssignment } from '../../../redux/action/instructor/InstructorAction';
import AssignmentForm from './../form/AssignmentForm';
import { PaginationValue } from '../../../utils/PaginationUrl';
import { removeCommaWordEnd } from '../../../utils/RegExp';
import { ASSIGNMENT_NOT_FOUND } from '../../../constant/data/ErrorMessage';

const AddButtonBottom = styled.div`
    position: absolute;
    bottom: 30px;
    right: 30px;
`

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
  DeleteAssignment,
  assignmentData,
  pageDetails,
  isLoadingAssignment,
}) => {
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [showDeleteAllIcon, setShowDeleteAllIcon] = useState(false);
  const [deleteRowData, setDeleteRowData] = useState('');
  const [paginationPayload, setPaginationPayload] = useState({
    page: PaginationValue?.page,
    size: PaginationValue?.size,
    field: 'ass_id',
    orderBy: PaginationValue?.orderBy,
  });
  const [editAssignment, setEditAssignment] = useState(false);
  const [editAssignmentData, setEditAssignmentData] = useState('');

  useEffect(() => {
    GetAssignment(router.query.clasId, paginationPayload);
  }, [router.query.clasId, paginationPayload]);

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
    console.log('rowData', rowData);
    if (icon === 'edit') {
      setEditAssignment(true);
      setEditAssignmentData(rowData);
    } else if (icon === 'delete') {
      setDeleteRowData(rowData?.id);
      setShowDeleteWarning(true);
    }
  }

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

  const deleteAllAssignment = () => {
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

  return (
    <React.Fragment>

      <AddButtonBottom>
        <CreateDrawer
          isShowAddIcon={ true }
          title='Create Assignment'
        >
          <AssignmentForm />
        </CreateDrawer>
      </AddButtonBottom>

      {
        showDeleteWarning &&
        <WarningDialog
          warningIcon={ <DeleteWarningIcon /> }
          message="Are you sure you want to delete ?"
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
        >
          <AssignmentForm
            editData={ editAssignmentData }
          />
        </CreateDrawer>
      }

      <CardView>

        { _.find(rows, function (o) { return o.isSelected === true }) && <div style={ { textAlign: 'right' } }>
          <IconButton onClick={ deleteAllAssignment }>
            <DeleteIcon />
          </IconButton>
        </div> }

        {assignmentData?.length > 0 ?
          <CommonTable
            isCheckbox={true}
            tableHeader={columns}
            tableData={rows}
            handleAction={handleAction}
            handleTableSort={ handleTableSort }
            handleCheckboxSelect={ handleCheckboxSelect }
            handleSingleSelect={ handleSingleSelect }
            isLoading={isLoadingAssignment}
            path={ { pathname: '/instructor/mysubmissions', query: { isAssignment: true, clasId: router.query.clasId } } }
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
    DeleteAssignment: (ClasId, assId) => dispatch(DeleteAssignment(ClasId, assId)),
  };
};

Assignments.layout = Instructor;

export default connect(mapStateToProps, mapDispatchToProps)(Assignments);
