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

module.exports = router;