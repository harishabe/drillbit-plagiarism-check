import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { ANNOUNCEMENT } from "../../constant/data/Constant";

const TicketChat = ({
   message,
  isShowRole,
 }) => {
  
  const createDate = new Date(message.createdDate);

  const formattedDate = createDate?.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const isSuperAdminPage = window.location.pathname.includes(
    "super/ticketResponses"
  );

  const isAdminRole = message.role === "admin";
  const isInstructorRole = message.role === "instructor";
  const isStudentRole = message.role === "student";
  const isLimInstructorRole = message.role === "lim-instructor";
  const isLimAdminRole = message.role === "lim-admin";
  const isDrillbitRole = message.role === "drillbit";

  return (
    <Grid item md={12} >
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            alignSelf:
              (isSuperAdminPage &&  (isLimAdminRole || isLimInstructorRole || isStudentRole || isInstructorRole || isAdminRole )) ||
              (!isSuperAdminPage && (isDrillbitRole))
                ? "flex-start"
                : "flex-end",
            marginBottom: "4px",
            width: "50%", 
            justifyContent:
              (isSuperAdminPage && (isLimAdminRole || isLimInstructorRole || isStudentRole || isInstructorRole || isAdminRole )) ||
              (!isSuperAdminPage && (isDrillbitRole))
                ? "flex-start" 
                : "flex-end",
          }}
        >
          
          <Box
            sx={{
              backgroundColor:
                (isSuperAdminPage && (isLimAdminRole || isLimInstructorRole || isStudentRole || isInstructorRole || isAdminRole )) ||
                (!isSuperAdminPage && (isDrillbitRole))
                  ? "#f0f0f0"
                  : "#007bff",
              color:
                (isSuperAdminPage && (isLimAdminRole || isLimInstructorRole || isStudentRole || isInstructorRole || isAdminRole )) ||
                (!isSuperAdminPage && (isDrillbitRole))
                  ? "#000"
                  : "#fff",
              borderRadius: "10px",
              padding: "8px",
              marginLeft:
                (isSuperAdminPage && (isLimAdminRole || isLimInstructorRole || isStudentRole || isInstructorRole || isAdminRole )) ||
                (!isSuperAdminPage && (isDrillbitRole))
                  ? "0"
                  : "auto",
              marginRight:
                (isSuperAdminPage && (isLimAdminRole || isLimInstructorRole || isStudentRole || isInstructorRole || isAdminRole )) ||
                (!isSuperAdminPage && (isDrillbitRole))
                  ? "auto" 
                  : "0", 
                  transition: "box-shadow 0.3s ease, background-color 0.3s ease",
                  "&:hover": {
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", 
                    backgroundColor: 
                      (isSuperAdminPage && (isLimAdminRole || isLimInstructorRole || isStudentRole || isInstructorRole || isAdminRole )) ||
                      (!isSuperAdminPage && (isDrillbitRole))
                        ? "#e0e0e0"
                        : "#165FD2",
                  },
            }}
          >
            {message.message}
            <Box
        sx={{
          color: 
            (isSuperAdminPage && (isLimAdminRole || isLimInstructorRole || isStudentRole || isInstructorRole || isAdminRole )) ||
            (!isSuperAdminPage && (isDrillbitRole))
              ? "#818589" 
              : "#cccccc", 
          fontSize: "8px", 
          marginLeft:
            (isSuperAdminPage && (isLimAdminRole || isLimInstructorRole || isStudentRole || isInstructorRole || isAdminRole )) ||
            (!isSuperAdminPage && (isDrillbitRole))
              ? "0"
              : "auto",
              
        }}>
        {formattedDate}
        </Box>
          </Box>
        </Box>
        <Box
          sx={{
            color: 
              (isSuperAdminPage && (isLimAdminRole || isLimInstructorRole || isStudentRole || isInstructorRole || isAdminRole )) ||
              (!isSuperAdminPage && (isDrillbitRole))
                ? "#818589" 
                : "#818589", 
            fontSize: "10px", 
            marginLeft:
              (isSuperAdminPage && (isLimAdminRole || isLimInstructorRole || isStudentRole || isInstructorRole || isAdminRole )) ||
              (!isSuperAdminPage && (isDrillbitRole))
                ? "0"
                : "auto",
                
          }}
        >
          {isShowRole &&  ANNOUNCEMENT[message.role] }
        </Box>
      </Box>
    </Grid>
  );
};

export default TicketChat;
