import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, Box, Stack, Pagination } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const ChatList = ({type = "all"}) => {
    let [chatList, setChatList] = useState([]);
    let [loginUser, setLoginUser] = useState("");
    let navigate = useNavigate();
    
    // 페이징 관련 state
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 7;

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
                navigate("/chatroom/"+chatNo);
            })  
    }

    function checkMember(chatNo){
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
                if(data.check.length>0){
                    navigate("/chatroom/"+chatNo);
                } else {
                    joinRoom(chatNo);
                }
            })  
    }

    // 페이지 변경 핸들러
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    // 현재 페이지에 표시할 아이템 계산
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = chatList.slice(indexOfFirstItem, indexOfLastItem);

    // 총 페이지 수 계산
    const totalPages = Math.ceil(chatList.length / itemsPerPage);
        
    return (
        <>
            <Box>
                {currentItems.map((item) => (
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
            </Box>

            {/* 페이지네이션 */}
            {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3, mb: 2 }}>
                    <Pagination 
                        count={totalPages} 
                        page={currentPage} 
                        onChange={handlePageChange}
                        color="primary"
                        size="large"
                    />
                </Box>
            )}
        </>
    );
};

export default ChatList;