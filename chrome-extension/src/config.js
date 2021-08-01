class Config {
	static CONFIG_KEY = "";
	static DEFULT_CONFIG = "";
	
	static init = (DEFULT_CONFIG, CONFIG_KEY) => {
		this.CONFIG_KEY = CONFIG_KEY;
		this.DEFULT_CONFIG = DEFULT_CONFIG;
	}

	static promisizer = (callback) => {
    const promise = new Promise((resolve, reject) => {
      try {callback(resolve, reject)}
      catch (err) {reject(err)}
    });
    return promise;
	}

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

export {Config};
