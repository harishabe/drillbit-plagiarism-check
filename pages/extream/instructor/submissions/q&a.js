import React, { useState, useEffect } from 'react';
import Instructor from '../../../../layouts/Instructor';
import { CardView, CommonTable, ErrorBlock } from '../../../../components';
import { connect } from 'react-redux';
import { GetSubmissionList } from '../../../../redux/action/instructor/InstructorAction';
import { useRouter } from "next/router";
import { QNA_NOT_FOUND } from '../../../../constant/data/ErrorMessage';

const QNA = ({
  GetSubmissionList,
  ansData,
  queData,
  isLoading
}) => {

  const router = useRouter();

  const clasId = router.query.clasId;

  const assId = router.query.assId;

  const [rows, setRows] = useState([]);

  useEffect(() => {
    let url = `classes/${clasId}/assignments/${assId}/qa`
    GetSubmissionList(url);
  }, [clasId, assId]);

  const columns = [
    { id: 'STname', label: 'Student Name' },
    { id: 'q1', label: queData?.q1 !== null ? queData?.q1 : '' },
    { id: 'q2', label: queData?.q2 !== null ? queData?.q2 : '' },
    { id: 'q3', label: queData?.q3 !== null ? queData?.q3 : '' },
    { id: 'q4', label: queData?.q4 !== null ? queData?.q4 : '' },
    { id: 'q5', label: queData?.q5 !== null ? queData?.q5 : '' },
  ];

  function createData(STname, q1, q2, q3, q4, q5) {
    return {
      STname, q1, q2, q3, q4, q5
    };
  }

  useEffect(() => {
    let row = '';
    let arr = [];
    ansData?.map((qna) => {
      row = createData(
        qna.studentName,
        qna?.a1 === null ? ("--") : qna.a1,
        qna?.a2 === null ? ("--") : qna.a2,
        qna?.a3 === null ? ("--") : qna.a3,
        qna?.a4 === null ? ("--") : qna.a4,
        qna?.a5 === null ? ("--") : qna.a5,
      );
      row['isSelected'] = false;
      arr.push(row);
    });
    setRows([...arr]);
  }, [ansData]);

  return (
    <React.Fragment>
      <CardView>
        <CommonTable
          isCheckbox={ false }
          isSorting={ true }
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
  ansData: state?.instructorMyFolders?.submissionData?.answersDTO?.content,
  queData: state?.instructorMyFolders?.submissionData?.questions,
});

const mapDispatchToProps = (dispatch) => {
  return {
    GetSubmissionList: (url) => dispatch(GetSubmissionList(url)),
  };
};

QNA.layout = Instructor;

export default connect(mapStateToProps, mapDispatchToProps)(QNA);
