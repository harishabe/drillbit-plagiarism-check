import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";

const TicketChat = ({ message }) => {
  // Extracting the page context from the URL
  const isSuperAdminPage = window.location.pathname.includes(
    "super/ticketResponses"
  );

  return (
    <Grid item md={12}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {isSuperAdminPage && message.role === "lim-admin" && (
          <Avatar
            alt={message.role}
            sx={{
              width: 20,
              height: 20,
              background: "#007bff",
              color: "#fff",
              fontSize: 8,
              marginRight: "2px",
              marginTop: "-40px",
            }}
          >
            {/* {message.sender.charAt(0).toUpperCase()} */}
          </Avatar>
        )}

        {!isSuperAdminPage && message.role === "drillbit" && (
          <Avatar
            alt={message.role}
            sx={{
              width: 20,
              height: 20,
              background: "#007bff",
              color: "#fff",
              fontSize: 8,
              marginRight: "2px",
              marginTop: "-40px",
            }}
          >
            {/* {message.sender.charAt(0).toUpperCase()} */}
          </Avatar>
        )}
        <Box
          sx={{
            maxWidth: "50%", 
            backgroundColor:
              (isSuperAdminPage && message.role === "lim-admin") ||
              (!isSuperAdminPage && message.role === "drillbit")
                ? "#f0f0f0"
                : "#007bff",
            color:
              (isSuperAdminPage && message.role === "lim-admin") ||
              (!isSuperAdminPage && message.role === "drillbit")
                ? "#000"
                : "#fff",
            borderRadius: "10px",
            padding: "8px",
            marginBottom: "4px",
            alignSelf:
              (isSuperAdminPage && message.role === "lim-admin") ||
              (!isSuperAdminPage && message.role === "drillbit")
                ? "flex-start"
                : "flex-end",
            marginLeft:
              (isSuperAdminPage && message.role === "lim-admin") ||
              (!isSuperAdminPage && message.role === "drillbit")
                ? "0"
                : "auto",
          }}
        >
          {message.message}
        </Box>
      </Box>
    </Grid>
  );
};

export default TicketChat;
