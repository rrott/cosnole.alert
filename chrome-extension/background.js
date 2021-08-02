importScripts('src/config.js');

chrome.runtime.onInstalled.addListener(async () => {
  const config = await Config.getDefultConfig();
  chrome.storage.sync.set({config});
});

chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  const config = await Config.getConfig();

  if (changeInfo.status === 'complete') {
    if (config.mode === "toasts") { 
      Promise.all([
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ["./src/toaster.js"]
        }),

        chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ["./src/cosnoleToast.js"]
        })
      ])
    }
  }
});


// chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
//   if (changeInfo.status === 'complete' && /^http/.test(tab.url)) {
//   }
// });

