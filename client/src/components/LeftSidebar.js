import React, { useState } from "react";
import { Box, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MailIcon from "@mui/icons-material/Mail";
import ArticleIcon from "@mui/icons-material/Article";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";

import WritePostModal from "../components/WritePostModal";
import { useNavigate } from "react-router-dom";

export default function LeftSidebar() {
  const [openWrite, setOpenWrite] = useState(false);
  let navigate = useNavigate();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down(1000)); // sm 이하이면 true

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
          <ListItemIcon><HomeIcon /></ListItemIcon>
          {!isSmall && <ListItemText primary="홈" />}
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/search")}>
          <ListItemIcon><SearchIcon /></ListItemIcon>
          {!isSmall && <ListItemText primary="검색" />}
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/feed")}>
          <ListItemIcon><ArticleIcon /></ListItemIcon>
          {!isSmall && <ListItemText primary="게시판" />}
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/notice")}>
          <ListItemIcon><NotificationsIcon /></ListItemIcon>
          {!isSmall && <ListItemText primary="알림" />}
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/message")}>
          <ListItemIcon><MailIcon /></ListItemIcon>
          {!isSmall && <ListItemText primary="쪽지" />}
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/profile")}>
          <ListItemIcon><PersonIcon /></ListItemIcon>
          {!isSmall && <ListItemText primary="프로필" />}
        </ListItemButton>

        <ListItemButton onClick={() => setOpenWrite(true)}>
          <ListItemIcon><AddIcon /></ListItemIcon>
          {!isSmall && <ListItemText primary="글 작성" />}
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/set")}>
          <ListItemIcon><SettingsIcon /></ListItemIcon>
          {!isSmall && <ListItemText primary="설정" />}
        </ListItemButton>
      </List>
    </Box>
  );
}
