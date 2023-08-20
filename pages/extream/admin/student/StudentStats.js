import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Skeleton } from "@mui/material";
import { Grid, Typography, Tooltip } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import {
  ColumnChart,
  PieChart,
  SubTitle,
  EllipsisText,
} from "../../../../components";
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
import END_POINTS from "../../../../utils/EndPoints";
import { BASE_URL_EXTREM, BASE_URL_SUPER } from "../../../../utils/BaseUrl";
import { StyledButtonIcon } from "./../../../../style/index";

const StudentStats = ({
  lid,
  studentId,
  GetStats,
  GetExportToCSV,
  studentStats,
  isLoading,
  isLoadingCsvExport,
}) => {
  const [submissionData, setSubmissionData] = useState([]);

  useEffect(() => {
    if (lid) {
      GetStats(
        BASE_URL_SUPER +
          END_POINTS.SUPER_ADMIN_INSTRUCTOR +
          `${lid}/instructor/${studentId}/stats`
      );
    } else {
      GetStats(
        BASE_URL_EXTREM +
          END_POINTS.ADMIN_INSTRUCTOR_STUDENT_STATS +
          "/" +
          studentId +
          "/stats"
      );
    }
  }, []);

  useEffect(() => {
    let submission = "";
    submission = studentStats?.monthlyStats?.map((item) => {
      return item.submissions;
    });
    setSubmissionData(submission);
  }, [studentStats]);

  const handleExportCsv = () => {
    if (lid) {
      GetExportToCSV(
        BASE_URL_SUPER +
          END_POINTS.SUPER_ADMIN_INSTRUCTOR +
          `${lid}/exportToCSV/${studentId}`
      );
    } else {
      GetExportToCSV(
        BASE_URL_EXTREM +
          END_POINTS.ADMIN_EXPORT_CSV_STATS +
          "/" +
          studentStats?.id
      );
    }
  };

  return (
    <>
      <Grid item container>
        {isLoading ? (
          <Skeleton width={210} />
        ) : (
          <>
            <Grid item md={8} xs={6}>
              <EllipsisText
                value={`Student name : ${studentStats?.name}`}
                variant="body2_1"
              />
            </Grid>
            {isLoadingCsvExport ? (
              <Skeleton width={150} style={{ marginLeft: "auto" }} />
            ) : (
              <Tooltip title="Export to csv">
                <StyledButtonIcon
                  style={{ marginLeft: "auto" }}
                  variant="outlined"
                  size="small"
                  onClick={handleExportCsv}
                >
                  <FileDownloadOutlinedIcon fontSize="small" />
                </StyledButtonIcon>
              </Tooltip>
            )}
          </>
        )}
      </Grid>

      <Grid item md={12} xs={12}>
        <Grid container>
          <Grid item md={8} xs={12}>
            <Typography variant="h3">
              {`Submissions (${
                studentStats?.trendAnalysis?.documentsProcessed !== undefined
                  ? studentStats?.trendAnalysis?.documentsProcessed
                  : 0
              })`}
            </Typography>

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
              <>
                {studentStats?.trendAnalysis && (
                  <PieChart
                    type="donut"
                    color={PIE_CHART_COLOR}
                    width={PIE_CHART_WIDTH}
                    label={PIE_CHART_LABEL}
                    series={[
                      studentStats?.trendAnalysis?.similarWork,
                      studentStats?.trendAnalysis?.ownWork,
                    ]}
                  />
                )}
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state?.detailsData?.isLoadingStats,
  studentStats: state?.detailsData?.StatsData,
  isLoadingCsvExport: state?.detailsData?.isLoadingCSV,
});

const mapDispatchToProps = (dispatch) => {
  return {
    GetStats: (url) => dispatch(GetStats(url)),
    GetExportToCSV: (url) => dispatch(GetExportToCSV(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentStats);
