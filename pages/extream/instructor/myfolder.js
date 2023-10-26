import React, { useEffect, useState, useMemo } from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import MuiToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import debouce from "lodash.debounce";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import styled from "styled-components";
import { makeStyles } from "@mui/styles";
import { TextField, Skeleton, Tooltip } from "@mui/material";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import FolderIcon from "@mui/icons-material/Folder";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Instructor from "../../../layouts/Instructor";
import { DeleteWarningIcon } from "../../../assets/icon";
import {
  BreadCrumb,
  Heading,
  Folder,
  CreateDrawer,
  WarningDialog,
  Instructions,
  ErrorBlock,
  CommonTable,
  EllipsisText,
  CardView,
} from "../../../components";
import {
  GetAllFolders,
  DeleteFolder,
} from "../../../redux/action/instructor/InstructorAction";
import { PaginationValue } from "../../../utils/PaginationUrl";
import {
  setItemSessionStorage,
  getItemSessionStorage,
  formatDate,
  removeItemSessionStorage,
} from "../../../utils/RegExp";
import MyFoldersForms from "./form/MyFolderForms";
import { INSTRUCTIONS_STEPS } from "../../../constant/data/InstructionMessage";
import { FOLDER_VIEW, TABLE_VIEW } from "../../../constant/data/Constant";
import {
  PaginationContainer,
  StyledButtonIcon,
  StyledButtonRedIcon,
  AddButtonBottom,
} from "../../../style/index";
import { BASE_URL_EXTREM } from "../../../utils/BaseUrl";
import END_POINTS from "../../../utils/EndPoints";

const InstructorBreadCrumb = [
  {
    name: "Dashboard",
    link: "/extream/instructor/dashboard",
    active: false,
  },
  {
    name: "My folders",
    link: "",
    active: true,
  },
];

const ToggleButton = styled(MuiToggleButton)({
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "#fff !important",
    backgroundColor: "#3672FF !important",
  },
});

const useStyles = makeStyles(() => ({
  view: {
    textAlign: "right",
    marginBottom: "7px",
  },
}));

const columns = [
  { id: "ass_id", label: "Folder ID", maxWidth: 90 },
  { id: "assignment_name", label: "Folder name", maxWidth: 260 },
  { id: "start_date", label: "Created date", maxWidth: 125 },
  { id: "folder_no_of_submissions", label: "Submissions", maxWidth: 115 },
  { id: "action", label: "Actions", maxWidth: 110 },
];

function createData(
  ass_id,
  assignment_name,
  start_date,
  folder_no_of_submissions,
  action,
  excludeReferences,
  excludeQuotes,
  excludeSmallSources,
  excludePhrases,
  db_studentpaper,
  db_publications,
  db_internet,
  institution_repository,
  grammarCheck,
  phrases
) {
  return {
    ass_id,
    assignment_name,
    start_date,
    folder_no_of_submissions,
    action,
    excludeReferences,
    excludeQuotes,
    excludeSmallSources,
    excludePhrases,
    db_studentpaper,
    db_publications,
    db_internet,
    institution_repository,
    grammarCheck,
    phrases,
  };
}

const MyFolder = ({
  GetAllFolders,
  DeleteFolder,
  myFolders,
  grammarSubscription,
  pageDetails,
  isLoading,
  isLoadingFolder,
  isLoadingEdit,
}) => {
  const router = useRouter();
  const classes = useStyles();
  const [view, setView] = useState(
    getItemSessionStorage("view") ? getItemSessionStorage("view") : TABLE_VIEW
  );
  const [rows, setRows] = useState([]);
  const [editFolder, setEditFolder] = useState(false);
  const [search, setSearch] = useState(false);
  const [editFolderData, setEditFolderData] = useState("");
  const [selectedFolder, setSelectedFolder] = useState("");
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [paginationPayload, setPaginationPayload] = useState({
    page: PaginationValue?.page,
    size: PaginationValue?.size,
    field: "ass_id",
    orderBy: PaginationValue?.orderBy,
  });

  useEffect(() => {
    GetAllFolders(
      BASE_URL_EXTREM + END_POINTS.INSTRUCTOR_MY_FOLDERS,
      paginationPayload
    );
    removeItemSessionStorage("tab");
  }, [, paginationPayload]);

  const handleChangeView = (e, value) => {
    e.preventDefault();
    if (value !== null) {
      setView(value);
      setItemSessionStorage("view", value);
    }
  };

  const handleChange = (event, value) => {
    event.preventDefault();
    setPaginationPayload({ ...paginationPayload, page: value - 1 });
  };

  const handleFolderEdit = (e, rowData) => {
    e.preventDefault();
    setEditFolder(true);
    setEditFolderData(rowData);
  };

  const handleFolderDelete = (e, data) => {
    e.preventDefault();
    setShowDeleteWarning(true);
    setSelectedFolder(data);
  };

  const handleYesWarning = () => {
    DeleteFolder(
      BASE_URL_EXTREM +
        END_POINTS.INSTRUCTOR_FOLDER_EDIT_AND_DELETE_DATA +
        "?id=" +
        (selectedFolder.folder_id || selectedFolder.ass_id)
    );
    setTimeout(() => {
      setShowDeleteWarning(false);
    }, [100]);
  };

  const handleCloseWarning = () => {
    setShowDeleteWarning(false);
  };

  /** search implementation using debounce concepts */

  const handleSearch = (event) => {
    if (event.target.value !== "") {
      paginationPayload["search"] = event.target.value;
      setSearch(true);
      setPaginationPayload({ ...paginationPayload, paginationPayload });
    } else {
      delete paginationPayload["search"];
      setSearch(false);
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

  /** Table implementation functions start*/

  useEffect(() => {
    let row = "";
    let arr = [];
    myFolders?.map((folder) => {
      row = createData(
        folder.folder_id,
        <EllipsisText
          component={[
            <FolderIcon className="folder-class-icon" htmlColor="#56B2EA" />,
          ]}
          value={folder.folder_name}
          queryData={{
            name: folder.folder_name,
            folderId: folder.folder_id,
            grammar:
              grammarSubscription?.toUpperCase() === "YES"
                ? folder.grammarCheck
                : grammarSubscription,
          }}
          pathname="/extream/instructor/folderSubmission"
          isLink={true}
        />,
        formatDate(folder.creation_date),
        folder.no_of_submissions,
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
        folder.excludeReferences,
        folder.excludeQuotes,
        folder.excludeSmallSources,
        folder.excludePhrases,
        folder.db_studentpaper,
        folder.db_publications,
        folder.db_internet,
        folder.institution_repository,
        folder.grammarCheck,
        folder.phrases
      );
      row["isSelected"] = false;
      arr.push(row);
    });
    setRows([...arr]);
  }, [myFolders]);

  const handleAction = (e, icon, rowData) => {
    if (icon === "edit") {
      setEditFolder(true);
      setEditFolderData(rowData);
    } else if (icon === "delete") {
      setShowDeleteWarning(true);
      setSelectedFolder(rowData);
    } else if (icon === "nextPath") {
      router.push({
        pathname: "/extream/instructor/folderSubmission",
        query: {
          name: rowData.assignment_name?.props?.value,
          folderId: rowData.ass_id,
          grammar:
            grammarSubscription?.toUpperCase() === "YES"
              ? rowData.grammarCheck
              : grammarSubscription,
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

  /** Table implementation functions end*/

  const handleDrawerClose = (drawerClose) => {
    setEditFolder(drawerClose);
  };

  const closeDrawerOnSuccess = (drawerClose) => {
    setEditFolder(drawerClose);
  };

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          <Grid item md={10} xs={10}>
            <BreadCrumb item={InstructorBreadCrumb} />
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={2}>
        <Grid item md={3} xs={3}>
          <Heading
            title={`My Folders(${
              pageDetails?.totalElements !== undefined
                ? pageDetails?.totalElements
                : 0
            })`}
          />
        </Grid>
        <Grid item md={5.9} xs={5.9} className={classes.view}>
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
            <Tooltip title="Folder view" arrow>
              <ToggleButton value={FOLDER_VIEW} selected={view === FOLDER_VIEW}>
                <FolderIcon fontSize="small" />
              </ToggleButton>
            </Tooltip>
          </ToggleButtonGroup>
        </Grid>
        <Grid item md={3.1} xs={3.1} style={{ textAlign: "right" }}>
          <TextField
            sx={{ width: "98%" }}
            placeholder="Search by Folder ID / Folder name"
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

      {view === FOLDER_VIEW ? (
        <>
          {isLoading ? (
            <Grid container spacing={2}>
              <Grid item md={3} xs={12}>
                {" "}
                <Skeleton variant="rectangular" height={150} />
              </Grid>
              <Grid item md={3} xs={12}>
                {" "}
                <Skeleton variant="rectangular" height={150} />
              </Grid>
              <Grid item md={3} xs={12}>
                {" "}
                <Skeleton variant="rectangular" height={150} />
              </Grid>
              <Grid item md={3} xs={12}>
                {" "}
                <Skeleton variant="rectangular" height={150} />
              </Grid>
            </Grid>
          ) : (
            <>
              {search ? (
                <>
                  {myFolders?.length > 0 ? (
                    <Grid container spacing={2} sx={{ overflowX: "hidden" }}>
                      {myFolders?.map((item, index) => (
                        <Grid key={index} item xl={2.4} md={3} sm={4} xs={6}>
                          <Folder
                            item={item}
                            isAction={true}
                            handleClick={handleFolderEdit}
                            handleDelete={handleFolderDelete}
                            path={{
                              pathname: "/extream/instructor/folderSubmission",
                              query: {
                                name: item.folder_name,
                                folderId: item.folder_id,
                                grammar:
                                  grammarSubscription?.toUpperCase() === "YES"
                                    ? item.grammarCheck
                                    : grammarSubscription,
                              },
                            }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <CardView>
                      <ErrorBlock message="No data found" />
                    </CardView>
                  )}
                </>
              ) : (
                <>
                  {myFolders?.length > 0 ? (
                    <Grid container spacing={2} sx={{ overflowX: "hidden" }}>
                      {myFolders?.map((item, index) => (
                        <Grid key={index} item xl={2.4} md={3} sm={4} xs={6}>
                          <Folder
                            item={item}
                            isAction={true}
                            handleClick={handleFolderEdit}
                            handleDelete={handleFolderDelete}
                            path={{
                              pathname: "/extream/instructor/folderSubmission",
                              query: {
                                name: item.folder_name,
                                folderId: item.folder_id,
                                grammar:
                                  grammarSubscription?.toUpperCase() === "YES"
                                    ? item.grammarCheck
                                    : grammarSubscription,
                              },
                            }}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <CardView>
                      <Instructions
                        message={Object.values(INSTRUCTIONS_STEPS.FOLDER)}
                      />
                    </CardView>
                  )}
                </>
              )}
            </>
          )}
        </>
      ) : (
        <>
          {search ? (
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
          ) : (
            <>
              {rows.length > 0 ? (
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
              ) : (
                <CardView>
                  <Instructions
                    message={Object.values(INSTRUCTIONS_STEPS.FOLDER)}
                  />
                </CardView>
              )}
            </>
          )}
        </>
      )}

      {showDeleteWarning && (
        <WarningDialog
          warningIcon={<DeleteWarningIcon />}
          message="Are you sure you want to delete ?"
          handleYes={handleYesWarning}
          handleNo={handleCloseWarning}
          isOpen={true}
        />
      )}

      <AddButtonBottom>
        <CreateDrawer title="Create Folder" isShowAddIcon={true}>
          <MyFoldersForms
            isLoadingFolder={isLoadingFolder}
            grammarSubscription={grammarSubscription}
          />
        </CreateDrawer>
      </AddButtonBottom>

      {editFolder && (
        <CreateDrawer
          title="Edit Folder"
          isShowAddIcon={false}
          showDrawer={editFolder}
          handleDrawerClose={handleDrawerClose}
          handleCloseDrawer={closeDrawerOnSuccess}
        >
          <MyFoldersForms
            editData={editFolderData}
            isLoadingEdit={isLoadingEdit}
            grammarSubscription={grammarSubscription}
          />
        </CreateDrawer>
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
  pageDetails: state?.instructorMyFolders?.myFolders?.folders?.page,
  myFolders: state?.instructorMyFolders?.myFolders?.folders?.content,
  grammarSubscription:
    state?.instructorMyFolders?.myFolders?.grammar_subscription,
  isLoading: state?.instructorMyFolders?.isLoading,
  isLoadingFolder: state?.instructorMyFolders?.isLoadingFolder,
  isLoadingEdit: state?.instructorMyFolders?.isLoadingEdit,
});

const mapDispatchToProps = (dispatch) => {
  return {
    GetAllFolders: (url, paginationPayload) =>
      dispatch(GetAllFolders(url, paginationPayload)),
    DeleteFolder: (url) => dispatch(DeleteFolder(url)),
  };
};

MyFolder.layout = Instructor;

export default connect(mapStateToProps, mapDispatchToProps)(MyFolder);
