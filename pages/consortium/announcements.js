import React, { useState, useEffect, useMemo } from "react";
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
  CardView,
  ErrorBlock,
  CreateDrawer,
} from "../../components";
import { AddButtonBottom, PaginationContainer } from "../../style";
import { PaginationValue } from "../../utils/PaginationUrl";
import { GetMyAnnouncementsData } from "../../redux/action/common/Announcements/AnnouncementsAction";
import { BASE_URL } from "../../utils/BaseUrl";
import END_POINTS from "../../utils/EndPoints";
import styled from "styled-components";
import debouce from "lodash.debounce";
import AnnouncementCard from "../../components/card/AnnouncementsCard";
import AnnouncementsForm from "./form/AnnouncementsForm";
import Admin from "../../layouts/Admin";

const UserBreadCrumb = [
  {
    name: "Dashboard",
    link: "/consortium/dashboard",
    active: false,
  },
  {
    name: "Announcements",
    link: "",
    active: true,
  },
];

const SearchField = styled.div`
  position: absolute;
  top: 110px;
  right: 16px;
  @media (max-width: 900px) {
    top: 85px;
  }
`;

const Announcements = ({
  GetMyAnnouncementsData,
  myAnnouncementsData,
  pageDetails,
  isLoadingMyAnnouncements,
}) => {
  const [paginationPayload, setPaginationPayload] = useState({
    ...PaginationValue,
    field: "ann_id",
  });
  const [search, setSearch] = useState(false);
  const [expandedAnnouncements, setExpandedAnnouncements] = useState([]);

  React.useEffect(() => {
    const url = BASE_URL + END_POINTS.GET_CONSORTIUM_MY_ANNOUNCEMENTS;
    GetMyAnnouncementsData(url, paginationPayload);
  }, [, paginationPayload]);

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

  const handleSearchAnnouncement = (event) => {
    if (event.target.value !== "") {
      paginationPayload["search"] = event.target.value;
      setSearch(true);
      setPaginationPayload({ ...paginationPayload, paginationPayload });
    } else {
      delete paginationPayload["search"];
      setSearch(false);
      setPaginationPayload({ ...paginationPayload, paginationPayload });
    }
  };

  const searchAnnouncement = useMemo(() => {
    return debouce(handleSearchAnnouncement, 300);
  }, []);

  useEffect(() => {
    return () => {
      searchAnnouncement.cancel();
    };
  });

  return (
    <React.Fragment>
       <AddButtonBottom>
        <CreateDrawer title="Add Announcements" isShowAddIcon={true}>
          <AnnouncementsForm />
        </CreateDrawer>
      </AddButtonBottom>
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
            title={`My Announcements(${
              pageDetails?.totalElements !== undefined
                ? pageDetails?.totalElements
                : 0
            })`}
          />
        </Grid>
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

      <>
        {myAnnouncementsData?.length > 0 ? (
          <AnnouncementCard
          announcement={myAnnouncementsData}
          expandedAnnouncements={expandedAnnouncements}
          toggleShowMore={toggleShowMore}
          isLoading={isLoadingMyAnnouncements}
          isShowRole={false}
        />
        ) : (
          <CardView>
            <ErrorBlock message="No data found" />
          </CardView>
        )}
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
  pageDetails: state?.announcements?.myAnnouncementsData?.page,
  myAnnouncementsData:
    state?.announcements?.myAnnouncementsData?._embedded?.announcementDTOList,
    isLoadingMyAnnouncements: state?.announcements?.isLoadingMyAnnouncements,
});

const mapDispatchToProps = (dispatch) => {
  return {
    GetMyAnnouncementsData: (url, paginationPayload) =>
      dispatch(GetMyAnnouncementsData(url, paginationPayload)),
  };
};

Announcements.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(Announcements);
