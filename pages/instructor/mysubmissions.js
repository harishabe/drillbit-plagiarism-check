import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { TextField } from '@mui/material';
import { connect } from 'react-redux';
import { useRouter } from "next/router";

import Instructor from '../../layouts/Instructor';
import { BreadCrumb, TabMenu } from '../../components';
import { GetSubmissionList } from '../../redux/action/instructor/InstructorAction';
import { PaginationValue } from '../../utils/PaginationUrl';

import Submission from './submissions/submission';
import Grading from './submissions/grading';
import QNA from './submissions/q&a';

const MySubmissions = ({
  GetSubmissionList,
  pageDetails
}) => {

  const router = useRouter();
  console.log("routerrouterrouter", router)

  const clasId = router.query.clasId;

  const assId = router.query.assId;

  const [paginationPayload, setPaginationPayload] = useState({
    page: PaginationValue?.page,
    size: PaginationValue?.size,
    field: 'name',
    orderBy: PaginationValue?.orderBy,
  });

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
      name: 'My assignments',
      link: '/instructor/my-assignment' + router?.asPath?.slice(router?.pathname?.length),
      active: false,
    },
    {
      name: 'Submissions',
      link: '/instructor/mysubmissions',
      active: true,
    },
  ];

  const tabMenu = [
    {
      // label: `Submission(${pageDetails?.totalElements !== undefined ? pageDetails?.totalElements : 0})`,
      label: 'Submission',
    },
    {
      label: 'Grading',
    },
    {
      label: 'Question & Answer',
    },
  ];

  const componentList = [<Submission />, <Grading />, <QNA />];

  useEffect(() => {
    let url = `${clasId}/assignments/${assId}/submissions?page=${PaginationValue?.page}&size=${PaginationValue?.size}&field=name&orderBy=${PaginationValue?.orderBy}`
    GetSubmissionList(url);
  }, [clasId, assId, paginationPayload]);

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item md={10} xs={10}>
            <BreadCrumb item={InstructorBreadCrumb} />
          </Grid>
          <Grid item md={2} xs={2}>
            <TextField
              placeholder='Search'
              inputProps={{
                style: {
                  padding: 5,
                  display: 'inline-flex',
                },
              }}
            />
          </Grid>
        </Grid>
      </Box>
      <TabMenu menuButton={tabMenu} components={componentList} />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  pageDetails: state?.instructorMyFolders?.submissionData?.page,
});

const mapDispatchToProps = (dispatch) => {
  return {
    GetSubmissionList: (url) => dispatch(GetSubmissionList(url)),
  };
};

MySubmissions.layout = Instructor;

export default connect(mapStateToProps, mapDispatchToProps)(MySubmissions);

