const path = require("path");
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.use("/api", require("./api"));

app.use(express.static(path.resolve(__dirname, "../client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
