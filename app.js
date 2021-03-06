require("dotenv").config();
const express = require("express");
const cors = require("cors");
const logger = require("morgan");
const app = express();

const movieRoute = require("./routes/movieRoute");
const genreRoute = require("./routes/genreRoute");
const authenticationRoutes = require("./routes/authenticationRoute");
const userRoutes = require("./routes/userRoute");
const adminRoutes = require("./routes/adminRoute");
const reviewRoute = require("./routes/reviewRoute");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use("/api/milantv/movies", movieRoute);
app.use("/api/milantv/genres", genreRoute);
app.use("/api/milantv/review", reviewRoute);
app.use("/api/milantv", authenticationRoutes);
app.use("/api/milantv/user", userRoutes);
app.use("/api/milantv/admin", adminRoutes);

app.get("/tesconnect", (req, res) =>
  res.status(200).send({
    message: "backend team f connected with u",
  })
);

app.all("*", (req, res) => {
  res.status(404).json({
    statusText: "Not Found",
    message: "You Have Trying Reaching A Route That Doesn't Exist",
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`server is running on port ${process.env.PORT} or 3000`);
});
