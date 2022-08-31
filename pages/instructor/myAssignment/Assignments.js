import React, { useState, useEffect, useMemo } from 'react';
import _ from 'lodash';
import { Pagination } from '@mui/material';
import { IconButton } from '@mui/material';
import { connect } from 'react-redux';
import { useRouter } from 'next/router';
import { TextField } from '@mui/material';
import debouce from "lodash.debounce";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import styled from 'styled-components';
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
import {
  DeleteAssignment
} from '../../../redux/action/instructor/InstructorAction';
import AssignmentForms from './../form/AssignmentForms';
import { removeCommaWordEnd } from '../../../utils/RegExp';
import { ASSIGNMENT_NOT_FOUND } from '../../../constant/data/ErrorMessage';

const AddButtonBottom = styled.div`
    position: fixed;
    bottom: 30px;
    right: 30px;
`

const SearchField = styled.div`
    position:absolute;
    top: 125px;
    right:16px;
`;

const columns = [
  { id: 'id', label: 'Id' },
  { id: 'name', label: 'Name' },
  { id: 'status', label: 'Status' },
  { id: 'creation', label: 'Creation Date' },
  { id: 'end', label: 'End Date' },
  { id: 'action', label: 'Action' },
];

function createData(id, name, status, creation, end, action) {
  return { id, name, status, creation, end, action };
}

const Assignments = ({
  DeleteAssignment,
  assignmentData,
  pageDetailsAssignment,
  isLoadingAssignment,
  paginationAssignment,
  setPaginationAssignment
}) => {
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [assId, setAssId] = useState('');
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [showDeleteAllIcon, setShowDeleteAllIcon] = useState(false);
  const [deleteRowData, setDeleteRowData] = useState('');
  const [editAssignment, setEditAssignment] = useState(false);
  const [editAssignmentData, setEditAssignmentData] = useState('');

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
    setPaginationAssignment({ ...paginationAssignment, page: value - 1 });
  };

  /** search implementation using debounce concepts */

  const handleSearchAssignment = (event) => {
    if (event.target.value !== '') {
      paginationAssignment['search'] = event.target.value;
      setPaginationAssignment({ ...paginationAssignment, paginationAssignment });
    } else {
      delete paginationAssignment['search'];
      setPaginationAssignment({ ...paginationAssignment, paginationAssignment });
    }
  }

  const debouncedResultsAssignment = useMemo(() => {
    return debouce(handleSearchAssignment, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResultsAssignment.cancel();
    };
  });

  /** end debounce concepts */

  const handleAction = (event, icon, rowData) => {
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
      paginationAssignment['field'] = column.id
      paginationAssignment['orderBy'] = 'asc';
    } else {
      paginationAssignment['field'] = column.id
      paginationAssignment['orderBy'] = 'desc';
    }
    setPaginationAssignment({ ...paginationAssignment, paginationAssignment })
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

      <Box sx={ { flexGrow: 1 } }>
        <Grid container spacing={ 1 }>
          <Grid item container direction='row' justifyContent={ 'right' }>
            <SearchField>
              <TextField
                placeholder='Search'
                onChange={ debouncedResultsAssignment }
                inputProps={ {
                  style: {
                    padding: 5,
                    display: 'inline-flex'
                  }
                } }
              />
            </SearchField>
          </Grid>
        </Grid>
      </Box>

      <AddButtonBottom>
        <CreateDrawer
          isShowAddIcon={true}
          title='Create Assignment'
        >
          <AssignmentForms />
        </CreateDrawer>
      </AddButtonBottom>

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
        editAssignment &&
        <CreateDrawer
          title="Edit Student"
          isShowAddIcon={false}
          showDrawer={editAssignment}
        >
          <AssignmentForms
            editData={editAssignmentData}
          />
        </CreateDrawer>
      }

      <CardView>
        <AddButtonBottom>
          <CreateDrawer
            isShowAddIcon={true}
            title='Create Assignment'
          >
            <AssignmentForms />
          </CreateDrawer>
        </AddButtonBottom>


        {_.find(rows, function (o) { return o.isSelected === true }) && <div style={{ textAlign: 'right' }}>
          <IconButton onClick={deleteAllAssignment}>
            <DeleteIcon />
          </IconButton>
        </div>}

        {/* {assignmentData?.length > 0 ? */}
        <CommonTable
          isCheckbox={true}
          isNextPath={true}
          isSorting={true}
          tableHeader={columns}
          tableData={rows}
          handleAction={handleAction}
          handleTableSort={handleTableSort}
          handleCheckboxSelect={handleCheckboxSelect}
          handleSingleSelect={handleSingleSelect}
          isLoading={isLoadingAssignment}
          path={{ pathname: '/instructor/mysubmissions', query: { isAssignment: true, clasId: router.query.clasId, assId: assId } }}
        />
        {/* //   : <ErrorBlock message={ASSIGNMENT_NOT_FOUND} />
        // } */}

          <div style={{ marginLeft: '35%', marginTop: '25px' }}>
            <Pagination
            count={ pageDetailsAssignment?.totalPages }
              onChange={handlePagination}
              color='primary'
              variant='outlined'
              shape='rounded'
            />
        </div>

      </CardView>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    DeleteAssignment: (ClasId, assId) => dispatch(DeleteAssignment(ClasId, assId)),
  };
};

Assignments.layout = Instructor;

export default connect(null, mapDispatchToProps)(Assignments);
