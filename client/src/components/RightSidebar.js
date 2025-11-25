import React, { useState } from "react";
import { Box, TextField } from "@mui/material";

export default function RightSidebar() {
  const [keyword, setKeyword] = useState("");

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      window.location.href = `/search?keyword=${keyword}`;
    }
  };

  return (
    <Box sx={{ width: 300, p: 2, borderLeft: "1px solid #ddd", height: "100vh" }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="검색하세요"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleSearchKeyDown}
      />
    </Box>
  );
}
