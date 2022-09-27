const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, "..", "client/public")));

app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
