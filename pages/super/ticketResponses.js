import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { BreadCrumb, Heading, CardView } from "./../../components";
import InputTextField from "../../components/form/elements/InputTextField";
import { BASE_URL_SUPER } from "../../utils/BaseUrl";
import END_POINTS from "../../utils/EndPoints";
import {
  CreateTicketResponse,
  GetTicketData,
} from "../../redux/action/common/Support/TicketAction";
import { PaginationValue } from "../../utils/PaginationUrl";
import { Pagination, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import {
  AttachFile as AttachFileIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import BeatLoader from 'react-spinners/BeatLoader';
import styled from 'styled-components';
import TicketChat from "../../components/ticket/TicketChat";
import SuperAdmin from "../../layouts/SuperAdmin";

const InstructorBreadCrumb = [
  {
    name: "Dashboard",
    link: "/super/dashboard",
    active: false,
  },
  {
    name: "Tickets",
    link: "/super/createticket",
    active: false,
  },
  {
    name: "Ticket responses",
    link: "",
    active: true,
  },
];

const LoaderContainer = styled.div`
    position: relative;
    top:3px;
`;

const TicketResponses = ({ myTicketsData, GetTicketData, CreateTicketResponse, isLoading, isLoadingResponse }) => {
  const router = useRouter();
  const [paginationPayload, setPaginationPayload] = useState({
    ...PaginationValue,
  });
  const [newMessage, setNewMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileSelected, setFileSelected] = useState(false);
  const fileInputRef = useRef(null);
  const { handleSubmit, control, reset } = useForm({
    mode: "all",
  });

  useEffect(() => {
    if (router.isReady) {
      const url =
        BASE_URL_SUPER + END_POINTS.ADMIN_TICKET_DETAILS + "/" + router.query.ticketId + "/responses";
      GetTicketData(url, paginationPayload);
    }
  }, [router.isReady, paginationPayload]);

 

  const onSubmit = (data) => {
    if (router.isReady) {
      const url =
        BASE_URL_SUPER +
        END_POINTS.ADMIN_TICKET_DETAILS +
        "/" +
        router.query.ticketId +
        "/responses";

      let detailedData = {};

      if (selectedFile && selectedFile.size > 0) {
        detailedData = {
          ...data,
          file: selectedFile,
        };
      } else {
        detailedData = { ...data };
      }

      CreateTicketResponse(url, detailedData);
      setNewMessage("");
      setSelectedFile(null);
      setFileSelected(false);
      reset();
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setFileSelected(true);
  };

  const handleAttachmentClick = () => {
    fileInputRef.current.click();
  };

  const handleCancelFile = () => {
    setSelectedFile(null);
    setFileSelected(false);
  };

  const handleScroll = (event) => {
    const bottom =
      event.target.scrollHeight - event.target.scrollTop ===
      event.target.clientHeight;
    if (bottom && hasMore && !isLoading) {
      const nextPage = paginationPayload.page + 1;
      setPaginationPayload({ ...paginationPayload, page: nextPage });
    }
    };

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }} >
        <Grid container spacing={1}>
          <Grid item md={10} xs={10}>
            <BreadCrumb item={InstructorBreadCrumb} />
          </Grid>
        </Grid>
      </Box>
      <Grid container spacing={2}>
        <Grid item md={5} xs={5}>
          <Heading title={`Ticket responses`} />
        </Grid>
      </Grid>
      <CardView >
        <Box>
          <Grid container spacing={2}>
            {myTicketsData
              .slice()
              .reverse()
              .map((message, index) => (
                <TicketChat key={index} message={message} />
              ))}
          </Grid>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid
              container
              spacing={2}
              style={{ position: "relative", marginBottom: "20px" }}
            >
              <Grid item md={12} xs={12}>
                <Box sx={{ width: "100%" }}>
                {isLoadingResponse && (
                  <LoaderContainer>
                     <BeatLoader size={11} color="#007bff" />
                  </LoaderContainer>
                 )}
                  <InputTextField
                    control={control}
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    field={{
                      field_type: "text",
                      id: "Message",
                      name: "Message",
                      label: "Type your message here...",
                      required: "Enter your issue",
                      validationMsg: "Enter your issue",
                    }}
                  />
                </Box>
                <Box sx={{ position: "relative" }}>
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  {fileSelected && (
                    <Box
                      sx={{
                        backgroundColor: "rgba(0, 0, 0, 0.1)",
                        padding: "0px",
                        borderRadius: 3,
                        marginTop: 4,
                        position: "absolute",
                        left: 830,
                        top: "-32px",
                      }}
                    >
                      <Grid container spacing={1} alignItems="center">
                        <Grid
                          item
                          style={{ position: "relative", marginBottom: "-7px" }}
                        >
                          <AttachFileIcon fontSize="small" />
                        </Grid>
                        <Grid item xs>
                          {selectedFile && (
                            <div style={{ fontSize: "10px", fontWeight: 500 }}>
                              {selectedFile.name}
                            </div>
                          )}
                          {selectedFile && (
                            <div style={{ fontSize: "8px", fontWeight: 500 }}>
                              {(selectedFile.size / 1024).toFixed(2)} KB
                            </div>
                          )}
                        </Grid>
                        <Grid item>
                          <IconButton
                            color="primary"
                            onClick={handleCancelFile}
                            sx={{ padding: "8px" }}
                          >
                            <CancelIcon fontSize="small" />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Box>
                  )}
                  <Box sx={{ position: "absolute", bottom: "-40px", right: 30 }}>
                    <IconButton color="primary" onClick={handleAttachmentClick}>
                      <AttachFileIcon />
                    </IconButton>
                  </Box>
                  <Box sx={{ position: "absolute", bottom: "-40px", right: 0 }}>
                    <IconButton color="primary" type="submit">
                      <SendIcon />
                    </IconButton>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Box>
      </CardView>

      {isLoading && <Typography>Loading...</Typography>}
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  pageDetails: state?.ticket?.myTicketsData?.tickets?.page,
  myTicketsData: state?.ticket?.myTicketsData?.response?.content || [],
  isLoading: state?.ticket?.isLoading,
  isLoadingResponse: state?.ticket?.isLoadingResponse
});

const mapDispatchToProps = (dispatch) => {
  return {
    GetTicketData: (url, paginationPayload) =>
      dispatch(GetTicketData(url, paginationPayload)),
      CreateTicketResponse: (url, data) => dispatch(CreateTicketResponse(url, data)),
  };
};

TicketResponses.layout = SuperAdmin;

export default connect(mapStateToProps, mapDispatchToProps)(TicketResponses);
