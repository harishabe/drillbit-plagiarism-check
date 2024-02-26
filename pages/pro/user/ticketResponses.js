import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { connect } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { BreadCrumb, Heading, CardView, SubTitle2, EllipsisText } from "./../../../components";
import ProUser from "../../../layouts/ProUser";
import InputTextField from "../../../components/form/elements/InputTextField";
import { BASE_URL_SUPER } from "../../../utils/BaseUrl";
import END_POINTS from "../../../utils/EndPoints";
import {
  CreateTicketResponse,
  GetTicketData,
  GetTicketIdData
} from "../../../redux/action/common/Support/TicketAction";
import { makeStyles } from "@mui/styles";
import { PaginationValue } from "../../../utils/PaginationUrl";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import {
  AttachFile as AttachFileIcon,
  Cancel as CancelIcon,
} from "@mui/icons-material";
import BeatLoader from 'react-spinners/BeatLoader';
import styled from 'styled-components';
import TicketChat from "../../../components/ticket/TicketChat";
import { Tooltip } from "@mui/material";

const InstructorBreadCrumb = [
  {
    name: "Dashboard",
    link: "/pro/user/dashboard",
    active: false,
  },
  {
    name: "Tickets",
    link: "/pro/user/createticket",
    active: false,
  },
  {
    name: "Ticket details",
    link: "",
    active: true,
  },
];

const useStyles = makeStyles(() => ({
  customScrollbar: {
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0, 0, 0, 0.3)",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar": {
      width: "8px",
      marginRight: "12px",
    },
  },
}));

const LoaderContainer = styled.div`
    position: relative;
    top:3px;
`;

const TicketResponses = ({ myTicketsData, myTicketsIdData, GetTicketData, CreateTicketResponse, isLoadingResponse, GetTicketIdData }) => {
  const router = useRouter();
  const classes = useStyles();
  const [paginationPayload, setPaginationPayload] = useState({
    ...PaginationValue,
    'size': 5000,
  });
  const [newMessage, setNewMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null); 
  const [fileSelected, setFileSelected] = useState(false); 
  const fileInputRef = useRef(null);
  const chatBoxRef = useRef(null); 
  const { handleSubmit, control, reset } = useForm({
    mode: "all",
  });

  useEffect(() => {
    if (router.isReady) {
      const url = BASE_URL_SUPER + END_POINTS.USER_TICKET_DETAILS + "/" + router.query.ticketId +"/responses";
      GetTicketData(url, paginationPayload);
    }
  }, [router.isReady, paginationPayload]);

  useEffect(() => {
    if (router.isReady) {
      const url = BASE_URL_SUPER + END_POINTS.USER_TICKET_DETAILS + "/" + router.query.ticketId ;
      GetTicketIdData(url);
    }
  }, [router.isReady ]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [myTicketsData, isLoadingResponse]);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [router.asPath]);

  const onSubmit = async (data) => {
    if (router.isReady) {
      const url =
        BASE_URL_SUPER + END_POINTS.USER_TICKET_DETAILS + "/" + router.query.ticketId + "/responses";
  
        let detailedData = {};

        if (selectedFile && selectedFile.size > 0) {
          detailedData = {
            ...data,
            file: selectedFile, 
          };
        } else {
          detailedData = { ...data };
        }
    
        await CreateTicketResponse(url, detailedData);
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

  let prevMessageDate = null;

  const formatDate = (messageDate) => {
    const currentDate = new Date();
    const today = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const yesterday = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() - 1);
  
    if (messageDate.toDateString() === today.toDateString()) {
      return "Today";
    } else if (messageDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return messageDate.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  };

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item md={9} xs={9}>
           <BreadCrumb item={InstructorBreadCrumb} />
        </Grid>
      </Grid>
      </Box>
      <Grid container spacing={2} >
        <Grid item md={5} xs={5}>
        <Heading title={`${myTicketsIdData?.subject}`} />
        </Grid>
      </Grid>
      <Grid container spacing={2} >
        <Grid item md={10} xs={10}>
      <CardView>
        <Box>
          <Grid container spacing={2} className={classes.customScrollbar} style={{ height: "calc(100vh - 265px)", overflow: "auto" }} ref={chatBoxRef}>
          {myTicketsData
              ?.slice()
              ?.reverse()
              ?.map((message, index) => {

                const messageDate = new Date(message.createdDate);
                const isNewDay = !prevMessageDate || prevMessageDate.getDate() !== messageDate.getDate();
                prevMessageDate = messageDate;

                return (
                  <React.Fragment key={index}>
                    {isNewDay && (
                      <Grid item xs={12}>
                        <Box sx={{ textAlign: 'center', marginBottom: '10px' }}>
                        <Box sx={{ background: '#f0f0f0',fontSize:'11px',color:"#8c8c8c", padding: '4px', borderRadius: '6px', display: 'inline-block',  width: 'auto',  marginBottom: '10px' }}>
                        {formatDate(messageDate)}
                          </Box>
                        </Box>
                      </Grid>
                    )}
                    <TicketChat 
                      key={index} 
                      message={message} 
                      isShowRole={true}
                    />
                  </React.Fragment>
                );
              })}
          </Grid>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ position: 'fixed', bottom: 0, width: '100%', zIndex: 1000, backgroundColor: '#fff', padding: '4px' }} style={{ marginLeft: "-35px"}}>
              <Grid container spacing={2} alignItems="center" style={{ marginLeft: "14px"}}>
                <Grid item md={9} xs={9}>
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
                </Grid>
                <Grid item md={1} xs={1}>
                  <input
                    ref={fileInputRef}
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <IconButton color="primary" style={{ paddingTop: "22px" }} onClick={handleAttachmentClick}>
                    <AttachFileIcon />
                  </IconButton>
                  <IconButton color="primary" style={{ paddingTop: "22px" }} type="submit" disabled={isLoadingResponse}>
                    <SendIcon />
                  </IconButton>
                </Grid>
              </Grid>
              {fileSelected && (
                <Box
                  sx={{
                    backgroundColor: "rgba(0, 0, 0, 0.1)",
                    padding: '0px',
                    borderRadius: 3,
                    marginTop: 4,
                    position: "absolute",
                    left: 830,
                    top: "-32px",
                  }}
                >
                  <Grid container spacing={1} alignItems="center" style={{padding: "0px", marginTop: "-9px"}}>
                    <Grid item style={{ position: "relative", marginBottom: "-7px" }}>
                      <AttachFileIcon fontSize="small" />
                    </Grid>
                    <Grid item xs  >
                      {selectedFile && (
                        <div style={{ fontSize: "9px", fontWeight: 500 }}>{selectedFile.name}</div>
                      )}
                      {selectedFile && (
                        <div style={{ fontSize: "7px", fontWeight: 500 }}>{(selectedFile.size / 1024).toFixed(2)} KB</div>
                      )}
                    </Grid>
                    <Grid item>
                      <IconButton
                        color="primary"
                        onClick={handleCancelFile}
                        sx={{ padding: "6px" }}
                      >
                        <CancelIcon fontSize="small" />
                      </IconButton>
                    </Grid>
                  </Grid>
                </Box>
              )}
            </Box>
          </form>
        </Box>
      </CardView>
      </Grid>
      <Grid item md={2} xs={2}>
      <CardView>
  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    <Box>
      <div>
      Ticket Id: <EllipsisText variant="h5_1" value={myTicketsIdData?.ticketId} />
      </div>
    </Box>
    <Box>
      <div>
      Subject: <EllipsisText variant="h5_1" value={myTicketsIdData?.subject} />
      </div>
    </Box>
    <Box>
      <div>
      Created Date: <EllipsisText variant="h5_1" value={myTicketsIdData?.createdDate} />
      </div>
    </Box>
    <Box>
      <div>
      Ticket Category: <EllipsisText variant="h5_1" value={myTicketsIdData?.issueCategory} />
      </div>
    </Box>
    <Box>
      <div>
      Status: <EllipsisText variant="h5_1" value={myTicketsIdData?.status} />
      </div>
    </Box>
    <Box>
      <div>
      Priority: <EllipsisText variant="h5_1" value={myTicketsIdData?.priority} />
      </div>
    </Box>
  </Box>
    </CardView>
      </Grid>
        </Grid>
          </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  pageDetails: state?.ticket?.myTicketsData?.tickets?.page,
  myTicketsData: state?.ticket?.myTicketsData?.response?.content || [],
  myTicketsIdData: state?.ticket?.myTicketsIdData,
  isLoadingResponse: state?.ticket?.isLoadingResponse
});

const mapDispatchToProps = (dispatch) => {
  return {
    GetTicketData: (url, paginationPayload) => dispatch(GetTicketData(url, paginationPayload)),
    GetTicketIdData: (url) => dispatch(GetTicketIdData(url)),
    CreateTicketResponse: (url, data) => dispatch(CreateTicketResponse(url, data)),
  };
};

TicketResponses.layout = ProUser;

export default connect(mapStateToProps, mapDispatchToProps)(TicketResponses);
