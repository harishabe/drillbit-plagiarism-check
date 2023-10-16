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
import ToastrValidation from "../../../utils/ToastrValidation";
//import { getItemSessionStorage } from "../../../utils/RegExp";

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
  const [documentsType, setDocumentsType] = useState();
  const [year, setYear] = useState([]);
  const [submissions, setSubmissions] = useState([])
  const [submissionChartData, setSubmissionChartData] = useState({});
  const [submissionChartYear, setSubmissionChartYear] = useState({});
  const [submissionChartLoading, setSubmissionChartLoading] = useState(false);
  //const isFlag = getItemSessionStorage("flag");

  useEffect(() => {
    setSubmissionChartYear({
      'year': year && year.length > 0 ? year[year.length - 1] : 2020,
      'index': year && year.length > 0 ? year.length - 1 : 0
    });
  }, [year]);

  useEffect(() => {
    if (router?.query?.message) {
      ToastrValidation({
        status: "ssoSucess",
        message: router?.query?.message,
      });
    }
    GetWidgetCount(BASE_URL_PRO + END_POINTS_PRO.USERS_DASHBOARD_WIDGET);
    Documentchart(BASE_URL_PRO + END_POINTS_PRO.USER_DASHBOARD_DOCUMENT_CHART);
  }, []);

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
      query: { name: item?.folder_name, folderId: item?.folder_id, crossLanguage: instructorDashboardData?.data?.translation.toUpperCase() },
    });
  };

  useEffect(() => {
    if (instructorDashboardData) {
      setSubmissionChartLoading(true)
      setSubmissionChartData({
        'xaxisData': COLUMN_ADMIN_XAXIS_DATA,
        'data': [
          instructorDashboardData?.data?.monthWiseSubmissionStats?.[submissionChartYear?.index]?.january,
          instructorDashboardData?.data?.monthWiseSubmissionStats?.[submissionChartYear?.index]?.february,
          instructorDashboardData?.data?.monthWiseSubmissionStats?.[submissionChartYear?.index]?.march,
          instructorDashboardData?.data?.monthWiseSubmissionStats?.[submissionChartYear?.index]?.april,
          instructorDashboardData?.data?.monthWiseSubmissionStats?.[submissionChartYear?.index]?.may,
          instructorDashboardData?.data?.monthWiseSubmissionStats?.[submissionChartYear?.index]?.june,
          instructorDashboardData?.data?.monthWiseSubmissionStats?.[submissionChartYear?.index]?.july,
          instructorDashboardData?.data?.monthWiseSubmissionStats?.[submissionChartYear?.index]?.august,
          instructorDashboardData?.data?.monthWiseSubmissionStats?.[submissionChartYear?.index]?.september,
          instructorDashboardData?.data?.monthWiseSubmissionStats?.[submissionChartYear?.index]?.october,
          instructorDashboardData?.data?.monthWiseSubmissionStats?.[submissionChartYear?.index]?.november,
          instructorDashboardData?.data?.monthWiseSubmissionStats?.[submissionChartYear?.index]?.december,
        ]
      })
    }
    setTimeout(() => {
      setSubmissionChartLoading(false)
    }, []);
  }, [instructorDashboardData, year, submissions, submissionChartYear]);

  useEffect(() => {
    let yearList = instructorDashboardData?.data?.monthWiseSubmissionStats?.map((item) => {
      return item.year;
    });
    let submission = instructorDashboardData?.data?.monthWiseSubmissionStats?.map((item) => {
      return item;
    });
    setYear(yearList);
    setSubmissions(submission);
  }, [instructorDashboardData]);

  const handleChange = (val) => {
    year?.map((item, index) => {
      if (val == item) {
        setSubmissionChartYear({
          'year': item,
          'index': index
        })
      }
    });
  }

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item md={6} xs={12}>
            <WidgetCard
              title="Folders"
              isLoading={isLoading}
              count={instructorDashboardData?.data?.no_of_folders}
              icon={<NoOfSubmission />}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <WidgetCard
              title="Submissions"
              isLoading={isLoading}
              count={
                instructorDashboardData?.data?.submissionsUsage
                  ?.usedSubmissions +
                "/" +
                instructorDashboardData?.data?.submissionsUsage
                  ?.totalSubmissions
              }
              icon={<NoOfAssignmntIcon />}
              isSubInfo={false} // temproray 
            />
          </Grid>
        </Grid>
      </Box>
      <Box mt={1} sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item md={12} xs={12}>
            <CardView
              height={
                instructorDashboardData?.data?.recent_submissions?.length === 0
                  ? ""
                  : "440px"
              }
            >
              <Grid container spacing={1}>
                <Grid item md={10} xs={12}>
                  <Heading title="Recent Submissions" />
                </Grid>
              </Grid>

              {isLoading ? (
                <>
                  <ListSkeleton />
                  <ListSkeleton />
                  <ListSkeleton />
                  <ListSkeleton />
                </>
              ) : (
                <>
                  {instructorDashboardData?.data?.recent_submissions?.length >
                  0 ? (
                    <RecentSubmissions
                      isUser={true}
                      recentSubmission={
                        instructorDashboardData?.data?.recent_submissions
                      }
                      handlePage={handlePage}
                    />
                  ) : (
                    <ErrorBlock
                      message={DASHBOARD_RECENT_SUBMISSION_NOT_FOUND}
                    />
                  )}
                </>
              )}
            </CardView>
          </Grid>
        </Grid>
      </Box>
      <Box mt={1} sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item md={8} xs={12}>
            <CardView>
              <Grid container>
                <Grid item md={ 11 } xs={ 12 }>
                  <Heading title="Submissions Overview" />
                </Grid>
                { instructorDashboardData?.data?.submissionsUsage
                  ?.usedSubmissions > 0 && 
                  <Grid item md={ 1 } xs={ 12 }>
                  <select value={ year && submissionChartYear?.year } onChange={ (e) => { handleChange(e.target.value) } }>
                    { year?.map((item, index) => (
                      <option key={ index }>{ item }</option>
                    )) }
                  </select>
                </Grid>
                }
              </Grid>
              { (isLoading || submissionChartLoading) ? <Skeleton /> :
                instructorDashboardData && instructorDashboardData?.data?.submissionsUsage
                  ?.usedSubmissions > 0 && submissionChartData?.xaxisData?.length > 0 ?
                  <ColumnChart
                    filename={ `Submissions Overview ${submissionChartYear?.year}` }
                    type={ COLUMN_ADMIN_CHART_TYPE }
                    color={ COLUMN_ADMIN_CHART_COLOR }
                    xaxisData={ submissionChartData?.xaxisData }
                    columnWidth={ COLUMN_ADMIN_WIDTH }
                    height={ 349 }
                    seriesData={ [
                      {
                        name: 'No. of submissions',
                        data: year && submissionChartData?.data
                      }
                    ] }
                    gradient={ COLUMN_ADMIN_CHART_GRADIENT }
                    borderRadius={ COLUMN_ADMIN_CHART_BORDER_RADIUS }
                  />
                  : <ErrorBlock message={ DASHBOARD_SUBMISSION_OVERVIEW_NOT_FOUND } />
              }
            </CardView>
          </Grid>
          <Grid item md={4} xs={12}>
            <CardView height={instructorDashboardData?.data?.trendAnalysis?.documentsProcessed > 0 && 439 }>
              <Grid container>
                <Grid item md={6.6} xs={12}>
                  <Heading title="Trend Analysis" />
                </Grid>
                <Grid item md={5.4} xs={12}>
                  {isLoading ? (
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
                      />
                    </TextAlignRight>
                  )}
                </Grid>
              </Grid>
              {isLoading ? (
                <Skeleton
                  variant="circular"
                  style={{ margin: "58px auto" }}
                  height={250}
                  width={250}
                />
              ) : (
                <>
                  {instructorDashboardData?.data?.trendAnalysis
                    ?.documentsProcessed > 0 ? (
                    <PieChart
                      type="donut"
                      filename="Trend Analysis"
                      height={ 340 }
                      color={PIE_CHART_COLOR}
                      width={PIE_CHART_WIDTH}
                      label={PIE_CHART_LABEL}
                      series={[
                        instructorDashboardData?.data?.trendAnalysis
                          ?.similarWork,
                        instructorDashboardData?.data?.trendAnalysis?.ownWork,
                      ]}
                      offsetY={ 35 }
                    />
                  ) : (
                    <ErrorBlock message={TREND_ANALYSIS_NOT_FOUND} />
                  )}
                </>
              )}
            </CardView>
          </Grid>
        </Grid>
      </Box>
      <Box mt={1} sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item md={8} xs={12}>
            <CardView height={ instructorDashboardData?.data?.submissionsUsage?.usedSubmissions > 0 && 430 }>
              <Heading title="Document Types" />
              {isLoading ? (
                <Skeleton
                  variant="circular"
                  style={{ margin: "58px auto" }}
                  height={250}
                  width={250}
                />
              ) : documentTypeData &&
                instructorDashboardData?.data?.submissionsUsage
                  ?.usedSubmissions > 0 ? (
                documentsType && (
                  <PieChart
                    type="pie"
                    height={ 360 }
                    label={documentsType.map((doc) => doc.docType)}
                    series={documentsType.map((doc) => doc.count)}
                    filename="Document Types"
                    legendHeight={ 56 }
                    offsetY={ 35 }
                  />
                )
              ) : (
                <ErrorBlock message={DASHBOARD_SUBMISSION_OVERVIEW_NOT_FOUND} />
              )}
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
