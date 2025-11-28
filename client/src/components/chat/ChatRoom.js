import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Paper, TextField, Button, Stack } from "@mui/material";
import { jwtDecode } from 'jwt-decode';

const ChatRoom = () => {
  const { chatNo } = useParams(); // URL에서 채팅방 번호 가져오기
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // 채팅방 메시지 가져오기
  useEffect(() => {
    fetch(`http://localhost:3020/chatroom/messages/${chatNo}`)
      .then(res => res.json())
      .then(data => {
        setMessages(data.list || []);
      })
      .catch(err => console.error(err));
  }, [chatNo]);

  // 메시지 전송
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const token = localStorage.getItem("token");
    let userId = "";
    if (token) {
      const decoded = jwtDecode(token);
      userId = decoded.userId;
    }

    const param = {
      chatNo,
      user: userId,
      message: newMessage,
    };

    fetch("http://localhost:3020/chatroom/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(param),
    })
      .then(res => res.json())
      .then(data => {
        setMessages(prev => [...prev, { USERID: userId, MESSAGE: newMessage }]);
        setNewMessage("");
      })
      .catch(err => console.error(err));
  };

  return (
    <Box sx={{ p: 2, height: "100vh", display: "flex", flexDirection: "column" }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        채팅방 #{chatNo}
      </Typography>

      {/* 메시지 영역 */}
      <Paper sx={{ flex: 1, p: 2, mb: 2, overflowY: "auto" }}>
        <Stack spacing={1}>
          {messages.map((msg, index) => (
            <Box
              key={index}
              sx={{
                p: 1,
                bgcolor: "#f1f1f1",
                borderRadius: 2,
                maxWidth: "70%",
                alignSelf: msg.USERID === localStorage.getItem("userId") ? "flex-end" : "flex-start",
              }}
            >
              <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                {msg.USERID}
              </Typography>
              <Typography variant="body1">{msg.MESSAGE}</Typography>
            </Box>
          ))}
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
          onKeyPress={e => e.key === "Enter" && handleSendMessage()}
        />
        <Button variant="contained" onClick={handleSendMessage}>
          전송
        </Button>
      </Box>
    </Box>
  );
};

export default ChatRoom;
