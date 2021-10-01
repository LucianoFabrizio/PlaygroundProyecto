const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const mainRouter = require("./routers/main")

app.set("views engine", "ejs")

app.listen(PORT, () => {
  console.log(`El servidor está corriento en http://localhost:3000/`)})
app.use(express.static("public"));

app.use("/", mainRouter);




