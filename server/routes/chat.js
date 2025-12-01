const express = require('express')
const router = express.Router();
const db = require("../db");

//채팅방 생성
router.post("/add", async (req, res) => {
  const { title, userId } = req.body;
//   console.log(req.body);

  try {
    // 채팅방 생성
    let sql = "INSERT INTO SNS_CHATROOM VALUES(NULL, ?, ?, 'O', NOW())"
        //임시 하드코딩
    let result = await db.query(sql,[title, userId]);
    
    res.json({ 
        result : result
    });
  } catch (error) {
    console.log("에러 발생!");
    console.log(error);
  }

});

//채팅방 생성 시, 호스트 자동 입장
router.post("/hostin", async (req, res) => {
  const { chatNo, userId } = req.body;
//   console.log(req.body);

  try {
    let sql = "INSERT INTO SNS_CHATROOM_MEMBER VALUES(NULL, ?, ?, NOW(), 'OWNER', 'JOINED', NULL)"
    let result = await db.query(sql,[chatNo, userId]);
    
    res.json({ 
        result : result
    });
  } catch (error) {
    console.log("에러 발생!");
    console.log(error);
  }

});

//채팅방 목록 가져오기
router.get("/", async (req, res) => {
  try {
    let sql = "SELECT C.*, IFNULL(CNT, 0) AS CNT "
            + "FROM SNS_CHATROOM C "
            + "LEFT JOIN( "
            + " SELECT CHATNO, COUNT(*) AS CNT "
            + " FROM SNS_CHATROOM_MEMBER "
            + " GROUP BY CHATNO "
            + ")M ON C.CHATNO = M.CHATNO "
            + "ORDER BY CDATETIME DESC"
    let [list] = await db.query(sql);

    res.json({
        result : "success",
        list : list
    })
  } catch (error) {
    console.log("에러 발생!");
    console.log(error);
  }
});

//채팅방 멤버 목록
router.get("/join-list/:user", async (req, res) => {
    let {user} = req.params;
  try {
    let sql = "SELECT C.*, M.USERID AS USER, CNT "
            + "FROM SNS_CHATROOM C "
            + "INNER JOIN( "
            + " SELECT * "
            + " FROM SNS_CHATROOM_MEMBER "
            + ")M ON C.CHATNO = M.CHATNO "
            + "INNER JOIN( "
            + " SELECT CHATNO, COUNT(*) AS CNT "
            + " FROM SNS_CHATROOM_MEMBER "
            + " GROUP BY CHATNO "
            + ")T ON C.CHATNO = T.CHATNO "
            + "WHERE M.USERID = ?"
    let [list] = await db.query(sql,[user]);

    res.json({
        result : "success",
        list : list
    })
  } catch (error) {
    console.log("에러 발생!");
    console.log(error);
  }
});

//방에 들어가있는지 확인
router.post("/join-check", async (req, res) => {
  const { user, chatNo } = req.body;
//   console.log(req.body);

  try {
    let sql = "SELECT * "
            + "FROM SNS_CHATROOM_MEMBER "
            + "WHERE CHATNO = ? AND USERID = ? "
    let [list] = await db.query(sql,[chatNo, user]);
    
    res.json({ 
        result : "success",
        check : list
    });
  } catch (error) {
    console.log("에러 발생!");
    console.log(error);
  }

});

//채팅방 입장
router.post("/join", async (req, res) => {
  const { user, chatNo } = req.body;
//   console.log(req.body);

  try {
    let sql = "INSERT INTO SNS_CHATROOM_MEMBER VALUES(NULL, ?, ?, NOW(), 'MEMBER', 'JOINED', NULL)"
    let result = await db.query(sql,[chatNo, user]);
    
    res.json({ 
        result : result
    });
  } catch (error) {
    console.log("에러 발생!");
    console.log(error);
  }

});

//채팅방 제목 가져오기
router.get("/getTitle/:chatNo", async (req, res) => {
  let {chatNo} = req.params;
  try {
    let sql = "SELECT * "
            + "FROM SNS_CHATROOM "
            + "WHERE CHATNO = ? "
            // + "LEFT JOIN( "
            // + " SELECT CHATNO, COUNT(*) AS CNT "
            // + " FROM SNS_CHATROOM_MEMBER "
            // + " GROUP BY CHATNO "
            // + ")M ON C.CHATNO = M.CHATNO "
            // + "ORDER BY CDATETIME DESC"
    let [list] = await db.query(sql, [chatNo]);

    res.json({
        result : "success",
        info : list[0]
    })
  } catch (error) {
    console.log("에러 발생!");
    console.log(error);
  }
});

//채팅방 메세지 전송
// router.post("/message/send", async (req, res) => {
//   let {chatNo, loginUser , sendMessage } = req.body;
//   try {
//     let sql = "INSERT INTO SNS_CHATROOM_MESSAGE(MSGNO, CHATNO, USERID, CONTENTS, CDATETIME) "
//             + "VALUES(NULL, ?, ?, ?, NOW()) "
//     let result = await db.query(sql, [chatNo, loginUser, sendMessage]);

//     res.json({
//       result : result,
//       msg : "전송완료"
//     })
//   } catch (error) {
//     console.log("에러 발생!")
//     console.log(error);
//   }
// })


router.get("/message/get/:chatNo", async (req, res) => {
  let {chatNo} = req.params;
  try {
    let sql = "SELECT M.*, DATE_FORMAT(CDATETIME, '%H:%i') AS CTIME "
            + "FROM SNS_CHATROOM_MESSAGE M "
            + "WHERE CHATNO = ? "
            // + "LEFT JOIN( "
            // + " SELECT CHATNO, COUNT(*) AS CNT "
            // + " FROM SNS_CHATROOM_MEMBER "
            // + " GROUP BY CHATNO "
            // + ")M ON C.CHATNO = M.CHATNO "
            // + "ORDER BY CDATETIME DESC"
    let [list] = await db.query(sql, [chatNo]);

    res.json({
        result : "success",
        list : list
    })
  } catch (error) {
    console.log("에러 발생!");
    console.log(error);
  }
});

// 채팅방 참여자 목록 조회
router.get("/members/:chatNo", async (req, res) => {
  let { chatNo } = req.params;
  try {
    let sql = "SELECT USERID, ROLE, STATUS, JOINTIME "
            + "FROM SNS_CHATROOM_MEMBER "
            + "WHERE CHATNO = ? AND STATUS = 'JOINED' "
            + "ORDER BY ROLE DESC, JOINTIME ASC";
    let [list] = await db.query(sql, [chatNo]);

    res.json({
      result: "success",
      list: list
    });
  } catch (error) {
    console.log("에러 발생!");
    console.log(error);
    res.status(500).json({ result: "error" });
  }
});

// 채팅방 나가기
router.post("/leave", async (req, res) => {
  const { user, chatNo } = req.body;
  
  try {
    let sql = "UPDATE SNS_CHATROOM_MEMBER SET STATUS = 'LEFT' WHERE CHATNO = ? AND USERID = ?";
    let result = await db.query(sql, [chatNo, user]);
    
    res.json({ 
      result: "success",
      data: result
    });
  } catch (error) {
    console.log("에러 발생!");
    console.log(error);
    res.status(500).json({ result: "error" });
  }
});

//방 인원 체크
router.get("/checkmember/:chatNo", async (req,res) => {
  let {chatNo} = req.params;
  
  try {
    let sql = "SELECT * "
            + "FROM SNS_CHATROOM_MEMBER "
            + "WHERE CHATNO = ? AND STATUS = 'JOINED'"
    let result = await db.query(sql, [chatNo]);

    res.json({
      result : "success",
      list : result
    })
  } catch (error) {
    console.log("에러 발생!");
    console.log(error);
  }
})

//방삭제
router.delete("/removeroom/:chatNo", async (req,res) => {
  let {chatNo} = req.params;

  try {
    let sql = "DELETE FROM SNS_CHATROOM WHERE CHATNO = ? "
    let result = await db.query(sql, [chatNo]);

    res.json({
      result : result,
      msg : "success"
    })
  } catch (error) {
    console.log("에러 발생!");
    console.log(error);
  }
})

//status가 left였는데, 다시 들어가게 되면 joined로 바뀌는 쿼리 넣기


//------------------안쓰는 코드----------------------------------
// router.get("/joined/:userId", async (req, res) => {
//   const userId = req.params.userId;

//   const [rows] = await db.execute(
//     `SELECT c.* 
//      FROM SNS_CHATROOM c
//      JOIN SNS_CHATROOM_MEMBER m
//        ON c.CHATNO = m.CHATNO
//      WHERE m.USERID = ? AND m.STATUS = 'JOINED'
//      ORDER BY c.CHATNO DESC`,
//     [userId]
//   );

//   res.json(rows);
// });

// router.post("/join", async (req, res) => {
//   const { chatNo, userId } = req.body;

//   // 이미 있는지 확인
//   const [exist] = await db.execute(
//     "SELECT * FROM SNS_CHATROOM_MEMBER WHERE CHATNO = ? AND USERID = ?",
//     [chatNo, userId]
//   );

//   if (exist.length > 0) {
//     // 재입장 → 상태 변경
//     await db.execute(
//       "UPDATE SNS_CHATROOM_MEMBER SET STATUS = 'JOINED' WHERE CHATNO = ? AND USERID = ?",
//       [chatNo, userId]
//     );
//   } else {
//     // 신규 입장
//     await db.execute(
//       `INSERT INTO SNS_CHATROOM_MEMBER 
//          (CHATNO, USERID, JOINTIME, ROLE, STATUS)
//        VALUES (?, ?, NOW(), 'MEMBER', 'JOINED')`,
//       [chatNo, userId]
//     );
//   }

//   res.json({ success: true });
// });

// router.post("/leave", async (req, res) => {
//   const { chatNo, userId } = req.body;

//   await db.execute(
//     "UPDATE SNS_CHATROOM_MEMBER SET STATUS = 'LEFT' WHERE CHATNO = ? AND USERID = ?",
//     [chatNo, userId]
//   );

//   res.json({ success: true });
// });

module.exports = router;