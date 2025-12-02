// MemberListItem.js
import React, { useState } from "react";
import { ListItem, Box, Popover, Button, Avatar, ListItemText } from "@mui/material";

const MemberListItem = ({ member, loginUserRole, onKick, children }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);

  return (
    <>
      <Box onClick={handleClick} sx={{ cursor: "pointer" }}>
        {children}
      </Box>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <Box sx={{ p: 2, display: "flex", flexDirection: "column", gap: 1 }}>
          <Button variant="text"
           onClick={()=>{
            alert("준비중입니다.");
           }}
          >
            프로필 보기
          </Button>
          <Button 
            variant="text" 
            onClick={()=>{
             alert("준비중입니다.");
            }}
          >신고</Button>
          {loginUserRole === "OWNER" && member.ROLE !== "OWNER" && (
            <Button 
              variant="text" 
              color="error" 
              onClick={() => {
                //  onKick(member.USERID); handleClose(); 
                alert("준비중입니다.");
              }}
            >
              강퇴
            </Button>
          )}
        </Box>
      </Popover>
    </>
  );
};

export default MemberListItem;
