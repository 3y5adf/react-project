import React, { useState } from "react";
import { Box, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, Badge } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Mail";
import ArticleIcon from "@mui/icons-material/Article";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";

import WritePostModal from "../components/WritePostModal";
import Notice, { notificationsData } from "../components/Notice";
import { useNavigate } from "react-router-dom";

export default function LeftSidebar() {
  const [openWrite, setOpenWrite] = useState(false);
  let navigate = useNavigate();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down(1000)); 

  const [anchorEl, setAnchorEl] = useState(null);
  const handleNoticeClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNoticeClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        ml: "15vw",
        width: isSmall ? 90 : 200, // 화면이 작으면 좁게
        p: 2,
        borderRight: "1px solid #ddd",
        height: "100vh",
        transition: "width 0.3s",
      }}
    >
      <WritePostModal open={openWrite} onClose={() => setOpenWrite(false)} />

      <List>
        <ListItemButton onClick={() => navigate("/main")}>
          <ListItemIcon><ChatBubbleIcon  /></ListItemIcon>
          {!isSmall && <ListItemText primary="채팅" />}
        </ListItemButton>

        {/* <ListItemButton onClick={() => navigate("/search")}>
          <ListItemIcon><SearchIcon /></ListItemIcon>
          {!isSmall && <ListItemText primary="검색" />}
        </ListItemButton> */}

        <ListItemButton onClick={() => navigate("/feed")}>
          <ListItemIcon><ArticleIcon /></ListItemIcon>
          {!isSmall && <ListItemText primary="게시판" />}
        </ListItemButton>

        {/* <List>
          <ListItemButton onClick={handleNoticeClick}>
            <ListItemIcon>
              <Badge
                badgeContent={notificationsData.filter(n => !n.read).length}
                color="error"
              >
                <NotificationsIcon />
              </Badge>
            </ListItemIcon>
            {!isSmall && <ListItemText primary="알림" />}
          </ListItemButton>

          <Notice anchorEl={anchorEl} onClose={handleNoticeClose} />
        </List> */}

        {/* <ListItemButton onClick={() => navigate("/message")}>
          <ListItemIcon><MailIcon /></ListItemIcon>
          {!isSmall && <ListItemText primary="쪽지" />}
        </ListItemButton> */}

        <ListItemButton onClick={() => navigate("/profile")}>
          <ListItemIcon><PersonIcon /></ListItemIcon>
          {!isSmall && <ListItemText primary="프로필" />}
        </ListItemButton>

        <ListItemButton onClick={() => setOpenWrite(true)}>
          <ListItemIcon><AddIcon /></ListItemIcon>
          {!isSmall && <ListItemText primary="글 작성" />}
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/setting")}>
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          {!isSmall && <ListItemText primary="설정" />}
        </ListItemButton>
      </List>
    </Box>
  );
}
