import React, { useEffect, useState } from "react";
import { MenuItem, Box, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Select } from "@mui/material";

import {jwtDecode} from 'jwt-decode';

export default function WritePostModal({ open, onClose }) {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    alert(content);
    setContent("");
    onClose();
  };

  const [category, setCategory] = useState("F");

  const handleChange = (event) => {
    setCategory(event.target.value);
  };

   const token = localStorage.getItem("token");
    
    let userId = "";
  
    let [info, setInfo] = useState({});
    let [status, setStatus] = useState("");
  
    if(token){
      const decoded = jwtDecode(token);
      userId = decoded.userId;
      // console.log(userId);
    }
  
    function getUserInfo(){
      fetch("http://localhost:3020/user/"+ userId)
        .then( res=>res.json() )
        .then( data => {
          // console.log(data);
          console.log(data.info);
          setInfo(data.info);
          setStatus(data.info.STATUS);
        } )
    }
  
    useEffect(()=>{
      // console.log(userId);
      getUserInfo();
    }, [])

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>글 작성</DialogTitle>
      
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={category}
            label="카테고리"
            onChange={handleChange}
          >
            {status==="A" && <MenuItem value="N">공지사항</MenuItem>}
            <MenuItem value="F">자유게시판</MenuItem>
            <MenuItem value="Q">문의게시판</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <DialogContent>
        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="무슨 일이 일어나고 있나요?"//{`무슨 일이 일어나고 있나요? ${status}`}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="contained">작성</Button>
      </DialogActions>
    </Dialog>
  );
}
