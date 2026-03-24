const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

app.get("/", (req, res) => res.send("Bot Bedrock 24/7 đang chạy bản 1.26.3!"));
app.listen(3000, () => console.log("Web server ready!"));

function createBot() {
    const bot = mineflayer.createBot({
        host: 'bosswar.playserver.pro',
        port: 47884,
        username: 'BotTreo247',
        auth: 'offline',
        // CẬP NHẬT VERSION Ở ĐÂY
        version: '1.26.3', 
        connectTimeout: 60000 
    });

    bot.on('spawn', () => {
        console.log('--- Bot đã vào server bản 1.26.3 thành công! ---');
        
        // Nhảy mỗi 1 phút để chống AFK
        const jumpInterval = setInterval(() => {
            if (bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 500);
            }
        }, 60000);

        bot.on('end', () => {
            clearInterval(jumpInterval);
            console.log('Mất kết nối! Đang thử lại sau 30 giây...');
            setTimeout(createBot, 30000);
        });
    });

    bot.on('error', (err) => {
        console.log('Lỗi:', err.message);
        // Nếu server chưa mở (ETIMEDOUT) hoặc lỗi khác, đợi 1 phút rồi thử lại
        setTimeout(createBot, 60000);
    });
}

createBot();
