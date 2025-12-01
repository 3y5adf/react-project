import React, { useEffect, useState } from 'react';
import { Box, TextField, Button } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const ChatCreate = () => {
    const [name, setName] = useState('');
    let [loginUser, setLoginUser] = useState("");   
    let navigate = useNavigate();

    let token = localStorage.getItem("token");

//   const createRoom = () => {
//     if (!name) return;
//     onCreateRoom(name);
//     setName('');
//   };
    useEffect(()=>{
        if(token){
            const decoded = jwtDecode(token);
            setLoginUser(decoded.userId);
        }
    },[])

    function addRoom(){
        let param = {
            title : name,
            userId : loginUser
        }
        console.log(param);
        fetch("http://localhost:3020/chatroom/add", {
            method:"POST",
            headers : {
                "Content-type" : "application/json"
            },
            body : JSON.stringify(param)
        })
            .then( res => res.json() )
            .then( data => {
                console.log(data);
                // alert("등록되었습니다.");
                // onClose();
                roomHostIn(data.result[0].insertId);
                window.location.href = "/chatroom/"+data.result[0].insertId;
                // navigate("http://localhost:3020/chatroom/"+data.result[0].insertId);
            })  
    }

    function roomHostIn(chatNo){
        // console.log(chatNo);
        let param = {
            chatNo : chatNo,
            userId : loginUser
        }
        fetch("http://localhost:3020/chatroom/hostin", {
            method:"POST",
            headers : {
                "Content-type" : "application/json"
            },
            body : JSON.stringify(param)
        })
            .then( res => res.json() )
            .then( data => {
                console.log(data);
                // alert("등록되었습니다.");
                // onClose();
                // roomManagerIn(data.result[0].insertId);
            })  
    }

    return (
        <Box>
        <TextField
            label="채팅방 이름"
            fullWidth
            sx={{ mb: 2 }}
            value={name}
            onChange={e => setName(e.target.value)}
        />
        <Button variant="contained" onClick={()=>{
            addRoom();
        }}>채팅방 생성</Button>
        </Box>
    );
};

export default ChatCreate;
