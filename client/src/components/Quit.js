import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Quit() {
    let token = localStorage.getItem("token");
    let [loginUser, setLoginUser] = useState("");
    let [email, setEmail] = useState("");
    let [pwd, setPwd] = useState("");
    let navigate = useNavigate();

    useEffect(()=>{
        if(token){
            const decoded = jwtDecode(token);
            setLoginUser(decoded.userId);
        }
    }, [])

    function userQuit(){
        if(email.length==0){
            alert("이메일을 입력해주세요.");
            return;
        }
        if(pwd.length==0){
            alert("비밀번호를 입력해주세요.");
            return;
        }
        let param = {
            pwd : pwd,
            email : email
        };
        // console.log(param);
        fetch("http://localhost:3020/user/" + loginUser,{
            method:"DELETE",
            headers : {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(param),
        })
            .then( res => res.json() )
            .then( data => {
                if(data.result === "success"){
                    alert(data.msg);
                    navigate("/");
                } else{ 
                    alert(data.msg);
                    return;
                }
            } )
    }

    return (
        <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="40vh"
        >
        <Box
            display="flex"
            flexDirection="column" // 세로 나열
            alignItems="center"
            gap={2} // 요소 간격
        >
            <Typography>이메일을 확인해주세요.</Typography>
            <TextField 
                placeholder="이메일 입력" 
                onChange={(e)=>{
                    setEmail(e.target.value);
                }}
                label="이메일"
            />
            <Typography>비밀번호를 입력해주세요.</Typography>
            <TextField 
                placeholder="비밀번호 입력" 
                onChange={(e)=>{
                    setPwd(e.target.value);
                }}
                label="비밀번호"
                type="password"
            />
            <Typography
                sx={{
                    fontSize: "0.9rem", 
                    color: "red",
                    fontWeight: "bold",
                    textAlign: "center" 
                }}
            >
                확인 시, 바로 탈퇴됩니다.
            </Typography>
            <Button 
                variant="contained"
                onClick={()=>{
                    userQuit();
                }}
            >
                확인
            </Button>
        </Box>
        </Box>
    );
}

export default Quit;
