import React, { useEffect, useState, useMemo } from "react";
import ProUser from "../../../layouts/ProUser";
import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { TICKET_NOT_FOUND } from "../../../constant/data/ErrorMessage";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { Pagination, TextField } from "@mui/material";
import debouce from "lodash.debounce";
import {
  BreadCrumb,
  CreateDrawer,
  Heading,
  CommonTable,
  WarningDialog,
  CardView,
  Instructions,
  ErrorBlock,
} from "./../../../components";
import { GetTicketData } from "../../../redux/action/common/Support/TicketAction";
import { PaginationValue } from "../../../utils/PaginationUrl";
import {
  AddButtonBottom,
  PaginationContainer,
  StyledButtonIcon,
  StyledButtonRedIcon,
} from "../../../style";
import TicketForm from "./form/TicketForm";
import { formatDate } from "../../../utils/RegExp";
import { DeleteWarningIcon } from "../../../assets/icon";
const InstructorBreadCrumb = [
  {
    name: "Dashboard",
    link: "/pro/user/dashboard",
    active: false,
  },
  {
    name: "CreateTicket",
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

const columns = [
  { id: "ticketId", label: "Ticket Id" },
  { id: "createdDate", label: "Date" },
  { id: "status", label: "Status" },
  { id: "attachments", label: "Attachments" },
  { id: "action", label: "Actions" },
];

function createData(ticketId, createdDate, status, attachments, action) {
  return {
    ticketId,
    createdDate,
    status,
    attachments,
    action,
  };
}

const CreateTicket = ({
  GetTicketData,
  isLoading,
  pageDetails,
  myTicketsData,
}) => {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [deleteRowData, setDeleteRowData] = useState("");
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);
  const [search, setSearch] = useState(false);
  const [paginationPayload, setPaginationPayload] = useState({
    ...PaginationValue
  });
  console.log('datatatat', paginationPayload)

  useEffect(() => {
    GetTicketData(
      paginationPayload
    );
  }, [, paginationPayload]);

  useEffect(() => {
    let row = "";
    let arr = [];
    myTicketsData?.map((ticket) => {
      row = createData(
        ticket.ticketId,
        ticket.createdDate,
        ticket.status,
        ticket.attachments,
        // ticket.action,
        // formatDate(ticket.createdDate),
        [
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
  }, [myTicketsData]);

  const handlePagination = (event, value) => {
    event.preventDefault();
    setPaginationPayload({ ...paginationPayload, 'page': value - 1 });
};

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

  const handleAction = (event, icon, rowData) => {
    if (icon === "delete") {
      setDeleteRowData(rowData?.paper_id);
      setShowDeleteWarning(true);
    }
  };

  const handleCloseWarning = () => {
    setShowDeleteWarning(false);
  };

  const handleYesWarning = () => {
    setTimeout(() => {
      setShowDeleteWarning(false);
    }, [100]);
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
            <BreadCrumb item={InstructorBreadCrumb} />
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={2}>
        <Grid item md={5} xs={5}>
          <Heading
            title={`Ticket List(${
              pageDetails?.totalElements !== undefined
                ? pageDetails?.totalElements
                : 0
            })`}
          />
        </Grid>

        <Grid item md={7} xs={7} className={classes.view}>
          <TextField
            sx={{ width: "42%" }}
            placeholder="Search by Ticket ID "
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
        <CreateDrawer title="Rise Ticket" isShowAddIcon={true}>
          <TicketForm />
        </CreateDrawer>
      </AddButtonBottom>
      {search ? (
        <CommonTable
          isCheckbox={false}
          isSorting={true}
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
              tableHeader={columns}
              tableData={rows}
              handleAction={handleAction}
              handleTableSort={handleTableSort}
              isLoading={isLoading}
              path=""
            />
          ) : (
            <CardView>
              <ErrorBlock message={TICKET_NOT_FOUND} />
            </CardView>
          )}
        </>
      )}

      <PaginationContainer>
        <Pagination
          count={pageDetails?.totalPages}
          page={pageDetails?.number + 1}
          onChange={handlePagination}
          color="primary"
          variant="outlined"
          shape="rounded"
        />
      </PaginationContainer>
    </React.Fragment>
  );
};
const mapStateToProps = (state) => ({
  pageDetails: state?.ticket?.myTicketsData?.tickets?.page,
  myTicketsData: state?.ticket?.myTicketsData?.tickets?.content,
  isLoading: state?.ticket?.isLoading,
});

const mapDispatchToProps = (dispatch) => {
  return {
    GetTicketData: ( paginationPayload) =>
      dispatch(GetTicketData( paginationPayload)),
  };
};
CreateTicket.layout = ProUser;

export default connect(mapStateToProps, mapDispatchToProps)(CreateTicket);
