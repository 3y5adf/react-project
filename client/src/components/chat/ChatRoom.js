import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Box, Typography, Paper, TextField, Button, Stack, 
  IconButton, Drawer, List, ListItem, ListItemText, 
  Divider, Avatar
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { jwtDecode } from 'jwt-decode';
import io from 'socket.io-client';

const ChatRoom = () => {
  let { chatNo } = useParams();
  let navigate = useNavigate();
  let [messages, setMessages] = useState([]);
  let [newMessage, setNewMessage] = useState("");
  let [chatTitle, setChatTitle] = useState("");
  let [loginUser, setLoginUser] = useState("");
  let [members, setMembers] = useState([]);
  let [drawerOpen, setDrawerOpen] = useState(false);
  let token = localStorage.getItem("token");

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    getTitle();
    getMessage();
    getMembers();
    
    let userId = "";
    if (token) {
      const decoded = jwtDecode(token);
      userId = decoded.userId;
      setLoginUser(decoded.userId);
    }

    socketRef.current = io("http://localhost:3020");
    socketRef.current.emit("joinRoom", { chatNo, userId });

    socketRef.current.on("receiveMessage", (message) => {
      console.log("새 메시지 수신:", message);
      setMessages(prev => [...prev, { ...message, type: "message" }]);
    });

    socketRef.current.on("userJoined", (data) => {
      console.log("입장 알림:", data);
      setMessages(prev => [...prev, { ...data, type: "join" }]);
      getMembers(); // 멤버 목록 갱신
    });

    socketRef.current.on("userLeft", (data) => {
      console.log("퇴장 알림:", data);
      setMessages(prev => [...prev, { ...data, type: "leave" }]);
      getMembers(); // 멤버 목록 갱신
    });

    socketRef.current.on("userKicked", (data) => {
      console.log("강퇴 알림:", data);
      setMessages(prev => [...prev, { ...data, type: "kicked" }]);
      getMembers(); // 멤버 목록 갱신
    });

    return () => {
      socketRef.current.emit("leaveRoom", { chatNo, userId });
      socketRef.current.disconnect();
    };
  }, [chatNo]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 채팅방 이름 가져오기
  function getTitle() {
    if (chatNo) {
      fetch("http://localhost:3020/chatroom/getTitle/" + chatNo)
        .then(res => res.json())
        .then(data => {
          setChatTitle(data.info.TITLE);
        });
    }
  }

  // 메시지 목록 가져오기
  function getMessage() {
    if (chatNo && token) {
      fetch("http://localhost:3020/chatroom/message/get/" + chatNo)
        .then(res => res.json())
        .then(data => {
          const messagesWithType = data.list.map(msg => ({ ...msg, type: "message" }));
          setMessages(messagesWithType);
        });
    }
  }

  // 참여자 목록 가져오기
  function getMembers() {
    if (chatNo) {
      fetch("http://localhost:3020/chatroom/members/" + chatNo)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setMembers(data.list || []);
        })
        .catch(err => console.error("멤버 조회 오류:", err));
    }
  }

  // 메시지 보내기
  function sendMessage() {
    if (!newMessage.trim()) return;

    const messageData = {
      chatNo: chatNo,
      userId: loginUser,
      contents: newMessage
    };

    socketRef.current.emit("sendMessage", messageData);
    setNewMessage("");
  }

  // Enter 키 처리
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // 채팅방 나가기
  function handleLeave() {
    if (!window.confirm("정말 채팅방을 나가시겠습니까?")) return;

    const data = {
      chatNo: chatNo,
      user: loginUser
    };

    fetch("http://localhost:3020/chatroom/leave", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(result => {
      socketRef.current.emit("leaveRoom", { chatNo, userId: loginUser });
      //만약 joined 상태인 유저가 없으면 해당 대화방 삭제 처리 추가하기
      //navigate는 대화방 삭제처리 function에서 처리하기
      checkMember();
      
      // navigate("/main");
    })
    .catch(err => console.error("퇴장 오류:", err));
  }

  function checkMember() {
    fetch("http://localhost:3020/chatroom/checkmember/"+chatNo)
      .then(res=>res.json())
      .then(data=>{
        console.log(data);
        
      })
  }

  return (
    <Box sx={{ p: 2, height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* 헤더 */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5">
          {chatTitle} #{chatNo}
        </Typography>
        <IconButton onClick={() => setDrawerOpen(true)}>
          <MenuIcon fontSize="large" />
        </IconButton>
      </Box>

      {/* 메시지 영역 */}
      <Paper sx={{ flex: 1, p: 2, mb: 2, overflowY: "auto" }}>
        <Stack spacing={1}>
          {messages.map((msg, index) => {
            if (msg.type === "join" || msg.type === "leave" || msg.type === "kicked") {
              let bgColor = "#e3f2fd";
              let textColor = "#1976d2";
              
              if (msg.type === "leave") {
                bgColor = "#fce4ec";
                textColor = "#c2185b";
              } else if (msg.type === "kicked") {
                bgColor = "#ffebee";
                textColor = "#d32f2f";
              }

              return (
                <Box key={index} sx={{ display: "flex", justifyContent: "center", my: 1 }}>
                  <Box
                    sx={{
                      bgcolor: bgColor,
                      color: textColor,
                      px: 2,
                      py: 0.5,
                      borderRadius: 2,
                      fontSize: "0.875rem",
                      fontWeight: 500
                    }}
                  >
                    {msg.message}
                  </Box>
                </Box>
              );
            }

            const isMine = msg.USERID === loginUser;

            return (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: isMine ? "flex-end" : "flex-start",
                }}
              >
                {!isMine && (
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: "bold",
                      mb: 0.5,
                      color: "#1976d2",
                    }}
                  >
                    {msg.USERID}
                  </Typography>
                )}

                <Box
                  sx={{
                    p: 1.5,
                    bgcolor: isMine ? "#f1f1f1" : "#2986ff",
                    color: isMine ? "black" : "white",
                    borderRadius: 2,
                    maxWidth: "70%",
                  }}
                >
                  <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
                    {msg.CONTENTS}
                  </Typography>
                </Box>
              </Box>
            );
          })}
          <div ref={messagesEndRef} />
        </Stack>
      </Paper>

      {/* 입력창 */}
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="메시지를 입력하세요"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button variant="contained" onClick={sendMessage}>
          전송
        </Button>
      </Box>

      {/* 우측 사이드바 (Drawer) */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 300, height: "100%", display: "flex", flexDirection: "column" }}>
          {/* 헤더 */}
          <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">참여자 목록</Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider />

          {/* 참여자 목록 */}
          <Box sx={{ flex: 1, overflowY: "auto" }}>
            <List>
              {members.map((member, index) => (
                <ListItem key={index}>
                  <Avatar sx={{ mr: 2, bgcolor: "#1976d2" }}>
                    {member.USERID?.charAt(0).toUpperCase()}
                  </Avatar>
                  <ListItemText 
                    primary={member.USERID}
                    secondary={member.ROLE === "OWNER" ? "👑방장" : "멤버"}
                  />
                </ListItem>
              ))}
            </List>
          </Box>

          <Divider />

          {/* 나가기 버튼 */}
          <Box sx={{ p: 2 }}>
            <Button
              fullWidth
              variant="contained"
              color="error"
              startIcon={<ExitToAppIcon />}
              onClick={handleLeave}
            >
              채팅방 나가기
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default ChatRoom;