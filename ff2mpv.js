function ff2mpv(url) {
    let gettingItem = browser.storage.sync.get(["height"]);

    gettingItem.then((item) => {
        browser.runtime.sendNativeMessage(
            "ff2mpv", {
                url: url, 
                ytdlformat: "bestvideo[height<=" + item["height"] + "]+bestaudio"
            })
    });
}

browser.contextMenus.create({
    id: "ff2mpv",
    title: "Play in MPV",
    contexts: ["link", "image", "video", "audio", "selection", "frame"],
    icons: {
        "16": "icons/icon_16x16.png",
        "32": "icons/icon_32x32.png",
        "48": "icons/icon_48x48.png",
        "64": "icons/icon_64x64.png",
        "256": "icons/icon_256x256.png"
    }
});

browser.contextMenus.create({
    id: "separator-1",
    type: "separator",
    contexts: ["link", "image", "video", "audio", "selection", "frame"]
});

browser.contextMenus.create({
    id: "quality-1",
    type: "radio",
    title: "144p",
    contexts: ["link", "image", "video", "audio", "selection", "frame"],
    checked: true
});

browser.contextMenus.create({
    id: "quality-2",
    type: "radio",
    title: "240p",
    contexts: ["link", "image", "video", "audio", "selection", "frame"],
    checked: false
});

browser.contextMenus.create({
    id: "quality-3",
    type: "radio",
    title: "360p",
    contexts: ["link", "image", "video", "audio", "selection", "frame"],
    checked: false
});

browser.contextMenus.create({
    id: "quality-4",
    type: "radio",
    title: "480p",
    contexts: ["link", "image", "video", "audio", "selection", "frame"],
    checked: false
});

browser.contextMenus.create({
    id: "quality-5",
    type: "radio",
    title: "720p",
    contexts: ["link", "image", "video", "audio", "selection", "frame"],
    checked: false
});

browser.contextMenus.create({
    id: "quality-6",
    type: "radio",
    title: "1080p",
    contexts: ["link", "image", "video", "audio", "selection", "frame"],
    checked: false
});

browser.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
        case "ff2mpv":
            /* These should be mutually exclusive, but,
               if they aren't, this is a reasonable priority.
            */
            url = info.linkUrl || info.srcUrl || info.selectionText || info.frameUrl;
            if (url) ff2mpv(url);
            break;
        case "quality-1":
            browser.storage.sync.set({ height: "144" });
            break;
        case "quality-2":
            browser.storage.sync.set({ height: "240" });
            break;
        case "quality-3":
            browser.storage.sync.set({ height: "360" });
            break;
        case "quality-4":
            browser.storage.sync.set({ height: "480" });
            break;
        case "quality-5":
            browser.storage.sync.set({ height: "720" });
            break;
        case "quality-6":
            browser.storage.sync.set({ height: "1080" });
            break;
    }
});

browser.browserAction.onClicked.addListener((tab) => {
    ff2mpv(tab.url);
});
