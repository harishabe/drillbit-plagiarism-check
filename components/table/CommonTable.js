import * as React from "react";
import _ from "lodash";
import { makeStyles } from "@mui/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import styled from "styled-components";
import { StatusColor } from "../../style/index";
import { useRouter } from "next/router";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import { Card, CardContent, Skeleton } from "@mui/material";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import Table from "@mui/material/Table";
import Paper from "@mui/material/Paper";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableRow from "@mui/material/TableRow";
import Menu from "@mui/material/Menu";
import { IconButton, Tooltip } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import BeatLoader from "react-spinners/BeatLoader";
import { TableSkeleton, EllipsisText, ErrorBlock } from "../../components";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";
import { getItemSessionStorage } from "../../utils/RegExp";
import { Role } from "../../constant/data";
import {
  TABLE_HEADER_SORT_DISABLE,
  TABLE_BODY_ALLOW_ICON,
  NO_DATA_PLACEHOLDER,
  NOT_APPLICABLE,
} from "../../constant/data/Constant";

const SavedRepository = styled.div`
  color: #008000;
`;

const AlertMessage = styled.div`
  color: #ff0000;
`;

const useStyles = makeStyles(() => ({
  padding: {
    padding: "0 0 4px 4px",
  },
  customTableContainer: {
    overflowX: "initial",
    // height: 'calc(100vh - 209px)',
    // overflowY: 'scroll'
  },
  customArrowContainer: {
    marginTop: "14px",
  },
}));

const CommonTable = ({
  tableHeader,
  tableData,
  isCheckbox,
  handleAction,
  handleTableSort,
  handleCheckboxSelect,
  handleSingleSelect,
  isLoading,
  isSorting,
  downloadSubmissionFile,
  showAnalysisPage,
  showGrammarReport,
  isLoadingGrammarReport,
}) => {
  const router = useRouter();
  const classes = useStyles();
  const role = getItemSessionStorage("role");
  const [toggle, setToggle] = React.useState(false);
  const [sortArrow, setSortArrow] = React.useState("");
  const [allSelected, setAllSelected] = React.useState(false);
  const [grammarPaperId, setGrammarPaperId] = React.useState("");

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [menuData, setMenuData] = React.useState([]);
  const [rowData, setRowData] = React.useState({});
  const [menuAnchorEl, setMenuAnchorEl] = React.useState(null);

  const sortHandle = (e, column) => {
    let a = !toggle;
    setToggle(a);
    setSortArrow(column.id);
    handleTableSort(e, column, toggle);
  };

  const handleGrammarReport = (e, rowData) => {
    e.preventDefault();
    setGrammarPaperId(rowData?.paper_id);
    showGrammarReport(rowData?.grammar);
  };

  React.useEffect(() => {
    let selected = _.find(tableData, function (o) {
      return o.isSelected === true;
    });
    setAllSelected(selected?.isSelected ? true : false);
  }, [tableData]);

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("1243"));

  const handleActionMenu = (event, menuData, rowData) => {
    setIsMenuOpen(true);
    setMenuData(menuData);
    setRowData(rowData);
    setMenuAnchorEl(event.currentTarget);
  };

  return (
    <Card>
      <CardContent style={{ padding: "15px 0px" }}>
        <TableContainer
          component={Paper}
          classes={{ root: classes.customTableContainer }}
        >
          <Table stickyHeader size="small">
            <TableHead>
              <TableRow>
                {isCheckbox && (
                  <TableCell padding="checkbox" className={classes.padding}>
                    <Checkbox
                      checked={allSelected}
                      onChange={(e) => handleCheckboxSelect(e, allSelected)}
                    />
                  </TableCell>
                )}
                {tableHeader?.map((column, index) => (
                  <>
                    {isSorting && (
                      <TableCell
                        key={index}
                        align={column.align}
                        style={{
                          minWidth: column.minWidth,
                          maxWidth:
                            column.headerWidth !== undefined
                              ? column.headerWidth
                              : column.maxWidth,
                        }}
                      >
                        {TABLE_HEADER_SORT_DISABLE.includes(column.id) ? (
                          <EllipsisText
                            value={column.label}
                            variant="body2_2"
                          />
                        ) : (
                          <TableSortLabel
                            onClick={(e) => sortHandle(e, column)}
                            IconComponent={() => (
                              <div style={{ padding: "6px 0px 0px 5px" }}>
                                {toggle && sortArrow === column.id ? (
                                  <ArrowDownwardIcon
                                    style={{ fontSize: "1rem" }}
                                  />
                                ) : (
                                  <ArrowUpwardIcon
                                    style={{ fontSize: "1rem" }}
                                  />
                                )}
                              </div>
                            )}
                            style={{
                              minWidth: column.minWidth,
                              maxWidth: column.maxWidth,
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                            }}
                          >
                            <EllipsisText
                              value={column.label}
                              variant="body2_2"
                            />
                          </TableSortLabel>
                        )}
                      </TableCell>
                    )}
                  </>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {isLoading ? (
                <TableSkeleton
                  isCheckbox={isCheckbox}
                  tableDataCount={tableHeader?.length}
                />
              ) : (
                tableData?.map((row, index) => (
                  <TableRow hover key={index}>
                    {isCheckbox && (
                      <TableCell padding="checkbox" className={classes.padding}>
                        <Checkbox
                          disabled={
                            row.role === Role.admin ||
                            row.role === Role.proAdmin
                          }
                          onChange={(e) => handleSingleSelect(e, row)}
                          checked={row.isSelected}
                        />
                      </TableCell>
                    )}
                    {tableHeader.map((column, index) => {
                      const value = row[column.id];
                      console.log('valuevaluevaluevalue', value)
                      return (
                        <>
                          {TABLE_BODY_ALLOW_ICON.includes(column.id) ? (
                            <TableCell
                              style={{
                                minWidth: column.minWidth,
                                maxWidth: column.maxWidth,
                              }}
                            >
                              {isSmallScreen && value.length > 1 ? (
                                <>
                                  <Tooltip title="Actions" arrow>
                                    <IconButton
                                      onClick={(e) =>
                                        handleActionMenu(e, row[column.id], row)
                                      }
                                      size="small"
                                    >
                                      <MoreVertOutlinedIcon fontSize="small" />
                                    </IconButton>
                                  </Tooltip>
                                </>
                              ) : (
                                value.map((icon, index) => (
                                  <>
                                    {icon.type === "lock" ||
                                    icon.type === "unlock" ? (
                                      <Tooltip
                                        title={
                                          !icon.isDisabled ? icon.title : ""
                                        }
                                        arrow
                                      >
                                        <span
                                          style={{cursor:'pointer'}}
                                          role="button"
                                          disabled={icon.isDisabled}
                                          onClick={(e) =>
                                            handleAction(e, icon.type, row)
                                          }
                                        >
                                          {icon.component}
                                        </span>
                                      </Tooltip>
                                    ) : (
                                      <>
                                        <Tooltip title={icon.title} arrow>
                                          <span
                                            role="button"
                                            style={{ paddingLeft: "10px", cursor:'pointer' }}
                                            onClick={(e) =>
                                              handleAction(e, icon.type, row)
                                            }
                                          >
                                            {icon.component}
                                          </span>
                                        </Tooltip>
                                      </>
                                    )}
                                  </>
                                ))
                              )}
                            </TableCell>
                          ) : (
                            <>
                              {column.isDownload ? (
                                <TableCell
                                  align={column.align}
                                  style={{
                                    minWidth: column.minWidth,
                                    maxWidth: column.maxWidth,
                                  }}
                                >
                                  {typeof value === "string" ? (
                                    <div style={{ display: "flex" }}>
                                      <div style={{ width: "20%" }}>
                                        <Tooltip
                                          title="Download original file"
                                          arrow
                                        >
                                          <a
                                            href="#"
                                            style={{
                                              padding: "0px",
                                              color: "#8c8c8c",
                                            }}
                                            onClick={(e) =>
                                              downloadSubmissionFile(e, row)
                                            }
                                          >
                                            <FileDownloadOutlinedIcon fontSize="small" />
                                          </a>
                                        </Tooltip>
                                      </div>
                                      <div style={{ width: "80%" }}>
                                        <EllipsisText
                                          value={
                                            value !== null
                                              ? value
                                              : NO_DATA_PLACEHOLDER
                                          }
                                        />
                                      </div>
                                    </div>
                                  ) : (
                                    <Typography
                                      variant="body2_1"
                                      component="div"
                                    >
                                      {value !== null
                                        ? value
                                        : NO_DATA_PLACEHOLDER}
                                    </Typography>
                                  )}
                                </TableCell>
                              ) : (
                                <>
                                  {column.id === "percent" && (
                                    <TableCell
                                      align={column.align}
                                      style={{
                                        minWidth: column.minWidth,
                                        maxWidth: column.maxWidth,
                                      }}
                                    >
                                      <div style={{ display: "flex" }}>
                                        {role !== "student" ||
                                        (role === "student" &&
                                          router?.query?.repo?.toUpperCase() ===
                                            "YES") ? (
                                          <>
                                            <div
                                              style={
                                                row?.alert_msg !== null &&
                                                row?.alert_msg !== ""
                                                  ? {
                                                      width: "17%",
                                                      marginTop: "5px",
                                                    }
                                                  : { marginTop: "5px" }
                                              }
                                            >
                                              {row?.alert_msg != null &&
                                                row?.alert_msg !== "" && (
                                                  <Tooltip
                                                    title={row.alert_msg}
                                                    arrow
                                                  >
                                                    <AlertMessage>
                                                      <ReportProblemOutlinedIcon fontSize="small" />
                                                    </AlertMessage>
                                                  </Tooltip>
                                                )}
                                            </div>

                                            <div
                                              style={
                                                row?.alert_msg === null &&
                                                row?.alert_msg === "" &&
                                                row?.repository_status === "0"
                                                  ? { width: "66%" }
                                                  : { width: "100%" }
                                              }
                                            >
                                              {value?.props?.percent ===
                                              "--" ? (
                                                <StatusColor color="#E5E5E5">
                                                  <BeatLoader
                                                    size={10}
                                                    color="#3672FF"
                                                  />{" "}
                                                </StatusColor>
                                              ) : (
                                                <>
                                                  {value?.props?.percent ===
                                                  "NA" ? (
                                                    <StatusColor color="#E5E5E5">
                                                      {NOT_APPLICABLE}
                                                    </StatusColor>
                                                  ) : (
                                                    <Tooltip
                                                      title={
                                                        "Similarity Report"
                                                      }
                                                      arrow
                                                    >
                                                      <a
                                                        style={{
                                                          fontWeight: "600",
                                                        }}
                                                        href="#"
                                                        onClick={(e) =>
                                                          showAnalysisPage(
                                                            e,
                                                            row
                                                          )
                                                        }
                                                      >
                                                        {value}
                                                      </a>
                                                    </Tooltip>
                                                  )}
                                                </>
                                              )}
                                            </div>

                                            <div
                                              style={
                                                row?.repository_status === "1"
                                                  ? {
                                                      width: "17%",
                                                      marginTop: "5px",
                                                    }
                                                  : { marginTop: "5px" }
                                              }
                                            >
                                              {row?.repository_status ===
                                                "1" && (
                                                <Tooltip
                                                  title="Saved in repository"
                                                  arrow
                                                >
                                                  <SavedRepository>
                                                    <SaveOutlinedIcon fontSize="small" />
                                                  </SavedRepository>
                                                </Tooltip>
                                              )}
                                            </div>
                                          </>
                                        ) : (
                                          <Tooltip title="No access" arrow>
                                            <StatusColor color="#E5E5E5">
                                              Submitted
                                            </StatusColor>
                                          </Tooltip>
                                        )}
                                      </div>
                                    </TableCell>
                                  )}
                                  {column.id === "grammar_url" && (
                                    <TableCell
                                      align={column.align}
                                      style={{
                                        minWidth: column.minWidth,
                                        maxWidth: column.maxWidth,
                                      }}
                                    >
                                      {value === "--" && (
                                        <StatusColor color="#E5E5E5">
                                          <BeatLoader
                                            size={10}
                                            color="#3672FF"
                                          />
                                        </StatusColor>
                                      )}
                                      {value !== "--" &&
                                        value !== "NA" &&
                                        value !== null && (
                                          <>
                                            {isLoadingGrammarReport &&
                                            row.paper_id === grammarPaperId ? (
                                              <Skeleton />
                                            ) : (
                                              <StatusColor color="#E5E5E5">
                                                <Tooltip
                                                  title="Grammar Report"
                                                  arrow
                                                >
                                                  <div
                                                    style={{
                                                      cursor: "pointer",
                                                    }}
                                                    onClick={(e) =>
                                                      handleGrammarReport(
                                                        e,
                                                        row
                                                      )
                                                    }
                                                  >
                                                    <OpenInNewOutlinedIcon fontSize="small" />
                                                  </div>
                                                </Tooltip>
                                              </StatusColor>
                                            )}
                                          </>
                                        )}
                                      {(value === "NA" || value === null) && (
                                        <StatusColor color="#E5E5E5">
                                          {NOT_APPLICABLE}
                                        </StatusColor>
                                      )}
                                    </TableCell>
                                  )}
                                  {column.id !== "percent" &&
                                    column.id !== "grammar_url" && (
                                      <TableCell
                                        align={column.align}
                                        style={{
                                          minWidth: column.minWidth,
                                          maxWidth: column.maxWidth,
                                        }}
                                      >
                                        {typeof value === "string" ? (
                                          <EllipsisText
                                            value={
                                              value !== null
                                                ? value
                                                    ?.charAt(0)
                                                    .toUpperCase() +
                                                  value?.slice(1).toLowerCase()
                                                : NO_DATA_PLACEHOLDER
                                            }
                                            variant="body2_1"
                                          />
                                        ) : (
                                          <Typography
                                            variant="body2_1"
                                            component="div"
                                          >
                                            {value !== null
                                              ? value
                                              : NO_DATA_PLACEHOLDER}
                                          </Typography>
                                        )}
                                      </TableCell>
                                    )}
                                </>
                              )}
                            </>
                          )}
                        </>
                      );
                    })}
                  </TableRow>
                ))
              )}
            </TableBody>

            <Menu
              id="action-menu"
              anchorEl={menuAnchorEl}
              open={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&:before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{
                horizontal: "right",
                vertical: "top",
              }}
              anchorOrigin={{
                horizontal: "right",
                vertical: "bottom",
              }}
            >
              {menuData.map((icon, index) => (
                <span key={index}>
                  {icon.type === "lock" || icon.type === "unlock" ? (
                    <Tooltip title={!icon.isDisabled ? icon.title : ""} arrow>
                      <span
                        role="button"
                        disabled={icon.isDisabled}
                        onClick={(e) => {
                          handleAction(e, icon.type, rowData);
                          setIsMenuOpen(false);
                        }}
                      >
                        {icon.component}
                      </span>
                    </Tooltip>
                  ) : (
                    <>
                      <Tooltip title={icon.title} arrow>
                        <span
                          role="button"
                          style={{
                            paddingLeft: "10px",
                            paddingRight: "10px",
                          }}
                          onClick={(e) => {
                            handleAction(e, icon.type, rowData);
                            setIsMenuOpen(false);
                          }}
                        >
                          {icon.component}
                        </span>
                      </Tooltip>
                    </>
                  )}
                </span>
              ))}
            </Menu>
          </Table>
          <>
            {tableData?.length === 0 && !isLoading && (
              <ErrorBlock message="No data found" />
            )}
          </>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default CommonTable;
