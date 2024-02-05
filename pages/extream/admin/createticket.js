import React, { useEffect, useState, useMemo } from "react";
import Admin from "../../../layouts/Admin";
import { connect } from "react-redux";
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { TextField } from "@mui/material";
import debouce from 'lodash.debounce';
import {
  BreadCrumb,
  CreateDrawer,
  Heading,
  CommonTable,
} from "./../../../components";
import { GetTicketData } from "../../../redux/action/common/Support/TicketAction";
import {
  AddButtonBottom,
  StyledButtonIcon,
  StyledButtonRedIcon,
} from "../../../style";
import TicketForm from "./form/TicketForm";
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
      textAlign: 'right',
      marginBottom: '7px'
  }
}));

const columns = [
  { id: "ticketId", label: "Ticket Id" },
  { id: "createdDate", label: "Date" },
  { id: "status", label: "Status" },
  { id: "attachments", label: "Attachments" },
  { id: "action", label: "Actions" },
];

const CreateTicket = ({
  GetTicketData,
  isLoading
}) => {
  const classes = useStyles();
  const [search, setSearch] = useState(false);
  const [rows, setRows] = useState([
    {
      ticketId: "123",
      createdDate: "12/12/2023",
      status: "Active",
      attachments: "aaaaa",
      action: [
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
      ],
    },
  ]);

  const handleAction = (icon, rowData) => {
    if (icon === "edit") {
      setEditFolder(true);
      setEditFolderData(rowData);
    } else if (icon === "delete") {
      setShowDeleteWarning(true);
      setSelectedFolder(rowData);
    }
  };
  useEffect(() => {
    GetTicketData()
  },[]);

  const handleSearch = (event) => {
    if (event.target.value !== '') {
        setSearch(true)
    } else {
        setSearch(false)
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
          <Heading title={`Ticket List`} />
        </Grid>

      <Grid item md={ 7 } xs={ 7 } style={ { textAlign: 'right' } } className={ classes.view }>
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
        <CreateDrawer title="Rise Ticket" isShowAddIcon={true}>
          <TicketForm />
        </CreateDrawer>
      </AddButtonBottom>

      {/* Display the table with static data */}
      <CommonTable
        isCheckbox={false}
        isSorting={true}
        tableHeader={columns}
        tableData={rows}
        handleAction={handleAction}
        isLoading={isLoading}
      />
    </React.Fragment>
  );
};
const mapStateToProps = (state) => ({ state });

const mapDispatchToProps = (dispatch) => {
  return {
    GetTicketData: () => dispatch(GetTicketData()),
  };
};
CreateTicket.layout = Admin;

export default connect(mapStateToProps, mapDispatchToProps)(CreateTicket)
