const embedScript = () => {
  const DEFULT_CONFIG = {
    isOnPause: false,         // if true, console object is redefined but no alerts are triggered
    isDisabled: false,        // if true, console object left as is
    alertShowTimeout: 0,      // sleep before triggering alert
    toastHideTimeout: 0,      // auto-hide toasts
    alertTrigger: "",         // custom "stop-word" that triggers the alert
    alertMethod: "alert",     // "alert", "promt" or "confirm"
    logMethod: "warn",        // "log", "warn", "info" or "error"
    showToastsFor: "all",     // "all", "none", "redefined", "custom"
    showAlertsFor: "none",    // "all", "none", "redefined", "custom"
    customMethods: ["alert"], // adds additional custom methods to the console object
    redefinedMethods: ["log", "warn", "info", "error", "table"], // list of console object methods to redefine
    customGlobalFunctions: ['p'],   // if not empty, adds it as an alert() to the window object
    preHook: ({methodName, args}) => {}, // function to be run before the alert()
    afterHook: ({methodName, args}) => {}, // function to be run after the alert()
  }

  const encodedCongig = btoa(JSON.stringify(DEFULT_CONFIG));
  const scriptTag = document.createElement('script');
  scriptTag.src = chrome.runtime.getURL('src/cosnoleAlert.js');
  scriptTag.setAttribute("onLoad", `window.consnoleAlert('${encodedCongig}');`);
  scriptTag.setAttribute("type", "module");

  res = (document.head || document.documentElement).appendChild(scriptTag);

}

embedScript();
