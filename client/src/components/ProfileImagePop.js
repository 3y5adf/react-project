import React, { useState } from 'react';
import { Button, Popover, Typography, Box } from '@mui/material';

function ProfileImageButton() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // 버튼 기준 위치
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <Box>
      <Button variant="contained" color="primary" onClick={handleClick}>
        프로필 이미지 선택
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box p={2}>
          <Typography>이미지 업로드 또는 선택</Typography>
          {/* 여기에 파일 업로드 input 또는 이미지 목록 추가 가능 */}
        </Box>
      </Popover>
    </Box>
  );
}

export default ProfileImageButton;
