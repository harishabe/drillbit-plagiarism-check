import React from "react";
import { connect } from "react-redux";
import FormLabel from "@mui/material/FormLabel";
import { Grid } from "@mui/material";
import { CardView, CardInfoView } from "../../../../../components";
import { GetGoogleCourseHome } from "./../../../../../redux/action/admin/AdminAction";
import { useEffect } from "react";
import Admin from '../../../../../layouts/Admin';

const ClassRoom = ({ classRoomList, GetGoogleCourseHome }) => {
  useEffect(() => {
    GetGoogleCourseHome();
  }, []);

  return (
    <>
      <CardView>
        <FormLabel component="legend">Class room list</FormLabel>
        <Grid container spacing={2}>
          {classRoomList?.map((item, index) => (
            <Grid key={index} item md={4} xs={12}>
              <CardInfoView
                key={index}
                item={item}
                isAvatar={true}
                isHeading={true}
                isTimer={true}
                isAction={true}
                isNextPath={true}
                isDescription={true}
                path={{
                  pathname: "/extream/instructor/my-assignment",
                  query: { clasId: item.id, clasName: item.name },
                }}
              />
            </Grid>
          ))}
        </Grid>
      </CardView>
    </>
  );
};

const mapStateToProps = (state) => ({
  classRoomList: state?.adminIntegrationData?.googleCourseHomeData
?._embedded?.googleCourseDTOList,
});

const mapDispatchToProps = (dispatch) => {
  return {
    GetGoogleCourseHome: () => dispatch(GetGoogleCourseHome()),
  };
};

ClassRoom.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(ClassRoom);
