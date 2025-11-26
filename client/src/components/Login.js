import React, { useRef } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import '../Project.css'

function Login() {
  let idRef = useRef();
  let pwdRef = useRef();

  let navigate = useNavigate();

  function onLogin(param) {
    // console.log(param);
    fetch("http://localhost:3020/user/login", {
      method:"POST",
      headers : {
          "Content-type" : "application/json"
      },
      body : JSON.stringify(param)
    })
      .then( res => res.json() )
      .then( data => {
          console.log(data);
          alert(data.msg);
          if(data.result){
            localStorage.setItem("token", data.token);
            navigate("/main");
          }
          // if(data.result){
            // 
              // console.log(data);
            // localStorage.setItem("token", data.token);
            // navigate("/feed");
          // }
      } )
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
          로그인
        </Typography>
        <TextField
          inputRef={idRef}
          label="ID" variant="outlined" margin="normal" fullWidth />
        <TextField
          label="Password"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
          inputRef={pwdRef}
        />
        <Button 
          onClick={()=>{
            let param = {
              id : idRef.current.value,
              pwd : pwdRef.current.value
            };
            // console.log(param);
            onLogin(param);
          }}
          variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
          로그인
        </Button>
        <Typography variant="body2" style={{ marginTop: '10px' }}>
          <Link to="/join" className='noUnderLine'>
            회원가입
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Login;
