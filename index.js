const express = require("express");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 3000; 

app.get("/", (req, res) => {
  res.json({ message: "Hello, World i have been deployed to aws ec2 server" });
});

// Listen on all network interfaces
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
 