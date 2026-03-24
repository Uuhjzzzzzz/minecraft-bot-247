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
  username: 'BotTreo247',
  // Xóa dòng version cũ đi
  auth: 'offline',
  realms: false // Đảm bảo không nhầm sang server Realms
});

// Thêm đoạn này để xử lý lỗi phiên bản nếu cần
bot.on('error', (err) => {
  if (err.message.includes('unsupported protocol')) {
    console.log('Đang thử kết nối lại với chế độ tự dò phiên bản...');
  }
  console.log('Lỗi:', err.message);
});


// Chống AFK nhảy mỗi 2 phút
setInterval(() => {
  bot.setControlState('jump', true);
  setTimeout(() => bot.setControlState('jump', false), 500);
}, 120000);

bot.on('error', (err) => console.log('Lỗi kết nối:', err));
  
