import React, { useState, useEffect } from 'react';
import Instructor from '../../../../layouts/Instructor';
import { CardView, CommonTable, ErrorBlock, SimilarityStatus, CreateDrawer } from '../../../../components';
import { MessageExclamatoryIcon } from '../../../../assets/icon';
import { connect } from 'react-redux';
import { GetSubmissionList } from '../../../../redux/action/instructor/InstructorAction';
import { useRouter } from "next/router";
import { GRADING_NOT_FOUND } from '../../../../constant/data/ErrorMessage';
import FeedbackForm from '../form/FeedbackForm';

const columns = [
  { id: 'STname', label: 'Student Name', minWidth: 200 },
  { id: 'paper_id', label: 'Paper ID', minWidth: 150 },
  { id: 'similarity', label: 'Similarity' },
  { id: 'marks', label: 'Assignment Marks', minWidth: 200 },
  { id: 'action', label: 'Feedback', minWidth: 150 },
];

function createData(STname, paper_id, marks, similarity, action) {
  return {
    STname, paper_id, marks, similarity, action
  };
}

const Grading = ({
  GetSubmissionList,
  gradingData,
  isLoading
}) => {

  const router = useRouter();

  const clasId = router.query.clasId;

  const assId = router.query.assId;

  const [rows, setRows] = useState([]);
  const [feedbackData, setFeedbackData] = useState('');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  useEffect(() => {
    let url = `classes/${clasId}/assignments/${assId}/grading`
    GetSubmissionList(url);
  }, [clasId, assId]);


  useEffect(() => {
    let row = '';
    let arr = [];
    gradingData?.map((grading) => {
      row = createData(
        grading.stduentName,
        grading.paper_id,
        grading.obtained_marks,
        <SimilarityStatus percent={grading.similarity} />,
        [
          { 'component': <MessageExclamatoryIcon />, 'type': 'feedback', 'title': 'Feedback' },
        ]
      );
      row['isSelected'] = false;
      arr.push(row);
    });
    setRows([...arr]);
  }, [gradingData]);

  const handleAction = (event, icon, rowData) => {
    if (icon === 'feedback') {
      setShowFeedbackForm(true);
      setFeedbackData(rowData?.paper_id);
    }
  }

  const handleCloseDrawer = (drawerClose) => {
    setShowFeedbackForm(drawerClose)
  }

  return (
    <React.Fragment>
      {
        showFeedbackForm &&
        <CreateDrawer
            title=""
            isShowAddIcon={ false }
            showDrawer={ showFeedbackForm }
            handleDrawerClose={ handleCloseDrawer }
        >
            <FeedbackForm
              clasId={ clasId }
              assId={ assId }
              feedbackData={ feedbackData }
            />
        </CreateDrawer>
      }

      <CardView>
        <CommonTable
          isCheckbox={false}
          isSorting={true}
          tableHeader={columns}
          tableData={rows}
          isLoading={isLoading}
          handleAction={ handleAction }
        />
      </CardView>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state?.instructorMyFolders?.isLoadingSubmission,
  gradingData: state?.instructorMyFolders?.submissionData?._embedded?.gradingDTOList,
});

const mapDispatchToProps = (dispatch) => {
  return {
    GetSubmissionList: (url) => dispatch(GetSubmissionList(url)),
  };
};

Grading.layout = Instructor;

export default connect(mapStateToProps, mapDispatchToProps)(Grading);