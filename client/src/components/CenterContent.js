import React, { useState, useEffect } from "react";
import { Box, Typography, Paper, Tabs, Tab, Button, TextField } from "@mui/material";
import ChatList from "./chat/ChatList";
import ChatCreate from "./chat/ChatCreate";
import { jwtDecode } from 'jwt-decode';

export default function CenterContent() {
  const [tabIndex, setTabIndex] = useState(0);
  // const [allRooms, setAllRooms] = useState([]);
  // const [joinedRooms, setJoinedRooms] = useState([]);
  // const [currentRoom, setCurrentRoom] = useState(null);
  // let [loginUser, setLoginUser] = useState("");

  // let token = localStorage.getItem("token")

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  // // 전체 채팅방 불러오기
  // useEffect(() => {
  //   if(token){
  //     const decoded = jwtDecode(token);
  //     setLoginUser(decoded.userId);
  //   }

  //   fetch('http://localhost:3020/chatrooms')
  //     .then(res => res.json())
  //     .then(data => setAllRooms(data))
  //     .catch(err => console.error(err));
  // }, []);

  // // 채팅방 생성
  // const handleCreateRoom = (name) => {
  //   let param = {
  //     title : name,
  //     userId : loginUser
  //   };
  //   fetch('http://localhost:3020/chatrooms', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ param })
  //   })
  //     .then(res => res.json())
  //     .then(newRoom => setAllRooms(prev => [...prev, newRoom]))
  //     .catch(err => console.error(err));
  // };


  return (
    <Box sx={{ flex: 1, height: "100vh"}}>
      {/* 탭 선택 */}
      <Tabs value={tabIndex} onChange={handleTabChange}>
        <Tab label="전체 채팅방" />
        <Tab label="참여중인 채팅방" />
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
