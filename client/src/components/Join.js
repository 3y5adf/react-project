import React, { useEffect, useRef, useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link } from 'react-router-dom';

function Join() {
  let idRef = useRef();
  let emailRef = useRef();
  let pwdRef = useRef();
  let pwdReRef = useRef();

  let [pwd, setPwd] = useState("");
  let [pwdRe, setPwdRe] = useState("");

  let [confirmColor,setConfirmColor] = useState("");
  let [confirmKeyword,setConfirmKeyword ] = useState("");

  let [pwdFlg, setPwdFlg] = useState(false);
  
  useEffect(()=>{
    setConfirmKeyword("");
    if(pwd.length>0 && pwdRe.length>0){
      if(pwd == pwdRe){
        setConfirmColor("Green");
        setConfirmKeyword("일치");
        setPwdFlg(true);
      } else{
        setConfirmColor("Red");
        setConfirmKeyword("불일치");
        setPwdFlg(false);
      }
    }
  },[pwd,pwdRe])

  function onJoin(){
    if(!pwdFlg){
      alert("비밀번호를 확인해주세요.");
    } else{
      
    }
  }

  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h4" gutterBottom>
          회원가입
        </Typography>
        <TextField 
          inputRef={idRef}
          label="ID" 
          variant="outlined" 
          margin="normal" 
          fullWidth 
        />

        <TextField 
          inputRef={emailRef}
          label="Email" 
          variant="outlined" 
          margin="normal" 
          fullWidth 
        />

        <TextField
          inputRef={pwdRef}
          onChange={(e)=>setPwd(e.target.value)}
          label="비밀번호"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
        />
        <TextField
          inputRef={pwdReRef}
          onChange={(e)=>setPwdRe(e.target.value)}
          label="비밀번호 확인"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
        />

        <div style={{color : confirmColor, fontWeight:"bold"}}>
          {confirmKeyword}
        </div>

        <Button 
          onClick={()=>{
            onJoin();
          }}
          variant="contained" 
          color="primary" 
          fullWidth 
          style={{ marginTop: '20px' }}>
            회원가입
        </Button>
        <Typography variant="body2" style={{ marginTop: '10px' }}>
          이미 회원이라면? <Link to="/">로그인</Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Join;