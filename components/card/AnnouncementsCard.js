import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  IconButton,
  Skeleton,
  Typography,
} from "@mui/material";
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
    marginTop: "22px",
  },
  avatar: {
    marginTop: "18px",
    marginLeft: "10px",
  },
  icon: {
    marginTop: "16px",
  },
  gap: {
    marginBottom: "6px",
  },
  name: {
    fontSize: "10px",
    color: "#818589",
    fontWeight: 600,
    maxWidth: 160,
  },
  role: {
    fontSize: "9px",
    color: "#818589",
    fontWeight: 600,
  },
  title: {
    marginBottom: "3px",
    marginTop: '1px'
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

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    return formattedDate;
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

                  <Card>
                    <CardContent
                      sx={{
                        padding: "1px",
                        paddingBottom: "2px !important",
                      }}
                    >
                      <Grid container spacing={2}>
                        <Grid item xs={1} md={0.5} className={classes.avatar}>
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

                        <Grid item xs={3} md={2} className={classes.title}>
                          <div className={classes.title}>
                            <EllipsisText
                              variant="h4_1"
                              maxLength={100}
                              value={announcement.title}
                            />
                          </div>
                          <div>
                            <Typography className={classes.name}>
                              <EllipsisText
                                variant="body4"
                                maxLength={100}
                                value={announcement.name}
                              />
                            </Typography>
                          </div>
                          <div>
                            {isShowRole && (
                              <Typography
                                className={classes.role}
                                component={"span"}
                              >
                                {ANNOUNCEMENT[announcement.role]}{", "}
                              </Typography>
                            )}
                            
                            <Typography
                              className={classes.role}
                              component={"span"}
                            >
                              {formatDate(announcement.time)}{" "}
                            </Typography>
                          </div>
                        </Grid>

                        <Grid
                          item
                          xs={6.5}
                          md={8.5}
                          className={classes.content}
                        >
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
                    </CardContent>
                  </Card>
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
