import React, { useEffect, useState, useMemo } from "react";
import debouce from "lodash.debounce";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import styled from "styled-components";
import { makeStyles } from "@mui/styles";
import MuiToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { GetClassesData } from "../../../redux/action/student/StudentAction";
import { PaginationValue } from "../../../utils/PaginationUrl";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import Grid from "@mui/material/Grid";
import { Skeleton, TextField, Tooltip } from "@mui/material";
import Student from "../../../layouts/Student";
import {
  BreadCrumb,
  CardInfoView,
  Heading,
  CardInfoSkeleton,
  ErrorBlock,
  CardView,
  CommonTable,
  EllipsisText,
  StatusDot,
} from "../../../components";
import {
  renameKeys,
  findByExpiryDate,
  expiryDateBgColor,
} from "../../../utils/RegExp";
import { CLASS_NOT_FOUND } from "../../../constant/data/ErrorMessage";
import {
  setItemSessionStorage,
  getItemSessionStorage,
  formatDate,
} from "../../../utils/RegExp";
import { CLASS_VIEW, TABLE_VIEW } from "../../../constant/data/Constant";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import WysiwygIcon from "@mui/icons-material/Wysiwyg";
import { PaginationContainer, StyledButtonIcon } from "../../../style/index";

const StudentBreadCrumb = [
  {
    name: "Dashboard",
    link: "/extream/student/dashboard",
    active: false,
  },
  {
    name: "My classes",
    link: "",
    active: true,
  },
];

const useStyles = makeStyles(() => ({
  view: {
    textAlign: "right",
    marginBottom: "7px",
  },
}));

const ToggleButton = styled(MuiToggleButton)({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "#fff !important",
    backgroundColor: "#3672FF !important",
  },
});

const columns = [
  { id: "class_id", label: "Class ID", maxWidth: 80 },
  { id: "class_name", label: "Class name", maxWidth: 340 },
  { id: "created_date", label: "Start date", maxWidth: 140 },
  { id: "end_date", label: "Expiry date", maxWidth: 140 },
  { id: "status", label: "Status", maxWidth: 110 },
  { id: "action", label: "Action", minWidth: 30 },
];

function createData(
  class_id,
  class_name,
  created_date,
  end_date,
  status,
  action
) {
  return {
    class_id,
    class_name,
    created_date,
    end_date,
    status,
    action,
  };
}

const MyClasses = ({ GetClassesData, classesData, pageDetails, isLoading }) => {
  const router = useRouter();
  const classes = useStyles();
  const [item, setItem] = useState([]);
  const [rows, setRows] = useState([]);
  const [view, setView] = useState(
    getItemSessionStorage("view") ? getItemSessionStorage("view") : TABLE_VIEW
  );
  const [paginationPayload, setPaginationPayload] = useState({
    page: PaginationValue?.page,
    size: PaginationValue?.size,
    field: "class_id",
    orderBy: PaginationValue?.orderBy,
  });

  useEffect(() => {
    GetClassesData(paginationPayload);
  }, [, paginationPayload]);

  const handleChangeView = (e, value) => {
    e.preventDefault();
    if (value !== null) {
      setView(value);
      setItemSessionStorage("view", value);
    }
  };

  useEffect(() => {
    let row = "";
    let arr = [];
    classesData?.map((item, index) => {
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      item["color"] = "#" + randomColor;
      item["validity"] = findByExpiryDate(item.end_date);
      row = renameKeys(item, {
        class_id: "id",
        class_name: "name",
        mail_id: "email",
        created_date: "expiry_date",
        end_date: "end_date",
        instructor_name: "instructorName",
        status: "status",
        color: "color",
        validity: "validity",
      });
      arr.push(row);
    });
    setItem([...arr]);
  }, [classesData]);

  useEffect(() => {
    let row = "";
    let arr = [];
    classesData?.map((classes) => {
      row = createData(
        classes.class_id,
        <EllipsisText
          component={[
            <WysiwygIcon
              className="folder-class-icon"
              fontSize="18px"
              htmlColor="#56B2EA"
            />,
          ]}
          queryData={{
            clasId: classes.class_id,
            clasName: classes.class_name,
          }}
          pathname="/extream/student/myassignments"
          isLink={true}
          value={classes.class_name}
        />,
        formatDate(classes.created_date),
        formatDate(classes.end_date),
        <StatusDot
          color={
            classes.status.toUpperCase() === "ACTIVE" ? "#38BE62" : "#E9596F"
          }
          title={classes.status}
        />,
        [
          {
            component: (
              <StyledButtonIcon variant="outlined" size="small">
                <ArrowForwardOutlinedIcon fontSize="small" />
              </StyledButtonIcon>
            ),
            type: "nextPath",
            title: "Next",
          },
        ],
        classes.description
      );
      row["isSelected"] = false;
      arr.push(row);
    });
    setRows([...arr]);
  }, [classesData]);

  const handleChange = (event, value) => {
    event.preventDefault();
    setPaginationPayload({ ...paginationPayload, page: value - 1 });
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

  const handleAction = (e, icon, rowData) => {
    if (icon === "nextPath") {
      router.push({
        pathname: "/extream/student/myassignments",
        query: {
          clasId: rowData.class_id,
          clasName: rowData.class_name?.props?.value,
        },
      });
    }
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

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item md={10} xs={10}>
            <BreadCrumb item={StudentBreadCrumb} />
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={1}>
        <Grid item md={6} xs={5}>
          <Heading
            title={`My Classes(${
              pageDetails?.totalElements !== undefined
                ? pageDetails?.totalElements
                : 0
            })`}
          />
        </Grid>
        <Grid item md={3.3} xs={3.6} className={classes.view}>
          <ToggleButtonGroup
            color="primary"
            size="small"
            value={view}
            exclusive
            onChange={handleChangeView}
          >
            <Tooltip title="Table view" arrow>
              <ToggleButton value={TABLE_VIEW} selected={view === TABLE_VIEW}>
                <ViewListRoundedIcon fontSize="small" />
              </ToggleButton>
            </Tooltip>
            <Tooltip title="Class view" arrow>
              <ToggleButton value={CLASS_VIEW} selected={view === CLASS_VIEW}>
                <WysiwygIcon fontSize="small" />
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>
        </Grid>
        <Grid item md={2.7} xs={3.4} style={{ textAlign: "right" }}>
          <TextField
            sx={{ width: "100%" }}
            placeholder="Search by Class ID"
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
      {view === CLASS_VIEW ? (
        <>
          {isLoading ? (
            <Grid container spacing={2}>
              <Grid item md={4} xs={12}>
                <CardInfoSkeleton />
              </Grid>
              <Grid item md={4} xs={12}>
                <CardInfoSkeleton />
              </Grid>
              <Grid item md={4} xs={12}>
                <CardInfoSkeleton />
              </Grid>
            </Grid>
          ) : (
            <>
              {classesData?.length > 0 ? (
                <>
                  <Grid container spacing={2}>
                    {item?.map((item, index) => (
                      <Grid key={index} item xl={3} md={4} sm={6} xs={12}>
                        <CardInfoView
                          key={index}
                          isNextPath={true}
                          isAction={false}
                          item={item}
                          isAvatar={true}
                          isHeading={true}
                          isInstructorName={true}
                          isTimer={true}
                          statusColor={expiryDateBgColor(item.validity)}
                          path={{
                            pathname: "/extream/student/myassignments",
                            query: { clasId: item.id, clasName: item.name },
                          }}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </>
              ) : (
                <CardView>
                  <ErrorBlock message={CLASS_NOT_FOUND} />
                </CardView>
              )}
            </>
          )}
        </>
      ) : (
        <CommonTable
          isCheckbox={false}
          isSorting={true}
          isFolder={true}
          tableHeader={columns}
          tableData={rows}
          handleAction={handleAction}
          handleTableSort={handleTableSort}
          isLoading={isLoading}
          path=""
        />
      )}

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
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  pageDetails: state?.studentClasses?.classesData?.page,
  classesData:
    state?.studentClasses?.classesData?._embedded?.studentClassesList,
  isLoading: state?.studentClasses?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    GetClassesData: (paginationPayload) =>
      dispatch(GetClassesData(paginationPayload)),
  };
};

MyClasses.layout = Student;

export default connect(mapStateToProps, mapDispatchToProps)(MyClasses);
