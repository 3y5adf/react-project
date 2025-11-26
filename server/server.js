const express = require('express')
const cors = require('cors')

// const feedRouter = require("./routes/feed");
const userRouter = require("./routes/user");

const app = express()

app.use(cors({
    origin : "*",
    credentials : true,
}))

app.use(express.json());

app.use("/user", userRouter);
app.use("/user/uploads", express.static("uploads"));

// app.use("/feed", feedRouter);

app.listen(3020, ()=>{
    console.log("server start!");
})