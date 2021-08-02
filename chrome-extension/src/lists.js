class Lists {
  static LISTS_KEY = "cosnoleAlertLists";
  static EMPTY_LISTS = {
    allowList: [],
    blockList: [],
    localhosts: [
      "127.0.0.1",
      "localhost"
    ]
  }

  static promisizer = (callback) => {
    const promise = new Promise((resolve, reject) => {
      try {callback(resolve, reject)}
      catch (err) {reject(err)}
    });
    return promise;
  }

  static getDefultLists = () => EMPTY_LISTS;

  static getLists = () => {
    return this.promisizer((resolve, reject) => {
      chrome.storage.local.get([this.LISTS_KEY], (result) => {
        if (chrome.runtime.lastError)
          reject(chrome.runtime.lastError);
        const lists = result[this.LISTS_KEY] ?? this.EMPTY_LISTS;
        resolve(lists);
      });
    });
  }

  static getList = (type) => {
    return this.promisizer((resolve, reject) => {
      chrome.storage.local.get([this.LISTS_KEY], (result) => {
        if (chrome.runtime.lastError)
          reject(chrome.runtime.lastError);
        const list = result[this.LISTS_KEY][type] ?? [];
        resolve(list);
      });
    });
  }

  static addToList = async (type, data) => {
    const lists = await this.getLists();
    const updatedLists = {
      ...lists,
      [type]: [...lists[type], ...data],
    }

    return this.promisizer((resolve, reject) => {
      chrome.storage.local.set({[this.LISTS_KEY]: updatedLists}, () => {           
        if (chrome.runtime.lastError)
          reject(chrome.runtime.lastError);
        resolve(updatedLists);
      });
    });
  }
}
