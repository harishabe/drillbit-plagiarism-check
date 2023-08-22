import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import styled from "styled-components";
import { Skeleton } from "@mui/material";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import { Grid, Tooltip } from "@mui/material";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import Student from "../../../layouts/Student";
import {
  BreadCrumb,
  CardView,
  TabMenu,
  StatusDot,
  EllipsisText,
  WarningDialog,
  Heading,
  DialogModal,
} from "../../../components";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import {
  GetSubmissionData,
  GetQna,
  GetFeedback,
  SendData,
  GetSubmissionHeaderData,
  DownloadStudentCsv,
} from "../../../redux/action/student/StudentAction";
import { DownloadOriginalFile } from "../../../redux/action/common/Submission/SubmissionAction";
import { PaginationValue } from "../../../utils/PaginationUrl";

import SubmissionHistory from "./submission-history";
import QA from "./q&a";
import Feedback from "./feedback";
import { dateFormat, getItemSessionStorage } from "../../../utils/RegExp";
import { StyledButtonIcon } from "../../../style";

const tabMenu = [
  {
    label: "Submission",
  },
  {
    label: "Q&A",
  },
];

const DownloadButton = styled.div`
  margin-top: 5px;
`;

const MyAssignmentDetails = ({
  GetSubmissionData,
  GetSubmissionHeaderData,
  DownloadStudentCsv,
  GetQna,
  GetFeedback,
  SendData,
  submissionData,
  headerData,
  qnaData,
  feedbackData,
  pageDetails,
  isLoadingSubmission,
  isLoadingHeader,
  isLoadingDownload,
  isLoadingQa,
  isLoadingFeedback,
  isLoadingAns,
  DownloadOriginalFile,
}) => {
  const router = useRouter();
  const [myclass, setMyclass] = useState("");
  const [myassignment, setMyassignment] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [showRenewWarning, setShowRenewWarning] = useState(false);
  const [data, setData] = useState();
  const [showDialogModal, setShowDialogModal] = useState(false);
  const [feedbackId, setFeedbackId] = useState("");
  const [paginationPayload, setPaginationPayload] = useState({
    page: PaginationValue?.page,
    size: PaginationValue?.size,
    field: "paper_id",
    orderBy: PaginationValue?.orderBy,
  });

  useEffect(() => {
    if (router.isReady) {
      setMyclass(router.query.clasName);
      setMyassignment(router.query.assName);
    }
  }, [router.isReady]);

  const StudentBreadCrumb = [
    {
      name: "Dashboard",
      link: "/extream/student/dashboard",
      active: false,
    },
    {
      name: myclass,
      link: "/extream/student/myclasses",
      active: false,
    },
    {
      name: myassignment,
      link: "/extream/student/myassignments?" + router?.asPath,
      active: false,
    },
    {
      name: "Submission details",
      link: "",
      active: true,
    },
  ];

  useEffect(() => {
    if (router.isReady) {
      GetSubmissionData(
        router.query.clasId,
        router.query.assId,
        paginationPayload
      );
    }
  }, [router.isReady, paginationPayload]);

  useEffect(() => {
    if (router.isReady) {
      GetSubmissionHeaderData(router.query.clasId, router.query.assId);
    }
  }, [router.isReady]);

  const handleDownload = () => {
    let url = `/${router.query.clasId}/assignments/${router.query.assId}/downloadHistory`;
    DownloadStudentCsv(url);
  };

  const handleSend = (e, ans1, qnaData) => {
    qnaData?.map((item) => {
      if (item?.answer !== null) {
        ans1[item.id.replace("Q", "A").toLowerCase()] = item?.answer;
      }
    });
    ans1["studentName"] = getItemSessionStorage("name");
    SendData(ans1, router.query.clasId, router.query.assId);
  };

  const handleChange = (event, value) => {
    event.preventDefault();
    setPaginationPayload({ ...paginationPayload, page: value - 1 });
  };

  const handleOriginalFileDownload = (e, data) => {
    e.preventDefault();
    setShowRenewWarning(true);
    setData(data);
  };

  const handleCloseWarning = () => {
    setShowRenewWarning(false);
  };

  const handleYesWarning = () => {
    let detailedData = {
      clasId: router.query.clasId,
      assId: router.query.assId,
      paperId: data?.paper_id,
      name: data?.original_fn,
      path: "studentSubmission",
    };
    DownloadOriginalFile(detailedData);
    setShowRenewWarning(false);
    setTimeout(() => {
      setShowRenewWarning(false);
    }, [100]);
  };

  const handleAPI = (value) => {
    setActiveTab(value);
  };

  const handleTableSort = (e, column, sortToggle) => {
    if (sortToggle) {
      paginationPayload["field"] = column.id;
      paginationPayload["orderBy"] = "asc";
    } else {
      paginationPayload["field"] = column.id;
      paginationPayload["orderBy"] = "desc";
    }
    setPaginationPayload({ ...paginationPayload, paginationPayload });
  };

  const handleAction = (event, icon, rowData) => {
    if (icon === "feedback") {
      setFeedbackId(rowData?.paper_id);
      setShowDialogModal(true);
    }
  };

  const handleCloseDialog = () => {
    setShowDialogModal(false);
  };

  const handleRefresh = () => {
    GetSubmissionData(
      router.query.clasId,
      router.query.assId,
      paginationPayload
    );
  };

  const SubmissionComponent = activeTab === 0 && (
    <SubmissionHistory
      submissionData={submissionData}
      isLoadingSubmission={isLoadingSubmission}
      pageDetails={pageDetails}
      handleChange={handleChange}
      handleAction={handleAction}
      handleRefresh={handleRefresh}
      handleOriginalFileDownload={handleOriginalFileDownload}
      handleTableSort={handleTableSort}
    />
  );
  const QnaComponent = activeTab === 1 && (
    <QA
      GetQna={GetQna}
      qnaData={qnaData}
      isLoadingQa={isLoadingQa}
      isLoadingAns={isLoadingAns}
      handleSend={handleSend}
    />
  );

  const componentList = [SubmissionComponent, QnaComponent];

  return (
    <React.Fragment>
      <Grid container>
        <Grid item md={10.5} xs={12}>
          <BreadCrumb item={StudentBreadCrumb} />
        </Grid>
        <Grid item md={1.1} xs={1} sx={{ marginTop: "8px" }}>
          <div>
            {headerData !== undefined && (
              <StatusDot
                color={headerData?.status === "active" ? "#38BE62" : "#E9596F"}
                title={headerData?.status}
              />
            )}
          </div>
        </Grid>
        <Grid item md={0.4} xs={1}>
          <Tooltip arrow title="Download csv">
            <StyledButtonIcon
              onClick={handleDownload}
              variant="outlined"
              size="small"
            >
              {isLoadingDownload ? (
                <Skeleton width={50} />
              ) : (
                <FileDownloadOutlinedIcon fontSize="small" />
              )}
            </StyledButtonIcon>
          </Tooltip>
        </Grid>
      </Grid>
      <Box sx={{ flexGrow: 1 }} marginBottom={"15px"}>
        <Grid container spacing={1}>
          <Grid item md={3} xs={12}>
            <CardView>
              <Heading
                title={<EllipsisText value={"Class name"} variant={"h2"} />}
                color="common.gray"
              />
              <Heading
                title={
                  isLoadingHeader ? (
                    <Skeleton />
                  ) : (
                    <EllipsisText value={headerData?.subject} />
                  )
                }
              />
            </CardView>
          </Grid>
          <Grid item md={3} xs={12}>
            <CardView>
              <Heading
                title={
                  <EllipsisText value={"Assignment name"} variant={"h2"} />
                }
                color="common.gray"
              />
              <Heading
                title={
                  isLoadingHeader ? (
                    <Skeleton />
                  ) : (
                    <EllipsisText value={headerData?.assignmentName} />
                  )
                }
              />
            </CardView>
          </Grid>
          <Grid item md={3} xs={12}>
            <CardView>
              <Heading
                title={
                  <EllipsisText value={"Instructor name"} variant={"h2"} />
                }
                color="common.gray"
              />
              <Heading
                title={
                  isLoadingHeader ? (
                    <Skeleton />
                  ) : (
                    <EllipsisText value={headerData?.instructorName} />
                  )
                }
              />
            </CardView>
          </Grid>
          <Grid item md={3} xs={12}>
            <CardView>
              <Heading
                title={<EllipsisText value={"Date"} variant={"h2"} />}
                color="common.gray"
              />
              <Heading
                title={
                  isLoadingHeader ? (
                    <Skeleton />
                  ) : (
                    <EllipsisText
                      value={
                        dateFormat(headerData?.createdDate) +
                        "- " +
                        dateFormat(headerData?.endDate)
                      }
                    />
                  )
                }
              />
            </CardView>
          </Grid>
        </Grid>
      </Box>

      <CardView>
        <Grid container>
          <Grid item md={11.75} xs={11.7}>
            <TabMenu
              menuButton={tabMenu}
              components={componentList}
              handleAPI={handleAPI}
            />
          </Grid>
          <Grid item md={0.25} xs={0.3}>
            <DownloadButton>
              <Tooltip title="Refresh" arrow>
                <StyledButtonIcon
                  onClick={handleRefresh}
                  variant="outlined"
                  size="small"
                >
                  <RefreshOutlinedIcon fontSize="small" />
                </StyledButtonIcon>
              </Tooltip>
            </DownloadButton>
          </Grid>
        </Grid>
      </CardView>
      {showRenewWarning && (
        <WarningDialog
          message="Are you sure you want to download ?"
          handleYes={handleYesWarning}
          handleNo={handleCloseWarning}
          isOpen={true}
        />
      )}

      {showDialogModal && (
        <>
          <DialogModal
            isOpen={true}
            fullWidth="sm"
            maxWidth="sm"
            handleClose={handleCloseDialog}
          >
            <Feedback
              GetFeedback={GetFeedback}
              feedbackData={feedbackData}
              feedbackId={feedbackId}
              isLoadingFeedback={isLoadingFeedback}
            />
          </DialogModal>
        </>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  submissionData:
    state?.studentClasses?.submissionData?._embedded?.submissionsResponseList,
  headerData: state?.studentClasses?.headerData,
  feedbackData: state?.studentClasses?.feedbackData,
  qnaData: state?.studentClasses?.qnaData,
  pageDetails: state?.studentClasses?.submissionData?.page,
  isLoadingSubmission: state?.studentClasses?.isLoadingSubmission,
  isLoadingHeader: state?.studentClasses?.isLoadingHeader,
  isLoadingDownload: state?.studentClasses?.isLoadingDownload,
  isLoadingQa: state?.studentClasses?.isLoadingQa,
  isLoadingFeedback: state?.studentClasses?.isLoadingFeedback,
  isLoadingAns: state?.studentClasses?.isLoadingAns,
});

const mapDispatchToProps = (dispatch) => {
  return {
    GetSubmissionData: (class_id, folder_id, PaginationValue) =>
      dispatch(GetSubmissionData(class_id, folder_id, PaginationValue)),
    DownloadOriginalFile: (data) => dispatch(DownloadOriginalFile(data)),
    GetSubmissionHeaderData: (class_id, folder_id) =>
      dispatch(GetSubmissionHeaderData(class_id, folder_id)),
    DownloadStudentCsv: (url) => dispatch(DownloadStudentCsv(url)),
    GetQna: (class_id, folder_id) => dispatch(GetQna(class_id, folder_id)),
    GetFeedback: (class_id, folder_id) =>
      dispatch(GetFeedback(class_id, folder_id)),
    SendData: (data, class_id, folder_id) =>
      dispatch(SendData(data, class_id, folder_id)),
  };
};

MyAssignmentDetails.layout = Student;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MyAssignmentDetails);
