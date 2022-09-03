import React, { useState, useEffect, useMemo } from 'react';
import _ from 'lodash';
import Instructor from '../../../layouts/Instructor';
import {
  CardView,
  CommonTable,
  AvatarName,
  CreateDrawer,
  ErrorBlock,
  WarningDialog
} from '../../../components';
import { EditIcon, DeleteIcon, DeleteWarningIcon, AddMultipleIcon } from '../../../assets/icon';
import { connect } from 'react-redux';
import {
  // GetSubmissionList,
  GetMyClassesSubmissionList,
  DeleteSubmission, UploadFileDataClear, UploadZipFileDataClear
} from '../../../redux/action/instructor/InstructorAction';
import { useRouter } from "next/router";
import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import debouce from "lodash.debounce";
import { PaginationValue } from '../../../utils/PaginationUrl';
import { IconButton } from '@mui/material';
import styled from 'styled-components';
import SubmissionForm from '../form/SubmissionForm';
import AssignmentForm from '../form/AssignmentForm';
import { removeCommaWordEnd } from '../../../utils/RegExp';
import { SUBMISSION_NOT_FOUND } from '../../../constant/data/ErrorMessage';

const columns = [
  // { id: 'id', label: 'Student ID' },
  { id: 'name', label: 'Author Name' },
  { id: 'title', label: 'Paper Title' },
  { id: 'file', label: 'Original File' },
  { id: 'grammer', label: 'Grammar' },
  { id: 'percent', label: 'Similarity' },
  { id: 'paper_id', label: 'Paper Id' },
  { id: 'date_up', label: 'Submission Date' },
  { id: 'action', label: 'Action' },
];

function createData(id, name, title, file, grammer, percent, paper_id, date_up, action) {
  return {
    id, name, title, file, grammer, percent, paper_id, date_up, action
  };
}

const AddButtonBottom = styled.div`
    position:fixed;
    bottom: 30px;
    right:30px;
`;

const SearchField = styled.div`
    position:absolute;
    top: 125px;
    right:16px;
`;

const Submission = ({
  // GetSubmissionList,
  GetMyClassesSubmissionList,
  DeleteSubmission,
  submissionData,
  isLoading,
  isLoadingUpload,
  pageDetails,
  UploadFileDataClear,
  extractedFileData,
  uploadData,
  UploadZipFileDataClear
}) => {

  const router = useRouter();

  const clasId = router.query.clasId;

  const assId = router.query.assId;

  const [rows, setRows] = useState([]);
  const [paginationPayload, setPaginationPayload] = useState({
    page: PaginationValue?.page,
    size: PaginationValue?.size,
    field: 'name',
    orderBy: PaginationValue?.orderBy,
  });
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [editAssignment, setEditAssignment] = useState(false);
  const [editAssignmentData, setEditAssignmentData] = useState('');
  const [deleteRowData, setDeleteRowData] = useState('');
  // const [text, setText] = useState('');
  const [showDeleteAllIcon, setShowDeleteAllIcon] = useState(false);

  useEffect(() => {
    // if (text) {
    //   let url = `classes/${clasId}/assignments/${assId}/submissions?page=${PaginationValue?.page}&size=${PaginationValue?.size}&field=name&orderBy=${PaginationValue?.orderBy}&search=${text}`
    //   GetSubmissionList(url);
    // } else {
    //   let url = `classes/${clasId}/assignments/${assId}/submissions?page=${PaginationValue?.page}&size=${PaginationValue?.size}&field=name&orderBy=${PaginationValue?.orderBy}`
    //   GetSubmissionList(url);
    // }
    GetMyClassesSubmissionList(clasId, assId, paginationPayload)
  }, [clasId, assId, paginationPayload]);

  useEffect(() => {
    let row = '';
    let arr = [];
    submissionData?.map((submission) => {
      row = createData(
        submission.ass_id,
        submission.name,
        submission.title,
        submission.original_fn,
        submission.grammar,
        submission.percent,
        submission.paper_id,
        submission.date_up,
        [
          { 'component': <DeleteIcon />, 'type': 'delete' },
        ]
      );
      row['isSelected'] = false;
      arr.push(row);
    });
    setRows([...arr]);
  }, [submissionData]);

  const handlePagination = (event, value) => {
    event.preventDefault();
    setPaginationPayload({ ...paginationPayload, page: value - 1 });
  };

  const handleSearch = (event) => {
    if (event.target.value !== '') {
      paginationPayload['search'] = event.target.value;
      setPaginationPayload({ ...paginationPayload, paginationPayload });
      // setText(event.target.value)
    } else {
      delete paginationPayload['search'];
      setPaginationPayload({ ...paginationPayload, paginationPayload });
      // setText(event.target.value)
    }
  }

  const debouncedResults = useMemo(() => {
    return debouce(handleSearch, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  const handleAction = (event, icon, rowData) => {
    if (icon === 'edit') {
      setEditAssignment(true);
      setEditAssignmentData(rowData);
    } else if (icon === 'delete') {
      setDeleteRowData(rowData?.paper_id);
      setShowDeleteWarning(true);
    }
  }

  const handleYesWarning = () => {
    DeleteSubmission(`classes/${clasId}/assignments/${assId}/submissions?paperId=${deleteRowData}`);
    setShowDeleteAllIcon(false);
    setTimeout(() => {
      setShowDeleteWarning(false);
    }, [100]);
    setTimeout(() => {
      GetMyClassesSubmissionList(clasId, assId, paginationPayload)
    }, [2000]);
  };

  const handleCloseWarning = () => {
    setShowDeleteWarning(false);
  };

  const handleTableSort = (e, column, sortToggle) => {
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
      if (rowItem?.paperid === row?.paperid) {
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
      rowsId += rowItem?.paperid + ',';
    });
    setDeleteRowData(removeCommaWordEnd(rowsId));
    setShowDeleteWarning(true);
  }

  const handleUploadFile = () => {
    if (extractedFileData) {
      UploadFileDataClear();
    }
    if (uploadData) {
      UploadZipFileDataClear();
    }
    router.push({ pathname: '/instructor/uploadFile', query: router.query })
  }

  return (
    <React.Fragment>
      <Grid item container direction='row' justifyContent={'right'}>
        <SearchField>
          <TextField
            placeholder='Search'
            onChange={debouncedResults}
            inputProps={{
              style: {
                padding: 5,
                display: 'inline-flex',
              },
            }}
          />
        </SearchField>
      </Grid>
      <AddButtonBottom>
        <CreateDrawer
          title="Upload File"
          isShowAddIcon={true}
          navigateToMultiFile={true}
          handleNavigateMultiFile={handleUploadFile}
        >
          <SubmissionForm
            clasId={clasId}
            folderId={assId}
            isLoadingUpload={isLoadingUpload}
          />
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
          <AssignmentForm
            editData={editAssignmentData}
          />
        </CreateDrawer>
      }
      <CardView>
        {_.find(rows, function (o) { return o.isSelected === true }) && <div style={{ textAlign: 'right' }}>
          <IconButton onClick={deleteAllAssignment}>
            <DeleteIcon />
          </IconButton>
        </div>}


        <CommonTable
          isCheckbox={true}
          isSorting={true}
          tableHeader={columns}
          tableData={rows}
          handleAction={handleAction}
          handleTableSort={ handleTableSort }
          handleCheckboxSelect={handleCheckboxSelect}
          handleSingleSelect={handleSingleSelect}
          isLoading={isLoading}
          charLength={10}
        />

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
  pageDetails: state?.instructorSubmissionGrading?.submissionData?.page,
  isLoading: state?.instructorSubmissionGrading?.isLoadingSubmission,
  isLoadingUpload: state?.instructorSubmissionGrading?.isLoadingUpload,
  submissionData: state?.instructorSubmissionGrading?.submissionData?._embedded?.submissionsList,
  extractedFileData: state?.instructorSubmissionGrading?.extractedFileData,
  uploadData: state?.instructorSubmissionGrading?.uploadData,
});

const mapDispatchToProps = (dispatch) => {
  return {
    // GetSubmissionList: (url) => dispatch(GetSubmissionList(url)),
    GetMyClassesSubmissionList: (clasId, assId, paginationPayload) => dispatch(GetMyClassesSubmissionList(clasId, assId, paginationPayload)),
    DeleteSubmission: (url) => dispatch(DeleteSubmission(url)),
    UploadFileDataClear: () => dispatch(UploadFileDataClear()),
    UploadZipFileDataClear: () => dispatch(UploadZipFileDataClear())
  };
};

Submission.layout = Instructor;

export default connect(mapStateToProps, mapDispatchToProps)(Submission);
