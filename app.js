const express = require("express");

const logger = require("morgan");

const path = require("path");

const app = express();

const indexRouter = require("./routes/indexRouter");
const gameRouter = require("./routes/gameRouter");

// app.use("views", path.join(__dirname, "views"));

//middleware
app.use(logger("dev"));
app.use(express.json());

app.use("/", indexRouter);
app.use("/api/game", gameRouter);

app.listen(3000, function () {
  console.log(`Server started in port ${3000}`);
});
