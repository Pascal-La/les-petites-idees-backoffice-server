const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const userRoutes = require("./routes/userRoutes");
const ideaRoutes = require("./routes/ideaRoutes");

const connectDB = require("./db");

dotenv.config();
connectDB();
const app = express();

app.use(
  cors({
    origin: "*",
  })
);

// limit size of uploaded picture (need this to avoid "PayloadTooLargeError")
app.use(express.json({ limit: "1000kb" }));
app.use(express.urlencoded({ limit: "1000kb" }));

app.use(express.json()); // req.body, to accept JSON Data

app.use("/api/users", userRoutes);
app.use("/api/ideas", ideaRoutes);

app.listen(5000, () => {
  console.log(`Server is running on port:5000`);
});
