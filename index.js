const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

app.get("/", (req, res) => res.send("Bot Bedrock 24/7 đang online bản 1.26.3.1!"));
app.listen(3000, () => console.log("Web server ready!"));

function createBot() {
    const bot = mineflayer.createBot({
        host: 'bosswar.playserver.pro',
        port: 47884,
        username: 'BotTreo247',
        auth: 'offline',
        // PHẢI CHÍNH XÁC LÀ 1.26.3
        version: '1.26.3', 
        connectTimeout: 60000 
    });

    bot.on('spawn', () => {
        console.log('--- ĐÃ KẾT NỐI THÀNH CÔNG VÀO SERVER 1.26.3.1 ---');
        
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
        console.log('Lỗi hệ thống:', err.message);
        // Tự động thử lại nếu server chưa mở hoặc lỗi protocol
        setTimeout(createBot, 30000);
    });
}

createBot();
