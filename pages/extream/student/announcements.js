import React, { useState, useEffect, useMemo } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {
  Avatar,
  IconButton,
  Pagination,
  Skeleton,
  TextField,
} from "@mui/material";
import {
  BreadCrumb,
  Heading,
  CardView,
  WarningDialog,
  ErrorBlock,
} from "../../../components";
import { PaginationContainer, StyledButtonRedIcon } from "../../../style";
import { PaginationValue } from "../../../utils/PaginationUrl";
import { getItemSessionStorage } from "../../../utils/RegExp";
import { DeleteWarningIcon } from "../../../assets/icon";
import { WARNING_MESSAGES } from "../../../constant/data/Constant";
import { GetAnnouncementsData } from "../../../redux/action/common/Announcements/AnnouncementsAction";
import { BASE_URL_EXTREM } from "../../../utils/BaseUrl";
import END_POINTS from "../../../utils/EndPoints";
import Student from "../../../layouts/Student";
import styled from "styled-components";
import debouce from "lodash.debounce";
import AnnouncementCard from "../../../components/card/AnnouncementsCard";

const UserBreadCrumb = [
  {
    name: "Dashboard",
    link: "/extream/admin/dashboard",
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
  GetAnnouncementsData,
  announcementsData,
  pageDetails,
  isLoadingGet,
}) => {
  const [paginationPayload, setPaginationPayload] = useState({
    ...PaginationValue,
    field: "ann_id",
  });
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
    const url = BASE_URL_EXTREM + END_POINTS.GET_STUDENT_ANNOUNCEMENTS;
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
  announcementsData:
    state?.announcements?.announcementsData?._embedded?.announcementDTOList,
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
