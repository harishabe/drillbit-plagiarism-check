import * as React from 'react'

import { Heading, CardView, RecentSubmissionTable } from '../../../components'

const data = [{
  'color':'#2B4CB0',
  'name': 'Harisha',
  'course': 'Java',
  'percent': '65%',
  'feedback': 'Good',
  'status': 'Active',
},
{
  'color':'#F5CB47',
  'name': 'Yatheendra',
  'course': 'Data Science',
  'percent': '100%',
  'feedback': 'Good',
  'status': 'Completed',
},
{
  'color':'#E9596F',
  'name': 'Jayanna',
  'course': 'Machine learning',
  'percent': '25%',
  'feedback': 'Good',
  'status': 'Pending',
},
{
  'color':'#E9596F',
  'name': 'Jayanna',
  'course': 'Machine learning',
  'percent': '25%',
  'feedback': 'Good',
  'status': 'Pending',
}]

const RecentSubmissions = () => {
  return (
    <>
      <CardView>
        <Heading title='Recent submissions' />
        <RecentSubmissionTable tableData={data} />
      </CardView>
    </>
  )
}

export default RecentSubmissions