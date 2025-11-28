const express = require('express')
const router = express.Router();
const db = require("../db");
const authMiddleware = require("../auth");
const fs = require("fs");
const path = require("path");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_KEY = "server_secret_key"; 

// router.get("/profile-images", (req, res)=>{
//     const folderPath = path.join(__dirname, "../uploads/profile-images");

//     fs.readdir(folderPath, (err, files) => {
//     if (err) {
//       return res.status(500).json({ error: "폴더 읽기 실패" });
//     }

//     // 이미지 파일 확장자 필터
//     const imageFiles = files.filter(file =>
//       /\.(jpg|jpeg|png|gif)$/i.test(file)
//     );

//     res.json(imageFiles);
//   });
// });

// router.get("/id/:id", async (req, res)=>{
//   let {id} = req.params;
  
//   try {
//     let sql = "SELECT * FROM SNS_USER WHERE USERID = ?"
//     let [list] = await db.query(sql, [id]);

//     let msg = "";
//     let result = false;

//     if(list.length>0){
//       msg = "이미 사용중인 ID입니다.";
//       result = false;
//     } else{
//       msg = "사용 가능한 ID입니다.";
//       result = true;
//     }

//     res.json({
//       msg : msg,
//       result : result
//     })
//   } catch (error) {
//     console.log("에러 발생!");
//     console.log(error);
//   }
// });

router.get("/list/:feedNo", async (req, res)=>{
  let {feedNo} = req.params;
  
  try {
    let sql = "SELECT C.*, DATE_FORMAT(C.CDATETIME, '%Y-%m-%d %H:%i') AS CTIME, DATE_FORMAT(C.UDATETIME, '%Y-%m-%d %H:%i') AS UTIME, NICKNAME, IMGPATH, STATUS "
            + "FROM SNS_COMMENT C "
            + "INNER JOIN( "
            + " SELECT * "
            + " FROM SNS_USER "
            + ")U ON C.USERID = U.USERID "
            + "WHERE FEEDNO = ? "
            + "ORDER BY C.CDATETIME ASC"
    let [list] = await db.query(sql, [feedNo]);

    res.json({
      list : list,
      result : "success"
    })
  } catch (error) {
    console.log("에러 발생!");
    console.log(error);
  }
});

router.post("/add", async (req, res)=>{
  let {loginUser, feedId, comment} = req.body;
  
  try {
    // let hashPwd = await bcrypt.hash(pwd, 10);

    let sql = "INSERT INTO SNS_COMMENT VALUES(NULL, ?, ?, ?, NOW(), NOW(), NULL, 'F')"
    let result = await db.query(sql, [loginUser, feedId, comment]);

    res.json({
      result : result,
    //   msg : "등록되었습니다."
    })
  } catch (error) {
    console.log("에러 발생!");
    console.log(error);
  }
});

router.post("/reply/add", async (req, res)=>{
  let {loginUser, feedId, reply, parentNo} = req.body;
  
  try {
    // let hashPwd = await bcrypt.hash(pwd, 10);

    let sql = "INSERT INTO SNS_COMMENT VALUES(NULL, ?, ?, ?, NOW(), NOW(), ?, 'F')"
    let result = await db.query(sql, [loginUser, feedId, reply, parentNo]);

    res.json({
      result : result,
    //   msg : "등록되었습니다."
    })
  } catch (error) {
    console.log("에러 발생!");
    console.log(error);
  }
});

// router.post("/login", async (req, res)=>{
//   let {id, pwd} = req.body;
  
//   try {
//     let sql = "SELECT * FROM SNS_USER WHERE USERID = ?"
//     let [list] = await db.query(sql, [id]);

//     let msg = "";
//     let result = false;
//     let token = "";

//     if(list.length>0){
//       let match = await bcrypt.compare(pwd, list[0].PASSWORD);

//       if(match){
//           msg = list[0].NICKNAME + "님 환영합니다!";
//           result = true;

//           let user = {
//               userId : list[0].USERID,
//               userNickname : list[0].NICKNAME
//           };

//           token = jwt.sign(user, JWT_KEY, {expiresIn : '1h'});
//           // console.log(token);
//       } else {
//           msg = "비밀번호를 확인해주세요.";
//       }
//     } else {
//       msg = "해당 아이디가 존재하지 않습니다.";
//     }

//     res.json({
//       result : result,
//       msg : msg,
//       token : token
//     })
//   } catch (error) {
//     console.log("에러 발생!");
//     console.log(error);
//   }
// });

// router.get("/:userId", async (req, res)=>{
//   let {userId} = req.params;
  
//   try {
//     let sql = "SELECT U.*, IFNULL(CNT, 0) AS CNT, IFNULL(CCNT, 0) AS CCNT "
//             + "FROM SNS_USER U "
//             + "LEFT JOIN ( "
//             + " SELECT USERID, COUNT(*) AS CNT "
//             + " FROM SNS_FEED "
//             + " GROUP BY USERID "
//             + ")T ON U.USERID = T.USERID "
//             + "LEFT JOIN ( "
//             + " SELECT USERID, COUNT(*) AS CCNT "
//             + " FROM SNS_COMMENT "
//             + " GROUP BY USERID "
//             + ")C ON U.USERID = C.USERID "
//             + "WHERE U.USERID = ? "
//     let [list] = await db.query(sql, [userId]);

//     res.json({
//       info : list[0],
//       result : "success"
//     })
//   } catch (error) {
//     console.log("에러 발생!");
//     console.log(error);
//   }
// });

module.exports = router;