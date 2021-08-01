const CONFIG_KEY = 'cosnoleAlertConfig';
const DEFULT_CONFIG = {
  mode: "default",          // ["default", "toasts", "simple"]
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
  allowlist: [],
  blockList: [],
  preHook: ({methodName, args}) => {}, // function to be run before the alert()
  afterHook: ({methodName, args}) => {}, // function to be run after the alert()
}

class Config {
	static promisizer = (callback) => {
    const promise = new Promise((resolve, reject) => {
      try {callback(resolve, reject)}
      catch (err) {reject(err)}
    });
    return promise;
	}

  static getConfig = () => {
    return this.promisizer((resolve, reject) => {
      chrome.storage.local.get([CONFIG_KEY], (result) => {
        if (chrome.runtime.lastError)
          reject(chrome.runtime.lastError);
        const config = result[CONFIG_KEY] ?? DEFULT_CONFIG;
        resolve(config);
      });
    });
  }

  static setConfig = async (options) => {
    const config = await this.getConfig();
    const updatedConfig = {...config, ...options};

    return this.promisizer((resolve, reject) => {
      chrome.storage.local.set({[CONFIG_KEY]: updatedConfig}, () => {           
        if (chrome.runtime.lastError)
          reject(chrome.runtime.lastError);
        resolve(updatedConfig);
      });
    });
  }
}

export {Config};
