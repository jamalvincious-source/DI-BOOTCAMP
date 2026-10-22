const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/users");
const protectedRoutes = require("./routes/protected");
const tokenRoutes = require("./routes/token");

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/auth", userRoutes);
app.use("/protected", protectedRoutes);
app.use("/token", tokenRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
