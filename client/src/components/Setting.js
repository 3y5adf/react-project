// Setting.js
import React from 'react';
import { Drawer, List, ListItem, ListItemText, Typography, Toolbar, ListItemIcon, Box } from '@mui/material';
import { Home, Add, AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import ThemeToggleButton from './ThemeToggle';

export default function Setting() {
  return (
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {/* Theme Toggle */}
          <ListItem>
            <ListItemText primary="라이트/다크 모드" />
            <ThemeToggleButton />
          </ListItem>
          <hr></hr>
          <ListItem>
            비밀번호 수정
            
          </ListItem>
          <hr></hr>
          <ListItem>
            변경권 구매
            
          </ListItem>
        </List>
      </Box>
  );
}
