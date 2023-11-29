import React, { useEffect, useState, useMemo } from "react";
import _ from "lodash";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import debouce from "lodash.debounce";
import { makeStyles } from "@mui/styles";
import {
  Grid,
  Tooltip,
  TextField,
  Pagination,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  CommonTable,
  Heading,
  WarningDialog,
  DialogModal,
  CreateDrawer,
  BreadCrumb,
} from "../../../components";
import Admin from "../../../layouts/Admin";
import { StatsIcon, DeleteWarningIcon, AddMultipleIcon } from "../../../assets/icon";
import {
  GetStudnetData,
  DeleteStudentData,
  UploadFileDataClear
} from "../../../redux/action/admin/AdminAction";
import { PaginationValue } from "../../../utils/PaginationUrl";
import StudentForm from "./form/StudentForm";
import StudentStats from "./student/StudentStats";
import { removeCommaWordEnd } from "../../../utils/RegExp";
import { WARNING_MESSAGES } from "../../../constant/data/Constant";
import {
  PaginationContainer,
  StyledButtonIcon,
  StyledButtonRedIcon,
  MultiSelectTableAction,
  AddButtonBottom
} from "../../../style/index";
import END_POINTS from "../../../utils/EndPoints";
import { BASE_URL_EXTREM } from "../../../utils/BaseUrl";

const columns = [
  { id: "name", label: "Name", maxWidth: 150 },
  { id: "student_user_id", label: "ID", maxWidth: 150 },
  { id: "username", label: "Email", maxWidth: 180 },
  { id: "department", label: "Department", maxWidth: 110 },
  { id: "section", label: "Section", maxWidth: 110 },
  { id: "stats", label: "Statistics", maxWidth: 70 },
  { id: "action", label: "Actions", maxWidth: 100 },
];

function createData(
  id,
  name,
  student_user_id,
  username,
  department,
  section,
  stats,
  action
) {
  return { id, name, student_user_id, username, department, section, stats, action };
}

const IntegrationBreadCrumb = [
  {
    name: "Dashboard",
    link: "/extream/admin/dashboard",
    active: false,
  },
  {
    name: "Students",
    link: "",
    active: true,
  },
];

const useStyles = makeStyles(() => ({
  button: {
    margin: "0px 0px 6px 0px",
  },
  view: {
    textAlign: "right",
    marginBottom: "7px",
  },
}));

const Students = ({
  GetStudnetData,
  studentData,
  pageDetails,
  DeleteStudentData,
  isLoading,
  UploadFileDataClear
}) => {
  const router = useRouter();
  const [rows, setRows] = useState([]);
  const classes = useStyles();
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [showDialogModal, setShowDialogModal] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [deleteRowData, setDeleteRowData] = useState("");
  const [editStudent, setEditStudent] = useState(false);
  const [editStudentData, setEditStudentData] = useState("");
  const [paginationPayload, setPaginationPayload] = useState({
    page: PaginationValue?.page,
    size: PaginationValue?.size,
    field: PaginationValue?.field,
    orderBy: PaginationValue?.orderBy,
  });

  useEffect(() => {
    GetStudnetData(paginationPayload);
  }, [, paginationPayload]);

  useEffect(() => {
    let row = "";
    let arr = [];
    studentData?.map((student) => {
      row = createData(
        student.id,
        student.name,
        student.student_id,
        student.username,
        student.department,
        student.section,
        [{ component: <StatsIcon />, type: "stats", title: "Stats" }],
        [
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
        ]
      );
      row["isSelected"] = false;
      arr.push(row);
    });
    setRows([...arr]);
  }, [studentData]);

  const handleChange = (event, value) => {
    event.preventDefault();
    setPaginationPayload({ ...paginationPayload, page: value - 1 });
  };

  const handleCloseWarning = () => {
    setShowDeleteWarning(false);
  };

  const handleYesWarning = () => {
    DeleteStudentData(
      BASE_URL_EXTREM + END_POINTS.ADMIN_STUDENT_DELETE + "?id=" + deleteRowData
    );
    setTimeout(() => {
      setShowDeleteWarning(false);
    }, [100]);
  };

  const handleAction = (event, icon, rowData) => {
    const student = studentData.filter((s) => {
      if (s.student_id === rowData?.student_user_id) {
        return s.id;
      }
    });
    if (icon === "edit") {
      setEditStudent(true);
      setEditStudentData(rowData);
    } else if (icon === "delete") {
      setDeleteRowData(student[0].id);
      setShowDeleteWarning(true);
    } else if (icon === "stats") {
      setStudentId(rowData.id);
      setShowDialogModal(true);
    }
  };

  const handleCloseDialog = () => {
    setShowDialogModal(false);
  };

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
      if (rowItem?.id === row?.id) {
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
      rowsId += rowItem?.id + ",";
    });
    setDeleteRowData(removeCommaWordEnd(rowsId));
    setShowDeleteWarning(true);
  };

  const handleDrawerClose = (value) => {
    setEditStudent(value);
  };

  const closeDrawerOnSuccess = (drawerClose) => {
    setEditStudent(drawerClose);
  };

  const handleShow = (e, info) => {
    if (info?.title === "Add Multiple Students") {
      UploadFileDataClear();
      router.push({ pathname: "/extream/admin/addBulkStudent" });
    }
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

      {editStudent && (
        <CreateDrawer
          title="Edit Instructor"
          isShowAddIcon={false}
          showDrawer={editStudent}
          handleDrawerClose={handleDrawerClose}
          handleCloseDrawer={closeDrawerOnSuccess}
        >
          <StudentForm editData={editStudentData} />
        </CreateDrawer>
      )}

      {showDialogModal && (
        <>
          <DialogModal
            headingTitle="Students Statistics"
            isOpen={true}
            fullWidth="lg"
            maxWidth="lg"
            handleClose={handleCloseDialog}
          >
            <StudentStats studentId={studentId} />
          </DialogModal>
        </>
      )}

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item md={10} xs={10}>
            <BreadCrumb item={IntegrationBreadCrumb} />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item md={5} xs={5}>
            <Heading
              title={`Students(${
                pageDetails?.totalElements !== undefined
                  ? pageDetails?.totalElements
                  : 0
              })`}
            />
          </Grid>
          <Grid item md={7} xs={7} className={classes.view}>
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

        <AddButtonBottom onClick={ handleShow }>
          <CreateDrawer
            options={ [
              {
                icon: <AddMultipleIcon />,
                title: "Add Multiple Students",
                handleFromCreateDrawer: true,
              },
            ] }
            title="Add Students"
            handleMultiData={ handleShow }
            isShowAddIcon={ true }
          >
          </CreateDrawer>
        </AddButtonBottom>

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
  pageDetails: state?.detailsData?.studentData?.page,
  studentData: state?.detailsData?.studentData?._embedded?.studentDTOList,
  isLoading: state?.detailsData?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    GetStudnetData: (paginationPayload) =>
      dispatch(GetStudnetData(paginationPayload)),
    DeleteStudentData: (url) => dispatch(DeleteStudentData(url)),
    UploadFileDataClear: () => dispatch(UploadFileDataClear()),
  };
};

Students.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(Students);
