const embedScript = () => {
  const isRemoveFromDom = false;
  const scriptTag = document.createElement('script');
  scriptTag.setAttribute("type", "module");
  scriptTag.src = chrome.extension.getURL('consoleReplacer.js');

  if (isRemoveFromDom) {
    scriptTag.addEventListener('load', () =>
      this.parentNode.removeChild(this)
    );
  }
  (document.head || document.documentElement).appendChild(scriptTag);
}

embedScript();