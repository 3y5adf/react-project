import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Tabs, Tab, Badge , TextField } from "@mui/material";
import ChatList from "./chat/ChatList";
import ChatCreate from "./chat/ChatCreate";
import { jwtDecode } from 'jwt-decode';

export default function CenterContent() {
  const [tabIndex, setTabIndex] = useState(0);
  // const [allRooms, setAllRooms] = useState([]);
  // const [joinedRooms, setJoinedRooms] = useState([]);
  // const [currentRoom, setCurrentRoom] = useState(null);
  let [loginUser, setLoginUser] = useState("");
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);

  let token = localStorage.getItem("token")

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setLoginUser(decoded.userId);
    }
  }, [token]);

  // ⭐ 읽지 않은 메시지가 있는지 확인
  useEffect(() => {
    if (!loginUser) return;

    const checkUnreadMessages = () => {
      fetch(`http://localhost:3020/chatroom/unread-count/${loginUser}`)
        .then(res => res.json())
        .then(data => {
          // 읽지 않은 메시지가 하나라도 있으면 true
          const hasUnread = data.list.some(item => item.UNREAD_COUNT > 0);
          setHasUnreadMessages(hasUnread);
        })
        .catch(err => console.error("읽지 않은 메시지 확인 오류:", err));
    };

    checkUnreadMessages();

    // 10초마다 갱신 (선택사항)
    const interval = setInterval(checkUnreadMessages, 10000);

    return () => clearInterval(interval);
  }, [loginUser]);

  return (
    <Box sx={{ flex: 1, height: "100vh"}}>
      {/* 탭 선택 */}
      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="전체 채팅방" />
        <Tab 
          label={
            <Badge 
              variant="dot" 
              color="error"
              invisible={!hasUnreadMessages}
              sx={{
                '& .MuiBadge-badge': {
                  right: -3,
                  top: 3,
                }
              }}
            >
              참여중인 채팅방
            </Badge>
          } 
        />
        <Tab label="채팅방 생성" />
      </Tabs>

      <Paper sx={{ mt: 2, p: 2, height: "calc(100% - 64px)" }}>
        {tabIndex === 0 && (
          <Box>
            <Typography variant="h6">전체 채팅방 목록</Typography>
            {/* <ChatList rooms={allRooms} setCurrentRoom={setCurrentRoom} /> */}
            <ChatList type="all"/>
          </Box>
        )}

        {tabIndex === 1 && (
          <Box>
            <Typography variant="h6">참여중인 채팅방</Typography>
            {/* <ChatList rooms={joinedRooms} setCurrentRoom={setCurrentRoom} /> */}
            <ChatList type="joined"/>
          </Box>
        )}

        {tabIndex === 2 && (
          <Box>
            <Typography variant="h6">채팅방 생성</Typography>
            {/* <TextField label="채팅방 이름" fullWidth sx={{ mb: 2 }} />
            <Button variant="contained">채팅방 생성</Button> */}
            <ChatCreate />
          </Box>
        )}
      </Paper>
    </Box>
  );
}
