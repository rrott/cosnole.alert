class Lists {
  static LISTS_KEY = "cosnoleAlertLists";
  static EMPTY_LISTS = {
    allowList: [],
    blockList: [],
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

  static getList = (listType) => {
    return this.promisizer((resolve, reject) => {
      chrome.storage.local.get([this.LISTS_KEY], (result) => {
        if (chrome.runtime.lastError)
          reject(chrome.runtime.lastError);
        const list = result[this.LISTS_KEY][listType] ?? [];
        resolve(list);
      });
    });
  }

  static addToList = async (listType, data) => {
    const lists = await this.getLists();
    const updatedLists = {
    	...lists,
    	[listType]: [...lists[listType], ...data],
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
