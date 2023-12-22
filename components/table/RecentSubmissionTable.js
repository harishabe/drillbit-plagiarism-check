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
import { makeStyles } from "@mui/styles";

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

const useStyles = makeStyles(() => ({
  alertContainer: {
    width: "17%",
    marginTop: "5px",
  },
  regularContainer: {
    marginTop: "5px",
  },
  avatar: ({ color }) => ({
    width: 45,
    height: 45,
    backgroundColor: color,
    color: "#fff",
  }),
  avatarTable: {
    width: "45px",
    maxWidth: 70
  },
  tableCell: {
    maxWidth: 150,
  },
  reviewButton: {
    maxWidth: 150,
  },
  flex: {
    display: "flex"
  },
  maxwidth90 : {
    maxWidth: 90
  },
  maxwidth70 : {
    maxWidth: 70
  },
  maxwidth60 : {
    maxWidth: 60
  },
}));

const RecentSubmissionTable = ({ isUser, tableData, handlePage }) => {
  return (
    <>
      { isUser ? (
        <TableContainer>
          <Table className={ useStyles().table } aria-label="simple table">
            <TableBody>
              { tableData?.map((item, index) => {
                item["color"] = Colors[index];
                const classes = useStyles({ color: item.color });
                return (
                  <TableRow key={ index }>
                    <TableCell className={ classes.avatarTable }>
                      <Avatar
                        alt={ item.name }
                        className={ classes.avatar }
                      >
                        { item?.name?.charAt(0)?.toUpperCase() }
                      </Avatar>
                    </TableCell>
                    <TableCell align="left" className={ classes.tableCell }>
                      <EllipsisText
                        value={ item?.name !== null ? item?.name : "NA" }
                        variant="h4"
                      />
                      <EllipsisText
                        value={ item?.title !== null ? item?.title : "NA" }
                        variant={ "h4_1" }
                      />
                    </TableCell>
                    <TableCell className={ classes.tableCell }>
                      <Title1 title={ item.paper_id } />
                    </TableCell>
                    <TableCell className={ classes.tableCell }>
                      <EllipsisText
                        value={ formatDate(item.date_up) }
                        variant="h4_1"
                      />
                    </TableCell>
                    <TableCell className={ classes.tableCell }>
                      <div className={ classes.flex }>
                        <div
                          className={
                            item?.alert_msg !== null && item?.alert_msg !== ""
                              ? classes.alertContainer
                              : classes.regularContainer
                          }
                        >
                          { item?.alert_msg != null && item?.alert_msg !== "" && (
                            <Tooltip title={ item.alert_msg } arrow>
                              <AlertMessage>
                                <ReportProblemOutlinedIcon fontSize="small" />
                              </AlertMessage>
                            </Tooltip>
                          ) }
                        </div>
                        <SimilarityStatus
                          percent={ item.percent }
                          flag={ item.flag }
                        />
                      </div>
                    </TableCell>
                    <TableCell className={ classes.tableCell }>
                      <StatusDotContainer>
                        <StatusDot color="#69C886" title={ item.status } />
                      </StatusDotContainer>
                    </TableCell>
                    <TableCell
                      align="right"
                      className={ classes.reviewButton }
                    >
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
                );
              }) }
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <TableContainer>
          <Table className={ useStyles().table } aria-label="simple table">
            <TableBody>
              { tableData?.map((item, index) => {
                item["color"] = Colors[index];
                const classes = useStyles({ color: item.color });
                return (
                  <TableRow key={ index }>
                    <TableCell className={ classes.avatarTable }>
                      <Avatar
                        alt={ item.name }
                        className={ classes.avatar }
                      >
                        { item.name.charAt(0).toUpperCase() }
                      </Avatar>
                    </TableCell>
                    <TableCell align="left" className={ classes.maxwidth90 }>
                      <EllipsisText value={ item.name } variant="h4" />
                      <EllipsisText value={ item.class_name } variant="h4_1" />
                    </TableCell>
                    <TableCell className={ classes.maxwidth70 }>
                      <div className={ classes.flex }>
                        <div
                          className={
                            item?.alert_msg !== null && item?.alert_msg !== ''
                              ? classes.alertContainer
                              : classes.regularContainer
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
                    <TableCell className={ classes.maxwidth70 }>
                      <StatusDot color="#69C886" title={ item.status } />
                    </TableCell>
                    <TableCell align="right" className={ classes.maxwidth60 }>
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
              }
              ) }
            </TableBody>
          </Table>
        </TableContainer>
      ) }
    </>
  );
};

export default RecentSubmissionTable;
