const path = require("path");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
module.exports = app;

app.use(express.json());

app.use("/api", require("./api"));

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use((req, res, next) => {
  if (path.extname(req.path).length) {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
  } else {
    next();
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.use((err, req, res, next) => {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || "Internal server error.");
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
