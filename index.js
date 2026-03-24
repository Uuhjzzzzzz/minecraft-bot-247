const mineflayer = require('mineflayer');
const express = require('express');
const app = express();

app.get("/", (req, res) => res.send("Bot đang chờ server mở..."));
app.listen(3000, () => console.log("Web server ready!"));

function createBot() {
    const bot = mineflayer.createBot({
        host: 'bosswar.playserver.pro',
        port: 47884,
        username: 'BotTreo247',
        auth: 'offline',
        // Thêm dòng này để bot không bị văng khi server chưa mở
        connectTimeout: 30000 
    });

    bot.on('spawn', () => {
        console.log('Bot đã vào server thành công!');
        // Chỉ cho phép nhảy khi bot đã vào game (spawn)
        const jumpInterval = setInterval(() => {
            if (bot.entity) {
                bot.setControlState('jump', true);
                setTimeout(() => bot.setControlState('jump', false), 500);
            }
        }, 60000);
        
        bot.on('end', () => {
            clearInterval(jumpInterval);
            console.log('Mất kết nối, đang thử lại sau 30 giây...');
            setTimeout(createBot, 30000);
        });
    });

    bot.on('error', (err) => {
        console.log('Lỗi:', err.message);
        if (err.code === 'ETIMEDOUT') {
            console.log('Server chưa mở, sẽ thử lại sau 1 phút...');
            setTimeout(createBot, 60000);
        }
    });
}

createBot();
