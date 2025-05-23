const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

 
const app = express();
app.use(cors());
app.use(express.json());
 
// Routes
const appRouter = require("./routes/routes");  
app.use("/api/v1", appRouter);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));



 
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);