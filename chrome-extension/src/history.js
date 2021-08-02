class History {
  static HISTORY_KEY = "cosnoleAlertHistory";
  static EMPTY_HISTORY = {
    all: [],
    console: [],
    browser: [],
  }

  static promisizer = (callback) => {
    const promise = new Promise((resolve, reject) => {
      try {callback(resolve, reject)}
      catch (err) {reject(err)}
    });
    return promise;
  }

  static getDefultHistory = () => EMPTY_HISTORY;

  static getHistorys = () => {
    return this.promisizer((resolve, reject) => {
      chrome.storage.local.get([this.HISTORY_KEY], (result) => {
        if (chrome.runtime.lastError)
          reject(chrome.runtime.lastError);
        const history = result[this.HISTORY_KEY] ?? this.EMPTY_HISTORY;
        resolve(history);
      });
    });
  }

  static getHistory = (type) => {
    return this.promisizer((resolve, reject) => {
      chrome.storage.local.get([this.HISTORY_KEY], (result) => {
        if (chrome.runtime.lastError)
          reject(chrome.runtime.lastError);
        const list = result[this.HISTORY_KEY][type] ?? [];
        resolve(list);
      });
    });
  }

  static addToHistory = async (type, data) => {
    const history = await this.getHistorys();
    const updatedHistory = {
      ...history,
      [type]: [...history[type], ...data],
    }

    return this.promisizer((resolve, reject) => {
      chrome.storage.local.set({[this.HISTORY_KEY]: updatedHistory}, () => {           
        if (chrome.runtime.lastError)
          reject(chrome.runtime.lastError);
        resolve(updatedHistory);
      });
    });
  }

  static rcleanHistory = () => {
    return this.promisizer((resolve, reject) => {
      chrome.storage.local.set({[this.HISTORY_KEY]: this.EMPTY_HISTORY}, () => {           
        if (chrome.runtime.lastError)
          reject(chrome.runtime.lastError);
        resolve(this.EMPTY_HISTORY);
      });
    });
  }
}
