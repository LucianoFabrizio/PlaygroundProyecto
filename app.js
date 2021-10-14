const express = require('express');
const path = require('path');
const methodOverride = require('method-override');

const app = express();

const PORT = process.env.PORT || 3000;

app.set("views engine", "ejs")
app.use(methodOverride('_method'));

app.set('view engine', 'ejs'); // Define que el motor que utilizamos es EJS
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas

const mainRouter = require("./routers/main")
const productRouter = require("./routers/products")

app.use("/", mainRouter);
app.use("/products", productRouter);

app.listen(PORT, () => {
  console.log(`El servidor está corriento en http://localhost:3000/`)})
app.use(express.static("public"));




