const express = require("express");
const app = express();
const uploadController = require("./controller/uploadController");

app.post("/upload", uploadController);

app.listen(3000, () => {
  console.log("Server is running");
});
