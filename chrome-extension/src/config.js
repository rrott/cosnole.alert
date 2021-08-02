class Config {
  static CONFIG_KEY = "cosnoleAlertConfig";
  static DEFULT_CONFIG = {
    mode: "default",          // ["default", "toasts", "simple"]
    isOnPause: false,         // if true, console object is redefined but no alerts are triggered
    alertShowTimeout: null,   // sleep before triggering alert
    toastHideTimeout: null,   // auto-hide toasts
    alertTrigger: "",         // custom "stop-word" that triggers the alert
    alertMethod: "alert",     // "alert", "promt" or "confirm"
    logMethod: "warn",        // "log", "warn", "info" or "error"
    showToastsFor: "all",     // "all", "none", "redefined", "custom"
    showAlertsFor: "custom",  // "all", "none", "redefined", "custom"
    customMethods: ["alert"], // adds additional custom methods to the console object
    redefinedMethods: ["log", "warn", "info", "error", "table"], // list of console object methods to redefine
    customGlobalMethods: ['p'],   // if not empty, adds it as an alert() to the window object
    isUseAllowList: false,
    isUseBlockList: false,
    isUseForLocalhost: false,
    preHook: null, // function to be run before the alert()
    afterHook: null, // function to be run after the alert()
  }

  static promisizer = (callback) => {
    const promise = new Promise((resolve, reject) => {
      try {callback(resolve, reject)}
      catch (err) {reject(err)}
    });
    return promise;
  }

  static getDefultConfig = () => DEFULT_CONFIG;

  static getConfig = () => {
    return this.promisizer((resolve, reject) => {
      chrome.storage.local.get([this.CONFIG_KEY], (result) => {
        if (chrome.runtime.lastError)
          reject(chrome.runtime.lastError);
        const config = result[this.CONFIG_KEY] ?? this.DEFULT_CONFIG;
        resolve(config);
      });
    });
  }

  static setConfig = async (options) => {
    const config = await this.getConfig();
    const updatedConfig = {...config, ...options};

    return this.promisizer((resolve, reject) => {
      chrome.storage.local.set({[this.CONFIG_KEY]: updatedConfig}, () => {           
        if (chrome.runtime.lastError)
          reject(chrome.runtime.lastError);
        resolve(updatedConfig);
      });
    });
  }

  static resetConfig = () => {
    return this.promisizer((resolve, reject) => {
      chrome.storage.local.set({[this.CONFIG_KEY]: this.DEFULT_CONFIG}, () => {           
        if (chrome.runtime.lastError)
          reject(chrome.runtime.lastError);
        resolve(this.DEFULT_CONFIG);
      });
    });
  }
}
