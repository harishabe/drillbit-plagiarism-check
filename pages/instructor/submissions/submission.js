import React, { useState, useEffect } from 'react';
import Instructor from '../../../layouts/Instructor';
import {
  CardView,
  CommonTable,
  AvatarName,
  CreateDrawer,
  ErrorBlock,
  WarningDialog
} from '../../../components';
import { EditIcon, DeleteIcon, DeleteWarningIcon } from '../../../assets/icon';
import { connect } from 'react-redux';
import { GetSubmissionList, DeleteSubmission } from '../../../redux/action/instructor/InstructorAction';
import { useRouter } from "next/router";
import { PaginationValue } from '../../../utils/PaginationUrl';
import { IconButton } from '@mui/material';
import styled from 'styled-components';
import SubmissionForm from '../form/SubmissionForm';
import AssignmentForm from '../form/AssignmentForm';
import { removeCommaWordEnd } from '../../../utils/RegExp';
import { SUBMISSION_NOT_FOUND } from '../../../constant/data/ErrorMessage';

const columns = [
  { id: 'id', label: 'Student ID' },
  { id: 'STname', label: 'Student Name' },
  { id: 'PAname', label: 'Paper Name' },
  { id: 'file', label: 'Original File' },
  { id: 'lang', label: 'Language' },
  { id: 'grammer', label: 'Grammer' },
  { id: 'similarity', label: 'Similarity' },
  { id: 'paperid', label: 'Paper Id' },
  { id: 'date', label: 'Submission Date' },
  { id: 'action', label: 'Actions' },
];

function createData(id, STname, PAname, file, lang, grammer, similarity, paperid, date, action) {
  return {
    id, STname, PAname, file, lang, grammer, similarity, paperid, date, action
  };
}

const AddButtonBottom = styled.div`
    position:absolute;
    bottom: 30px;
    right:30px;
`;

const Submission = ({
  GetSubmissionList,
  DeleteSubmission,
  submissionData,
  isLoading,
  isLoadingUpload,
  pageDetails
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
  const [showDeleteAllIcon, setShowDeleteAllIcon] = useState(false);

  useEffect(() => {
    let url = `${clasId}/assignments/${assId}/submissions?page=${PaginationValue?.page}&size=${PaginationValue?.size}&field=name&orderBy=${PaginationValue?.orderBy}`
    GetSubmissionList(url);
  }, [clasId, assId, paginationPayload]);

  useEffect(() => {
    let row = '';
    let arr = [];
    submissionData?.map((submission) => {
      row = createData(
        <AvatarName
          avatarText='S'
          title={ submission.ass_id }
          color='#4795EE'
        />,
        submission.name,
        submission.title,
        submission.original_fn,
        submission.lang1,
        submission.grammar,
        submission.percent,
        submission.paper_id,
        submission.date_up,
        [
          { 'component': <EditIcon />, 'type': 'edit' },
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

  const handleAction = (event, icon, rowData) => {
    console.log('rowData', rowData);
    if (icon === 'edit') {
      setEditAssignment(true);
      setEditAssignmentData(rowData);
    } else if (icon === 'delete') {
      setDeleteRowData(rowData?.paperid);
      setShowDeleteWarning(true);
    }
  }

  const handleYesWarning = () => {
    DeleteSubmission(clasId, assId, deleteRowData);
    setShowDeleteAllIcon(false);
    setTimeout(() => {
      setShowDeleteWarning(false);
    }, [100]);
  };

  const handleCloseWarning = () => {
    setShowDeleteWarning(false);
  };

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
      rowsId += rowItem?.paperid + ',';
    });
    setDeleteRowData(removeCommaWordEnd(rowsId));
    setShowDeleteWarning(true);
  }

  return (
    <React.Fragment>
      <AddButtonBottom>
        <CreateDrawer
          title="Create Folder"
          isShowAddIcon={ true }>
          <SubmissionForm
            clasId={ clasId }
            folderId={ assId }
            isLoadingUpload={ isLoadingUpload }
          />
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

        { submissionData?.length > 0 ?
          <CommonTable
            isCheckbox={ true }
            tableHeader={ columns }
            tableData={ rows }
            handleAction={ handleAction }
            handleCheckboxSelect={ handleCheckboxSelect }
            handleSingleSelect={ handleSingleSelect }
            isLoading={ isLoading }
          />
          : <ErrorBlock message={ SUBMISSION_NOT_FOUND } />
        }

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
  pageDetails: state?.instructorMyFolders?.submissionData?.page,
  isLoading: state?.instructorMyFolders?.isLoadingSubmission,
  isLoadingUpload: state?.instructorMyFolders?.isLoadingUpload,
  submissionData: state?.instructorMyFolders?.submissionData?._embedded?.submissionsList,
});

const mapDispatchToProps = (dispatch) => {
  return {
    GetSubmissionList: (url) => dispatch(GetSubmissionList(url)),
    DeleteSubmission: (clasId, folderId, paperId) => dispatch(DeleteSubmission(clasId, folderId, paperId)),
  };
};

Submission.layout = Instructor;

export default connect(mapStateToProps, mapDispatchToProps)(Submission);
