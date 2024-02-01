import React from "react";
import { Avatar, Grid, IconButton, Skeleton, Typography } from "@mui/material";
import { CardView, SubTitle2, EllipsisText } from "../../components";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import DeleteOutlineOutlined from "@mui/icons-material/DeleteOutlineOutlined";
import { makeStyles } from "@mui/styles";
import { StyledButtonRedIcon } from "../../style";
import { ANNOUNCEMENT } from "../../constant/data/Constant";

const useStyles = makeStyles(() => ({
  content: {
    marginTop: "-6px",
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
  deleteAnnouncement,
  isLoading,
  isShowRole ,
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
        <>
          <Skeleton
            width={"100%"}
            height={100}
            style={{
              display: "inline-block",
              marginRight: "10px",
              marginBottom: "-23px",
            }}
          />
        </>
      ) : (
        <div>
          {announcement?.map((announcement, index) => {
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
              <div key={index}>
                {showDateHeading && (
                  <Typography className={classes.date}>
                    {dateHeading}
                  </Typography>
                )}

                <CardView height={expandedAnnouncements[index] ? "auto" : 50}>
                  <Grid container spacing={2}>
                    <Grid item md={0.5} className={classes.content}>
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

                    <Grid item md={2} className={classes.content}>
                      <div className={classes.title}>
                        <EllipsisText
                          variant="h4_1"
                          value={announcement.title}
                        />
                      </div>
                      <Typography className={classes.name}>
                        {announcement.name}{" "}
                        {isShowRole && "( " + ANNOUNCEMENT[announcement.role] + " )" }
                      </Typography>
                    </Grid>

                    <Grid item md={0.3}></Grid>

                    <Grid item md={8.2} className={classes.content}>
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

                    <Grid item md={0.5} className={classes.content}>
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
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};

export default AnnouncementCard;
