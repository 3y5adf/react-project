import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Avatar,
  Divider,
  Stack
} from '@mui/material';
import { useParams } from 'react-router-dom';
import SubdirectoryArrowRightIcon from '@mui/icons-material/SubdirectoryArrowRight';
import { jwtDecode } from 'jwt-decode';

function FeedView() {
    let { userId, feedId } = useParams();
    let [info, setInfo] = useState({});
    let [comment, setComment] = useState("");
    let token = localStorage.getItem("token")
    let [loginUser, setLoginUser] = useState("");
    let [loginUserStatus, setLoginUserStatus] = useState("");
    let [commentList, setCommentList] = useState([]);
    let [openReplyBox, setOpenReplyBox] = useState(null);
    let [reply, setReply] = useState("");

    useEffect(()=>{
        getFeed();
        getCommentList();
        if(token){
            const decoded = jwtDecode(token);
            setLoginUser(decoded.userId);
            setLoginUserStatus(decoded.userStatus);
        }
    },[])

    function getFeed(){
        if(userId && feedId){
            fetch("http://localhost:3020/feed/"+userId+"/"+feedId)
                .then( res => res.json() )
                .then( data => {
                    setInfo(data.info);
                })
        }
    }

    function getCommentList(){
        fetch("http://localhost:3020/comment/list/"+feedId)
            .then( res => res.json() )
            .then( data => {
                setCommentList(data.list);
            })
    }

    function addComment(){
        let param = {
            loginUser : loginUser,
            feedId : feedId,
            comment : comment
        };
        if(token){
            fetch("http://localhost:3020/comment/add",{
                method:"POST",
                headers : {
                    "Content-type" : "application/json"
                },
                body : JSON.stringify(param)
            })
                .then( res=>res.json())
                .then( data => {
                    window.location.reload();
                })
        } else {
            alert("로그인 후 이용해주세요.");
            return;
        }
    }

    function addReply(commentNo){
        let param = {
            parentNo : commentNo,
            feedId : feedId,
            loginUser : loginUser,
            reply : reply
        };
        if(token){
            fetch("http://localhost:3020/comment/reply/add",{
                method:"POST",
                headers : {
                    "Content-type" : "application/json"
                },
                body : JSON.stringify(param)
            })
                .then( res=>res.json())
                .then( data => {
                    if(data.result){
                        window.location.reload();
                    } else{
                        alert("오류가 발생했습니다.");
                        return;
                    }
                })
        } else {
            alert("로그인 후 이용해주세요.");
            return;
        }
    }

    // 부모 댓글만 필터
    const parentComments = commentList.filter(c => !c.PRCOMMENTNO);

    // 해당 부모 댓글의 대댓글 가져오기
    const getReplies = (parentNo) => {
        return commentList.filter(c => c.PRCOMMENTNO === parentNo);
    };

    return(
        <Box
            sx={{
                maxWidth: 600,
                margin: "auto",
                padding: 2,
                border: "1px solid #e0e0e0",
                borderRadius: 2,
                bgcolor: "background.paper",
            }}
        >
            {/* 작성자 정보 */}
            <Stack 
                direction="row" 
                spacing={2} 
                alignItems="center" 
                justifyContent="space-between"
            >
                <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar src={info.IMGPATH} />
                    <Box>
                        <Typography variant="subtitle1" fontWeight="bold">
                            {info.USERID}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            @{info.USERID} · {info.CDATETIME===info.UDATETIME ? info.CTIME : info.UTIME}
                        </Typography>
                    </Box>
                </Stack>

                <Box textAlign="right">
                    {info.USERID === loginUser ? (
                        <>
                            <Button size="small">수정</Button>
                            <Button size="small" variant="outlined" color="error">삭제</Button>
                        </>
                    ) : (
                        <Button size="small" color="error">신고</Button>
                    )}
                </Box>
            </Stack>

            {/* 글 내용 */}
            <Typography variant="body1" sx={{ m: 2 }}>
                {info.CONTENTS}
            </Typography>

            <Divider sx={{ mb: 1 }} />

            {/* 댓글 영역 */}
            <Box>
                {parentComments.map((item) => (
                    <React.Fragment key={item.COMMENTNO}>
                        {/* 부모 댓글 */}
                        <Box
                            sx={{
                                p: "10px",
                                border: "1px solid lightgray",
                                borderRadius: 3,
                                mt: "10px",
                                mb: "10px"
                            }}
                            onClick={() => {
                                setOpenReplyBox(prev =>
                                    prev === item.COMMENTNO ? null : item.COMMENTNO
                                )
                            }}
                        >
                            <Stack direction="row" spacing={2} alignItems="flex-start">
                                <Avatar src={item.IMGPATH} />
                                <Stack direction="column" sx={{ width: "100%" }}>
                                {/* 닉네임과 날짜를 한 행에 */}
                                <Stack direction="row" justifyContent="space-between">
                                    <Typography variant="subtitle2" fontWeight="bold">
                                        {item.NICKNAME}
                                    </Typography>
                                    <Box sx={{ color: "gray", fontSize: "0.9rem" }}>
                                    {item.CDATETIME === item.UDATETIME
                                        ? item.CTIME
                                        : item.UTIME + " (수정됨)"}
                                    </Box>
                                </Stack>

                                    <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                                        <Typography variant="body2" color="text.secondary">
                                            @{item.USERID}
                                        </Typography>
                                        {/* 버튼들을 날짜 아래에 */}
                                        <Box sx={{  }} textAlign={"right"}>
                                            {item.USERID === loginUser ? (
                                            <>
                                                <Button size="small">수정</Button>
                                                <Button size="small" color='error' variant='outlined'>삭제</Button>
                                            </>
                                            ) : (
                                            <Button size="small" color='secondary'>신고</Button>
                                            )}
                                        </Box>
                                    </Box>
                                </Stack>
                            </Stack>
                            <Box sx={{ m: 1 }}>{item.CONTENTS}</Box>
                        </Box>

                        {/* 대댓글 렌더링 */}
                        {getReplies(item.COMMENTNO).map(replyItem => (
                        <Box
                            key={replyItem.COMMENTNO}
                            sx={{ ml: 5, mb: 2, borderLeft: "2px solid #ddd", pl: 2 }}
                        >
                            <Stack direction="row" spacing={2} alignItems="flex-start">
                            {/* Avatar */}
                            <Avatar src={replyItem.IMGPATH} />

                            {/* 닉네임 + 날짜 + 버튼들을 세로로 쌓기 */}
                            <Stack direction="column" sx={{ width: "100%" }}>
                                {/* 닉네임과 날짜 한 줄 */}
                                <Stack direction="row" justifyContent="space-between">
                                <Box>{replyItem.NICKNAME}</Box>
                                <Box sx={{ color: "gray", fontSize: "0.9rem" }}>
                                    {replyItem.CDATETIME === replyItem.UDATETIME
                                    ? replyItem.CTIME
                                    : replyItem.UTIME + " (수정됨)"}
                                </Box>
                                </Stack>

                                <Box sx={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
                                    <Typography variant="body2" color="text.secondary">
                                        @{replyItem.USERID}
                                    </Typography>
                                    {/* 버튼들을 날짜 아래에 */}
                                    <Box sx={{  }} textAlign={"right"}>
                                        {replyItem.USERID === loginUser ? (
                                            <>
                                            <Button size="small">수정</Button>
                                            <Button size="small" color='error' variant='outlined'>삭제</Button>
                                            </>
                                        ) : (
                                            <Button size="small" color='secondary'>신고</Button>
                                        )}
                                    </Box>
                                </Box>
                            </Stack>
                            </Stack>

                            {/* 댓글 내용 */}
                            <Box sx={{ m: 1 }}>{replyItem.CONTENTS}</Box>
                        </Box>
                        ))}


                        {/* 대댓글 입력창 */}
                        {openReplyBox === item.COMMENTNO && (
                            <Box sx={{ ml: 5, mb: 2, position: "relative" }}>
                                <SubdirectoryArrowRightIcon
                                    sx={{ position: "absolute", left: 0, top: 12, color: "#26e6ffff" }}
                                    fontSize="medium"
                                />
                                <TextField
                                    fullWidth
                                    multiline
                                    minRows={2}
                                    sx={{ pl: 4 }}
                                    onChange={(e)=> setReply(e.target.value)}
                                />
                                <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
                                    <Button variant="contained" onClick={()=> addReply(item.COMMENTNO)}>등록</Button>
                                </Box>
                            </Box>
                        )}
                    </React.Fragment>
                ))}
            </Box>

            {/* 댓글 입력창 */}
            <Box sx={{ mt: 2 }}>
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="댓글을 입력하세요..."
                        multiline
                        minRows={2}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        disabled={!comment.trim()}
                        sx={{ height: 78 }} 
                        onClick={()=> addComment()}
                    >
                        등록
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default FeedView;
