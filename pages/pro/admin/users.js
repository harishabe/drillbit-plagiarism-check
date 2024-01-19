import React, { useEffect, useState, useMemo } from "react";
import _ from "lodash";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
import debouce from "lodash.debounce";
import { Box, Grid, Tooltip, Switch, Skeleton, TextField, Pagination } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import ProAdmin from "./../../../layouts/ProAdmin";
import {
  CommonTable,
  Heading,
  StatusDot,
  BreadCrumb,
  CreateDrawer,
  WarningDialog,
  DialogModal,
} from "../../../components";
import {
  StatsIcon,
  DeleteWarningIcon,
  AddMultipleIcon,
  AddPersonIcon,
  DownloadWarningIcon,
} from "../../../assets/icon";
import {
  GetInstructorData,
  DeleteData,
  DeactivateData,
  UploadFileDataClear,
  DownloadInstructorStudentData
} from "../../../redux/action/admin/AdminAction";
import { PaginationValue } from "../../../utils/PaginationUrl";
import UserForm from "./form/UserForm";
import UserStats from "./users/UserStats";
import { removeCommaWordEnd, formatDate } from "../../../utils/RegExp";
import END_POINTS_PRO from "../../../utils/EndPointPro";
import { BASE_URL_PRO } from "../../../utils/BaseUrl";
import { PaginationContainer } from "../../../style/index";
import { Role } from "../../../constant/data";
import { WARNING_MESSAGES } from "../../../constant/data/Constant";
import {
  StyledButtonIcon,
  AddButtonBottom,
  StyledButtonRedIcon,
  MultiSelectTableAction,
} from "./../../../style/index";

const columns = [
  { id: "name", label: "Name", maxWidth: 80 },
  { id: "username", label: "Email", maxWidth: 95 },
  { id: "designation", label: "Designation", maxWidth: 75 },
  { id: "department", label: "Department", maxWidth: 75 },
  { id: "created_date", label: "Creation Date", maxWidth: 90 },
  { id: "total_submissions", label: "Allocated", maxWidth: 65 },
  { id: "used_submissions", label: "Submissions", maxWidth: 65 },
  { id: "status", label: "Status", maxWidth: 60 },
  { id: "stats", label: "Statistics", maxWidth: 50 },
  { id: "action", label: "Actions", maxWidth: 120 },
];

const useStyles = makeStyles(() => ({
  downloadButton: {
    margin: "0px 10px 0px 0px",
  },
  skeleton: {
    display: 'inline-block',
    marginRight: '10px'
  },
  button: {
    margin: "0px 0px 6px 0px",
  },
  view: {
    textAlign: "right",
    marginBottom: "7px",
  },
}));

function createData(
  user_id,
  role,
  name,
  username,
  created_date,
  total_submissions,
  total_grammar,
  status,
  stats,
  action,
  expiry_date,
  department,
  designation,
  phone_number,
  used_submissions,
  used_grammar,
  expired
) {
  return {
    user_id,
    role,
    name,
    username,
    created_date,
    total_submissions,
    total_grammar,
    status,
    stats,
    action,
    expiry_date,
    department,
    designation,
    phone_number,
    used_submissions,
    used_grammar,
    expired,
  };
}

const UserBreadCrumb = [
  {
    name: "Dashboard",
    link: "/pro/admin/dashboard",
    active: false,
  },
  {
    name: "Users",
    link: "",
    active: true,
  },
];

const Users = ({
  pageDetails,
  GetInstructorData,
  UploadFileDataClear,
  instructorData,
  DeleteData,
  DeactivateData,
  isLoading,
  DownloadInstructorStudentData,
  isLoadingDownload
}) => {
  const classes = useStyles();
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [deleteRowData, setDeleteRowData] = useState("");
  const [showStatusWarning, setStatusWarning] = useState(false);
  const [showDownloadWarning, setShowDownloadWarning] = useState(false);
  const [showDialogModal, setShowDialogModal] = useState(false);
  const [statusRowData, setStatusRowData] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [userId, setUserId] = useState("");
  const [showDeleteAllIcon, setShowDeleteAllIcon] = useState(false);
  const [paginationPayload, setPaginationPayload] = useState({
    page: PaginationValue?.page,
    size: PaginationValue?.size,
    field: PaginationValue?.field,
    orderBy: PaginationValue?.orderBy,
  });
  const [editInstructor, setEditInstructor] = useState(false);
  const [editInstructorData, setEditInstructorData] = useState("");

  useEffect(() => {
    GetInstructorData(
      BASE_URL_PRO + END_POINTS_PRO.ADMIN_USER,
      paginationPayload
    );
  }, [, paginationPayload]);

  useEffect(() => {
    let row = "";
    let arr = [];
    instructorData?.map((instructor) => {
      row = createData(
        instructor.id,
        instructor.role,
        instructor.name,
        instructor.username,
        formatDate(instructor.created_date),
        instructor.total_submissions,
        instructor.total_grammar,
        <StatusDot
          color={
            instructor.status === "active" || instructor.status === "ACTIVE"
              ? "#38BE62"
              : "#E9596F"
          }
          title={instructor.status}
        />,
        [
          {
            component: <StatsIcon />,
            type: "stats",
            title: "Statistics",
          },
        ],
        instructor.role === Role.proAdmin
          ? [
              {
                component: (
                  <StyledButtonIcon variant="outlined" size="small">
                    <EditOutlinedIcon fontSize="small" />
                  </StyledButtonIcon>
                ),
                type: "edit",
                title: "Edit",
              },
            ]
          : [
              {
                component: (
                  <StyledButtonIcon variant="outlined" size="small">
                    <EditOutlinedIcon fontSize="small" />
                  </StyledButtonIcon>
                ),
                type: "edit",
                title: "Edit",
              },
              {
                component: (
                  <StyledButtonRedIcon variant="outlined" size="small">
                    <DeleteOutlineOutlinedIcon fontSize="small" />
                  </StyledButtonRedIcon>
                ),
                type: "delete",
                title: "Delete",
              },
              {
                component: (
                  <Switch
                    checked={instructor.status === "active" ? true : false}
                    size="small"
                    disabled={instructor.expired === 1}
                  />
                ),
                type: instructor.status === "active" ? "lock" : "unlock",
                title:
                  instructor.status === "active" ? "Activate" : "De-activate",
                isDisabled: instructor.expired === 1,
              },
            ],
        instructor.expiry_date,
        instructor.department,
        instructor.designation,
        instructor.phone_number,
        instructor.used_submissions,
        instructor.used_grammar,
        instructor.expired
      );
      row["isSelected"] = false;
      arr.push(row);
    });
    setRows([...arr]);
  }, [instructorData]);

  const handleChange = (event, value) => {
    event.preventDefault();
    setPaginationPayload({ ...paginationPayload, page: value - 1 });
  };

  const handleCloseWarning = () => {
    setShowDeleteWarning(false);
  };

  const handleStatusCloseWarning = () => {
    setStatusWarning(false);
  };

  const handleDownloadCloseWarning = () => {
    setShowDownloadWarning(false);
  };

  const handleYesWarning = () => {
    DeleteData(
      BASE_URL_PRO + END_POINTS_PRO.ADMIN_USER_DELETE + deleteRowData,
      paginationPayload
    );
    setShowDeleteAllIcon(false);
    setTimeout(() => {
      setShowDeleteWarning(false);
    }, [100]);
  };

  const handleStatusWarning = () => {
    if (statusRowData?.status === "ACTIVE") {
      DeactivateData(
        BASE_URL_PRO + END_POINTS_PRO.ACTIVATE_USER + statusRowData.id,
        paginationPayload
      );
    } else {
      DeactivateData(
        BASE_URL_PRO + END_POINTS_PRO.DEACTIVATE_USER + statusRowData.id,
        paginationPayload
      );
    }
    setTimeout(() => {
      setStatusWarning(false);
    }, [100]);
  };

  const handleDownloadWarning = () => {
    DownloadInstructorStudentData(BASE_URL_PRO + END_POINTS_PRO.ADMIN_REPORTS_DOWNLOAD_USER_LIST, 'Users');
    setShowDownloadWarning(false);
  };

  const handleAction = (event, icon, rowData) => {
    if (icon === "edit") {
      setEditInstructor(true);
      setEditInstructorData(rowData);
    } else if (icon === "delete") {
      setDeleteRowData(rowData?.user_id);
      setShowDeleteWarning(true);
    } else if (icon === "lock" && rowData?.expired !== 1) {
      let activateDeactive = {
        id: rowData?.user_id,
        status: "INACTIVE",
      };
      setStatusRowData(activateDeactive);
      setStatusWarning(true);
      setStatusMessage("deactivate");
    } else if (icon === "unlock" && rowData?.expired !== 1) {
      let activateDeactive = {
        id: rowData?.user_id,
        status: "ACTIVE",
      };
      setStatusRowData(activateDeactive);
      setStatusWarning(true);
      setStatusMessage("activate");
    } else if (icon === "stats") {
      setUserId(rowData?.user_id);
      setShowDialogModal(true);
    }
  };

  const handleCloseDialog = () => {
    setShowDialogModal(false);
  };

  /** search implementation using debounce concepts */

  const handleSearch = (event) => {
    if (event.target.value !== "") {
      paginationPayload["search"] = event.target.value;
      setPaginationPayload({ ...paginationPayload, paginationPayload });
    } else {
      delete paginationPayload["search"];
      setPaginationPayload({ ...paginationPayload, paginationPayload });
    }
  };

  const debouncedResults = useMemo(() => {
    return debouce(handleSearch, 300);
  }, []);

  useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  /** end debounce concepts */

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

  const handleCheckboxSelect = (e, value) => {
    e.preventDefault();
    if (value) {
      let rowData = rows?.map((rowItem) => {
        rowItem["isSelected"] = false;
        return rowItem;
      });
      setRows(rowData);
    } else {
      let rowData = rows?.map((rowItem) => {
        rowItem["isSelected"] = !rowItem["isSelected"];
        return rowItem;
      });
      setRows(rowData);
    }
  };

  const handleSingleSelect = (e, row) => {
    let rowData = rows?.map((rowItem) => {
      if (rowItem?.user_id === row?.user_id) {
        rowItem["isSelected"] = !rowItem["isSelected"];
      }
      return rowItem;
    });
    setRows(rowData);
  };

  const deleteAllInstructor = () => {
    let rowsId = "";
    _.filter(rows, function (o) {
      if (o.isSelected === true) {
        return rows;
      }
    }).map((rowItem) => {
      rowsId += rowItem?.user_id + ",";
    });
    setDeleteRowData(removeCommaWordEnd(rowsId));
    setShowDeleteWarning(true);
  };

  const handleShow = (e, info) => {
    if (info?.title === "Add User") {
      setShowDialogModal(true);
    } else if (info?.title === "Add Multiple Users") {
      UploadFileDataClear();
      router.push({ pathname: "/pro/admin/addBulkUser" });
    }
  };

  const handleDrawerClose = (drawerClose) => {
    setEditInstructor(drawerClose);
  };

  const closeDrawerOnSuccess = (drawerClose) => {
    setEditInstructor(drawerClose);
  };

  const handleDownload = () => {
    setShowDownloadWarning(true)
  };

  return (
    <React.Fragment>
      {showDeleteWarning && (
        <WarningDialog
          warningIcon={<DeleteWarningIcon />}
          message={WARNING_MESSAGES.DELETE}
          handleYes={handleYesWarning}
          handleNo={handleCloseWarning}
          isOpen={true}
        />
      )}

      {showStatusWarning && (
        <WarningDialog
          warningIcon={<DeleteWarningIcon />}
          message={"Are you sure, you want to " + statusMessage + "?"}
          handleYes={handleStatusWarning}
          handleNo={handleStatusCloseWarning}
          isOpen={true}
        />
      )}

      {showDownloadWarning && (
        <WarningDialog
          warningIcon={ <DownloadWarningIcon />}
          message={ WARNING_MESSAGES.DOWNLOAD_USER_LIST }
          handleYes={handleDownloadWarning}
          handleNo={handleDownloadCloseWarning}
          isOpen={true}
        />
      )}

      {showDialogModal && (
        <DialogModal
          headingTitle="User Statistics"
          isOpen={true}
          fullWidth="lg"
          maxWidth="lg"
          handleClose={handleCloseDialog}
        >
          <UserStats userId={userId} />
        </DialogModal>
      )}

      <AddButtonBottom>
        <CreateDrawer
          options={[
            {
              icon: <AddPersonIcon />,
              title: "Add User",
              handleFromCreateDrawer: false,
            },
            {
              icon: <AddMultipleIcon />,
              title: "Add Multiple Users",
              handleFromCreateDrawer: true,
            },
          ]}
          title="Add User"
          handleMultiData={handleShow}
          isShowAddIcon={true}
        >
          <UserForm />
        </CreateDrawer>
      </AddButtonBottom>

      {editInstructor && (
        <CreateDrawer
          title="Edit Instructor"
          isShowAddIcon={false}
          showDrawer={editInstructor}
          handleDrawerClose={handleDrawerClose}
          handleCloseDrawer={closeDrawerOnSuccess}
        >
          <UserForm editData={editInstructorData} />
        </CreateDrawer>
      )}

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item md={10} xs={10}>
            <BreadCrumb item={UserBreadCrumb} />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item md={5} xs={5}>
            <Heading
              title={`Users(${
                pageDetails?.totalElements !== undefined
                  ? pageDetails?.totalElements
                  : 0
              })`}
            />
          </Grid>
          <Grid item md={7} xs={7} className={classes.view}>
            { instructorData?.length > 0 &&
              isLoadingDownload ?
              <Skeleton width={ 30 } height={ 40 } className={ classes.skeleton } />
              : <Tooltip title="Download Users list" arrow>
                <StyledButtonIcon variant="outlined" size='small'
                  className={ classes.downloadButton }
                  onClick={ handleDownload }>
                  <FileDownloadOutlinedIcon fontSize='medium' />
                </StyledButtonIcon>
              </Tooltip>
            }
            <TextField
              sx={{ width: "41.5%" }}
              placeholder="Search by Email"
              onChange={debouncedResults}
              inputProps={{
                style: {
                  padding: 7,
                  display: "inline-flex",
                  fontWeight: 500,
                },
              }}
            />
          </Grid>
        </Grid>
        {/* <SubTitle title='6/10 users' />
                <InfoIcon /> */}
      </Box>

      <>
        {_.find(rows, function (o) {
          return o.isSelected === true;
        }) && (
          <MultiSelectTableAction>
            <Tooltip title="Delete" arrow>
              <StyledButtonRedIcon
                onClick={deleteAllInstructor}
                className={classes.button}
                variant="outlined"
                size="small"
              >
                <DeleteOutlineOutlinedIcon fontSize="small" />
              </StyledButtonRedIcon>
            </Tooltip>
          </MultiSelectTableAction>
        )}
        <CommonTable
          isCheckbox={true}
          isSorting={true}
          tableHeader={columns}
          tableData={rows}
          handleAction={handleAction}
          handleTableSort={handleTableSort}
          handleCheckboxSelect={handleCheckboxSelect}
          handleSingleSelect={handleSingleSelect}
          isLoading={isLoading}
          path=""
        />

        <PaginationContainer>
          <Pagination
            count={pageDetails?.totalPages}
            page={pageDetails?.number + 1}
            onChange={handleChange}
            color="primary"
            variant="outlined"
            shape="rounded"
          />
        </PaginationContainer>
      </>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  pageDetails: state?.detailsData?.instructorData?.user?.page,
  instructorData: state?.detailsData?.instructorData?.user?._embedded?.userResponseList,
  isLoading: state?.detailsData?.isLoading,
  isLoadingDownload: state?.adminReport?.isLoadingDownload,
});

const mapDispatchToProps = (dispatch) => {
  return {
    GetInstructorData: (url, paginationPayload) =>
      dispatch(GetInstructorData(url, paginationPayload)),
    DeactivateData: (url, paginationPayload) =>
      dispatch(DeactivateData(url, paginationPayload)),
    DeleteData: (deleteRowData, paginationPayload) =>
      dispatch(DeleteData(deleteRowData, paginationPayload)),
    UploadFileDataClear: () => dispatch(UploadFileDataClear()),
    DownloadInstructorStudentData: (url, userType) => dispatch(DownloadInstructorStudentData(url, userType))
  };
};

Users.layout = ProAdmin;

export default connect(mapStateToProps, mapDispatchToProps)(Users);
