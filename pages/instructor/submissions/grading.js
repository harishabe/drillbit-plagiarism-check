import React from 'react';
import Instructor from '../../../layouts/Instructor';
import { CardView, CommonTable } from '../../../components';
import { MessageExclamatoryIcon } from '../../../assets/icon';

const InstructorBreadCrumb = [
  {
    name: 'Dashboard',
    link: '/instructor/dashboard',
    active: false,
  },
  {
    name: 'My classes',
    link: '/instructor/myclasses',
    active: false,
  },
  {
    name: 'Java',
    link: '/instructor/myclasstables',
    active: false,
  },
  {
    name: 'Submissions',
    link: '/instructor/mysubmissions',
    active: true,
  },
];

const columns = [
  { id: 'STname', label: 'Student Name' },
  { id: 'similarity', label: 'Similarity' },
  { id: 'marks', label: 'Assignment Marks(100-0)' },
  { id: 'feedback', label: 'Feedback' },
];

function createData(STname, marks, similarity, feedback) {
  return {
    STname,
    marks,
    similarity,
    feedback,
  };
}

const rows = [
  createData('Harisha B E', '22', '70%', [<MessageExclamatoryIcon />]),
  createData('Harisha B E', '22', '70%', [<MessageExclamatoryIcon />]),
  createData('Harisha B E', '22', '70%', [<MessageExclamatoryIcon />]),
  createData('Harisha B E', '22', '70%', [<MessageExclamatoryIcon />]),
];

const actionIcon = [<MessageExclamatoryIcon />];

const Grading = () => {
  return (
    <React.Fragment>
      <CardView>
        <CommonTable
          isCheckbox={true}
          tableHeader={columns}
          tableData={rows}
          actionIcon={actionIcon}
          isActionIcon={true}
        />
      </CardView>
    </React.Fragment>
  );
};

Grading.layout = Instructor;

export default Grading;
