import React, { useState, useEffect, useMemo, useCallback} from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  Pagination,
  TextField,
} from "@mui/material";
import {
  BreadCrumb,
  Heading,
} from "../../../components";
import { PaginationContainer} from "../../../style";
import { PaginationValue } from "../../../utils/PaginationUrl";
import { GetAnnouncementsData } from "../../../redux/action/common/Announcements/AnnouncementsAction";
import { BASE_URL_EXTREM } from "../../../utils/BaseUrl";
import END_POINTS from "../../../utils/EndPoints";
import Student from "../../../layouts/Student";
import { makeStyles } from "@mui/styles";
import debouce from "lodash.debounce";
import AnnouncementCard from "../../../components/card/AnnouncementsCard";

const UserBreadCrumb = [
  {
    name: "Dashboard",
    link: "/extream/student/dashboard",
    active: false,
  },
  {
    name: "Announcements",
    link: "",
    active: true,
  },
];

const useStyles = makeStyles(() => ({
  view: {
      textAlign: 'right',
      marginBottom: '7px'
  }
}));

const Announcements = ({
  GetAnnouncementsData,
  announcementsData,
  pageDetails,
  isLoadingGet,
}) => {

  const classes = useStyles();

  const [paginationPayload, setPaginationPayload] = useState({
    ...PaginationValue,
    field: "ann_id",
  });
  const [expandedAnnouncements, setExpandedAnnouncements] = useState([]);

  const toggleShowMore = (index) => {
    setExpandedAnnouncements((prevExpanded) => {
      const newExpanded = [...prevExpanded];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
  };

  React.useEffect(() => {
    const url = BASE_URL_EXTREM + END_POINTS.GET_STUDENT_ANNOUNCEMENTS;
    GetAnnouncementsData(url, paginationPayload);
    setExpandedAnnouncements([]);
  }, [GetAnnouncementsData, paginationPayload]);

  const handlePagination = (event, value) => {
    event.preventDefault();
    setPaginationPayload({ ...paginationPayload, page: value - 1 });
  };

  const handleSearchAnnouncement = useCallback((event) => {
    if (event.target.value !== "") {
      paginationPayload["search"] = event.target.value;
      setPaginationPayload({ ...paginationPayload });
    } else {
      delete paginationPayload["search"];
      setPaginationPayload({ ...paginationPayload });
    }
  }, [paginationPayload, setPaginationPayload]);

  const searchAnnouncement = useMemo(() => {
    return debouce(handleSearchAnnouncement, 300);
  }, [handleSearchAnnouncement]);

  useEffect(() => {
    return () => {
      searchAnnouncement.cancel();
    };
  });

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item md={10} xs={10}>
            <BreadCrumb item={UserBreadCrumb} />
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={2}>
        <Grid item md={5} xs={5}>
          <Heading
            title={`Announcements(${
              pageDetails?.totalElements !== undefined
                ? pageDetails?.totalElements
                : 0
            })`}
          />
        </Grid>
        <Grid item md={ 7 } xs={ 7 } className={ classes.view }>
          <TextField
            sx={{ width: 222 }}
            placeholder="Search by Announcement title"
            onChange={searchAnnouncement}
            inputProps={{
              style: {
                padding: 7,
                display: "inline-flex",
                fontWeight: 500,
              },
            }}
          />
        </Grid>
      </Grid>

      <>
            <AnnouncementCard
              expandedAnnouncements={expandedAnnouncements}
              toggleShowMore={toggleShowMore}
              announcement={announcementsData}
              isLoading={isLoadingGet}
              isShowRole={true}
            />
      </>

      <PaginationContainer>
        <Pagination
          count={pageDetails?.totalPages}
          page={pageDetails?.number + 1}
          onChange={handlePagination}
          color="primary"
          variant="outlined"
          shape="rounded"
        />
      </PaginationContainer>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => ({
  pageDetails: state?.announcements?.announcementsData?.page,
  announcementsData: state?.announcements?.announcementsData?._embedded?.announcementDTOList,
  isLoadingGet: state?.announcements?.isLoadingGet,
});

const mapDispatchToProps = (dispatch) => {
  return {
    GetAnnouncementsData: (url, paginationPayload) =>
      dispatch(GetAnnouncementsData(url, paginationPayload)),
  };
};

Announcements.layout = Student;

export default connect(mapStateToProps, mapDispatchToProps)(Announcements);
