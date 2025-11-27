const express = require('express')
const router = express.Router();
const db = require("../db");
const authMiddleware = require("../auth");
const path = require("path");

router.post("/add", async (req, res)=>{
  let {userId, title, content, type} = req.body;
  
  try {
    let sql = "INSERT INTO SNS_FEED "
            + "VALUES(NULL, ?, ?, ?, 0, NOW(), NOW(), ? ) "
    let result = await db.query(sql, [userId, title, content, type]);

    res.json({
      msg : "작성되었습니다.",
      result : result
    })
  } catch (error) {
    console.log("에러 발생!");
    console.log(error);
  }
});

router.get("/:category", async(req,res)=>{
  let {category} = req.params;
  
  // try {
  //   console.log(category);
  // } catch (error) {
  //   console.log(error);
  // }
  let list = [];
  let keyword = "";
  try {
    if(category=="all"){
      keyword = "WHERE 1=1 "
    } else if(category=="free"){
      keyword = "WHERE TYPE = 'F' "
    } else if(category=="notice"){
      keyword = "WHERE TYPE = 'N' "
    } else if(category=="qna"){
      keyword = "WHERE TYPE = 'Q' "
    }

    let sql = "SELECT F.*, DATE_FORMAT(F.CDATETIME, '%Y-%m-%d %H:%i') AS CTIME, DATE_FORMAT(F.UDATETIME, '%Y-%m-%d %H:%i') AS UTIME, NICKNAME, IMGPATH, STATUS, IFNULL(CCNT,0) AS CCNT "
              + "FROM SNS_FEED F "
              + "INNER JOIN( "
              + " SELECT * "
              + " FROM SNS_USER "
              + ")U ON F.USERID = U.USERID "
              + "LEFT JOIN( "
              + " SELECT FEEDNO, COUNT(*) AS CCNT "
              + " FROM SNS_COMMENT "
              + " GROUP BY FEEDNO "
              + " )T ON F.FEEDNO = T.FEEDNO "
              + keyword
              + "ORDER BY F.CDATETIME DESC "
    let [rows] = await db.query(sql);
    list = rows;

    res.json({
      result : "success",
      list : list
    })
  } catch (error) {
    console.log("에러 발생!");
    console.log(error);
  }
})

router.get("/:userId/:feedId", async(req,res)=>{
  let {userId, feedId} = req.params;
  
  try {
    let sql = "SELECT F.*, DATE_FORMAT(F.CDATETIME, '%Y-%m-%d %H:%i') AS CTIME, DATE_FORMAT(F.UDATETIME, '%Y-%m-%d %H:%i') AS UTIME, NICKNAME, IMGPATH, STATUS "
            + "FROM SNS_FEED F "
            + "INNER JOIN( "
            + " SELECT * "
            + " FROM SNS_USER "
            + ")U ON F.USERID = U.USERID "
            + "WHERE F.USERID = ? AND FEEDNO = ? "
    let [list] = await db.query(sql,[userId, feedId]);

    res.json({
      info : list[0],
      result : "success"
    })
  } catch (error) {
    console.log("에러 발생!");
    console.log(error);
  }
})

module.exports = router;