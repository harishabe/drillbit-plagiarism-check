import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';
import BeatLoader from "react-spinners/BeatLoader";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Checkbox, Grid, Button, Box, Tooltip } from "@mui/material";
import { MainHeading, ErrorBlock } from './../../../../../components';
import { GetGoogleImportCourses } from './../../../../../redux/action/admin/AdminAction';
import { CLASS_NOT_FOUND } from "../../../../../constant/data/ErrorMessage";

const useStyles = makeStyles(() => ({
  width: {
    width: '100%'
  },
  marginTop: {
    marginTop: '30px'
  }
}));

const ClassList = ({
  GetGoogleImportCourses,
  googleLiveCourseData,
  googleImportCourseData,
  isLoadingImportCourse
}) => {
  const classes = useStyles();
  const router = useRouter();
  const [importClass, setImportClass] = useState([]);

  const handleChange = (event, item) => {
    const { checked } = event.target;
    if (checked) {
      setImportClass((prevIds) => [...prevIds, item.id]);
    } else {
      setImportClass((prevIds) => prevIds.filter((id) => id !== item.id));
    }
  };

  const handleSubmit = () => {
    let bodyFormData = new FormData();
    bodyFormData.append('course_id', ...importClass);
    GetGoogleImportCourses(bodyFormData);
  }

  const viewCourses = () => {
    router.push('/extream/admin/integration/google/coursesDashboard')
  }

  useEffect(() => {
    if (!isLoadingImportCourse && googleImportCourseData?.status === 200) {
      router.push('/extream/admin/integration/google/coursesDashboard')
    }
  }, [googleImportCourseData?.status === 200])

  return (
    <>
      <Box sx={ { flexGrow: 1 } }>
        <Grid container spacing={ 1 }>
          <Grid item md={ 5 } xs={ 5 }>
            <MainHeading title={ `Courses(${googleLiveCourseData?.length ? googleLiveCourseData?.length : 0})` } />
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={ 2 }>
        { googleLiveCourseData && googleLiveCourseData?.length > 0 ? googleLiveCourseData?.map((item) => (
          <Grid item md={ 4 } xs={ 12 }>
            <FormControlLabel
              control={
                <Checkbox
                  checked={ item.value }
                  onChange={ (e) => handleChange(e, item) }
                />
              }
              label={ item?.name }
            />
          </Grid>
        )) :
          <div className={ classes.width }>
            <ErrorBlock message={ CLASS_NOT_FOUND } />
          </div> }
      </Grid>
      <Grid container spacing={ 1 } className={ classes.marginTop }>
        { googleLiveCourseData?.length > 0 &&
          <Tooltip title={ importClass.length === 0 ? 'Please select courses to Import' : '' } arrow>
            <Grid item md={ 2 } >
              <Button
                variant="contained"
                onClick={ handleSubmit }
                disabled={ isLoadingImportCourse || importClass.length === 0 }
              >
                { isLoadingImportCourse ? <BeatLoader color="#fff" /> : 'Import Courses' }
              </Button>
            </Grid>
          </Tooltip>
        }
        <Grid item md={ 2 } >
          <Button
            variant="contained"
            onClick={ viewCourses }
          >
            View Courses
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => ({
  googleImportCourseData: state?.adminIntegrationData?.googleImportCourseData,
  isLoadingImportCourse: state?.adminIntegrationData?.isLoadingImportCourse,
});

const mapDispatchToProps = (dispatch) => {
  return {
    GetGoogleImportCourses: (data) => dispatch(GetGoogleImportCourses(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassList);