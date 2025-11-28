import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Box, Stack } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const ChatList = ({type = "all"}) => {
    let [chatList, setChatList] = useState([]);
    let [loginUser, setLoginUser] = useState("");
    let navigate = useNavigate();

    let token = localStorage.getItem("token");

    function getRoomList() {
        fetch("http://localhost:3020/chatroom/")
            .then( res => res.json() )
            .then( data => {
                console.log(data);
                setChatList(data.list);
            })
    }

    function getJoinList(){
        fetch("http://localhost:3020/chatroom/join-list/"+loginUser)
            .then( res => res.json() )
            .then( data => {
                console.log(data);
                setChatList(data.list);
            })
    }

    // useEffect(()=>{
    //     // getRoomList();
    //     if(token){
    //         const decoded = jwtDecode(token);
    //         // console.log(decoded.userId);
    //         setLoginUser(decoded.userId);
    //     }
    //     if(type === "all"){
    //         getRoomList();
    //     } else if(type === "joined" && token){
    //         // alert("join!");
    //         getJoinList();
    //     }
    // },[])

    useEffect(() => {
        if(token){
            const decoded = jwtDecode(token);
            setLoginUser(decoded.userId);
        }
    }, [token]);

    useEffect(() => {
        if(type === "all"){
            getRoomList();
        } else if(type === "joined" && loginUser){
            getJoinList();
        }
    }, [type, loginUser]);

    function joinRoom(chatNo) {
        let param = {
            user : loginUser,
            chatNo : chatNo
        }
        console.log(param);
        fetch("http://localhost:3020/chatroom/join", {
            method:"POST",
            headers : {
                "Content-type" : "application/json"
            },
            body : JSON.stringify(param)
        })
            .then( res => res.json() )
            .then( data => {
                // console.log(data);
                
                // 성공 시 chatroom.js로 이동하기 위한 navigate 링크 연동하기
            })  
    }

    function checkMember(chatNo){
        //방 입장 전에 이미 속한 회원인지 확인
        let param = {
            user : loginUser,
            chatNo : chatNo
        }
        fetch("http://localhost:3020/chatroom/join-check", {
            method:"POST",
            headers : {
                "Content-type" : "application/json"
            },
            body : JSON.stringify(param)
        })
            .then( res => res.json() )
            .then( data => {
                // console.log(data);
                if(data.check.length>0){
                    // console.log("이미 들어가있음");
                } else {
                    // console.log("안들어가있음");
                    joinRoom(chatNo);
                }
            })  
    }
        
    return (
        <>
            <Box>

            </Box>
            {chatList.map((item) => (
                <Box
                    key={item.CHATNO}
                    onClick={()=>{
                        checkMember(item.CHATNO);
                    }}
                    sx={{
                    border: "1px solid #e0e0e0",
                    p: 2,
                    m: 1,
                    borderRadius: 3,
                    display: "flex",
                    alignItems: "center",
                    transition: "all 0.2s",
                    "&:hover": {
                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        borderColor: "#ccc",
                    },
                    bgcolor: "#fafafa",
                    cursor:"pointer",
                    }}
                >
                    {/* CHATNO */}
                    <Box sx={{ ml: 3, mr: 4, fontWeight: "bold", fontSize: "1.2rem", color: "#1976d2" }}>
                    {item.CHATNO}
                    </Box>

                    {/* 세로선 */}
                    <Box
                    sx={{
                        width: "1px",
                        bgcolor: "#c0c0c0",
                        height: "60px",
                        mr: 5
                    }}
                    />

                    {/* TITLE & CNT */}
                    <Box>
                    <Stack spacing={0.5}>
                        <Box sx={{ color:"black", fontWeight: "bold", fontSize: "1rem" }}>{item.TITLE}</Box>
                        <Box sx={{ fontSize: "0.875rem", color: "gray" }}>{item.CNT}명 대화중</Box>
                    </Stack>
                    </Box>
                </Box>
            ))}
        </>
    );
};

export default ChatList;
