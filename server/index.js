const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");

app.use(cors());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use("/api/product", require("./routes/route.product"));
app.use("/api/category", require("./routes/route.category"));

app.listen(port, () => {
  console.log(`server connected to ${port}`);
});
