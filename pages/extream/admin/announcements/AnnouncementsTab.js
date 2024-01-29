import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import {
  Pagination,
  TextField,
} from "@mui/material";
import {
  CardView,
  ErrorBlock,
  WarningDialog,
} from "../../../../components";
import {
  PaginationContainer,
} from "../../../../style";
import { PaginationValue } from "../../../../utils/PaginationUrl";
import { getItemSessionStorage } from "../../../../utils/RegExp";
import { WARNING_MESSAGES } from "../../../../constant/data/Constant";
import { GetAnnouncementsData } from "../../../../redux/action/common/Announcements/AnnouncementsAction";
import { BASE_URL_EXTREM } from "../../../../utils/BaseUrl";
import END_POINTS from "../../../../utils/EndPoints";
import { DeleteWarningIcon } from "../../../../assets/icon";
import styled from "styled-components";
import debouce from "lodash.debounce";
import Admin from "../../../../layouts/Admin";
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

const AnnouncementsTab = ({
  GetAnnouncementsData,
  announcementsData,
  pageDetailsAnnouncements,
  isLoadingGet,
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
    const url = BASE_URL_EXTREM + END_POINTS.GET_ADMIN_ANNOUNCEMENTS;
    GetAnnouncementsData(url, paginationPayload);
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
        {announcementsData?.length > 0 ? (
          announcementsData?.map((announcement, index) => (
            <AnnouncementCard
              key={index}
              announcement={announcement}
              index={index}
              expandedAnnouncements={expandedAnnouncements}
              toggleShowMore={toggleShowMore}
              deleteAnnouncement={deleteAnnouncement}
              isLoading={isLoadingGet}
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
          count={pageDetailsAnnouncements?.totalPages}
          page={pageDetailsAnnouncements?.number + 1}
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
  isLoadingGet: state?.announcements?.isLoadingGet,
});

const mapDispatchToProps = (dispatch) => {
  return {
    GetAnnouncementsData: (url, paginationPayload) =>
      dispatch(GetAnnouncementsData(url, paginationPayload)),
  };
};

AnnouncementsTab.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(AnnouncementsTab);
