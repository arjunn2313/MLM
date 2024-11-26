const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const { authenticateToken, checkRole } = require("./utils/jwt");
const login = require("./routes/login");
const ecommerceRoute = require("./routes/ecommerce/index");
const PublicReferal = require("./routes/agent/Public");
const connectDB = require("./config/db");
const corsOptions = require("./config/cors");
const errorHandler = require("./utils/errorHandler");
const PORT = process.env.PORT || 6001;
const agentRoute = require("./routes/agent/index");
const adminRoute = require("./routes/admin/index");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

// middlewares
app.use(cookieParser());
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes

app.get("/", (req, res) => {
  res.send(" Server Running ");
});

app.use("/login", login);

// app.use("/api/admin", authenticateToken, checkRole("admin"), adminRoute);
app.use("/api/admin", adminRoute);

app.use("/api/agent", authenticateToken, checkRole("agent"), agentRoute);

app.use("/api/referal-link", PublicReferal);

app.use("/api/ecommerce", ecommerceRoute);
app.use(errorHandler);
app.listen(PORT, () => {
  connectDB();

  console.log(`server started in localhost ${PORT}`);
});
