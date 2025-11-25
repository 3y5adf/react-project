import React, { useState } from "react";
import { Box, Typography, Paper, Tabs, Tab, Button, TextField } from "@mui/material";

export default function CenterContent() {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <Box sx={{ flex: 1, height: "100vh", p: 2 }}>
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
            {/* 전체 채팅방 리스트 여기에 */}
          </Box>
        )}

        {tabIndex === 1 && (
          <Box>
            <Typography variant="h6">참여중인 채팅방</Typography>
            {/* 참여중인 채팅방 리스트 여기에 */}
          </Box>
        )}

        {tabIndex === 2 && (
          <Box>
            <Typography variant="h6">채팅방 생성</Typography>
            <TextField label="채팅방 이름" fullWidth sx={{ mb: 2 }} />
            <Button variant="contained">채팅방 생성</Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
}
