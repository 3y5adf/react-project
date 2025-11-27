import React, { useState } from "react";
import { Popover, List, ListItem, ListItemText, Divider } from "@mui/material";

export const notificationsData = [
  { id: 1, text: "Alice liked your tweet.", read: false },
  { id: 2, text: "Bob started following you.", read: true },
  { id: 3, text: "Charlie mentioned you in a reply.", read: false },
];

function Notice({ anchorEl, onClose }) {
  const open = Boolean(anchorEl);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
      PaperProps={{ sx: { width: 300, maxHeight: 400 } }}
    >
      <List>
        {notificationsData.map((notif, idx) => (
          <React.Fragment key={notif.id}>
            <ListItem
              sx={{
                bgcolor: notif.read ? "background.paper" : "rgba(29, 155, 240, 0.1)",
                cursor: "pointer",
              }}
            >
              <ListItemText
                primary={notif.text}
                primaryTypographyProps={{
                  fontWeight: notif.read ? "normal" : "bold",
                }}
              />
            </ListItem>
            {idx < notificationsData.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>
    </Popover>
  );
}

export default Notice;
