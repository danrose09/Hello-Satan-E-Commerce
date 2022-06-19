const express = require("express");
const cors = require("cors");
const seedRouter = require("./routes/seedRoute.js");
const productRouter = require("./routes/productRoutes.js");
const userRouter = require("./routes/userRoutes.js");

const connectDB = require("./config/db.js");

const app = express();
connectDB();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use("/api/seed", seedRouter);
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Port running on 5000!");
});
