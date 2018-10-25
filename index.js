const puppeteer = require('puppeteer');

(async () => {
    const url = "https://www.google.com";
    const savePath = "screenshot/example.png";

    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.screenshot({ path: savePath });
    await browser.close();
})();