import React, { useState, useEffect } from 'react';
import Instructor from '../../../layouts/Instructor';
import { CardView, CommonTable, AvatarName, CreateDrawer } from '../../../components';
import { EditIcon, DeleteIcon } from '../../../assets/icon';
import { connect } from 'react-redux';
import { GetSubmissionList } from '../../../redux/action/instructor/InstructorAction';
import { useRouter } from "next/router";
import { PaginationValue } from '../../../utils/PaginationUrl';
import styled from 'styled-components';
import SubmissionForm from '../form/SubmissionForm';

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
  submissionData,
  isLoading,
  isLoadingUpload,
  pageDetails
}) => {

  const router = useRouter();

  const clasId = router.query.clasId;

  const assId = router.query.assId;

  // const InstructorBreadCrumb = [
  //   {
  //     name: 'Dashboard',
  //     link: '/instructor/dashboard',
  //     active: false,
  //   },
  //   {
  //     name: 'My classes',
  //     link: '/instructor/myclasses',
  //     active: false,
  //   },
  //   {
  //     name: router.query.className,
  //     link: '/instructor/myclasstables' + router?.asPath?.slice(router?.pathname?.length),
  //     active: false,
  //   },
  //   {
  //     name: 'Submissions',
  //     link: '/instructor/mysubmissions',
  //     active: true,
  //   },
  // ];

  const [rows, setRows] = useState([]);
  const [paginationPayload, setPaginationPayload] = useState({
    page: PaginationValue?.page,
    size: PaginationValue?.size,
    field: 'name',
    orderBy: PaginationValue?.orderBy,
  });

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

  return (
    <React.Fragment>
      <CardView>
        <CommonTable
          isCheckbox={ true }
          tableHeader={ columns }
          tableData={ rows }
          isLoading={ isLoading }
        />

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
  };
};

Submission.layout = Instructor;

export default connect(mapStateToProps, mapDispatchToProps)(Submission);
