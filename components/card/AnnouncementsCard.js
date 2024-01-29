import React, { useState } from "react";
import { Avatar, Grid, IconButton, Skeleton, Typography } from "@mui/material";
import {
  Heading,
  CardView,
  SubHeading,
  Title1,
  SubTitle2,
  EllipsisText,
} from "../../components";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";
import { getItemSessionStorage } from "../../utils/RegExp";
import { makeStyles } from "@mui/styles";
import { StyledButtonRedIcon } from "../../style";

const useStyles = makeStyles(() => ({
  avatar: {
    marginTop: "-4px",
  },
  content: {
    marginTop: "-4px",
  },
  delete: {
    marginTop: "-2px",
  },
  icon: {
    marginTop: "-8px",
  },
  gap: {
    marginBottom: "10px",
  },
  time: {
    fontSize: "9px",
    color: "#818589",
    marginTop: "-6px",
  },
  title: {
    marginTop: "-4px",
    marginBottom: "3px",
  },
}));

const limitContent = (content, limit) => {
  if (content.length > limit) {
    return content.slice(0, limit) + " ...";
  } else {
    return content;
  }
};

const AnnouncementCard = ({
  announcement,
  index,
  expandedAnnouncements,
  toggleShowMore,
  deleteAnnouncement,
  isLoading,
}) => {
  const classes = useStyles();
  const [name] = useState(getItemSessionStorage("name"));

  return (
    <>
      {isLoading ? (
        <>
          <Skeleton
            width={"100%"}
            height={80}
            style={{
              display: "inline-block",
              marginRight: "10px",
              marginBottom: "-23px",
            }}
          />
        </>
      ) : (
        <>
          <CardView height={expandedAnnouncements[index] ? "auto" : 55}>
            <Grid container spacing={2}>
              <Grid item md={0.5} className={classes.avatar}>
                <Avatar 
                  alt="name"
                  sx={{
                    width: 30,
                    height: 30,
                    background: "#68C886",
                    color: "#fff",
                    fontSize: 14,
                  }}
                >
                  { announcement?.name?.charAt(0)?.toUpperCase()}
                </Avatar>{" "}
              </Grid>
              
              <Grid item md={2} className={classes.content}>
              <Typography className={classes.time}>
                  {announcement.name}
                </Typography>
                <Typography className={classes.time}>
                  {announcement.role}
                </Typography>
                <div className={classes.title}>
                  <EllipsisText variant="h4_1" value={announcement.title} />
                </div>
                <Typography className={classes.time}>
                  {new Date(announcement.time).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </Typography>
              </Grid>
              
              <Grid item md={0.5}></Grid>

              <Grid item md={8} className={classes.content}>
                <SubTitle2
                  title={
                    expandedAnnouncements[index]
                      ? announcement.content
                      : limitContent(announcement.content, 110)
                  }
                />
              </Grid>

              <Grid item md={0.5} className={classes.icon}>
                {announcement.content.length > 110 && (
                  <IconButton onClick={() => toggleShowMore(index)}>
                    {expandedAnnouncements[index] ? (
                      <ExpandLessIcon />
                    ) : (
                      <ExpandMoreIcon />
                    )}
                  </IconButton>
                )}
              </Grid>

              <Grid item md={0.5} className={classes.delete}>
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
      )}
    </>
  );
};

export default AnnouncementCard;
