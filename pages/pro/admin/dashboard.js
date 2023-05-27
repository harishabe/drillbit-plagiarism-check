import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";
import { Skeleton } from "@mui/material";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ProAdmin from "./../../../layouts/ProAdmin";
import {
  GetWidgetCount,
  GetTrendAnalysis,
  RenewValidity,
} from "../../../redux/action/admin/AdminAction";
import {
  Documentchart,
  Departmentchart,
} from "../../../redux/action/common/Dashboard/DashboardAction";
import {
  WidgetCard,
  ColumnChart,
  PieChart,
  RadialBarChart,
  CardView,
  Heading,
  SubTitle,
  LineChart,
  ErrorBlock,
  WarningDialog,
} from "../../../components";
import { NoOfSubmission, NoStudentIcon } from "../../../assets/icon";
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
  PIE_CHART_LABEL,
  RADIAL_CHART_TYPE,
  RADIAL_CHART_COLOR,
  RADIAL_CHART_LABEL,
  RADIAL_CHART_HEIGHT,
} from "./../../../constant/data/ChartData";
import {
  DOCUMENT_PROCESSED_NOT_FOUND,
  TREND_ANALYSIS_NOT_FOUND,
} from "../../../constant/data/ErrorMessage";
import END_POINTS_PRO from "../../../utils/EndPointPro";
import { BASE_URL_PRO } from "../../../utils/BaseUrl";
import ToastrValidation from '../../../utils/ToastrValidation';

const TextAlignRight = styled.div`
  text-align: right;
  margin-top: 5px;
`;

const useStyles = makeStyles((theme) => ({
  BorderColor: {
    borderBottom: "2px solid #5a9de9",
  },
}));

const Dashboard = ({
  isLoadingDashboard,
  isLoadingTrendAnalysis,
  isLoadingRenewAccount,
  GetWidgetCount,
  Documentchart,
  Departmentchart,
  documentTypeData,
  departmentTypeData,
  adminDashboardData,
  GetTrendAnalysis,
  RenewValidity,
}) => {
  const router = useRouter();
  const classes = useStyles();
  const [trendAnalysisSeries, setTrendAnalysisSeries] = useState([]);
  const [showRenewWarning, setShowRenewWarning] = useState(false);
  const [documentsType, setDocumentsType] = useState();
  const [departmentsTypeData, setDepartmentsTypeData] = useState();
  const [year, setYear] = useState([]);
  const [submissions, setSubmissions] = useState([])
  const [submissionChartData, setSubmissionChartData] = useState({});
  const [submissionChartYear, setSubmissionChartYear] = useState({
    'year': year && year?.length > 0 ? year[year?.length - 1] : 2020,
    'index': year && year?.length > 0 ? year?.length - 1 : 0
  });
  const [submissionChartLoading, setSubmissionChartLoading] = useState(false);

  useEffect(() => {
    if (router?.query?.message) {
      ToastrValidation({
        status: 'ssoSucess',
        message: router?.query?.message
      })
    }
    GetWidgetCount(BASE_URL_PRO + END_POINTS_PRO.ADMIN_DASHBOARD_WIDGET);
    Documentchart(BASE_URL_PRO + END_POINTS_PRO.ADMIN_DASHBOARD_DOCUMENT_CHART);
    Departmentchart(
      BASE_URL_PRO + END_POINTS_PRO.ADMIN_DASHBOARD_DEPARTMENT_CHART
    );
    GetTrendAnalysis(BASE_URL_PRO + END_POINTS_PRO.ADMIN_TREND_ANALYSIS);
    trendAnalysisSeries.push(
      adminDashboardData?.trendAnalysis?.similarWork,
      adminDashboardData?.trendAnalysis?.ownWork
    );
    setTrendAnalysisSeries([...trendAnalysisSeries]);
  }, []);

  useEffect(() => {
    if (documentTypeData !== undefined) {
      let a = documentTypeFilterData(documentTypeData);
      setDocumentsType(a);
    }
  }, [documentTypeData]);

  useEffect(() => {
    if (departmentTypeData !== undefined) {
      let b = documentTypeFilterData(departmentTypeData);
      setDepartmentsTypeData(b);
    }
  }, [departmentTypeData]);

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

  const renewalClick = (e) => {
    e.preventDefault();
    setShowRenewWarning(true);
  };

  const handleCloseWarning = () => {
    setShowRenewWarning(false);
  };

  const handleYesWarning = () => {
    RenewValidity(BASE_URL_PRO + END_POINTS_PRO.ADMIN_RENEW_ACCOUNT);
    setShowRenewWarning(false);
    setTimeout(() => {
      setShowRenewWarning(false);
    }, [100]);
  };

  useEffect(() => {
    if (adminDashboardData) {
      setSubmissionChartLoading(true)
      setSubmissionChartData({
        'xaxisData': COLUMN_ADMIN_XAXIS_DATA,
        'data': [
          adminDashboardData?.data?.monthWiseSubmissionStats?.[submissionChartYear?.index]?.january,
          adminDashboardData?.data?.monthWiseSubmissionStats?.[submissionChartYear?.index]?.february,
          adminDashboardData?.data?.monthWiseSubmissionStats?.[submissionChartYear?.index]?.march,
          adminDashboardData?.data?.monthWiseSubmissionStats?.[submissionChartYear?.index]?.april,
          adminDashboardData?.data?.monthWiseSubmissionStats?.[submissionChartYear?.index]?.may,
          adminDashboardData?.data?.monthWiseSubmissionStats?.[submissionChartYear?.index]?.june,
          adminDashboardData?.data?.monthWiseSubmissionStats?.[submissionChartYear?.index]?.july,
          adminDashboardData?.data?.monthWiseSubmissionStats?.[submissionChartYear?.index]?.august,
          adminDashboardData?.data?.monthWiseSubmissionStats?.[submissionChartYear?.index]?.september,
          adminDashboardData?.data?.monthWiseSubmissionStats?.[submissionChartYear?.index]?.october,
          adminDashboardData?.data?.monthWiseSubmissionStats?.[submissionChartYear?.index]?.november,
          adminDashboardData?.data?.monthWiseSubmissionStats?.[submissionChartYear?.index]?.december,
        ]
      })
    }
    setTimeout(() => {
      setSubmissionChartLoading(false)
    }, []);
  }, [adminDashboardData, year, submissions, submissionChartYear]);

  useEffect(() => {
    let yearList = adminDashboardData?.data?.monthWiseSubmissionStats?.map((item) => {
      return item.year;
    });
    let submission = adminDashboardData?.data?.monthWiseSubmissionStats?.map((item) => {
      return item;
    });
    setYear(yearList);
    setSubmissions(submission);
  }, [adminDashboardData]);

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
              title="Users"
              isLoading={isLoadingDashboard}
              count={
                isLoadingDashboard
                  ? ""
                  : adminDashboardData?.data?.userAccountUsage?.usedAccounts +
                    " / " +
                    adminDashboardData?.data?.userAccountUsage?.totalAccounts
              }
              icon={<NoStudentIcon />}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <WidgetCard
              title="Submissions"
              isLoading={isLoadingDashboard}
              count={
                isLoadingDashboard
                  ? ""
                  : adminDashboardData?.data?.submissionsUsage
                      ?.usedSubmissions +
                    " / " +
                    adminDashboardData?.data?.submissionsUsage?.totalSubmissions
              }
              icon={<NoOfSubmission />}
            />
          </Grid>
        </Grid>
      </Box>
      <Box mt={1} sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item md={7} xs={12}>
            <CardView>
              <Grid container>
                <Grid item md={ 11 } xs={ 12 }>
                  <Heading title="Submissions Overview" />
                </Grid>
                <Grid item md={ 1 } xs={ 12 }>
                  <select value={ submissionChartYear?.year } onChange={ (e) => { handleChange(e.target.value) } }>
                    { year?.map((item, index) => (
                      <option key={ index }>{ item }</option>
                    )) }
                  </select>
                </Grid>
              </Grid>
              { (isLoadingDashboard || submissionChartLoading) ? <Skeleton /> :
                adminDashboardData && submissionChartData?.xaxisData?.length > 0 ?
                  <ColumnChart
                    filename={ `Submissions Overview ${submissionChartYear?.year}` }
                    type={ COLUMN_ADMIN_CHART_TYPE }
                    color={ COLUMN_ADMIN_CHART_COLOR }
                    xaxisData={ submissionChartData?.xaxisData }
                    columnWidth={ COLUMN_ADMIN_WIDTH }
                    height={ COLUMN_ADMIN_CHART_HEIGHT }
                    seriesData={ [
                      {
                        name: 'No. of submissions',
                        data: submissionChartData?.data
                      }
                    ] }
                    gradient={ COLUMN_ADMIN_CHART_GRADIENT }
                    borderRadius={ COLUMN_ADMIN_CHART_BORDER_RADIUS }
                  />
                  : <ErrorBlock message={ DOCUMENT_PROCESSED_NOT_FOUND } />
              }
            </CardView>
          </Grid>
          <Grid item md={5} xs={12}>
            <CardView>
              <Heading title="Similarity Ranges" />
              {isLoadingDashboard ? (
                <>
                  <Skeleton />
                </>
              ) : adminDashboardData?.data?.submissionsUsage?.usedSubmissions >
                0 ? (
                <LineChart
                  chartType="line"
                  graphName="File Submission"
                  filename="Similarity Ranges"
                  graphData={[
                    adminDashboardData?.data?.submissionsGraph?.zeroTen,
                    adminDashboardData?.data?.submissionsGraph?.elevenFourty,
                    adminDashboardData?.data?.submissionsGraph?.fourtyOneSixty,
                    adminDashboardData?.data?.submissionsGraph?.sixtyOneHundred,
                    adminDashboardData?.data?.submissionsGraph?.docError,
                  ]}
                  strokeCurve="straight"
                  xaxisLabelShow={true}
                  yaxisLabelShow={true}
                  chartHeight={350}
                />
              ) : (
                <ErrorBlock message={DOCUMENT_PROCESSED_NOT_FOUND} />
              )}
            </CardView>
          </Grid>
        </Grid>
      </Box>
      {showRenewWarning && (
        <WarningDialog
          message="Are you sure you want to renew ?"
          handleYes={handleYesWarning}
          handleNo={handleCloseWarning}
          isOpen={true}
        />
      )}
      <Box mt={1} sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item md={4} xs={12}>
            <CardView>
              <Grid container>
                <Grid item md={6.6} xs={12}>
                  <Heading title="Account Validity" />
                </Grid>
                <Grid item md={5.4} xs={12}>
                  {isLoadingDashboard ? (
                    <Skeleton />
                  ) : (
                    <TextAlignRight>
                      <SubTitle
                        title={
                          adminDashboardData?.data?.accountTotalDays +
                          "(" +
                          "Total days" +
                          ")"
                        }
                      />
                    </TextAlignRight>
                  )}
                </Grid>
              </Grid>
              {isLoadingDashboard ? (
                <Skeleton
                  variant="circular"
                  style={{ margin: "58px auto" }}
                  height={250}
                  width={250}
                />
              ) : (
                <>
                  <RadialBarChart
                    filename="Account Validity"
                    type={RADIAL_CHART_TYPE}
                    color={RADIAL_CHART_COLOR}
                    height={RADIAL_CHART_HEIGHT}
                    label={[RADIAL_CHART_LABEL]}
                    labelData={[adminDashboardData?.data?.accountValidityDays]}
                    series={[
                      adminDashboardData?.data?.accountValidityPercentage.toFixed(
                        2
                      ),
                    ]}
                  />
                  {isLoadingRenewAccount ? (
                    <Skeleton />
                  ) : (
                    <Typography variant="h4" component="div" gutterBottom>
                      <a
                        className={classes.BorderColor}
                        href=""
                        onClick={renewalClick}
                      >
                        Renew your account
                      </a>
                    </Typography>
                  )}
                </>
              )}
            </CardView>
          </Grid>
          <Grid item md={4} xs={12}>
            <CardView>
              <Grid container>
                <Grid item md={6.6} xs={12}>
                  <Heading title="Trend Analysis" />
                </Grid>
                <Grid item md={5.4} xs={12}>
                  {isLoadingDashboard ? (
                    <Skeleton />
                  ) : (
                    <TextAlignRight>
                      <SubTitle
                        title={
                          adminDashboardData?.trendAnalysis
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
              {isLoadingTrendAnalysis ? (
                <Skeleton
                  variant="circular"
                  style={{ margin: "59px auto" }}
                  height={250}
                  width={250}
                />
              ) : (
                <>
                  {adminDashboardData?.trendAnalysis?.documentsProcessed > 0 ? (
                    <>
                      <PieChart
                        type="donut"
                        filename="Trend Analysis"
                        color={PIE_CHART_COLOR}
                        height={320}
                        label={PIE_CHART_LABEL}
                        series={[
                          adminDashboardData?.trendAnalysis?.similarWork,
                          adminDashboardData?.trendAnalysis?.ownWork,
                        ]}
                      />
                    </>
                  ) : (
                    <ErrorBlock message={TREND_ANALYSIS_NOT_FOUND} />
                  )}
                </>
              )}
            </CardView>
          </Grid>
          <Grid item md={4} xs={12}>
            <CardView>
              <Grid container>
                <Grid item md={6.6} xs={12}>
                  <Heading title="Document Types" />
                </Grid>
                <Grid item md={5.4} xs={12}>
                  {isLoadingDashboard ? (
                    <Skeleton />
                  ) : (
                    <TextAlignRight>
                      {/* 
                      <select>
                          <option>Document type</option>
                          <option>Department type</option>
                        </select> 
                      */}
                    </TextAlignRight>
                  )}
                </Grid>
              </Grid>

              {isLoadingDashboard ? (
                <Skeleton
                  variant="circular"
                  style={{ margin: "59px auto" }}
                  height={250}
                  width={250}
                />
              ) : adminDashboardData?.trendAnalysis?.documentsProcessed > 0 ? (
                  documentsType && (
                  <PieChart
                    type="pie"
                    filename="Document Types"
                    pieChartPadding="0px 2px"
                    height={
                      Object.entries(documentsType).length > 5 ? 400 : 323
                    }
                      label={ documentsType.map((doc) => doc.docType) }
                      series={ documentsType.map((doc) => doc.count) }
                  />
                )
              ) : (
                <ErrorBlock message={DOCUMENT_PROCESSED_NOT_FOUND} />
              )}
            </CardView>
          </Grid>
        </Grid>
      </Box>
      <Box mt={1} sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item md={4} xs={12}>
            <CardView>
              <Heading title="Departments" />
              {isLoadingDashboard ? (
                <Skeleton
                  variant="circular"
                  style={{ margin: "59px auto" }}
                  height={250}
                  width={250}
                />
              ) : departmentTypeData &&
                adminDashboardData?.data?.submissionsUsage?.usedSubmissions >
                  0 ? (
                departmentsTypeData && (
                  <PieChart
                    type="pie"
                    height={
                      Object.entries(departmentsTypeData).length > 5 ? 400 : 323
                    }
                    pieChartPadding="38px 2px"
                        label={ departmentsTypeData.map((doc) => doc.docType) }
                        series={ departmentsTypeData.map((doc) => doc.count) }
                    filename="Departments"
                  />
                )
              ) : (
                <ErrorBlock message={DOCUMENT_PROCESSED_NOT_FOUND} />
              )}
            </CardView>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  adminDashboardData: state?.adminDashboard,
  documentTypeData: state?.documentChart?.DocumentTypeData,
  departmentTypeData: state?.documentChart?.DepartmentTypeData?.departmentSubmissions,
  isLoadingDashboard: state?.adminDashboard?.isLoadingDashboard,
  isLoadingTrendAnalysis: state?.adminDashboard?.isLoadingTrendAnalysis,
  isLoadingRenewAccount: state?.adminDashboard?.isLoadingRenewAccount,
});

const mapDispatchToProps = (dispatch) => {
  return {
    GetWidgetCount: (url) => dispatch(GetWidgetCount(url)),
    Documentchart: (url) => dispatch(Documentchart(url)),
    Departmentchart: (url) => dispatch(Departmentchart(url)),
    GetTrendAnalysis: (url) => dispatch(GetTrendAnalysis(url)),
    RenewValidity: (url) => dispatch(RenewValidity(url)),
  };
};

Dashboard.layout = ProAdmin;

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
