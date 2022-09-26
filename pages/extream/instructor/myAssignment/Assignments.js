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
import Instructor from '../../../../layouts/Instructor';
import {
  CardView,
  CommonTable,
  StatusDot,
  CreateDrawer,
  WarningDialog
} from '../../../../components';
import { EditIcon, DeleteIcon, DeleteWarningIcon } from '../../../../assets/icon';
import {
  GetAssignment,
  DeleteAssignment
} from '../../../../redux/action/instructor/InstructorAction';
import AssignmentForms from './../form/AssignmentForms';
import { removeCommaWordEnd, formatDate } from '../../../../utils/RegExp';
import { PaginationValue } from '../../../../utils/PaginationUrl';
import { PaginationContainer } from '../../../style/index';

const AddButtonBottom = styled.div`
    position: fixed;
    bottom: 30px;
    right: 30px;
`;

const SearchField = styled.div`
    position:absolute;
    top: 125px;
    right:16px;
`;

const columns = [
  { id: 'id', label: 'Assignment ID' },
  { id: 'assignment_name', label: 'Assignment Name' },
  { id: 'status', label: 'Status' },
  { id: 'start_date', label: 'Creation Date' },
  { id: 'end_date', label: 'End Date' },
  { id: 'action', label: 'Actions' },
];

function createData(id, assignment_name, status, start_date, end_date, action) {
  return { id, assignment_name, status, start_date, end_date, action };
}

const Assignments = ({
  GetAssignment,
  DeleteAssignment,
  assignmentData,
  pageDetailsAssignment,
  isLoadingAssignment
}) => {
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [assId, setAssId] = useState('');
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [showDeleteAllIcon, setShowDeleteAllIcon] = useState(false);
  const [deleteRowData, setDeleteRowData] = useState('');
  const [editAssignment, setEditAssignment] = useState(false);
  const [editAssignmentData, setEditAssignmentData] = useState('');
  const [paginationPayload, setPaginationPayload] = useState({
    page: PaginationValue?.page,
    size: PaginationValue?.size,
    field: 'ass_id',
    orderBy: PaginationValue?.orderBy,
  });

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
          title={ assignment.status }
        />,
        assignment.start_date,
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

  const handleAction = (e, icon, rowData) => {
    e.preventDefault();
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
    e.preventDefault();
    if (sortToggle) {
      paginationPayload['field'] = column.id;
      paginationPayload['orderBy'] = 'asc';
    } else {
      paginationPayload['field'] = column.id;
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

  const handleSearchAssignment = (event) => {
    if (event.target.value !== '') {
      paginationPayload['search'] = event.target.value;
      setPaginationPayload({ ...paginationPayload, paginationPayload });
    } else {
      delete paginationPayload['search'];
      setPaginationPayload({ ...paginationPayload, paginationPayload });
    }
  }

  const searchAssignment = useMemo(() => {
    return debouce(handleSearchAssignment, 300);
  }, []);

  useEffect(() => {
    return () => {
      searchAssignment.cancel();
    };
  });

  const handleCloseDrawer = (drawerClose) => {
    setEditAssignment(drawerClose);
  }

  return (
    <React.Fragment>
      <Box sx={ { flexGrow: 1 } }>
        <Grid container spacing={ 1 }>
          <Grid item container direction='row' justifyContent={ 'right' }>
            <SearchField>
              <TextField
                placeholder='Search'
                onChange={ searchAssignment }
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
          isShowAddIcon={ true }
          title='Create Assignment'
        >
          <AssignmentForms />
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
            handleDrawerClose={ handleCloseDrawer }
        >
          <AssignmentForms
              editData={ editAssignmentData }
          />
        </CreateDrawer>
      }
      <CardView>
        <AddButtonBottom>
          <CreateDrawer
            isShowAddIcon={ true }
            title='Create Assignment'
          >
            <AssignmentForms />
          </CreateDrawer>
        </AddButtonBottom>
        { _.find(rows, function (o) { return o.isSelected === true }) && <div style={ { textAlign: 'right' } }>
          <IconButton onClick={ deleteAllAssignment }>
            <DeleteIcon />
          </IconButton>
        </div> }
        <CommonTable
          isCheckbox={ true }
          isNextPath={ true }
          isSorting={ true }
          tableHeader={ columns }
          tableData={ rows }
          handleAction={ handleAction }
          handleTableSort={ handleTableSort }
          handleCheckboxSelect={ handleCheckboxSelect }
          handleSingleSelect={ handleSingleSelect }
          isLoading={ isLoadingAssignment }
          path={ { pathname: '/extream/instructor/mysubmissions', query: { isAssignment: true, clasId: router.query.clasId, assId: assId } } }
        />
        <PaginationContainer>
          <Pagination
            count={ pageDetailsAssignment?.totalPages }
            onChange={ handlePagination }
            color='primary'
            variant='outlined'
            shape='rounded'
          />
        </PaginationContainer>
      </CardView>
    </React.Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    DeleteAssignment: (ClasId, assId) => dispatch(DeleteAssignment(ClasId, assId)),
    GetAssignment: (ClasId, PaginationValue) => dispatch(GetAssignment(ClasId, PaginationValue)),
  };
};

Assignments.layout = Instructor;

export default connect(null, mapDispatchToProps)(Assignments);
