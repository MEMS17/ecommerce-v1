const express = require("express");
const fileUpload = require('express-fileupload');
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

 
const app = express();
app.use(cors());
app.use(express.json());
app.use(fileUpload());// Middleware pour le téléchargement de fichiers

// Routes
const appRouter = require("./routes/routes");  
app.use("/api/v1", appRouter);

// Middleware 404 pour les routes non trouvées
app.use(require("./middlewares/notFound"));
// Middleware pour gérer les erreurs
app.use(require("./middlewares/errorHandler"));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

 
app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);