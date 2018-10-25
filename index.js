const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
    try {
        const urlList = [{ name: "home", link: "https://teaching.com.au" }];
        const deviceList = [
            { name: "desktop", width: 1360, height: 768 },
            { name: "tablet", width: 768, height: 1024 },
            { name: "mobile", width: 360, height: 640 }
        ];

        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();

        const result = urlList.map(async url => {
            await page.goto(url.link);

            for (let i = 0; i < deviceList.length; i++) {
                const device = deviceList[i];
                console.log(device.name);
                const path = `screenshot/${device.name}/`;
                const fileName = `${url.name}.png`;

                if (!fs.existsSync(path)) {
                    fs.mkdirSync(path);
                }

                await page.setViewport(device);
                await page.screenshot({ fullPage: true, path: path + fileName });
            }
        })
        // for (let j = 0; j < urlList.length; j++) {
        //     const url = urlList[j];

        // }

        Promise.all(result).then(async () => { await browser.close() });


    } catch (error) {
        console.log(`error: ${error}`);
    }

})();