import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Avatar, Grid, Paper } from '@mui/material';

import {jwtDecode} from 'jwt-decode';

function MyPage() {
  const token = localStorage.getItem("token");
  
  let userId = "";

  let [info, setInfo] = useState({});

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
      } )
  }

  useEffect(()=>{
    // console.log(userId);
    getUserInfo();
  }, [])

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        minHeight="100vh"
        sx={{ padding: '20px' }}
      >
        <Paper elevation={3} sx={{ padding: '20px', borderRadius: '15px', width: '100%' }}>
          {/* 프로필 정보 상단 배치 */}
          <Box display="flex" flexDirection="column" alignItems="center" sx={{ marginBottom: 3 }}>
            <Avatar
              alt="프로필 이미지"
              src={info.IMGPATH} // 프로필 이미지 경로
              sx={{ width: 100, height: 100, marginBottom: 2 }}
              style={{ border: '1px solid lightgray' }}
            />
            <Typography variant="h5">{info.NICKNAME}</Typography>
            <Typography variant="body2" color="text.secondary">
              @{info.USERID}
            </Typography>
          </Box>
          
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={4} textAlign="center">
              <Typography variant="h6">작성글</Typography>
              <Typography variant="body1">{info.CNT}</Typography>
            </Grid>
            <Grid item xs={4} textAlign="center">
              <Typography variant="h6">작성 댓글</Typography>
              <Typography variant="body1">{info.CCNT}</Typography>
            </Grid>
            {/* <Grid item xs={4} textAlign="center">
              <Typography variant="h6">게시물</Typography>
              <Typography variant="body1">50</Typography>
            </Grid> */}
          </Grid>
          {/* <Box sx={{ marginTop: 3 }}>
            <Typography variant="h6">내 소개</Typography>
            <Typography variant="body1">
              안녕하세요! SNS를 통해 친구들과 소통하고 있습니다. 사진과 일상을 공유하는 것을 좋아해요.
            </Typography>
          </Box> */}
        </Paper>
      </Box>
    </Container>
  );
}

export default MyPage;