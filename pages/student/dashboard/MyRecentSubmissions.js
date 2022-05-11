import * as React from 'react';

import { Heading, CardView, MyRecentSubmissionTable } from '../../../components';

const header = ['','','',''];
const data = [
  {
    color: '#2B4CB0',
    name: 'Java',
    course: 'Assignment-1',
    marks: '78',
    percent: '65%',
    feedback: 'Good',
    status: 'Active',
  },
  {
    color: '#F5CB47',
    name: 'Data Science',
    course: 'Assignment-2',
    marks: '58',
    percent: '100%',
    feedback: 'Good',
    status: 'Completed',
  },
  {
    color: '#E9596F',
    name: 'Computer Science',
    course: 'Assignment-3',
    marks: '68',
    percent: '25%',
    feedback: 'Good',
    status: 'Pending',
  },
];

const MyRecentSubmissions = () => {
  return (
    <>
      <CardView>
        <Heading title='My Recent submissions' />
        <MyRecentSubmissionTable tableData={data} />
      </CardView>
    </>
  );
};

export default MyRecentSubmissions;
