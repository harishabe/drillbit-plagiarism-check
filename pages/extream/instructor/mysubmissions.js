import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { useRouter } from "next/router";
import Instructor from '../../../layouts/Instructor';
import { BreadCrumb, TabMenu } from '../../../components';
import Submission from './submissions/submission';
import Grading from './submissions/grading';
import QNA from './submissions/q&a';

const MySubmissions = () => {

  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);

  const InstructorBreadCrumb = [
    {
      name: 'Dashboard',
      link: '/extream/instructor/dashboard',
      active: false,
    },
    {
      name: router.query.clasName,
      link: '/extream/instructor/myclasses',
      active: false,
    },
    {
      name: router.query.assName,
      link: '/extream/instructor/my-assignment' + router?.asPath?.slice(router?.pathname?.length),
      active: false,
    },
    {
      name: 'Submissions',
      link: '/instructor/mysubmissions',
      active: true,
    },
  ];

  const handleAPI = (value) => {
    setActiveTab(value);
  }

  const SubmissionComponent = activeTab === 0 && <Submission />
  const GradingComponent = activeTab === 1 && <Grading />
  const QnaComponent = activeTab === 2 && <QNA />

  const tabMenu = [
    {
      // label: `Submission(${pageDetails?.totalElements !== undefined ? pageDetails?.totalElements : 0})`,
      label: 'Submission',
    },
    {
      label: 'Grades',
    },
    {
      label: 'Question & Answer',
    },
  ];

  const componentList = [
    SubmissionComponent,
    GradingComponent,
    QnaComponent
  ];

  return (
    <React.Fragment>
      <Box sx={ { flexGrow: 1 } }>
        <BreadCrumb item={ InstructorBreadCrumb } />
      </Box>
      <TabMenu
        menuButton={ tabMenu }
        components={ componentList }
        handleAPI={ handleAPI }
      />
    </React.Fragment>
  );
};

MySubmissions.layout = Instructor;

export default MySubmissions;

