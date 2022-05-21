import React from 'react';
import Instructor from '../../../layouts/Instructor';
import { CardView, CommonTable } from '../../../components';

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
  { id: 'ai', label: 'What is AI?' },
  { id: 'techAI', label: 'Technology is AI?' },
  { id: 'industry', label: 'Industry Leader in?' },
];

function createData(STname, ai, techAI, industry) {
  return {
    STname,
    ai,
    techAI,
    industry,
  };
}

const rows = [
  createData(
    'Harisha B E',
    'Lorem ipsum dolor sit amet.',
    'Lorem ipsum dolor sit amet.',
    'Lorem ipsum dolor sit amet.'
  ),
  createData(
    'Harisha B E',
    'Lorem ipsum dolor sit amet.',
    'Lorem ipsum dolor sit amet.',
    'Lorem ipsum dolor sit amet.'
  ),
  createData(
    'Harisha B E',
    'Lorem ipsum dolor sit amet.',
    'Lorem ipsum dolor sit amet.',
    'Lorem ipsum dolor sit amet.'
  ),
  createData(
    'Harisha B E',
    'Lorem ipsum dolor sit amet.',
    'Lorem ipsum dolor sit amet.',
    'Lorem ipsum dolor sit amet.'
  ),
];

const QNA = () => {
  return (
    <React.Fragment>
      <CardView>
        <CommonTable isCheckbox={true} tableHeader={columns} tableData={rows} />
      </CardView>
    </React.Fragment>
  );
};

QNA.layout = Instructor;

export default QNA;
