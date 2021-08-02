const embedScript = async () => {
  const config = await Config.getConfig();
  const lists = await Lists.getLists();
  const scriptTag = document.createElement('script');

  if (config.isOnPause) { return null}
  if (config.mode === "default") {
    const encodedCongig = btoa(JSON.stringify(config));
    scriptTag.src = chrome.runtime.getURL('src/cosnoleAlert.js');
    scriptTag.setAttribute("onLoad", `window.cosnoleAlert('${encodedCongig}');`);
    scriptTag.setAttribute("type", "module");
  }
  if (config.mode === "simple") { 
    scriptTag.src = chrome.runtime.getURL('src/cosnoleSimpleAlert.js');    
  }
  (document.head || document.documentElement).appendChild(scriptTag);
}

embedScript();
