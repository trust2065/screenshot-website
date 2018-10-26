const puppeteer = require('puppeteer');
const fs = require('fs');
const mkdirp = require('mkdirp');

(async () => {
    try {
        const urlList = [
            { name: "about", link: "http://www.teaching.com.au/page/mta-about" },
            { name: "bookRep", link: "http://www.teaching.com.au/page/mta-bookRep" },
            { name: "au-christmas", link: "http://www.teaching.com.au/page/mta-au-christmas" },
            { name: "contactUs", link: "http://www.teaching.com.au/page/mta-contactUs" },
            { name: "au-delivery-times", link: "http://www.teaching.com.au/page/mta-au-delivery-times" },
            { name: "downloads", link: "http://www.teaching.com.au/page/mta-downloads" },
            { name: "international-downloads", link: "http://www.teaching.com.au/page/mta-international-downloads" },
            { name: "help", link: "http://www.teaching.com.au/page/mta-help" },
            { name: "au-home-grown-brands", link: "http://www.teaching.com.au/page/mta-au-home-grown-brands" },
            { name: "au-international-reps", link: "http://www.teaching.com.au/page/mta-au-international-reps" },
            { name: "lego", link: "http://www.teaching.com.au/page/mta-lego" },
            { name: "au-lessonzone", link: "http://www.teaching.com.au/page/mta-au-lessonzone" },
            { name: "au-signup", link: "http://www.teaching.com.au/page/mta-au-signup" },
            { name: "new-projects", link: "http://www.teaching.com.au/page/mta-new-projects" },
            { name: "new-projects-after-school-care", link: "http://www.teaching.com.au/page/mta-new-projects-after-school-care" },
            { name: "new-projects-early-childhood", link: "http://www.teaching.com.au/page/mta-new-projects-early-childhood" },
            { name: "new-projects-schools", link: "http://www.teaching.com.au/page/mta-new-projects-schools" },
            { name: "ourPeople", link: "http://www.teaching.com.au/page/mta-ourPeople" },
            { name: "privacy", link: "http://www.teaching.com.au/page/mta-privacy" },
            { name: "au-all-promotions", link: "http://www.teaching.com.au/page/mta-au-all-promotions" },
            { name: "au-videos", link: "http://www.teaching.com.au/page/mta-au-videos" },
            { name: "au-wonder-league", link: "http://www.teaching.com.au/page/mta-au-wonder-league" },
            { name: "au-wushka", link: "http://www.teaching.com.au/page/mta-au-wushka" },
            { name: "terms", link: "http://www.teaching.com.au/page/mta-terms" },
            { name: "pd-au-fundraising-about", link: "http://www.teaching.com.au/page/mta-pd-au-fundraising-about" },
            { name: "fundraising", link: "http://www.teaching.com.au/page/mta-fundraising" },
            { name: "fundraising-how-to", link: "http://www.teaching.com.au/page/mta-fundraising-how-to" },
            { name: "au-literacy-resources", link: "http://www.teaching.com.au/page/mta-au-literacy-resources" },
            { name: "au-robotics-airblock", link: "http://www.teaching.com.au/page/mta-au-robotics-airblock" },
            { name: "au-robotics-beebot", link: "http://www.teaching.com.au/page/mta-au-robotics-beebot" },
            { name: "au-robotics-bluebot", link: "http://www.teaching.com.au/page/mta-au-robotics-bluebot" },
            { name: "au-robotics-botley", link: "http://www.teaching.com.au/page/mta-au-robotics-botley" },
            { name: "au-robotics-codrone", link: "http://www.teaching.com.au/page/mta-au-robotics-codrone" },
            { name: "au-robotics-cozmo", link: "http://www.teaching.com.au/page/mta-au-robotics-cozmo" },
            { name: "au-robotics-cubelets", link: "http://www.teaching.com.au/page/mta-au-robotics-cubelets" },
            { name: "au-robotics-cubetto", link: "http://www.teaching.com.au/page/mta-au-robotics-cubetto" },
            { name: "au-robotics-cue", link: "http://www.teaching.com.au/page/mta-au-robotics-cue" },
            { name: "au-robotics-dashdot", link: "http://www.teaching.com.au/page/mta-au-robotics-dashdot" },
            { name: "au-robotics-edison", link: "http://www.teaching.com.au/page/mta-au-robotics-edison" },
            { name: "au-robotics-lego-ev3", link: "http://www.teaching.com.au/page/mta-au-robotics-lego-ev3" },
            { name: "au-robotics-lego-wedo", link: "http://www.teaching.com.au/page/mta-au-robotics-lego-wedo" },
            { name: "au-robotics-mbot", link: "http://www.teaching.com.au/page/mta-au-robotics-mbot" },
            { name: "au-robotics-mbot-ranger", link: "http://www.teaching.com.au/page/mta-au-robotics-mbot-ranger" },
            { name: "au-robotics-neuron", link: "http://www.teaching.com.au/page/mta-au-robotics-neuron" },
            { name: "au-robotics-parrot", link: "http://www.teaching.com.au/page/mta-au-robotics-parrot" },
            { name: "au-robotics-probot", link: "http://www.teaching.com.au/page/mta-au-robotics-probot" },
            { name: "au-robotics-products", link: "http://www.teaching.com.au/page/mta-au-robotics-products" },
            { name: "au-robotics-quirkbot", link: "http://www.teaching.com.au/page/mta-au-robotics-quirkbot" },
            { name: "au-robotics-robot-mouse", link: "http://www.teaching.com.au/page/mta-au-robotics-robot-mouse" },
            { name: "au-robotics-robotic-arm", link: "http://www.teaching.com.au/page/mta-au-robotics-robotic-arm" },
            { name: "au-robotics-sam-labs", link: "http://www.teaching.com.au/page/mta-au-robotics-sam-labs" },
            { name: "au-robotics-selector", link: "http://www.teaching.com.au/page/mta-au-robotics-selector" },
            { name: "au-robotics-sphero", link: "http://www.teaching.com.au/page/mta-au-robotics-sphero" },
            { name: "au-robotics-ultimate-bot", link: "http://www.teaching.com.au/page/mta-au-robotics-ultimate-bot" },
            { name: "au-robotics-xyz-bolide", link: "http://www.teaching.com.au/page/mta-au-robotics-xyz-bolide" },
            { name: "au-classroom-connect", link: "http://www.teaching.com.au/page/mta-au-classroom-connect" },
            { name: "earnandlearn-returns", link: "http://www.teaching.com.au/page/mta-earnandlearn-returns" },
            { name: "au-free-freight", link: "http://www.teaching.com.au/page/mta-au-free-freight" },
            { name: "au-new-items", link: "http://www.teaching.com.au/page/mta-au-new-items" },
            { name: "teacher-home", link: "http://www.teaching.com.au/page/mta-teacher-home" },
            { name: "entry catalogue", link: "https://www.teaching.com.au/catalogue/mta/mta-developmental-inclusion" },
            { name: "actual catalogue", link: "https://www.teaching.com.au/catalogue/mta/mta-baby-toddler-age0" },
            { name: "actual catalogue gallery view", link: "https://www.teaching.com.au/catalogue/mta/mta-baby-consumables-baby-wipes" },
            { name: "product", link: "https://www.teaching.com.au/product/NAS101" }
        ];
        const deviceList = [
            { name: "desktop", width: 1360, height: 768 },
            { name: "tablet", width: 768, height: 1024 },
            { name: "mobile", width: 360, height: 640 }
        ];

        const testList = [
            { name: "entry catalogue", link: "https://www.teaching.com.au/catalogue/mta/mta-developmental-inclusion" },
        ];

        const urlDevList = testList.map(url => {
            return { name: url.name, link: url.link.replace('www.teaching.com.au', 'www.dev.teaching.com.au') };
        });

        const subPath = "dev";
        const list = urlDevList;

        console.log(list);

        const browser = await puppeteer.launch({ headless: true, ignoreHTTPSErrors: true });
        const page = await browser.newPage();

        for (let i = 0; i < list.length; i++) {
            const url = list[i];

            await page.goto(url.link);
            await page.waitFor(3000);

            // change view mode on catalogue page
            if (url.name === "actual catalogue gallery view") {
                await page.click("span[title='Gallery view']");
                await page.waitFor(3000);
            }

            for (let j = 0; j < deviceList.length; j++) {
                const device = deviceList[j];
                console.log(`${url.name} ${device.name}`);
                const path = subPath ? `screenshot/${subPath}/${device.name}/` : `screenshot/${device.name}/`;
                const fileName = `${url.name}.png`;

                try {
                    mkdirp(path);
                } catch (error) {
                    console.log(error);
                }

                await page.setViewport(device);
                await page.waitFor(1000);
                if (!fs.exists(path + fileName)) {
                    await page.screenshot({ fullPage: true, path: path + fileName });
                }
            }
        }

        await browser.close();

    } catch (error) {
        console.log(`error: ${error}`);
    }
})();