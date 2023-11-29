import * as React from "react";
import styled from "styled-components";
import Avatar from "@mui/material/Avatar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import { Title1, SimilarityStatus, EllipsisText } from "../index";
import { StatusDot } from "../../components";
import { formatDate } from "../../utils/RegExp";

const Colors = [
  "#7B68C8",
  "#68C886",
  "#34C2FF",
  "#3491FF",
  "#8D34FF",
  "#7B68C8",
];

const AlertMessage = styled.div`
  color: #ff0000;
  cursor:pointer;
`;

const StatusDotContainer = styled.div`
  margin-top: 15px;
`;

const RecentSubmissionTable = ({ isUser, tableData, handlePage }) => {
  return (
    <>
      { isUser ? (
        <TableContainer>
          <Table sx={ { minWidth: 350 } } aria-label="simple table">
            <TableBody>
              { tableData?.map(
                (item, index) => (
                  (item["color"] = Colors[index]),
                  (
                    <TableRow key={ index }>
                      <TableCell style={ { width: "45px", maxWidth: 150 } }>
                        <Avatar
                          alt={ item.name }
                          sx={ {
                            width: 45,
                            height: 45,
                            background: item.color,
                            color: "#fff",
                          } }
                        >
                          { item?.name?.charAt(0)?.toUpperCase() }
                        </Avatar>
                      </TableCell>
                      <TableCell align="left" style={ { maxWidth: 150 } }>
                        <EllipsisText
                          value={ item?.name !== null ? item?.name : "NA" }
                          variant="h4"
                        />
                        <EllipsisText
                          value={ item?.title !== null ? item?.title : "NA" }
                          variant={ "h4_1" }
                        />
                      </TableCell>

                      <TableCell style={ { maxWidth: 150 } }>
                        <Title1 title={ item.paper_id } />
                      </TableCell>
                      <TableCell style={ { maxWidth: 150 } }>
                        <EllipsisText
                          value={ formatDate(item.date_up) }
                          variant="h4_1"
                        />
                      </TableCell>
                      <TableCell style={ { maxWidth: 150 } }>
                        <SimilarityStatus
                          percent={ item.percent }
                          flag={ item.flag }
                        />
                      </TableCell>
                      <TableCell style={ { maxWidth: 150 } }>
                        <StatusDotContainer>
                          <StatusDot color="#69C886" title={ item.status } />
                        </StatusDotContainer>
                      </TableCell>
                      <TableCell align="right" style={ { maxWidth: 150 } }>
                        <Button
                          variant="contained"
                          color="primary"
                          size="small"
                          onClick={ (e) => handlePage(e, item) }
                        >
                          Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                )
              ) }
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <TableContainer>
          <Table sx={ { minWidth: 350 } } aria-label="simple table">
            <TableBody>
              { tableData?.map(
                (item, index) => (
                  (item["color"] = Colors[index]),
                  (
                    <TableRow key={ index }>
                      <TableCell style={ { width: "45px", maxWidth: 60 } }>
                        <Avatar
                          alt={ item.name }
                          sx={ {
                            width: 45,
                            height: 45,
                            background: item.color,
                            color: "#fff",
                          } }
                        >
                          { item.name.charAt(0).toUpperCase() }
                        </Avatar>
                      </TableCell>
                      <TableCell align="left" style={ { maxWidth: 90 } }>
                        <EllipsisText value={ item.name } variant="h4" />
                        <EllipsisText value={ item.class_name } variant="h4_1" />
                      </TableCell>
                      <TableCell style={ { maxWidth: 70 } }>
                        <div style={ { display: "flex" } }>
                          <div
                            style={
                              item?.alert_msg !== null &&
                                item?.alert_msg !== ""
                                ? {
                                  width: "17%",
                                  marginTop: "5px",
                                }
                                : { marginTop: "5px" }
                            }
                          >
                            { item?.alert_msg != null &&
                              item?.alert_msg !== "" && (
                                <Tooltip
                                  title={ item.alert_msg }
                                  arrow
                                >
                                  <AlertMessage>
                                    <ReportProblemOutlinedIcon fontSize="small" />
                                  </AlertMessage>
                                </Tooltip>
                              ) }
                          </div>
                          <SimilarityStatus percent={ item.percent } flag={ item.flag } />
                        </div>
                      </TableCell>
                      <TableCell style={ { maxWidth: 70 } }>
                        <StatusDot color="#69C886" title={ item.status } />
                      </TableCell>
                      <TableCell align="right" style={ { maxWidth: 60 } }>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={ (e) => handlePage(e, item) }
                        >
                          Review
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                )
              ) }
            </TableBody>
          </Table>
        </TableContainer>
      ) }
    </>
  );
};

export default RecentSubmissionTable;
