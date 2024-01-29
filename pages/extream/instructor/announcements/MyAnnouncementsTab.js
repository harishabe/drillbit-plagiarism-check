import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Pagination, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  CardView,
  CreateDrawer,
  ErrorBlock,
  WarningDialog,
} from "../../../../components";
import { AddButtonBottom, PaginationContainer } from "../../../../style";
import { PaginationValue } from "../../../../utils/PaginationUrl";
import AnnouncementsForm from "./../form/AnnouncementsForm";
import { getItemSessionStorage } from "../../../../utils/RegExp";
import { WARNING_MESSAGES } from "../../../../constant/data/Constant";
import Instructor from "../../../../layouts/Instructor";
import { GetMyAnnouncementsData } from "../../../../redux/action/common/Announcements/AnnouncementsAction";
import { BASE_URL_EXTREM } from "../../../../utils/BaseUrl";
import END_POINTS from "../../../../utils/EndPoints";
import { DeleteWarningIcon } from "../../../../assets/icon";
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
}) => {
  const [paginationPayload, setPaginationPayload] = useState({
    ...PaginationValue,
    field: "ann_id",
  });
  const classes = useStyles();
  const [name, setName] = useState("");
  const [search, setSearch] = useState(false);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [showDeleteAllIcon, setShowDeleteAllIcon] = useState(false);
  const [expandedAnnouncements, setExpandedAnnouncements] = useState([]);

  React.useEffect(() => {
    let userName = getItemSessionStorage("name");
    setName(userName);
  }, []);

  React.useEffect(() => {
    const url = BASE_URL_EXTREM + END_POINTS.GET_INSTRUCTOR_MY_ANNOUNCEMENTS;
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

  const handleYesWarning = () => {
    setShowDeleteAllIcon(false);
    setTimeout(() => {
      setShowDeleteWarning(false);
    }, [100]);
  };
  const handleCloseWarning = () => {
    setShowDeleteWarning(false);
  };
  const deleteAnnouncement = () => {
    setShowDeleteWarning(true);
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
      {showDeleteWarning && (
        <WarningDialog
          warningIcon={<DeleteWarningIcon />}
          message={WARNING_MESSAGES.DELETE}
          handleYes={handleYesWarning}
          handleNo={handleCloseWarning}
          isOpen={true}
        />
      )}
      <AddButtonBottom>
        <CreateDrawer title="Add Announcements" isShowAddIcon={true}>
          <AnnouncementsForm />
        </CreateDrawer>
      </AddButtonBottom>

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
        {myAnnouncementsData?.length > 0 ? (
          myAnnouncementsData?.map((announcement, index) => (
              <AnnouncementCard
                key={index}
                announcement={announcement}
                index={index}
                expandedAnnouncements={expandedAnnouncements}
                toggleShowMore={toggleShowMore}
                deleteAnnouncement={deleteAnnouncement}
                isLoading={isLoadingMyAnnouncements}
              />
          ))
        ) : (
            <CardView>
              <ErrorBlock message="No data found" />
            </CardView>
        )}
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
});

const mapDispatchToProps = (dispatch) => {
  return {
    GetMyAnnouncementsData: (url, paginationPayload) =>
      dispatch(GetMyAnnouncementsData(url, paginationPayload)),
  };
};

MyAnnouncementsTab.layout = Instructor;

export default connect(mapStateToProps, mapDispatchToProps)(MyAnnouncementsTab);
