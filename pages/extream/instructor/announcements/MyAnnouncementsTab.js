import React, { useState, useEffect, useMemo, useCallback } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Pagination, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { setItemSessionStorage } from "../../../../utils/RegExp";
import { PaginationContainer } from "../../../../style";
import { PaginationValue } from "../../../../utils/PaginationUrl";
import Instructor from "../../../../layouts/Instructor";
import { GetMyAnnouncementsData } from "../../../../redux/action/common/Announcements/AnnouncementsAction";
import { BASE_URL_EXTREM } from "../../../../utils/BaseUrl";
import END_POINTS from "../../../../utils/EndPoints";
import styled from "styled-components";
import debouce from "lodash.debounce";
import AnnouncementCard from "../../../../components/card/AnnouncementsCard";

const useStyles = makeStyles(() => ({
  tab: {
    marginTop: "8px",
  },
}));

const SearchField = styled.div`
  position: absolute;
  top: 125px;
  right: 16px;
  @media (max-width: 900px) {
    top: 85px;
  }
`;

const MyAnnouncementsTab = ({
  GetMyAnnouncementsData,
  myAnnouncementsData,
  pageDetailsMyAnnouncements,
  isLoadingMyAnnouncements,
  activeTab,
}) => {
  const [paginationPayload, setPaginationPayload] = useState({
    ...PaginationValue,
    field: "ann_id",
  });
  const classes = useStyles();
  const [expandedAnnouncements, setExpandedAnnouncements] = useState([]);
  
  React.useEffect(() => {
    const url = BASE_URL_EXTREM + END_POINTS.GET_INSTRUCTOR_MY_ANNOUNCEMENTS;
    GetMyAnnouncementsData(url, paginationPayload);
    setItemSessionStorage("tab", activeTab);
    setExpandedAnnouncements([]);
  }, [GetMyAnnouncementsData, activeTab, paginationPayload]);

  const handlePagination = (event, value) => {
    event.preventDefault();
    setPaginationPayload({ ...paginationPayload, page: value - 1 });
  };

  const toggleShowMore = (index) => {
    setExpandedAnnouncements((prevExpanded) => {
      const newExpanded = [...prevExpanded];
      newExpanded[index] = !newExpanded[index];
      return newExpanded;
    });
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
          <SearchField>
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
          </SearchField>
        </Grid>
      </Box>
      <>
      <div className={classes.tab}>
              <AnnouncementCard
                announcement={myAnnouncementsData}
                expandedAnnouncements={expandedAnnouncements}
                toggleShowMore={toggleShowMore}
                isLoading={isLoadingMyAnnouncements}
                isShowRole={false}
              />
        </div>
      </>
      <PaginationContainer>
        <Pagination
          count={pageDetailsMyAnnouncements?.totalPages}
          page={pageDetailsMyAnnouncements?.number + 1}
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
  isLoadingMyAnnouncements: state?.announcements?.isLoadingMyAnnouncements,
  myAnnouncementsData: state?.announcements?.myAnnouncementsData?._embedded?.announcementDTOList,
  pageDetailsMyAnnouncements: state?.announcements?.myAnnouncementsData?.page,
});

const mapDispatchToProps = (dispatch) => {
  return {
    GetMyAnnouncementsData: (url, paginationPayload) =>
      dispatch(GetMyAnnouncementsData(url, paginationPayload)),
  };
};

MyAnnouncementsTab.layout = Instructor;

export default connect(mapStateToProps, mapDispatchToProps)(MyAnnouncementsTab);
