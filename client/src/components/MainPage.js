import React, { useState } from "react";
import { Box } from "@mui/material";
// import LeftSidebar from "../components/LeftSidebar";
import CenterContent from "../components/CenterContent";
// import WritePostModal from "../components/WritePostModal";

export default function MainPage() {
  

  return (
    <Box sx={{ display: "flex", width: "800", height: "100vh" }}>
      {/* <LeftSidebar onWriteClick={() => setOpenWrite(true)} /> */}

      <CenterContent />

      {/* <RightSidebar /> */}

      {/* <WritePostModal
        open={openWrite}
        onClose={() => setOpenWrite(false)}
      /> */}
    </Box>
  );
}
