import React, { useEffect, useState } from "react";
import { MenuItem, Box, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Select } from "@mui/material";

import {jwtDecode} from 'jwt-decode';

export default function WritePostModal({ open, onClose }) {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");

  // const handleSubmit = () => {
  //   alert(content);
  //   setContent("");
  //   onClose();
  // };

  const [type, setType] = useState("F");

  const handleChange = (event) => {
    setType(event.target.value);
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
        // console.log(data.info);
        setInfo(data.info);
        setStatus(data.info.STATUS);
      } )
  }

  useEffect(()=>{
    // console.log(userId);
    getUserInfo();
  }, [])

  function addFeed(){
    let param = {
      userId : userId,
      content : content,
      type : type,
      title : title
    };

    // console.log(param);

    fetch("http://localhost:3020/feed/add", {
      method:"POST",
      headers : {
          "Content-type" : "application/json"
      },
      body : JSON.stringify(param)
    })
      .then( res => res.json() )
      .then( data => {
          console.log(data);
          alert("등록되었습니다.");
          onClose();
      })  
  }

  useEffect(()=>{
    if(open){
      setTitle("");
      setContent("");
      setType("F");
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>글 작성</DialogTitle>
      
      <Box sx={{ minWidth: 120, pl:3, pr:3, pb:3 }}>
        <FormControl >
          <InputLabel id="demo-simple-select-label">카테고리</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={type}
            label="카테고리"
            onChange={handleChange}
          >
            {status==="A" && <MenuItem value="N">공지사항</MenuItem>}
            <MenuItem value="F">자유게시판</MenuItem>
            <MenuItem value="Q">문의게시판</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ pl:3, pr:3 }}>
        <TextField
          label="제목"
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
          fullWidth
        />
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
        <Button onClick={()=>{
          addFeed();
        }} variant="contained">작성</Button>
      </DialogActions>
    </Dialog>
  );
}
