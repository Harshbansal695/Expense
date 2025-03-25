const express = require("express");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const connectDB = require("./Database/db.js");
const userRoute = require("./Routers/User_routes.js");
const expenseRoute = require("./Routers/Expense_route.js");
const cors = require("cors");

dotenv.config();

connectDB();

const app = express();
const PORT = 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

// API Routes
app.use("/api/v1/user", userRoute);
app.use("/api/v1/expense", expenseRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
