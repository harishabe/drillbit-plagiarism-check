import React from "react";
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Skeleton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  CardView,
  SubTitle2,
  EllipsisText,
  ErrorBlock,
} from "../../components";
import { makeStyles } from "@mui/styles";
import { ANNOUNCEMENT } from "../../constant/data/Constant";

const useStyles = makeStyles(() => ({
  content: {
    marginTop: "22px",
  },
  avatar: {
    marginTop: "16px",
    marginLeft: "12px",
  },
  icon: {
    marginTop: "20px",
  },
  gap: {
    marginBottom: "6px",
  },
  name: {
    fontSize: "10px",
    color: "#818589",
    fontWeight: 600,
    maxWidth: 140,
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
  show: {
        fontSize: "10px",
        marginTop: "10px",
        fontWeight: 550,
        cursor: "pointer",
        textDecoration: "none",
        "&:hover": {
          textDecoration: "underline",
        },
    },
  center:{
    textAlign:'right'
  }
}));

const AnnouncementCard = ({
  announcement,
  expandedAnnouncements,
  toggleShowMore,
  isLoading,
  isShowRole,
}) => {
  const classes = useStyles();

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery((theme) => theme.breakpoints.between("sm", "md"));
  const isLargeScreen = useMediaQuery((theme) => theme.breakpoints.between("md", "lg"));
  const isExtraLargeScreen1440 = useMediaQuery("(min-width: 1440px) and (max-width: 2559px)");
  const isExtraLargeScreen1024 = useMediaQuery("(min-width: 1024px) and (max-width: 1439px)");

  const limitContent = (content, limit) => {
    if (content.length > limit) {
      return content.slice(0, limit) + " ...";
    } else {
      return content;
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hour = date.getHours();
    const minute = String(date.getMinutes()).padStart(2, '0');
    const second = String(date.getSeconds()).padStart(2, '0');
    const amPM = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = hour % 12 || 12; 
    const formattedDate = `${day}/${month}/${year} ${formattedHour}:${minute}:${second} ${amPM}`;
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
                      <Grid container spacing={1.5}>
                        <Grid item xs={1.2} md={0.6} className={classes.avatar}>
                          <Avatar
                            alt="name"
                            sx={{
                              width: 40,
                              height: 40,
                              background: "#68C886",
                              color: "#fff",
                              fontSize: 16,
                            }}
                          >
                            {announcement?.name?.charAt(0)?.toUpperCase()}
                          </Avatar>{" "}
                        </Grid>

                        <Grid item xs={2.8} md={1.9} className={classes.title}>
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
                        <Grid item xs={7.5} md={9.3} className={classes.content} >
                          <SubTitle2
                            title={
                              expandedAnnouncements[index]
                                ? announcement.content
                                : limitContent(announcement.content, 
                                  isSmallScreen ? 50 : (isMediumScreen ? 60 : (isLargeScreen ? 105 : (isExtraLargeScreen1440 ? 140 : (isExtraLargeScreen1024 ? 120 : 270))))
                                  )
                            }
                          />
                          <div className={classes.center}>
                            {announcement.content.length > (isSmallScreen ? 50 : (isMediumScreen ? 60 : (isLargeScreen ? 105 : (isExtraLargeScreen1440 ? 140 : (isExtraLargeScreen1024 ? 120 : 270))))) && (
                                <div onClick={() => toggleShowMore(index)}>
                                  {expandedAnnouncements[index] ? (
                                    <Typography className={classes.show}> show less </Typography>
                                  ) : (
                                    <Typography className={classes.show}> show more </Typography>
                                  )}
                                </div>
                              )}
                          </div>
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