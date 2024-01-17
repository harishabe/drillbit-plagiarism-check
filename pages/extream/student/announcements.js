import React, { useState } from "react";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { makeStyles } from "@mui/styles";
import { Avatar, IconButton, Pagination } from "@mui/material";
import {
  BreadCrumb,
  Heading,
  CardView,
  CreateDrawer,
  SubTitle2,
  Title,
  WarningDialog,
} from "../../../components";
import {
  AddButtonBottom,
  PaginationContainer,
  StyledButtonRedIcon,
} from "../../../style";
import { PaginationValue } from "../../../utils/PaginationUrl";
import { getItemSessionStorage } from "../../../utils/RegExp";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";
import { DeleteWarningIcon } from "../../../assets/icon";
import { WARNING_MESSAGES } from "../../../constant/data/Constant";
import { GetAnnouncementsData } from "../../../redux/action/common/Announcements/AnnouncementsAction";
import { BASE_URL_EXTREM } from "../../../utils/BaseUrl";
import END_POINTS from "../../../utils/EndPoints";
import Student from "../../../layouts/Student";

const useStyles = makeStyles(() => ({
  button: {
    margin: "0px 0px 6px 0px",
  },
  avatar: {
    marginTop: "0px",
  },
  show: {
    marginTop: "-2px",
  },
  delete: {
    marginTop: "2px",
  },
  gap: {
    marginBottom: "10px",
  },
  time: {
    fontSize: "10px",
    color: "#818589",
    marginTop: "-10px"
  },
  title:{
    marginTop: "0px"
  }
}));

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

const cardViewsData = [
  {
    title: "Card 1",
    content:
      "Plagiarism is the act of using someone else's work without giving them credit. In academic writing, it involves using information, words, or ideas from a source without citing it correctly.",
    timestamp: "2024-01-08",
  },
  {
    title: "Card 2",
    content:
      "DrillBit - Plagiarism Detection Software has been evaluated by the esteemed AICTE technical expert committee and has been selected for empanelment with AICTE NEAT 3.0. We are pleased to announce the successful signing of an MoU with AICTE – NEAT (National Education Alliance for Technology) scheme, making us a technology partner with AICTE NEAT, and contributing towards enhanced learning outcomes in India.",
    timestamp: "2024-01-09",
  },
  {
    title: "Card 3",
    content: "Content for Card 3",
    timestamp: "2024-01-10",
  },
];

const limitContent = (content, limit) => {
  if (content.length > limit) {
    return content.slice(0, limit) + " ...";
  } else {
    return content;
  }
};

const Announcements = ({GetAnnouncementsData, announcementsData, pageDetails }) => {
  const [paginationPayload, setPaginationPayload] = useState({ ...PaginationValue, field:'title'});
  const classes = useStyles();
  const [name, setName] = useState("");
  const [showMoreIndex, setShowMoreIndex] = useState(null);
  const [cardHeights, setCardHeights] = useState(cardViewsData?.map(() => 60));
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [showDeleteAllIcon, setShowDeleteAllIcon] = useState(false);

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
    setShowMoreIndex((prevIndex) => (prevIndex === index ? null : index));

    setCardHeights((prevHeights) => {
      const updatedHeights = prevHeights?.map((height, i) =>
        i === index ? (height === 60 ? 'auto' : 60) : 60
      );
      return updatedHeights;
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
          {/* <Heading title="Announcements" /> */}
          <Heading
              title={`Announcements(${
                pageDetails?.totalElements !== undefined
                  ? pageDetails?.totalElements
                  : 0
              })`}
            />
        </Grid>
      </Grid>
      { cardViewsData?.map((announcement, index) => (
        <>
          <CardView height={cardHeights?.[index]}>
            <Grid container spacing={2}>
              <Grid item md={0.5} className={classes.avatar}>
                <Avatar
                  alt="Remy Sharp"
                  sx={{
                    width: 30,
                    height: 30,
                    background: "#68C886",
                    color: "#fff",
                    fontSize: 14,
                  }}
                >
                  {name && name.charAt(0)?.toUpperCase()}
                </Avatar>{" "}
              </Grid>
              <Grid item md={2} >
                <Title title={announcement.title} className={classes.title}/>
                <div className={classes.time}>{` ${announcement.timestamp}`}</div>
                </Grid>
                <Grid item md={8} className={classes.title}>
                <SubTitle2
                  title={
                    showMoreIndex === index
                      ? announcement.content
                      : limitContent(announcement.content, 110)
                  }
                />
              </Grid>
              <Grid item md={0.5} className={classes.show}>
                <IconButton onClick={() => toggleShowMore(index)}>
                  {showMoreIndex === index ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </IconButton>
              </Grid>
              <Grid item md={1} className={classes.delete}>
                <StyledButtonRedIcon
                  variant="outlined"
                  size="small"
                  onClick={deleteAnnouncement}
                >
                  <DeleteOutlineOutlined fontSize="small" />
                </StyledButtonRedIcon>
              </Grid>
            </Grid>
          </CardView>
          <div className={classes.gap}></div>
        </>
      ))}
      <PaginationContainer>
        <Pagination
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
    GetAnnouncementsData: (paginationPayload) =>
      dispatch(GetAnnouncementsData(paginationPayload)),
    
  };
};

Announcements.layout = Student;

export default connect(mapStateToProps, mapDispatchToProps)(Announcements);



