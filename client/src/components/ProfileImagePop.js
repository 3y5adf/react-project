import React, { useState } from 'react';
import { Button, Popover, Typography, Box } from '@mui/material';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useContext } from 'react';
import { ProfileImgContext } from './context/ProfileImgContext';

function ProfileImageButton() {
  const [anchorEl, setAnchorEl] = useState(null);
  let [images, setImages] = useState([]);
  let [selected, setSelected] = useState("");
  
  let [selectedImage, setSelectedImage] = useContext(ProfileImgContext);

  let selectedRef = useRef("");

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget); // 버튼 기준 위치
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  useEffect(()=>{
    if(open){
      fetch("http://localhost:3020/user/profile-images")
      .then( res=>res.json())
      .then( data=>{
        // console.log(data);
        setImages(data)
        // console.log(images);
      })
    }
  },[open])

  return (

    <Box>
      <Button variant="contained" onClick={(e) => setAnchorEl(e.currentTarget)}>
        프로필 이미지 선택
      </Button>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Box p={2}>
          <h3>이미지 선택</h3>
          
          <Box sx={
            {
              display: "flex",
              flexWrap:"wrap",
              gap : 1,
              width : 435,
              marginBottom : 3
            }
          }>
            {images.map((file) => {
              const isSelected = selected === file;

              return (
                <Box
                  key={file}
                  sx={{
                    position: "relative",
                    width: 80,
                    height: 80,
                    cursor: "pointer",
                    borderRadius: 1,
                    overflow: "hidden",
                    border: isSelected ? "2px solid blue" : "1px solid #ccc",
                  }}
                  onClick={() => {
                    setSelected(file);
                    // setSelectedImage(file);
                  }}
                >
                  <img
                    src={`http://localhost:3020/user/uploads/profile-images/${file}`}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      filter: isSelected ? "brightness(60%)" : "none",
                      transition: "0.2s",
                    }}
                  />
                  {isSelected && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        bgcolor: "primary.main",
                        color: "white",
                        px: 0.5,
                        py: 0,
                        borderBottomLeftRadius: 4,
                        fontSize: 12,
                      }}
                    >
                      선택
                    </Box>
                  )}
                </Box>
              );
            })}

          </Box>
          
          <Box
            sx={{
              display:"flex",
              justifyContent: "flex-end",
              gap:1,
              mt:2    
            }}
          >
            <Button
              variant='contained'
              onClick={()=>{
                selectedRef.current={selected};
                setSelectedImage(selected);
                handleClose();
              }}
            >
              
                    {/* selectedRef.current=file; */}
              선택
            </Button>
            <Button
              onClick={()=>{
                if(selectedImage===""){
                  setSelected(null);
                  handleClose();
                } else{
                  handleClose();
                }
              }}
            >
              취소
            </Button>
          </Box>
        </Box>
      </Popover>
    </Box>
  );
}

export default ProfileImageButton;
