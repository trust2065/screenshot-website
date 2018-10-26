## This tool will take screenshots by puppeteer  
giving list of **url**, list of **resolutions**, sub-folder name(optional)  
note: default directory is screenshot/{resolutions}/, you can make it screenshot/{sub-folder-name}/{resolution}/  
```
// example:
const urlList = [
            { name: "about", link: "http://www.teaching.com.au/page/mta-about" }
];
const deviceList = [
            { name: "desktop", width: 1360, height: 768 },
            { name: "tablet", width: 768, height: 1024 },
            { name: "mobile", width: 360, height: 640 }
];

```


