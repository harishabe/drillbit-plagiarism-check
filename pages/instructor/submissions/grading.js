import React, { useState, useEffect } from 'react';
import Instructor from '../../../layouts/Instructor';
import { CardView, CommonTable, ErrorBlock } from '../../../components';
import { MessageExclamatoryIcon } from '../../../assets/icon';
import { connect } from 'react-redux';
import { GetSubmissionList } from '../../../redux/action/instructor/InstructorAction';
import { useRouter } from "next/router";
import { GRADING_NOT_FOUND } from '../../../constant/data/ErrorMessage';

const columns = [
  { id: 'STname', label: 'Student Name' },
  { id: 'similarity', label: 'Similarity' },
  { id: 'marks', label: 'Assignment Marks(100-0)' },
  { id: 'feedback', label: 'Feedback' },
];

function createData(STname, marks, similarity, feedback) {
  return {
    STname, marks, similarity, feedback
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
        grading.obtained_marks,
        grading.similarity,
        [
          <MessageExclamatoryIcon />,
        ]
      );
      row['isSelected'] = false;
      arr.push(row);
    });
    setRows([...arr]);
  }, [gradingData]);

  return (
    <React.Fragment>
      <CardView>
        { gradingData?.length > 0 ? 
          <CommonTable
            isCheckbox={ true }
            isSorting={ true }
            tableHeader={ columns }
            tableData={ rows }
            isLoading={ isLoading }
          />
          : <ErrorBlock message={ GRADING_NOT_FOUND } />
        }

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