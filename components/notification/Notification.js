import * as React from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { Menu, Tooltip, IconButton, Badge } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import { ListItemText } from "@mui/material";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import { Title } from "../../components";
import { getItemSessionStorage } from "../../utils/RegExp";

export default function Notification({ isEnableNotification, handleClose }) {
  const [anchorEl] = React.useState(null);
  const [stompClient, setStompClient] = React.useState(null);
  const [messages, setMessages] = React.useState([]);
  const open = Boolean(isEnableNotification);
  const notificationsmsg = React.useMemo(
    () => [
      "User account has been created",
      "Multi factor authentication for the user role of your account is activated",
      "Welcome to Drillbit",
      "Your account gets expired soon",
      "The password has been changed",
    ],
    []
  );

  React.useEffect(() => {
    connect();
    return () => disconnect(); // Cleanup on unmount
  }, []);

  function connect() {
    const socket = new SockJS(
      "https://uat.drillbitplagiarismcheck.com:8081/authentication/ws"
    );
    const client = Stomp.over(socket);
    client.connect({}, (frame) => {
      setStompClient(client);

      client.subscribe(
        `/user/${getItemSessionStorage("id")}/queue/notifications`,
        (message) => {
          showMessage(message.body);
        }
      );
    });
  }

  function disconnect() {
    if (stompClient) {
      stompClient.disconnect();
      console.log("Disconnected");
    }
  }

  function showMessage(message) {
    setMessages((prevMessages) => [...prevMessages, message]);
  }


  return (
    <>
      <React.Fragment>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 5,
              position: "absolute",
              top: "16px !important",
              left: "620px !important",
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 15,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "bottom" }}
          anchorOrigin={{ horizontal: "right", vertical: "top" }}
        >
          {messages.map((notification, index) => (
            <>
              <MenuItem key={index}>
                <ListItemText
                  primaryTypographyProps={{
                    style: {
                      fontSize: "12px",
                    },
                  }}
                  primary={notification}
                />
              </MenuItem>
              <Divider />
            </>
          ))}
          <div style={{ margin: "0px 10px", textAlign: "right" }}>
            <Title title="view all" />
          </div>
        </Menu>
      </React.Fragment>
    </>
  );
}
