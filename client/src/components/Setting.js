// Setting.js
import React from 'react';
import { Drawer, List, ListItem, ListItemText, Typography, Toolbar, ListItemIcon, Box, ListItemButton } from '@mui/material';
import { Home, Add, AccountCircle } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import ThemeToggleButton from './ThemeToggle';

export default function Setting() {
  let navigate = useNavigate();

  return (
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {/* Theme Toggle */}
          <ListItem>
            <ListItemText primary="라이트/다크 모드" />
            <ThemeToggleButton />
          </ListItem>
          <hr></hr>
          <ListItemButton>
            비밀번호 수정
          </ListItemButton>
          <hr></hr>
          <ListItemButton>
            변경권 구매
          </ListItemButton>
          <hr></hr>
          <ListItemButton
            onClick={()=>{
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            로그아웃
          </ListItemButton>
          <hr></hr>
          <ListItemButton>
            회원탈퇴
          </ListItemButton>
        </List>
      </Box>
  );
}
