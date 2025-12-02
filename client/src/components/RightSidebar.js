import React, { useState, useEffect } from "react";
import { Box, TextField } from "@mui/material";

export default function RightSidebar() {
  const [keyword, setKeyword] = useState("");
  const [isSmall, setIsSmall] = useState(false);

  const handleResize = () => {
    const width = window.innerWidth;
    setIsSmall(width <= window.screen.width / 2); // 브라우저 화면 폭의 절반
  };

  useEffect(() => {
    handleResize(); // 초기값
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      window.location.href = `/search?keyword=${keyword}`;
    }
  };

  if (isSmall) return null;

  return (
    <Box
      sx={{
        width: "15vw",
        p: 2,
        borderLeft: "1px solid #ddd",
        height: "100vh",
        mr: "5vw",
      }}
    >
      {/* <TextField
        fullWidth
        variant="outlined"
        placeholder="검색하세요"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleSearchKeyDown}
        size="small"
      /> */}
    </Box>
  );
}
