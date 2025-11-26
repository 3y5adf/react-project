import React, { useEffect, useRef, useState } from 'react';
import { TextField, Button, Container, Typography, Box, FormControl, InputLabel, MenuItem } from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Link, useNavigate } from 'react-router-dom';
import ProfileImageButton from './ProfileImagePop';
import { ProfileImgContext } from './context/ProfileImgContext';

function Join() {
  let idRef = useRef();
  let emailRef = useRef();
  let pwdRef = useRef();
  let pwdReRef = useRef();

  let [id, setId] = useState("");
  let [email,setEmail] = useState("");
  let [nickname, setNickname] = useState("");
  let [pwd, setPwd] = useState("");
  let [pwdRe, setPwdRe] = useState("");

  let [confirmColor,setConfirmColor] = useState("");
  let [confirmKeyword,setConfirmKeyword ] = useState("");

  let [idFlg, setIdFlg] = useState(false);
  let [emailFlg, setEmailFlg] = useState(false);
  let [nickFlg, setNickFlg] = useState(false);
  let [pwdFlg, setPwdFlg] = useState(false);

  let [domain, setDomain] = useState("");

  let [openProfile, setOpenProfile] = useState(false);

  let [selectedImage, setSelectedImage] = useState("");

  let navigate = useNavigate();
  
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
    } else {
      setPwdFlg(false);
    }
  },[pwd,pwdRe])

  function onJoin(){
    if(id.length==0){
      alert("아이디를 입력해주세요.");
      return;
    }
    if(!idFlg){
      alert("아이디를 체크해주세요.");
      return;
    }
    if(emailRef.current.value.length==0 || domain==""){
      alert("이메일을 입력해주세요.");
      return;
    }
    if(!nickFlg){
      alert("닉네임을 체크해주세요.");
      return;
    }
    if(!emailFlg){
      alert("이메일을 인증해주세요.");
      return;
    } 
    if(selectedImage.length==0){
      alert("프로필 이미지를 선택해주세요.");
      return;
    }
    if(!pwdFlg){
      alert("비밀번호를 확인해주세요.");
      return;
    } 

    let param = {
      id : id,
      pwd : pwd,
      email : email,
      nickname : nickname,
      profilePath : "http://localhost:3020/user/uploads/profile-images/"+selectedImage
    }
    // console.log(param);

    fetch("http://localhost:3020/user/join",{
      method:"POST",
      headers:{
        "Content-type" : "application/json"
      },
      body : JSON.stringify(param)
    })
      .then( res=>res.json())
      .then( data=>{
        alert(data.msg);
        navigate("/");
      })
  }

  function idCheck(){
    if(id.length===0){
      alert("id를 입력해주세요.");
      return;
    }
    fetch("http://localhost:3020/user/id/"+id)
      .then( res=>res.json())
      .then( data=>{
        console.log(data);
        alert(data.msg);
        if(data.result==true){
          setIdFlg(true);
        } else {
          setIdFlg(false);
        }
      })
  }

  const handleChange = (event) => {
    setDomain(event.target.value);
  };

  //이메일 되는지 확인용
  // useEffect(()=>{
  //   if(email){
  //     alert(email);
  //     //추후 이메일 인증
  //     setEmailFlg(true);
  //     console.log("ㅇㅇ");
  //   } else{
  //     setEmailFlg(false);
  //     console.log("ㄴㄴ");
  //   }
  // }, [email])

  function nicknameCheck(){
    fetch("http://localhost:3020/user/nickname/"+nickname)
      .then( res=>res.json())
      .then( data=>{
        console.log(data);
        alert(data.msg);
        if(data.result==true){
          setNickFlg(true);
        } else {
          setNickFlg(false);
        }
      })
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
          onChange={(e)=>{
            setId(e.target.value);
          }}
          disabled={idFlg}
        />

        {!idFlg && (
        <Button
          onClick={()=>{
            idCheck();
          }}
        >
          중복체크
        </Button>
        )}

        <Box>
          <TextField
            inputRef={emailRef}
            label="Email"
            variant="outlined"
            margin="normal"
          />
          @
          <FormControl 
            variant="outlined"
            margin="normal"
          >
            <InputLabel 
              id="demo-simple-select-label"
            >
              도메인
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={domain}
              label="도메인"
              onChange={handleChange}
            >
              <MenuItem value={"gmail.com"}>gmail.com</MenuItem>
              <MenuItem value={"naver.com"}>naver.com</MenuItem>
              {/* <MenuItem></MenuItem>
              <MenuItem></MenuItem>
              <MenuItem></MenuItem> */}
            </Select>
          </FormControl>
          
        </Box>

        {/* 추후 이메일 인증 추가하기 */}
        <Button onClick={()=>{
          // console.log(emailRef.current.value);
          if(emailRef.current.value.length==0 || domain==""){
            alert("이메일을 입력해주세요.");
            return;
          }
          let newEmail = emailRef.current.value+"@"+domain;
          setEmail(newEmail)
          //임시
          setEmailFlg(true)
        }}>
          인증
        </Button>

        <TextField 
          // inputRef={emailRef}
          label="Nickname" 
          variant="outlined" 
          margin="normal" 
          fullWidth 
          onChange={(e)=>{
            setNickname(e.target.value);
          }}
        />
        <div style={{ fontSize: "12px" }}>
          한번 설정하면 바꿀 수 없으니, 신중히 해주세요.
        </div>
        <Button onClick={()=>{
          if(nickname==""){
            alert("닉네임을 입력해주세요.");
            return;
          }
          // alert(nickname);
          nicknameCheck();
        }}>
          중복체크
        </Button>

        {/* <Button 
          variant="contained" 
          color="primary" 
          width="" 
          onClick={()=>{
            setOpenProfile(true)
          }}
        >
          프로필 이미지 선택
        </Button> */}
        <ProfileImgContext.Provider value={[selectedImage, setSelectedImage]}>
          <ProfileImageButton
            onSelect={(fileName) => setSelectedImage(fileName)}
            open={openProfile}
            onClose={()=>setOpenProfile(false)}
          />
          {selectedImage && (
            <Box mt={1}>
              <Typography variant="body2">선택된 이미지:</Typography>
              {/* <div>{selectedImage}</div> */}
              <img
                src={`http://localhost:3020/user/uploads/profile-images/${selectedImage}`}
                alt="선택된 프로필"
                style={{ 
                  width: 80, 
                  height: 80, 
                  borderRadius: 8, 
                  objectFit: "cover", 
                  marginTop: 4,
                  border: "1px solid lightgray"
                }}
              />
            </Box>
          )}
        </ProfileImgContext.Provider>

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

        {/* <div style={{color : confirmColor, fontWeight:"bold"}}>
          {confirmKeyword}
        </div> */}

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