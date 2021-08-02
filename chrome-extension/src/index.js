const embedScript = async () => {
  const config = await Config.getConfig();
  const encodedCongig = btoa(JSON.stringify(config));
  const scriptTag = document.createElement('script');

  if (config.mode === "default") {
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
