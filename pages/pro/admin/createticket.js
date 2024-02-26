import React, { useEffect, useState, useMemo } from "react";
import Admin from "../../../layouts/Admin";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { TICKET_NOT_FOUND } from "../../../constant/data/ErrorMessage";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import { Pagination, TextField } from "@mui/material";
import debouce from "lodash.debounce";
import {
  BreadCrumb,
  CreateDrawer,
  Heading,
  CommonTable,
  CardView,
  ErrorBlock,
} from "./../../../components";
import { GetTicketData } from "../../../redux/action/common/Support/TicketAction";
import { PaginationValue } from "../../../utils/PaginationUrl";
import {
  AddButtonBottom,
  PaginationContainer,
  StyledButtonIcon,
} from "../../../style";
import { BASE_URL_SUPER } from "../../../utils/BaseUrl";
import END_POINTS from "../../../utils/EndPoints";
import TicketForm from "./form/TicketForm";
const InstructorBreadCrumb = [
  {
    name: "Dashboard",
    link: "/pro/admin/dashboard",
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
  { id: "ticketId", label: "Ticket Id", maxWidth:90 },
  { id: "subject", label: "Subject", maxWidth:150 },
  { id: "createdDate", label: "Created date",maxWidth:150 },
  { id: "description", label: "Description", maxWidth: 150 },
  { id: "priority", label: "Priority" , maxWidth:90},
  { id: "issueCategory", label: "Issue category", maxWidth: 150 },
  { id: "status", label: "Status", maxWidth:90 },
  { id: "action", label: "Actions", maxWidth:90 },
];

function createData(ticketId, subject, createdDate, description,  priority, issueCategory, status, action) {
  const parsedDate = new Date(createdDate);
  
  const day = parsedDate.getDate().toString().padStart(2, '0');
  const month = (parsedDate.getMonth() + 1).toString().padStart(2, '0');
  const year = parsedDate.getFullYear();
  const hours = parsedDate.getHours().toString().padStart(2, '0');
  const minutes = parsedDate.getMinutes().toString().padStart(2, '0');
  const seconds = parsedDate.getSeconds().toString().padStart(2, '0');

  const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  return {
    ticketId,
    subject,
    createdDate: formattedDate,
    description,
    priority,
    issueCategory,
    status,
    action,
  };
}

const CreateTicket = ({
  GetTicketData,
  isLoading,
  pageDetails,
  myTicketsData,
}) => {
  const router = useRouter();
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  const [search, setSearch] = useState(false);
  const [paginationPayload, setPaginationPayload] = useState({
    ...PaginationValue
  });

  useEffect(() => {
    const url = BASE_URL_SUPER + END_POINTS.USER_TICKET_DETAILS ;
   GetTicketData(url, paginationPayload);
 }, [GetTicketData, paginationPayload]);

  useEffect(() => {
    let row = "";
    let arr = [];
    myTicketsData?.map((ticket) => {
      row = createData(
        ticket.ticketId,
        ticket.subject,
        ticket.createdDate,
        ticket.description,
        ticket.priority,
        ticket.issueCategory,
        ticket.status,
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

  const handleAction = ( event, icon, rowData) => {
     if (icon === "nextPath") {
      router.push({
        pathname: "/pro/admin/ticketResponses",
        query: {
          ticketId: rowData.ticketId,
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
      <AddButtonBottom>
        <CreateDrawer title="Raise Ticket" isShowAddIcon={true}>
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
    GetTicketData: ( url, paginationPayload) =>
      dispatch(GetTicketData(url,  paginationPayload)),
  };
};
CreateTicket.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(CreateTicket);
