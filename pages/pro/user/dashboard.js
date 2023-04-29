import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import styled from "styled-components";
import { Skeleton } from "@mui/material";
import ProUser from "./../../../layouts/ProUser";
import { GetWidgetCount } from "../../../redux/action/instructor/InstructorAction";
import { Documentchart } from "../../../redux/action/common/Dashboard/DashboardAction";
import {
  WidgetCard,
  ColumnChart,
  PieChart,
  CardView,
  Heading,
  ListSkeleton,
  ErrorBlock,
  EllipsisText,
} from "../../../components";
import { NoOfSubmission, NoOfAssignmntIcon } from "../../../assets/icon";
import RecentSubmissions from "../../extream/instructor/dashboard/RecentSubmissions";
import {
  COLUMN_ADMIN_CHART_TYPE,
  COLUMN_ADMIN_CHART_COLOR,
  COLUMN_ADMIN_XAXIS_DATA,
  COLUMN_ADMIN_DOCUMNENT_XAXIS_DATA,
  COLUMN_ADMIN_WIDTH,
  COLUMN_ADMIN_CHART_HEIGHT,
  COLUMN_ADMIN_CHART_GRADIENT,
  COLUMN_ADMIN_CHART_BORDER_RADIUS,
  PIE_CHART_COLOR,
  PIE_CHART_WIDTH,
  PIE_CHART_LABEL,
} from "./../../../constant/data/ChartData";
import {
  DASHBOARD_RECENT_SUBMISSION_NOT_FOUND,
  DASHBOARD_SUBMISSION_OVERVIEW_NOT_FOUND,
  TREND_ANALYSIS_NOT_FOUND,
} from "../../../constant/data/ErrorMessage";
import { BASE_URL_PRO } from "../../../utils/BaseUrl";
import END_POINTS_PRO from "../../../utils/EndPointPro";
import ToastrValidation from '../../../utils/ToastrValidation';

const TextAlignRight = styled.div`
  text-align: right;
  margintop: 4px;
`;

const Dashboard = ({
  GetWidgetCount,
  Documentchart,
  instructorDashboardData,
  documentTypeData,
  isLoading,
}) => {
  const router = useRouter();

  const [recentSubmission, setRecentSubmission] = useState([]);
  const [documentsType, setDocumentsType] = useState();

  useEffect(() => {
    if (router?.query?.message) {
      ToastrValidation({
        status: 'ssoSucess',
        message: router?.query?.message
      })
    }
    GetWidgetCount(BASE_URL_PRO + END_POINTS_PRO.USERS_DASHBOARD_WIDGET);
    Documentchart(BASE_URL_PRO + END_POINTS_PRO.USER_DASHBOARD_DOCUMENT_CHART);
  }, []);

  useEffect(() => {
    let submission = instructorDashboardData?.data?.monthlySubmissions?.map(
      (item) => {
        return item.submissions;
      }
    );
    setRecentSubmission(submission);
  }, [instructorDashboardData]);

  useEffect(() => {
    if (documentTypeData !== undefined) {
      let b = documentTypeFilterData(documentTypeData);
      setDocumentsType(b);
    }
  }, [documentTypeData]);

  const documentTypeFilterData = (documentTypeData) => {
    let docsArr = [];
    documentTypeData &&
      Object.entries(documentTypeData).forEach((key) => {
        if (key[1] > 0) {
          docsArr.push({ docType: key[0], count: key[1] });
        }
      });
    docsArr.sort((a, b) => b.count - a.count);
    return docsArr;
  };

  const handlePage = (e, item) => {
    router.push({
      pathname: "/pro/user/folderSubmission",
      query: { name: item?.folder_name, folderId: item?.folder_id },
    });
  };

  return (
    <React.Fragment>
      <Box sx={ { flexGrow: 1 } }>
        <Grid container spacing={ 1 }>
          <Grid item md={ 6 } xs={ 12 }>
            <WidgetCard
              title="Folders"
              isLoading={ isLoading }
              count={ instructorDashboardData?.data?.no_of_folders }
              icon={ <NoOfSubmission /> }
            />
          </Grid>
          <Grid item md={ 6 } xs={ 12 }>
            <WidgetCard
              title="Submissions"
              isLoading={ isLoading }
              count={
                instructorDashboardData?.data?.submissionsUsage
                  ?.usedSubmissions +
                "/" +
                instructorDashboardData?.data?.submissionsUsage
                  ?.totalSubmissions
              }
              icon={ <NoOfAssignmntIcon /> }
            />
          </Grid>
        </Grid>
      </Box>
      <Box mt={ 1 } sx={ { flexGrow: 1 } }>
        <Grid container spacing={ 1 }>
          <Grid item md={ 12 } xs={ 12 }>
            <CardView
              height={
                instructorDashboardData?.data?.recent_submissions?.length === 0
                  ? ""
                  : "440px"
              }
            >
              <Grid container spacing={ 1 }>
                <Grid item md={ 10 } xs={ 12 }>
                  <Heading title="Recent Submissions" />
                </Grid>
              </Grid>

              { isLoading ? (
                <>
                  <ListSkeleton />
                  <ListSkeleton />
                  <ListSkeleton />
                  <ListSkeleton />
                </>
              ) : (
                <>
                    { instructorDashboardData?.data?.recent_submissions?.length >
                      0 ? (
                    <RecentSubmissions
                          isUser={ true }
                      recentSubmission={
                        instructorDashboardData?.data?.recent_submissions
                      }
                          handlePage={ handlePage }
                    />
                  ) : (
                    <ErrorBlock
                          message={ DASHBOARD_RECENT_SUBMISSION_NOT_FOUND }
                    />
                    ) }
                </>
              ) }
            </CardView>
          </Grid>
        </Grid>
      </Box>
      <Box mt={ 1 } sx={ { flexGrow: 1 } }>
        <Grid container spacing={ 1 }>
          <Grid item md={ 8 } xs={ 12 }>
            <CardView>
              <Heading title="Submissions Overview" />
              { isLoading ? (
                <Skeleton />
              ) : recentSubmission?.length &&
                instructorDashboardData?.data?.submissionsUsage
                  ?.usedSubmissions > 0 ? (
                <ColumnChart
                      type={ COLUMN_ADMIN_CHART_TYPE }
                      color={ COLUMN_ADMIN_CHART_COLOR }
                      xaxisData={ COLUMN_ADMIN_XAXIS_DATA }
                      columnWidth={ COLUMN_ADMIN_WIDTH }
                      height={ COLUMN_ADMIN_CHART_HEIGHT }
                      seriesData={ [
                    {
                      name: "Submission Overview",
                      data: recentSubmission,
                    },
                      ] }
                      gradient={ COLUMN_ADMIN_CHART_GRADIENT }
                      borderRadius={ COLUMN_ADMIN_CHART_BORDER_RADIUS }
                  filename="Submissions Overview"
                />
              ) : (
                <ErrorBlock message={ DASHBOARD_SUBMISSION_OVERVIEW_NOT_FOUND } />
              ) }
            </CardView>
          </Grid>
          <Grid item md={ 4 } xs={ 12 }>
            <CardView>
              <Grid container>
                <Grid item md={ 6.6 } xs={ 12 }>
                  <Heading title="Trend Analysis" />
                </Grid>
                <Grid item md={ 5.4 } xs={ 12 }>
                  { isLoading ? (
                    <Skeleton />
                  ) : (
                    <TextAlignRight>
                      <EllipsisText
                        value={
                          instructorDashboardData?.data?.trendAnalysis
                            ?.documentsProcessed +
                          "(" +
                          "Submissions" +
                          ")"
                        }
                          charLength={ 12 }
                      />
                    </TextAlignRight>
                  ) }
                </Grid>
              </Grid>
              { isLoading ? (
                <Skeleton
                  variant="circular"
                  style={ { margin: "58px auto" } }
                  height={ 250 }
                  width={ 250 }
                />
              ) : (
                <>
                    { instructorDashboardData?.data?.trendAnalysis
                    ?.documentsProcessed ? (
                    <PieChart
                      type="donut"
                      filename="Trend Analysis"
                      height={
                        instructorDashboardData?.data?.trendAnalysis
                          ?.documentsProcessed === 0
                          ? ""
                          : "317px"
                      }
                          color={ PIE_CHART_COLOR }
                          width={ PIE_CHART_WIDTH }
                          label={ PIE_CHART_LABEL }
                          series={ [
                        instructorDashboardData?.data?.trendAnalysis
                          ?.similarWork,
                        instructorDashboardData?.data?.trendAnalysis?.ownWork,
                          ] }
                    />
                  ) : (
                      <ErrorBlock message={ TREND_ANALYSIS_NOT_FOUND } />
                    ) }
                </>
              ) }
            </CardView>
          </Grid>
        </Grid>
      </Box>
      <Box mt={ 1 } sx={ { flexGrow: 1 } }>
        <Grid container spacing={ 1 }>
          <Grid item md={ 8 } xs={ 12 }>
            <CardView>
              <Heading title="Document Types" />
              { isLoading ? (
                <Skeleton
                  variant="circular"
                  style={ { margin: "58px auto" } }
                  height={ 250 }
                  width={ 250 }
                />
              ) : documentTypeData &&
                instructorDashboardData?.data?.submissionsUsage
                  ?.usedSubmissions > 0 ? (
                    documentsType && (
                  <PieChart
                    type="pie"
                        height={ 325 }
                        label={ documentsType.map((doc) => doc.docType) }
                        series={ documentsType.map((doc) => doc.count) }
                    filename="Document Types"
                  />
                )
              ) : (
                <ErrorBlock message={ DASHBOARD_SUBMISSION_OVERVIEW_NOT_FOUND } />
              ) }
            </CardView>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  instructorDashboardData: state?.instructorDashboard,
  documentTypeData: state?.documentChart?.DocumentTypeData,
  isLoading: state?.instructorDashboard?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    GetWidgetCount: (url) => dispatch(GetWidgetCount(url)),
    Documentchart: (url) => dispatch(Documentchart(url)),
  };
};

Dashboard.layout = ProUser;

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
