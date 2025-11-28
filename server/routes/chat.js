const express = require('express')
const router = express.Router();
const db = require("../db");

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