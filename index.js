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

// OS-Level Memory & CPU
const totalMem = Math.round(os.totalmem() / 1024 / 1024);
const freeMem = Math.round(os.freemem() / 1024 / 1024);
const cpuLoad = os.loadavg();
const uptime = Math.round(os.uptime() / 60); // in minutes

// AWS EC2 Metadata (optional, only if you have access)

// Compose Slack message
const systemReport = `
******************************************************************** ********************************************************************
:robot_face: *EC2 Instance Health Report*
• *Uptime*: ${uptime} mins

:bar_chart: *Node.js Memory Usage*
• *RSS*: ${Math.round(used.rss / 1024 / 1024)} MB
• *Heap Total*: ${Math.round(used.heapTotal / 1024 / 1024)} MB
• *Heap Used*: ${Math.round(used.heapUsed / 1024 / 1024)} MB
• *External*: ${Math.round(used.external / 1024 / 1024)} MB
• *Array Buffers*: ${Math.round(used.arrayBuffers / 1024 / 1024)} MB

:computer: *System Stats*
• *Total Memory*: ${totalMem} MB
• *Free Memory*: ${freeMem} MB
• *CPU Load (1m, 5m, 15m)*: ${cpuLoad.map((v) => v.toFixed(2)).join(", ")}
`;

axios
  .post(process.env.SLACK_WEBHOOK, { text: systemReport })
  .then(() => {
    console.log("EC2 system report sent to Slack!");
  })
  .catch((error) => {
    console.error("Failed to send system report to Slack:", error);
  });
