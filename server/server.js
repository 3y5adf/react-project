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
      let insertSql = "INSERT INTO SNS_CHATROOM_MESSAGE(MSGNO, CHATNO, USERID, CONTENTS, CDATETIME) VALUES(NULL, ?, ?, ?, NOW())";
      let [result] = await db.query(insertSql, [chatNo, userId, contents]);

      // 저장된 메시지 정보
      let selectSql = "SELECT M.*, DATE_FORMAT(M.CDATETIME, '%H:%i') AS CTIME, U.NICKNAME, U.IMGPATH "
                    + "FROM SNS_CHATROOM_MESSAGE M "
                    + "INNER JOIN SNS_USER U ON M.USERID = U.USERID "
                    + "WHERE M.MSGNO = ? "
    let [[fullMessage]] = await db.query(selectSql, [result.insertId]);

      //발신자의 LASTREAD 자동 업데이트
      let updateLastRead = "UPDATE SNS_CHATROOM_MEMBER SET "
                         + "LASTREAD = ? "
                         + "WHERE USERID = ? AND CHATNO = ? "
      await db.query(updateLastRead, [result.insertId, userId, chatNo]);

      // ⭐ 같은 방에 있는 모든 사람에게 전송 (본인 포함)
      io.to(chatNo).emit("receiveMessage", fullMessage);

      //해당 채팅방 멤버들에게 읽지 않은 수 업데이트 알림
      let membersSql = "SELECT USERID "
                     + "FROM SNS_CHATROOM_MEMBER "
                     + "WHERE CHATNO = ? AND STATUS = 'JOINED' AND USERID != ? "
      let [members] = await db.query(membersSql, [chatNo, userId]);

      for(let member of members){
        let unreadSql = "SELECT COUNT(*) AS CNT "
                      + "FROM SNS_CHATROOM_MESSAGE M "
                      + "INNER JOIN SNS_CHATROOM_MEMBER CM ON M.CHATNO = CM.CHATNO "
                      + "WHERE CM.USERID = ? "
                      + " AND CM.CHATNO = ? "
                      + " AND M.MSGNO > IFNULL(CM.LASTREAD, 0) "
                      + " AND M.USERID != ? "

        let [[unread]] = await db.query(unreadSql, [member.USERID, chatNo, member.USERID]);

        io.emit("unreadUpdate", {
          userId : member.USERID,
          chatNo : chatNo, 
          unreadCount : unread.CNT
        });
      }
      
    } catch (error) {
      console.error("메시지 저장 오류:", error);
    }
  });

  // ⭐ 채팅방 입장 시 읽음 처리
socket.on("markAsRead", async (data) => {
  const { chatNo, userId } = data;
  
  try {
    let getLastMsg = "SELECT IFNULL(MAX(MSGNO), 0) AS LAST_MSG "
                   + "FROM SNS_CHATROOM_MESSAGE "
                   + "WHERE CHATNO = ? "
    
    let [[lastMsg]] = await db.query(getLastMsg, [chatNo]);
    
    let updateSql = "UPDATE SNS_CHATROOM_MEMBER "
                  + "SET LASTREAD = ? "
                  + "WHERE USERID = ? AND CHATNO = ? "

    await db.query(updateSql, [lastMsg.LAST_MSG, userId, chatNo]);
    
    // 읽음 처리 완료 알림
    socket.emit("readComplete", { chatNo: chatNo });
    
  } catch (error) {
    console.error("읽음 처리 오류:", error);
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
