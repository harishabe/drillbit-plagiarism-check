import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Skeleton, Typography } from "@mui/material";
import { Grid, Tooltip } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { DownloadWarningIcon } from "../../../../assets/icon";
import { ColumnChart, PieChart, EllipsisText, WarningDialog } from "../../../../components";
import { WARNING_MESSAGES } from "../../../../constant/data/Constant";
import { makeStyles } from "@mui/styles";
import {
  COLUMN_ADMIN_CHART_TYPE,
  COLUMN_ADMIN_CHART_COLOR,
  COLUMN_ADMIN_XAXIS_DATA,
  COLUMN_ADMIN_WIDTH,
  COLUMN_ADMIN_CHART_HEIGHT,
  COLUMN_ADMIN_CHART_GRADIENT,
  COLUMN_ADMIN_CHART_BORDER_RADIUS,
  PIE_CHART_COLOR,
  PIE_CHART_WIDTH,
  PIE_CHART_LABEL,
} from "../../../../constant/data/ChartData";

import {
  GetStats,
  GetExportToCSV,
} from "../../../../redux/action/admin/AdminAction";
import END_POINTS_PRO from "../../../../utils/EndPointPro";
import { BASE_URL_PRO, BASE_URL_SUPER } from "../../../../utils/BaseUrl";
import { StyledButtonIcon } from "./../../../../style/index";

const useStyles = makeStyles(() => ({
  margin: {
    marginLeft: "auto",
  },
}));

const UserStats = ({
  userId,
  licenseId,
  GetStats,
  GetExportToCSV,
  userStats,
  isLoading,
  isLoadingCsvExport,
}) => {
  const classes = useStyles();
  const [submissionData, setSubmissionData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (licenseId) {
      GetStats(
        BASE_URL_SUPER +
          END_POINTS_PRO.SUPER_ADMIN_USER +
          `${licenseId}/users/${userId}/stats`
      );
    } else {
      GetStats(BASE_URL_PRO + END_POINTS_PRO.ADMIN_USER_STATS + userId);
    }
  }, []);

  useEffect(() => {
    let submission = userStats?.monthlyStats?.map((item) => {
      return item.submissions;
    });
    setSubmissionData(submission);
  }, [userStats]);

  const handleExportCsv = () => {
    setShowModal(true)
  };

  const handleDownloadYesWarning = () => {
    if (licenseId) {
      GetExportToCSV(
        BASE_URL_SUPER +
        END_POINTS_PRO.SUPER_ADMIN_USER +
        `${licenseId}/exportToCSV/${userStats?.id}`
      );
    } else {
      GetExportToCSV(
        BASE_URL_PRO + END_POINTS_PRO.ADMIN_EXPORT_CSV_STATS + userStats?.id
      );
    }
    setShowModal(false);
  };

  const handleDownloadCloseWarning = () => {
    setShowModal(false);
  };

  return (
    <>
      <Grid container>
        <Grid item md={8} xs={8}>
          {isLoading ? (
            <Skeleton />
          ) : (
            <EllipsisText
              value={`User name : ${userStats?.name}`}
              variant="body2_1"
            />
          )}
        </Grid>
        <Grid item md={3.7} xs={4}></Grid>
        <Grid item md={0.3} xs={4}>
          {isLoadingCsvExport ? (
            <Skeleton width={ 30 } height={ 45 } style={ { marginLeft: "auto" } } />
          ) : (
            <Tooltip title="Export to csv">
              <StyledButtonIcon
                className={classes.margin}
                variant="outlined"
                size="small"
                onClick={handleExportCsv}
              >
                <FileDownloadOutlinedIcon fontSize="small" />
              </StyledButtonIcon>
            </Tooltip>
          )}
        </Grid>
      </Grid>

      <Grid container>
        <Grid item md={8} xs={12}>
          <Typography variant="h3">{`Submissions (${
            userStats?.trendAnalysis?.documentsProcessed !== undefined
              ? userStats?.trendAnalysis?.documentsProcessed
              : 0
          })`}</Typography>
          {isLoading ? (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          ) : (
            submissionData?.length > 0 && (
              <ColumnChart
                type={COLUMN_ADMIN_CHART_TYPE}
                color={COLUMN_ADMIN_CHART_COLOR}
                xaxisData={COLUMN_ADMIN_XAXIS_DATA}
                columnWidth={COLUMN_ADMIN_WIDTH}
                height={COLUMN_ADMIN_CHART_HEIGHT}
                seriesData={[
                  {
                    name: "Document Processed",
                    data: submissionData,
                  },
                ]}
                gradient={COLUMN_ADMIN_CHART_GRADIENT}
                borderRadius={COLUMN_ADMIN_CHART_BORDER_RADIUS}
              />
            )
          )}
        </Grid>
        <Grid item md={4} xs={12}>
          <div style={{ textAlign: "center" }}>
            <Typography variant="h3">Trend Analysis</Typography>
          </div>
          {isLoading ? (
            <Skeleton
              variant="circular"
              style={{ margin: "8px auto" }}
              height={250}
              width={250}
            />
          ) : (
            userStats?.trendAnalysis && (
              <PieChart
                type="donut"
                color={PIE_CHART_COLOR}
                width={PIE_CHART_WIDTH}
                label={PIE_CHART_LABEL}
                series={[
                  userStats?.trendAnalysis?.similarWork,
                  userStats?.trendAnalysis?.ownWork,
                ]}
              />
            )
          )}
        </Grid>
      </Grid>
      { showModal && (
        <WarningDialog
          warningIcon={ <DownloadWarningIcon /> }
          message={ WARNING_MESSAGES.DOWNLOAD }
          handleYes={ handleDownloadYesWarning }
          handleNo={ handleDownloadCloseWarning }
          isOpen={ true }
        />
      ) }
    </>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state?.detailsData?.isLoadingStats,
  userStats: state?.detailsData?.StatsData,
  isLoadingCsvExport: state?.detailsData?.isLoadingCSV,
});

const mapDispatchToProps = (dispatch) => {
  return {
    GetStats: (url) => dispatch(GetStats(url)),
    GetExportToCSV: (url) => dispatch(GetExportToCSV(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserStats);
