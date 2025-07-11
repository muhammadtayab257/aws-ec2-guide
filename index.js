const express = require("express");
const app = express();
const axios = require("axios");
const os = require("os");
const { execSync } = require("child_process");
const used = process.memoryUsage();
require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.json({ message: "Hello, World i have been deployed to aws ec2 server" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

