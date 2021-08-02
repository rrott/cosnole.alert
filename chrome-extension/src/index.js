const embedScript = async () => {
  const config = await Config.getConfig();
  let isEnabled = true;

  if (config.isOnPause) {return null}
  if (config.isUseAllowList || config.isUseBlockList || config.isUseForLocalhost) {
    const hostname = window.location.hostname;

    if (config.isUseAllowList) {
      list = await Lists.getList('allowList');
      isEnabled = !!list.find(item => hostname.indexOf(item) >= 0);
    }
    if (config.isUseBlockList) {
      list = await Lists.getList('blockList');
      isEnabled = !list.find(item => hostname.indexOf(item) >= 0);
    }
    if (config.isUseForLocalhost) {
      list = ["127.0.0.1", "localhost"];
      isEnabled = !!list.find(item => hostname.indexOf(item) >= 0);
    }
  }

  if (!isEnabled) {return null}
  const scriptTag = document.createElement('script');

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
