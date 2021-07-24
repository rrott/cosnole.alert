// const tabId = getTabId();


chrome.action.onClicked.addListener(async (tab) => {
  let userReq = await fetch('https://example.com/user-data.json');
  let user = await userReq.json();
  let givenName = user.givenName || '<GIVEN_NAME>';

  chrome.scripting.executeScript({
    target: {tabId: tab.id},
    files: ['src/consoleReplacer.js']
    args: [givenName],
  });
});

// chrome.scripting.executeScript(
//   {
//     target: {tabId: tabId, allFrames: true},
//     files: ['src/consoleReplacer.js'],
//   },
//   () => {
//     // const isRemoveFromDom = false;
//     // const scriptTag = document.createElement('script');
//     // scriptTag.setAttribute("type", "module");
//     // scriptTag.src = chrome.extension.getURL('src/consoleReplacer.js');

//     // if (isRemoveFromDom) {
//     //   scriptTag.addEventListener('load', () =>
//     //     this.parentNode.removeChild(this)
//     //   );
//     // }
//     // (document.head || document.documentElement).appendChild(scriptTag);
//   }
// );

