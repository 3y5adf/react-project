import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Box, Typography, Paper, TextField, Button, Stack, 
  IconButton, Drawer, List, ListItem, ListItemText, 
  Divider, Avatar
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { jwtDecode } from 'jwt-decode';
import io from 'socket.io-client';
import MemberListItem from "./MemberListItem";

const ChatRoom = () => {
  let { chatNo } = useParams();
  let navigate = useNavigate();
  let [messages, setMessages] = useState([]);
  let [newMessage, setNewMessage] = useState("");
  let [chatTitle, setChatTitle] = useState("");
  let [loginUser, setLoginUser] = useState("");
  let [members, setMembers] = useState([]);
  let [drawerOpen, setDrawerOpen] = useState(false);
  let [lastReadMsgNo, setLastReadMsgNo] = useState(0);
  let [isInitialLoad, setIsInitialLoad] = useState(true);
  let [isUserScrolling, setIsUserScrolling] = useState(false);
  let token = localStorage.getItem("token");

  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const unreadStartRef = useRef(null);
  const messageContainerRef = useRef(null);

  useEffect(() => {
    getTitle();
    getMessage();
    getMembers();
    getLastRead();
    
    let userId = "";
    if (token) {
      const decoded = jwtDecode(token);
      userId = decoded.userId;
      setLoginUser(decoded.userId);
    }

    markAsRead();

    socketRef.current = io("http://localhost:3020");
    socketRef.current.emit("joinRoom", { chatNo, userId });

    socketRef.current.on("receiveMessage", (message) => {
      console.log("새 메시지 수신:", message);
      setMessages(prev => [...prev, { ...message, type: "message" }]);
    });

    socketRef.current.on("userJoined", (data) => {
      console.log("입장 알림:", data);
      setMessages(prev => [...prev, { ...data, type: "join" }]);
      getMembers(); // 멤버 목록 갱신
    });

    socketRef.current.on("userLeft", (data) => {
      console.log("퇴장 알림:", data);
      setMessages(prev => [...prev, { ...data, type: "leave" }]);
      getMembers(); // 멤버 목록 갱신
    });

    socketRef.current.on("userKicked", (data) => {
      console.log("강퇴 알림:", data);
      setMessages(prev => [...prev, { ...data, type: "kicked" }]);
      getMembers(); // 멤버 목록 갱신
    });

    return () => {
      socketRef.current.emit("markAsRead", { chatNo, userId });
      socketRef.current.emit("leaveRoom", { chatNo, userId });
      socketRef.current.disconnect();
    };
  }, [chatNo]);

  // ⭐ 읽음 처리 함수 추가
function markAsRead() {
    if (!chatNo || !token) return;
    
    const decoded = jwtDecode(token);
    fetch("http://localhost:3020/chatroom/mark-read", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: decoded.userId,
            chatNo: chatNo
        })
    })
    .then(res => res.json())
    .then(data => {
        console.log("읽음 처리 완료:", data);
    })
    .catch(err => console.error("읽음 처리 오류:", err));
}

  // ⭐ 스크롤 이벤트 감지
  useEffect(() => {
    const container = messageContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
      
      // 사용자가 맨 아래에 있지 않으면 스크롤 중으로 간주
      setIsUserScrolling(!isAtBottom);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // ⭐ 메시지가 로드될 때 스크롤 처리
  useEffect(() => {
    if (messages.length === 0) return;

    // 1. 최초 로드 시에만 읽지 않은 메시지 위치로 스크롤
    if (isInitialLoad && lastReadMsgNo > 0) {
      setTimeout(() => {
        if (unreadStartRef.current) {
          unreadStartRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
          messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
        setIsInitialLoad(false); // 최초 로드 완료
      }, 100);
      return;
    }

    // 2. 최초 로드가 아니고, 사용자가 스크롤 중이 아닐 때만 맨 아래로
    if (!isInitialLoad && !isUserScrolling) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // ⭐ 마지막 읽은 메시지 번호 가져오기
  function getLastRead() {
    if (chatNo && token) {
      const decoded = jwtDecode(token);
      const userId = decoded.userId;
      
      fetch(`http://localhost:3020/chatroom/lastread/${userId}/${chatNo}`)
        .then(res => res.json())
        .then(data => {
          console.log("마지막 읽은 메시지:", data.lastRead);
          setLastReadMsgNo(data.lastRead || 0);
          // 마지막 읽은 메시지 가져온 후 메시지 목록 로드
          getMessage();
        })
        .catch(err => {
          console.error("마지막 읽은 메시지 조회 오류:", err);
          getMessage(); // 에러 나도 메시지는 로드
        });
    }
  }

  // 채팅방 이름 가져오기
  function getTitle() {
    if (chatNo) {
      fetch("http://localhost:3020/chatroom/getTitle/" + chatNo)
        .then(res => res.json())
        .then(data => {
          setChatTitle(data.info.TITLE);
        });
    }
  }

  // 메시지 목록 가져오기
  function getMessage() {
    if (chatNo && token) {
      fetch("http://localhost:3020/chatroom/message/get/" + chatNo)
        .then(res => res.json())
        .then(data => {
          console.log(data)
          const messagesWithType = data.list.map(msg => ({ ...msg, type: "message" }));
          setMessages(messagesWithType);
        });
    }
  }

  // 참여자 목록 가져오기
  function getMembers() {
    if (chatNo) {
      fetch("http://localhost:3020/chatroom/members/" + chatNo)
        .then(res => res.json())
        .then(data => {
          console.log(data);
          setMembers(data.list || []);
        })
        .catch(err => console.error("멤버 조회 오류:", err));
    }
  }

  // 메시지 보내기
  function sendMessage() {
    if (!newMessage.trim()) return;

    const messageData = {
      chatNo: chatNo,
      userId: loginUser,
      contents: newMessage
    };

    socketRef.current.emit("sendMessage", messageData);
    setNewMessage("");

    // 메시지 전송 직후 최하단으로 스크롤
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 50); // 메시지가 렌더링될 시간을 약간 준다
  }

  // Enter 키 처리
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // 채팅방 나가기
  function handleLeave() {
    if (!window.confirm("정말 채팅방을 나가시겠습니까?")) return;

    const data = {
      chatNo: chatNo,
      user: loginUser
    };

    fetch("http://localhost:3020/chatroom/leave", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json" 
      },
      body: JSON.stringify(data)
    })
      .then(res => res.json())
      .then(result => {
        // socketRef.current.emit("leaveRoom", { chatNo, userId: loginUser });

        if(result.ownerTransferred && result.newOwner){
          socketRef.current.emit("ownerChanged", { 
            chatNo, 
            newOwner: result.newOwner 
          });
        }

        //만약 joined 상태인 유저가 없으면 해당 대화방 삭제 처리 추가하기
        //navigate는 대화방 삭제처리 function에서 처리하기
        checkMember();
        
        // navigate("/main");
      })
      .catch(err => console.error("퇴장 오류:", err));
  }

  function checkMember() {
    fetch("http://localhost:3020/chatroom/checkmember/"+chatNo)
      .then(res=>res.json())
      .then(data=>{
        console.log(data);
        //data.membercount의 값이 0이면 방 삭제 호출
        if(data.membercount.length===0){
          // alert("남은 사람 없음");
          removeRoom();
        } else {
          navigate("/main");
        }
      })
  }

  function removeRoom(){
    fetch("http://localhost:3020/chatroom/removeroom/"+chatNo,{
        method:"DELETE"
    })
        .then( res => res.json() )
        .then( data => {
            navigate("/main");
        } )
  }

  return (
    <Box sx={{ p: 2, height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* 헤더 */}
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h5">
          {chatTitle} #{chatNo}
        </Typography>
        <IconButton onClick={() => setDrawerOpen(true)}>
          <MenuIcon fontSize="large" />
        </IconButton>
      </Box>

      {/* 메시지 영역 */}
      <Paper 
        sx={{ flex: 1, p: 2, mb: 2, overflowY: "auto" }}
        ref={messageContainerRef}
      >
        <Stack spacing={1}>
          {messages.map((msg, index) => {
            // ⭐ 현재 메시지가 읽지 않은 첫 메시지인지 확인
            const isFirstUnread = msg.type === "message" && 
                                  msg.MSGNO > lastReadMsgNo && 
                                  (index === 0 || messages[index - 1].MSGNO <= lastReadMsgNo);

            return (
              <React.Fragment key={index}>
                {/* ⭐ 읽지 않은 메시지 구분선 */}
                {isFirstUnread && (
                  <Box 
                    ref={unreadStartRef}
                    sx={{ 
                      display: "flex", 
                      alignItems: "center", 
                      my: 2 
                    }}
                  >
                    <Box sx={{ flex: 1, height: "1px", bgcolor: "#ff5252" }} />
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        mx: 2, 
                        color: "#ff5252", 
                        fontWeight: "bold",
                        whiteSpace: "nowrap"
                      }}
                    >
                      여기까지 읽으셨습니다
                    </Typography>
                    <Box sx={{ flex: 1, height: "1px", bgcolor: "#ff5252" }} />
                  </Box>
                )}

                {/* 시스템 메시지 (입장/퇴장/강퇴) */}
                {(msg.type === "join" || msg.type === "leave" || msg.type === "kicked") && (
                  <Box sx={{ display: "flex", justifyContent: "center", my: 1 }}>
                    <Box
                      sx={{
                        bgcolor: msg.type === "leave" ? "#fce4ec" : 
                                 msg.type === "kicked" ? "#ffebee" : "#e3f2fd",
                        color: msg.type === "leave" ? "#c2185b" : 
                               msg.type === "kicked" ? "#d32f2f" : "#1976d2",
                        px: 2,
                        py: 0.5,
                        borderRadius: 2,
                        fontSize: "0.875rem",
                        fontWeight: 500
                      }}
                    >
                      {msg.message}
                    </Box>
                  </Box>
                )}

                {/* 일반 메시지 */}
                {msg.type === "message" && (
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: msg.USERID === loginUser ? "flex-end" : "flex-start",
                    }}
                  >
                    
                    {msg.USERID !== loginUser && (
                      <Box sx={{ display: "flex", alignItems: "center", mb: 0.5 }}>
                        <MemberListItem
                          key={msg.MSGNO}
                          member={msg}
                          loginUserRole={members.find(m => m.USERID === loginUser)?.ROLE}
                          onKick={(userId)=>console.log("강퇴:", userId)}
                        >
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Avatar src={msg.IMGPATH} sx={{ width: 28, height: 28, mr: 1 }} />
                            <Typography variant="body2">{msg.NICKNAME}</Typography>
                          </Box>
                        </MemberListItem>
                      </Box>
                    )}

                    <Box
                      sx={{
                        p: 1.5,
                        bgcolor: msg.USERID === loginUser ? "#f1f1f1" : "#2986ff",
                        color: msg.USERID === loginUser ? "black" : "white",
                        borderRadius: 2,
                        maxWidth: "70%",
                      }}
                      onClick={()=>{
                        // alert("신고하기");
                      }}
                    >
                      <Typography variant="body1" sx={{ wordBreak: "break-word" }}>
                        {msg.CONTENTS}
                      </Typography>
                    </Box>
                    <Typography variant="caption">
                      {msg.CTIME}
                    </Typography>
                  </Box>
                )}
              </React.Fragment>
            );
          })}
          <div ref={messagesEndRef} />
        </Stack>
      </Paper>

      {/* 입력창 */}
      <Box sx={{ display: "flex", gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="메시지를 입력하세요"
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <Button variant="contained" onClick={sendMessage}>
          전송
        </Button>
      </Box>

      {/* 우측 사이드바 (Drawer) */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <Box sx={{ width: 300, height: "100%", display: "flex", flexDirection: "column" }}>
          {/* 헤더 */}
          <Box sx={{ p: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant="h6">참여자 목록</Typography>
            <IconButton onClick={() => setDrawerOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider />

          {/* 참여자 목록 */}
          <Box sx={{ flex: 1, overflowY: "auto" }}>
            <List>
              {members.map((member, index) => (
                // <ListItem 
                //   key={index} 
                //   onClick={()=>{
                //     alert(member.USERID);
                //   }}
                //   sx={{
                //     bgcolor:"lightgray",
                //     mb:1,
                //     ml:1,
                //     cursor:"pointer",
                //     border:"0.5px solid lightgray",
                //     borderRadius:2
                //   }}
                // >
                <Box>
                  <MemberListItem
                    key={member.USERID}
                    member={member}
                    loginUserRole={members.find(m => m.USERID === loginUser)?.ROLE}
                    onKick={(userId)=>console.log("강퇴:", userId)}
                  >
                    <Box 
                      sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        m:1,
                        cursor:"pointer",
                        border:"0.5px solid lightgray",
                        borderRadius:2
                      }}
                    >
                      <Avatar src={member.IMGPATH} sx={{ mx: 2 }} />
                      <ListItemText primary={member.NICKNAME} secondary={member.ROLE === "OWNER" ? "👑방장" : "멤버"} />
                    </Box>
                  </MemberListItem>
                </Box>
                // </ListItem>
              ))}
            </List>
          </Box>

          <Divider />

          {/* 나가기 버튼 */}
          <Box sx={{ p: 2 }}>
            <Button
              fullWidth
              variant="contained"
              color="error"
              startIcon={<ExitToAppIcon />}
              onClick={handleLeave}
            >
              채팅방 나가기
            </Button>
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
};

export default ChatRoom;