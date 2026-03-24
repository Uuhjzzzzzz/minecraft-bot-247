const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

// Tạo web để UptimeRobot "gõ cửa"
app.get("/", (request, response) => {
  response.send("Bot Bedrock đang online!");
});
app.listen(3000, () => console.log("Web server ready!"));

// Cấu hình Bot - Nhớ sửa thông tin server của bạn ở đây
const bot = mineflayer.createBot({
  host: 'bosswar.playserver.pro', 
  port: 47884,              
  username: 'BotTreoGlitch',
  version: '1.21.132.1', // Kiểm tra đúng version server nhé
  auth: 'offline'            
});

bot.on('spawn', () => {
  console.log('Bot đã vào server!');
});

// Chống AFK nhảy mỗi 2 phút
setInterval(() => {
  bot.setControlState('jump', true);
  setTimeout(() => bot.setControlState('jump', false), 500);
}, 120000);

bot.on('error', (err) => console.log('Lỗi kết nối:', err));
  
