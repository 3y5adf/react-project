const express = require('express')
const cors = require('cors')
const http = require('http');
// const { Server } = require('socket.io');
// const server = require("http").createServer(app);

const feedRouter = require("./routes/feed");
const userRouter = require("./routes/user");
const commentRouter = require("./routes/comment");
const chatRouter = require("./routes/chat");
const db = require("./db");

const app = express()
const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"]
//   }
// });
const io = require("socket.io")(server, {
  cors: { origin: "*" }
});

app.use(cors({
    origin : "*",
    credentials : true,
}))

app.use(express.json());

app.use("/user", userRouter);
app.use("/user/uploads", express.static("uploads"));

app.use("/feed", feedRouter);

app.use("/comment", commentRouter);

app.use("/chatroom", chatRouter);

// ⭐ Socket.IO 이벤트
io.on("connection", (socket) => {
  console.log("사용자 연결:", socket.id);

  // 채팅방 입장
  socket.on("joinRoom", (data) => {
    const { chatNo, userId } = data;
    socket.join(chatNo);
    console.log(`${userId}(${socket.id})가 방 ${chatNo}에 입장`);

    // 방에 있는 다른 사람들에게 입장 알림 전송
    socket.to(chatNo).emit("userJoined", {
      userId: userId,
      message: `${userId}님이 입장하셨습니다.`,
      timestamp: new Date()
    });
  });

  // ⭐ 채팅방 퇴장
  socket.on("leaveRoom", (data) => {
    const { chatNo, userId } = data;
    
    // 방에 있는 다른 사람들에게 퇴장 알림 전송
    socket.to(chatNo).emit("userLeft", {
      userId: userId,
      message: `${userId}님이 퇴장하셨습니다.`,
      timestamp: new Date()
    });

    socket.leave(chatNo);
    console.log(`${userId}(${socket.id})가 방 ${chatNo}에서 퇴장`);
  });

  // 메시지 전송
  socket.on("sendMessage", async (data) => {
    const { chatNo, userId, contents } = data;

    try {
      // DB 저장
      let sql = "INSERT INTO SNS_CHATROOM_MESSAGE(MSGNO, CHATNO, USERID, CONTENTS, CDATETIME) VALUES(NULL, ?, ?, ?, NOW())";
      let [result] = await db.query(sql, [chatNo, userId, contents]);

      // 저장된 메시지 정보
      const newMessage = {
        MSGNO: result.insertId,
        CHATNO: chatNo,
        USERID: userId,
        CONTENTS: contents,
        CDATETIME: new Date()
      };

      // ⭐ 같은 방에 있는 모든 사람에게 전송 (본인 포함)
      io.to(chatNo).emit("receiveMessage", newMessage);
      
    } catch (error) {
      console.error("메시지 저장 오류:", error);
    }
  });

  // 연결 해제
  socket.on("disconnect", () => {
    console.log("사용자 연결 끊김:", socket.id);
  });
});



server.listen(3020, ()=>{
    console.log("server start!");
})
