import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";

export default function WritePostModal({ open, onClose }) {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    alert(content);
    setContent("");
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>글 작성</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          multiline
          rows={4}
          placeholder="무슨 일이 일어나고 있나요?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="contained">작성</Button>
      </DialogActions>
    </Dialog>
  );
}
