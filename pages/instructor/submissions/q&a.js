import React, { useState, useEffect } from 'react';
import Instructor from '../../../layouts/Instructor';
import { CardView, CommonTable } from '../../../components';
import { connect } from 'react-redux';
import { GetSubmissionList } from '../../../redux/action/instructor/InstructorAction';
import { useRouter } from "next/router";

const columns = [
  { id: 'STname', label: 'Student Name' },
  { id: 'q1', label: 'What is AI?' },
  { id: 'q2', label: 'Technology is AI?' },
  { id: 'q3', label: 'Industry Leader in?' },
  { id: 'q4', label: 'Industry Leader in?' },
  { id: 'q5', label: 'Industry Leader in?' },
];

function createData(STname, q1, q2, q3, q4, q5) {
  return {
    STname, q1, q2, q3, q4, q5
  };
}

// const data = [
//   createData(
//     'Harisha B E',
//     'Lorem ipsum dolor sit amet.',
//     'Lorem ipsum dolor sit amet.',
//     'Lorem ipsum dolor sit amet.'
//   ),
//   createData(
//     'Harisha B E',
//     'Lorem ipsum dolor sit amet.',
//     'Lorem ipsum dolor sit amet.',
//     'Lorem ipsum dolor sit amet.'
//   ),
//   createData(
//     'Harisha B E',
//     'Lorem ipsum dolor sit amet.',
//     'Lorem ipsum dolor sit amet.',
//     'Lorem ipsum dolor sit amet.'
//   ),
//   createData(
//     'Harisha B E',
//     'Lorem ipsum dolor sit amet.',
//     'Lorem ipsum dolor sit amet.',
//     'Lorem ipsum dolor sit amet.'
//   ),
// ];

const QNA = ({
  GetSubmissionList,
  qnaData,
  isLoading
}) => {

  const router = useRouter();

  const clasId = router.query.clasId;

  const assId = router.query.assId;

  const [rows, setRows] = useState([]);

  useEffect(() => {
    let url = `${clasId}/assignments/${assId}/qa`
    GetSubmissionList(url);
  }, [clasId, assId]);

  useEffect(() => {
    let row = '';
    let arr = [];
    qnaData?.map((qna) => {
      row = createData(
        qna.studentName,
        qna.a1,
        qna.a2,
        qna.a3,
        qna.a4,
        qna.a5,
      );
      row['isSelected'] = false;
      arr.push(row);
    });
    setRows([...arr]);
  }, [qnaData]);

  return (
    <React.Fragment>
      <CardView>
        <CommonTable
          isCheckbox={ true }
          tableHeader={ columns }
          tableData={ rows }
          isLoading={ isLoading }
        />
      </CardView>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state?.instructorMyFolders?.isLoadingSubmission,
  qnaData: state?.instructorMyFolders?.submissionData?.answersDTO?.content,
});

const mapDispatchToProps = (dispatch) => {
  return {
    GetSubmissionList: (url) => dispatch(GetSubmissionList(url)),
  };
};

QNA.layout = Instructor;

export default connect(mapStateToProps, mapDispatchToProps)(QNA);
