import React, { useEffect, useRef, useState } from 'react';
import {
  Grid2,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  DialogActions,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Tabs,
  Tab,
  Paper,
  Stack
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

// const mockFeeds = [
//   {
//     id: 1,
//     title: '게시물 1',
//     description: '이것은 게시물 1의 설명입니다.',
//     image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
//   },
//   {
//     id: 2,
//     title: '게시물 2',
//     description: '이것은 게시물 2의 설명입니다.',
//     image: 'https://images.unsplash.com/photo-1521747116042-5a810fda9664',
//   },
//   // 추가 피드 데이터
// ];

function Feed() {
  // const [open, setOpen] = useState(false);
  // const [selectedFeed, setSelectedFeed] = useState(null);
  // const [comments, setComments] = useState([]);
  // const [newComment, setNewComment] = useState('');

  // const handleClickOpen = (feed) => {
  //   setSelectedFeed(feed);
  //   setOpen(true);
  //   setComments([
  //     { id: 'user1', text: '멋진 사진이에요!' },
  //     { id: 'user2', text: '이 장소에 가보고 싶네요!' },
  //     { id: 'user3', text: '아름다운 풍경이네요!' },
  //   ]); // 샘플 댓글 추가
  //   setNewComment(''); // 댓글 입력 초기화
  // };

  // const handleClose = () => {
  //   setOpen(false);
  //   setSelectedFeed(null);
  //   setComments([]); // 모달 닫을 때 댓글 초기화
  // };

  // const handleAddComment = () => {
  //   if (newComment.trim()) {
  //     setComments([...comments, { id: 'currentUser', text: newComment }]); // 댓글 작성자 아이디 추가
  //     setNewComment('');
  //   }
  // };

  const [tabIndex, setTabIndex] = useState(0);
  let [list, setList] = useState([]);
  let navigate = useNavigate();
  // let [typeWord, setTypeWord] = useState("");

  useEffect(()=>{
    fetchPosts(tabIndex);
    console.log(tabIndex);
  }, [tabIndex]);

  const fetchPosts = async (tabIndex) => {
    let category = "";

    switch(tabIndex) {
      case 0: category = "all"; break;
      case 1: category = "free"; break;
      case 2: category = "notice"; break;
      case 3: category = "qna"; break;
      default: category = "all";
    }
    console.log(category);
    fetch("http://localhost:3020/feed/"+category)
      .then(res=>res.json())
      .then(data =>{
        console.log(data);
        setList(data.list);
      })
  };

  // const lastTabClick = useRef(0);

  const handleTabChange = (event, newValue) => {
    // const now = Date.now();
    // console.log(lastTabClick);
    // 같은 탭을 클릭했을 때도 fetch
    // if (tabIndex === newValue) {
    //   fetchPosts(newValue);
    // }

    // lastTabClick.current = now;
    console.log(event._reactName);
    setTabIndex(newValue);
    console.log("newValue:",newValue);
    console.log("tabIndex:",tabIndex);
  };

  const feedBoxClick = (userId, feedId) =>{
    navigate("/feed/"+userId+"/"+feedId);
  }

  // function typeTag () {
  //   if(info.TYPE=='F'){
  //     setTypeWord("자유")
  //   }
  //   else if(Info.TYPE=='N'){
  //     setTypeWord("공지")
  //   }
  //   else if(Info.TYPE=='Q'){
  //     setTypeWord("문의")
  //   }
  // }

  const feedList = () => {
    return list.map((item) => (
      <Box 
        key={item.FEEDNO} 
        sx={{ 
          mb: 2, 
          p: 2, 
          border: '1px solid #ccc', 
          borderRadius: '8px', 
          cursor : "pointer"
        }}
        onClick={() => feedBoxClick(item.USERID, item.FEEDNO)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Box
            sx={{
              color : "black",
              bgcolor : "skyblue",
              fontWeight : "bold",
              fontFamily: 'Arial, sans-serif',
              mb:1,
              width:45,
              textAlign:"center",
              borderRadius:1,
              display: 'inline-block'
            }}
          >
            {item.TYPE === 'F' ? '자유'
            : item.TYPE === 'N' ? '공지'
            : item.TYPE === 'Q' ? '문의'
            : ''}
          </Box>
          
          {item.CCNT > 0 && (
            <Box
              sx={{
                mb: 1,
                ml: 0.3,
                py: 0.3,
                color: 'red',
                fontWeight: 'bold',
                borderRadius: 1,
                textAlign: 'center',
                width: 30
              }}
            >
              +{item.CCNT}
            </Box>
          )}
        </Box>

        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar src={item.IMGPATH} />
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">
              {item.NICKNAME}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              @{item.USERID}
            </Typography>
          </Box>
        </Stack>
        <Typography variant="h6" sx={{ mt: 2 }}>
          {item.TITLE}
        </Typography>
        <Typography sx={{ mt:1 }} variant="body2" color="text.secondary">
          {item.CDATETIME === item.UDATETIME
            ? item.CTIME
            : item.UTIME+" (수정됨)"
          }
        </Typography>
      </Box>
    ));
  };

  return (
    <>
      <Box sx={{ flex: 1, height: "100vh"}}>
        {/* 탭 선택 */}
        <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab label="전체" />
          <Tab label="자유" />
          <Tab label="공지" />
          <Tab label="문의" />
        </Tabs>
  
        <Paper sx={{ mt: 2, p: 2, height: "calc(100% - 64px)" }}>
          {tabIndex === 0 && (
            <Box>
              <Typography variant="h6">전체 글 목록</Typography>
              {feedList()}
            </Box>
          )}
  
          {tabIndex === 1 && (
            <Box>
              <Typography variant="h6">자유게시판</Typography>
              {feedList()}
            </Box>
          )}
  
          {tabIndex === 2 && (
            <Box>
              <Typography variant="h6">공지사항</Typography>
              {feedList()}
            </Box>
          )}

          {tabIndex === 3 && (
            <Box>
              <Typography variant="h6">문의사항</Typography>
              {feedList()}
            </Box>
          )}
        </Paper>
      </Box>
    </>
    )


    {/* 
    <Container maxWidth="md">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">SNS</Typography>
        </Toolbar>
      </AppBar>

      <Box mt={4}>
        <Grid2 container spacing={3}>
          {mockFeeds.map((feed) => (
            <Grid2 xs={12} sm={6} md={4} key={feed.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={feed.image}
                  alt={feed.title}
                  onClick={() => handleClickOpen(feed)}
                  style={{ cursor: 'pointer' }}
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    {feed.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg"> 
        //모달크기 조정
        <DialogTitle>
          {selectedFeed?.title}
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ display: 'flex' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1">{selectedFeed?.description}</Typography>
            {selectedFeed?.image && (
              <img
                src={selectedFeed.image}
                alt={selectedFeed.title}
                style={{ width: '100%', marginTop: '10px' }}
              />
            )}
          </Box>

          <Box sx={{ width: '300px', marginLeft: '20px' }}>
            <Typography variant="h6">댓글</Typography>
            <List>
              {comments.map((comment, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar>{comment.id.charAt(0).toUpperCase()}</Avatar>
                       //아이디의 첫 글자를 아바타로 표시
                  </ListItemAvatar>
                  <ListItemText primary={comment.text} secondary={comment.id} /> 
                    //아이디 표시
                </ListItem>
              ))}
            </List>
            <TextField
              label="댓글을 입력하세요"
              variant="outlined"
              fullWidth
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}           
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddComment}
              sx={{ marginTop: 1 }}
            >
              댓글 추가
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
    */}
}

export default Feed;