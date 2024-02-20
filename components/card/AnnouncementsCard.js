import React from "react";
import { Avatar, Grid, IconButton, Skeleton, Typography } from "@mui/material";
import {
  CardView,
  SubTitle2,
  EllipsisText,
  ErrorBlock,
} from "../../components";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import { makeStyles } from "@mui/styles";
import { ANNOUNCEMENT } from "../../constant/data/Constant";

const useStyles = makeStyles(() => ({
  content: {
    marginTop: "-6px",
  },
  avatar: {
    marginTop: "10px",
  },
  icon: {
    marginTop: "-8px",
  },
  gap: {
    marginBottom: "6px",
  },
  name: {
    fontSize: "10px",
    color: "#818589",
    marginTop: "-4px",
    fontWeight: 600,
  },
  title: {
    marginTop: "-6px",
    marginBottom: "3px",
  },
  date: {
    fontSize: "12px",
    color: "#616161",
    marginTop: "14px",
    marginBottom: "3px",
  },
}));

const AnnouncementCard = ({
  announcement,
  expandedAnnouncements,
  toggleShowMore,
  isLoading,
  isShowRole,
}) => {
  const classes = useStyles();

  const limitContent = (content, limit) => {
    if (content.length > limit) {
      return content.slice(0, limit) + " ...";
    } else {
      return content;
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);

  let prevDate = null;

  return (
    <>
      {isLoading ? (
        <Skeleton
          width={"100%"}
          height={100}
          style={{
            display: "inline-block",
            marginRight: "10px",
            marginBottom: "-23px",
          }}
        />
      ) : (
        <div>
          {announcement?.length > 0 ? (
            announcement?.map((announcement, index) => {
              const currentDate = new Date(announcement.time);
              currentDate.setHours(0, 0, 0, 0);

              let dateHeading = null;
              if (currentDate.getTime() === today.getTime()) {
                dateHeading = "Today";
              } else if (currentDate.getTime() === yesterday.getTime()) {
                dateHeading = "Yesterday";
              } else {
                dateHeading = currentDate.toDateString();
              }

              const showDateHeading = dateHeading !== prevDate;
              prevDate = dateHeading;

              return (
                <React.Fragment key={index}>
                  {showDateHeading && (
                    <Typography className={classes.date}>
                      {dateHeading}
                    </Typography>
                  )}

                  <CardView height={expandedAnnouncements[index] ? "auto" : 50}>
                    <Grid container spacing={2}>
                      <Grid item xs={1} md={0.5} className={classes.content}>
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
                          {announcement?.name?.charAt(0)?.toUpperCase()}
                        </Avatar>{" "}
                      </Grid>

                      <Grid item xs={3} md={2} className={classes.content}>
                        <div className={classes.title}>
                          <EllipsisText
                            variant="h4_1"
                            maxLength={100}
                            value={announcement.title}
                          />
                        </div>
                        <Typography className={classes.name}>
                          {announcement.name}{" "}
                          {isShowRole &&
                            "( " + ANNOUNCEMENT[announcement.role] + " )"}
                        </Typography>
                      </Grid>

                      <Grid item xs={7} md={9} className={classes.content}>
                        <SubTitle2
                          title={
                            expandedAnnouncements[index]
                              ? announcement.content
                              : limitContent(announcement.content, 120)
                          }
                        />
                      </Grid>

                      <Grid item xs={1} md={0.5} className={classes.icon}>
                        {announcement.content.length > 120 && (
                          <IconButton onClick={() => toggleShowMore(index)}>
                            {expandedAnnouncements[index] ? (
                              <ExpandLessIcon />
                            ) : (
                              <ExpandMoreIcon />
                            )}
                          </IconButton>
                        )}
                      </Grid>
                    </Grid>
                  </CardView>
                  <div className={classes.gap}></div>
                </React.Fragment>
              );
            })
          ) : (
            <CardView>
              <ErrorBlock message="No data found" />
            </CardView>
          )}
        </div>
      )}
    </>
  );
};

export default AnnouncementCard;
