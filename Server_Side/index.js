require("dotenv").config()
const express = require("express")
const connect = require("./config/data")
const cors = require("cors")

const userLoginRoute = require("./routes/userLogin.route")
const userRouter = require("./routes/userRegister.route")
const submissionRoute = require("./routes/submission.route")
const questionRoutes = require("./routes/question.route")
const codeRoutes = require("./routes/code.route")
const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors());
app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hello From Index.js 🚀");
});


app.use("/user", userRouter)
app.use("/user", userLoginRoute)
app.use("/submissions", submissionRoute)
app.use("/questions", questionRoutes)
app.use("/code", codeRoutes)


app.listen(PORT, async () => {
  try {
    await connect;
    console.log(`🚀 Server is running on port ${PORT}`)
    console.log("JWT Secret:", process.env.JWT_SECRET)

  } catch (error) {
    console.error("❌ MongoDB connection failed:", error)
  }
});
