import React, { useState } from "react";
import { connect } from "react-redux";
import { useRouter } from 'next/router';
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Checkbox, Grid } from "@mui/material";
import { CardView } from "../../../../../components";
import {
  GetGoogleImportCourses,
  GetGoogleCourseHome,
} from "./../../../../../redux/action/admin/AdminAction";

const ClassList = ({
  liveCourses,
  GetGoogleImportCourses,
  GetGoogleCourseHome,
}) => {
  const router = useRouter();
  const [state, setState] = useState([
    { id: 123, name: "Gilad Gray", value: true },
    { id: 456, name: "Jason Killian", value: false },
    { id: 789, name: "Antoine Llorca", value: false },
  ]);
  const [importCoursePayload, setImportCoursePayload] = useState();

  const handleChange = (e, item) => {
    e.preventDefault();
    let bodyFormData = new FormData();
    bodyFormData.append("course_id", item.id);
    setImportCoursePayload(bodyFormData);
    // setState({
    //   ...state,
    //   [e.target.id]: e.target.checked,
    // });
  };

  const importClass = () => {
    GetGoogleImportCourses(importCoursePayload);
  };

  const getCoursesHome = () => {
    //GetGoogleCourseHome();
    router.push({ pathname: '/extream/admin/integration/google/classRoom' });
  };

  return (
    <>
      <CardView>
        <FormLabel component="legend">Classes list</FormLabel>
        <Grid container style={{ justifyContent: "center" }}>
          {liveCourses?.length > 0 &&
            liveCourses?.map((item) => (
              <Grid item md={4} xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={item.value}
                      onChange={(e) => handleChange(e, item)}
                      id={item.id}
                    />
                  }
                  label={item?.name}
                />
              </Grid>
            ))}
        </Grid>
        <Button variant="contained" onClick={importClass}>
          Import Classes
        </Button>
        <Button variant="contained" onClick={getCoursesHome}>
          Course Home
        </Button>
      </CardView>
    </>
  );
};

const mapStateToProps = (state) => ({
  liveCourses1: state,
});

const mapDispatchToProps = (dispatch) => {
  return {
    GetGoogleImportCourses: (data) => dispatch(GetGoogleImportCourses(data)),
    GetGoogleCourseHome: () => dispatch(GetGoogleCourseHome()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClassList);
