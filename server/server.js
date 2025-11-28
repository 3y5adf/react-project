const express = require('express')
const cors = require('cors')
const http = require('http');
// const { Server } = require('socket.io');
// const server = require("http").createServer(app);

const feedRouter = require("./routes/feed");
const userRouter = require("./routes/user");
const commentRouter = require("./routes/comment");
const chatRouter = require("./routes/chat");

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

// Socket.IO 이벤트
// io.on('connection', (socket) => {
//   console.log('사용자 연결됨:', socket.id);

//   socket.on('joinRoom', (roomId) => {
//     socket.join(roomId);
//     console.log(`${socket.id} joined room ${roomId}`);
//   });

//   socket.on('sendMessage', ({ roomId, message, user }) => {
//     // DB에 메시지 저장 가능 (mysql 쿼리)
//     io.to(roomId).emit('receiveMessage', { message, user, createdAt: new Date() });
//   });

//   socket.on('disconnect', () => {
//     console.log('사용자 연결 끊김:', socket.id);
//   });
// });
io.on("connection", socket => {

  socket.on("joinRoom", (chatNo) => {
    socket.join(chatNo);
  });

  socket.on("sendMessage", async (data) => {
    const { chatNo, userId, contents } = data;

    // DB 저장
    const [result] = await db.execute(
      `INSERT INTO SNS_CHATROOM_MESSAGE 
       (CHATNO, USERID, CONTENTS, CDATETIME)
       VALUES (?, ?, ?, NOW())`,
      [chatNo, userId, contents]
    );

    const msgNo = result.insertId;

    // 참여자에게 전송
    io.to(chatNo).emit("receiveMessage", {
      msgNo,
      chatNo,
      userId,
      contents,
      createdAt: new Date()
    });
  });

});


app.listen(3020, ()=>{
    console.log("server start!");
})
