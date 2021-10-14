const express = require('express');
const methodOverride = require('method-override');

const app = express();

const PORT = process.env.PORT || 3000;

app.set("views engine", "ejs")
app.use(methodOverride('_method'));

const mainRouter = require("./routers/main")
const productRouter = require("./routers/products")

app.use("/", mainRouter);
app.use("/products", productRouter);

app.listen(PORT, () => {
  console.log(`El servidor está corriento en http://localhost:3000/`)})
app.use(express.static("public"));




