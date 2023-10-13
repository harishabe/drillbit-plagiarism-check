import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Skeleton } from "@mui/material";
import { Grid, Tooltip, Typography } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { DownloadWarningIcon } from "../../../../assets/icon";
import {
  ColumnChart,
  PieChart,
  EllipsisText,
  WarningDialog
} from "../../../../components";
import { WARNING_MESSAGES } from "../../../../constant/data/Constant";
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
} from "./../../../../constant/data/ChartData";
import {
  GetStats,
  GetExportToCSV,
} from "../../../../redux/action/admin/AdminAction";
import END_POINTS from "../../../../utils/EndPoints";
import { BASE_URL_EXTREM, BASE_URL_SUPER } from "../../../../utils/BaseUrl";
import { StyledButtonIcon } from "./../../../../style/index";

const InstructorStats = ({
  instructorId,
  lid,
  GetStats,
  GetExportToCSV,
  instructorStats,
  isLoading,
  isLoadingCsvExport,
}) => {
  const [submissionData, setSubmissionData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (lid) {
      GetStats(
        BASE_URL_SUPER +
        END_POINTS.SUPER_ADMIN_INSTRUCTOR +
        `${lid}/instructor/${instructorId}/stats`
      );
    } else {
      GetStats(
        BASE_URL_EXTREM +
        END_POINTS.ADMIN_INSTRUCTOR_STUDENT_STATS +
        "/" +
        instructorId +
        "/stats"
      );
    }
  }, []);

  useEffect(() => {
    let submission = instructorStats?.monthlyStats?.map((item) => {
      return item.submissions;
    });
    setSubmissionData(submission);
  }, [instructorStats]);

  const handleExportCsv = () => {
    setShowModal(true)
  };

  const handleDownloadYesWarning = () => {
    if (lid) {
      GetExportToCSV(
        BASE_URL_SUPER +
        END_POINTS.SUPER_ADMIN_INSTRUCTOR +
        `${lid}/exportToCSV/${instructorId}`
      );
    } else {
      GetExportToCSV(
        BASE_URL_EXTREM +
        END_POINTS.ADMIN_EXPORT_CSV_STATS +
        "/" +
        instructorStats?.id
      );
    }
    setShowModal(false);
  };

  const handleDownloadCloseWarning = () => {
    setShowModal(false);
  };

  return (
    <>
      <Grid item container>
        { isLoading ? (
          <Skeleton width={ 210 } />
        ) : (
          <>
              <Grid item md={ 8 } xs={ 6 }>
              <EllipsisText
                  value={ `Instructor name : ${instructorStats?.name}` }
                variant="body2_1"
              />
            </Grid>
              { isLoadingCsvExport ? (
                <Skeleton width={ 30 } height={ 45 } style={ { marginLeft: "auto" } } />
            ) : (
              <Tooltip title="Export to csv">
                <StyledButtonIcon
                      style={ { marginLeft: "auto" } }
                  variant="outlined"
                  size="small"
                      onClick={ handleExportCsv }
                >
                  <FileDownloadOutlinedIcon fontSize="small" />
                </StyledButtonIcon>
              </Tooltip>
              ) }
          </>
        ) }
      </Grid>

      <Grid item md={ 12 } xs={ 12 }>
        <Grid container>
          <Grid item md={ 8 } xs={ 12 }>
            <Typography variant="h3">
              { `Submissions (${instructorStats?.trendAnalysis?.documentsProcessed !== undefined
                  ? instructorStats?.trendAnalysis?.documentsProcessed
                  : 0
                })` }
            </Typography>
            { isLoading ? (
              <>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
              </>
            ) : (
              submissionData?.length > 0 && (
                <ColumnChart
                    type={ COLUMN_ADMIN_CHART_TYPE }
                    color={ COLUMN_ADMIN_CHART_COLOR }
                    xaxisData={ COLUMN_ADMIN_XAXIS_DATA }
                    columnWidth={ COLUMN_ADMIN_WIDTH }
                    height={ COLUMN_ADMIN_CHART_HEIGHT }
                    seriesData={ [
                    {
                      name: "Document Processed",
                      data: submissionData,
                    },
                    ] }
                    gradient={ COLUMN_ADMIN_CHART_GRADIENT }
                    borderRadius={ COLUMN_ADMIN_CHART_BORDER_RADIUS }
                />
              )
            ) }
          </Grid>
          <Grid item md={ 4 } xs={ 12 }>
            <div style={ { textAlign: "center" } }>
              <Typography variant="h3">Trend Analysis</Typography>
            </div>
            { isLoading ? (
              <Skeleton
                variant="circular"
                style={ { margin: "8px auto" } }
                height={ 250 }
                width={ 250 }
              />
            ) : (
              instructorStats?.trendAnalysis && (
                <PieChart
                  type="donut"
                    height={ 340 }
                    color={ PIE_CHART_COLOR }
                    width={ PIE_CHART_WIDTH }
                    label={ PIE_CHART_LABEL }
                    series={ [
                    instructorStats?.trendAnalysis?.similarWork,
                    instructorStats?.trendAnalysis?.ownWork,
                    ] }
                    offsetY={ 37 }
                />
              )
            ) }
          </Grid>
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
  instructorStats: state?.detailsData?.StatsData,
  isLoadingCsvExport: state?.detailsData?.isLoadingCSV,
});

const mapDispatchToProps = (dispatch) => {
  return {
    GetStats: (url) => dispatch(GetStats(url)),
    GetExportToCSV: (url) => dispatch(GetExportToCSV(url)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InstructorStats);
