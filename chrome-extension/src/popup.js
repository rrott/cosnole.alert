document.addEventListener('DOMContentLoaded', async () => {
  let lists = await Lists.getLists();
  let config = await Config.getConfig();

  const elements = {
    header: {
      pauseButton: document.getElementById('pauseButton'),
      reloadPageButton: document.getElementById('reloadPageButton'),
      resetConfigButton: document.getElementById('resetConfigButton'),
    },
    mode: {
      default: document.getElementById('defaultMode'),
      toasts: document.getElementById('toastsMode'),
      simple: document.getElementById('simpleMode'),         
    },
    redefinedMethods: {
      table: document.getElementById('tableMethod'),
      error: document.getElementById('errorMethod'),
      warn: document.getElementById('warnMethod'),
      info: document.getElementById('infoMethod'),
      log: document.getElementById('logMethod'),
    },
    customMethods: {
      alert: document.getElementById('customConsoleAlertMethod'),
      methods: document.getElementById('customConsoleMethods'),
    },
    customGlobalMethods: {
      methods: document.getElementById('customGlobalMethods'),
    },
    showAlertsFor: document.getElementById('showAlertsFor'),
    showToastsFor: document.getElementById('showToastsFor'),
    alertShowTimeout: document.getElementById('alertShowTimeout'),
    toastHideTimeout: document.getElementById('toastHideTimeout'),
    alertTrigger: document.getElementById('alertTrigger'),
    alertRegexp: document.getElementById('alertRegexp'),
    alertMethod: document.getElementById('alertMethod'),
    logMethod: document.getElementById('logMethod'),
    preHook: document.getElementById('preHook'),
    afterHook: document.getElementById('afterHook'),
    lists: {
      allowList: document.getElementById('allowList'),
      blockList: document.getElementById('blockList'),
      isUseAllowList: document.getElementById('isUseAllowList'),
      isUseBlockList: document.getElementById('isUseBlockList'),
      isUseForLocalhost: document.getElementById('isUseForLocalhost'),
    },
    blocks: {
      default: document.querySelectorAll(".default-mode"),
      toasts: document.querySelectorAll(".toasts-mode"),
      simple: []
    }

  }

  const setConfig = async (options) => {
    config = {...config, ...options};
    await Config.setConfig(options);
    elements.header.reloadPageButton.className = "buttons__reload_active";
  }

  const addToList = async (listType, data) => {
    lists[listType] = data;
    await Lists.addToList(listType, data);
    elements.header.reloadPageButton.className = "buttons__reload_active";
  }

  const setIsOnPause = (isOnPause) => {
    const className = isOnPause ? 'buttons__pause_active' : 'buttons__pause';
    elements.header.pauseButton.innerHTML = isOnPause ? "[paused]" : "[pause]";
    elements.header.pauseButton.className = className;
  }

  const setMode = (mode) => {
    APP_MODES.map((appMode) => {
      elements.mode[appMode].checked = mode === appMode;
      elements.blocks[appMode]?.forEach((block) =>
        block.classList.add("disabled")
      );
    });
    elements.blocks[mode]?.forEach((block) =>
      block.classList.remove("disabled")
    );
  }

  const addChnageModeHandlers = () => {
    APP_MODES.map((mode) => 
      elements.mode[mode].onclick = async () => {
        setMode(mode);
        setConfig({mode});
      }
    )
  }

  const setRedefinedMethods = (redefinedMethods) => {
    REDEFINED_METHODS_LIST.map((methodName) =>
      elements.redefinedMethods[methodName].checked = redefinedMethods.includes(methodName)
    );
  }

  const addChnageRedefinedMethodsHandlers = () => {
    REDEFINED_METHODS_LIST.map((method) => 
      elements.redefinedMethods[method].onclick = async () => {
        let redefinedMethods = config.redefinedMethods;
        if (redefinedMethods.includes(method)) {
          redefinedMethods = redefinedMethods.filter((m) => m !== method);
        } else {
          redefinedMethods = [...redefinedMethods, method];
        }

        setRedefinedMethods(redefinedMethods);
        setConfig({redefinedMethods});
      }
    )
  }

  const setCustomAlertMethod = (customMethods) => {
    elements.customMethods.alert.checked = customMethods.includes("alert")
  }

  const setCustomMethods = (customMethods) => {
    customMethods = customMethods.filter((m) => m !== "alert");
    elements.customMethods.methods.value = customMethods.join(', ');
  }

  const setCustomGlobalMethods = (customGlobalMethods) => {
    elements.customGlobalMethods.methods.value = customGlobalMethods.join(', ');
  }

  const setShowAlertsFor = (showAlertsFor) => {
    elements.showAlertsFor.value = showAlertsFor;
  }

  const setShowToastsFor = (showToastsFor) => {
    elements.showToastsFor.value = showToastsFor;
  }

  const setAlertShowTimeout = (alertShowTimeout) => {
    elements.alertShowTimeout.value = alertShowTimeout;
  }

  const setToastHideTimeout = (toastHideTimeout) => {
    elements.toastHideTimeout.value = toastHideTimeout;
  }

  const setAlertTrigger = (alertTrigger) => {
    elements.alertTrigger.value = alertTrigger;
  }

  const setAlertRegexp = (alertRegexp) => {
    elements.alertRegexp.value = alertRegexp;
  }

  const setAlertMethod = (alertMethod) => {
    elements.alertMethod.value = alertMethod;
  }

  const setLogMethod = (logMethod) => {
    elements.logMethod.value = logMethod;
  }

  const setPreHook = (preHook) => {
    elements.preHook.value = preHook;
  }

  const setAfterHook = (afterHook) => {
    elements.afterHook.value = afterHook;
  }

  const setAllowList = (allowList) => {
    elements.lists.allowList.value = allowList;
  }

  const setBlockList = (blockList) => {
    elements.lists.blockList.value = blockList;
  }

  const setListOptions = (listOptions) => {
    elements.lists.isUseAllowList.checked = listOptions.isUseAllowList;
    elements.lists.isUseBlockList.checked = listOptions.isUseBlockList;
    elements.lists.isUseForLocalhost.checked = listOptions.isUseForLocalhost;
    elements.lists.allowList.classList.add("disabled");
    elements.lists.blockList.classList.add("disabled");

    if (listOptions.isUseAllowList) {
      elements.lists.allowList.classList.remove("disabled");
    } else if (listOptions.isUseBlockList) {
      elements.lists.blockList.classList.remove("disabled");
    } 
  }

  const setInitialValues = () => {
    setIsOnPause(config.isOnPause);
    setMode(config.mode);
    setRedefinedMethods(config.redefinedMethods);
    setCustomAlertMethod(config.customMethods);
    setCustomMethods(config.customMethods);
    setCustomGlobalMethods(config.customGlobalMethods);
    setShowAlertsFor(config.showAlertsFor);
    setShowToastsFor(config.showToastsFor);
    setAlertShowTimeout(config.alertShowTimeout);
    setToastHideTimeout(config.toastHideTimeout);
    setAlertTrigger(config.alertTrigger);
    setAlertRegexp(config.alertRegexp);
    setAlertMethod(config.alertMethod);
    setLogMethod(config.logMethod);
    setPreHook(config.preHook);
    setAfterHook(config.afterHook);
    setAllowList(lists.allowList.join("\n"));
    setBlockList(lists.blockList.join("\n"));
    setListOptions({
      isUseAllowList: config.isUseAllowList,
      isUseBlockList: config.isUseBlockList,
      isUseForLocalhost: config.isUseForLocalhost
    });
  }

  const init = () => {
    setInitialValues();

    window.addEventListener('click', (e) => {
      if(e.target.href !== undefined){
        chrome.tabs.create({url: e.target.href})
      }
    })

    // add handlers
    elements.header.resetConfigButton.onclick = async () => {
      await Config.resetConfig();
      config = await Config.getConfig();
      setInitialValues();
    }

    elements.header.reloadPageButton.onclick = () => {
      chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        chrome.tabs.update(tabs[0].id, {url: tabs[0].url});
      });
      elements.header.reloadPageButton.className = "buttons__reload";
    }

    elements.header.pauseButton.onclick = () => {
      setIsOnPause(!config.isOnPause);
      setConfig({isOnPause: !config.isOnPause});
    }

    addChnageModeHandlers();
    addChnageRedefinedMethodsHandlers();

    elements.customMethods.alert.onclick = () => {
      let customMethods = config.customMethods;
      if (customMethods.includes("alert")) {
        customMethods = customMethods.filter((m) => m !== "alert");
      } else {
        customMethods = [...customMethods, "alert"];
      }
      setCustomAlertMethod(customMethods);
      setConfig({customMethods});
    }

    elements.customMethods.methods.onchange = (e) => {
      let customMethods = config.customMethods;
      let enteredMethods = e.target.value?.split(',') || [];
      let methods = enteredMethods.map((method) =>
        method.replace(/[^\w]/gi, '')
      ).filter(Boolean);
      methods = methods.filter((m) => m !== "alert");
      methods = methods.filter((m) => !RESERVED_WORDS.includes(m));
      methods = methods.filter((m) => !(m in window.console));
      
      if (customMethods.includes("alert")) {
        customMethods = [...methods, "alert"]
      } else {
        customMethods = methods;
      }
      setCustomMethods(customMethods);
      setConfig({customMethods});
    }

    elements.customGlobalMethods.methods.onchange = (e) => {
      let customGlobalMethods = config.customGlobalMethods;
      let enteredMethods = e.target.value?.split(',') || [];
      let methods = enteredMethods.map((method) =>
        method.replace(/[^\w]/gi, '')
      ).filter(Boolean);
      methods = methods.filter((m) => !RESERVED_WORDS.includes(m));
      methods = methods.filter((m) => !(m in window));

      setCustomGlobalMethods(methods);
      setConfig({customGlobalMethods});
    }

    elements.showAlertsFor.onchange = (e) => {
      let showAlertsFor = e.target.value || "all";
      setShowAlertsFor(showAlertsFor);
      setConfig({showAlertsFor});
    }

    elements.showToastsFor.onchange = (e) => {
      let showToastsFor = e.target.value || "all";
      setShowToastsFor(showToastsFor);
      setConfig({showToastsFor});
    }

    elements.alertShowTimeout.onchange = (e) => {
      let alertShowTimeout = Math.abs(Number(e.target.value)) || null;
      setAlertShowTimeout(alertShowTimeout);
      setConfig({alertShowTimeout});
    }

    elements.toastHideTimeout.onchange = (e) => {
      let toastHideTimeout = Math.abs(Number(e.target.value)) || null;
      setToastHideTimeout(toastHideTimeout);
      setConfig({toastHideTimeout});
    }

    elements.alertTrigger.onchange = (e) => {
      let alertTrigger = (e.target.value);
      alertTrigger = alertTrigger?.replace(/[^\w\s]/gi, '')  || null;
      setAlertTrigger(alertTrigger);
      setConfig({alertTrigger});
    }

    elements.alertRegexp.onchange = (e) => {
      let alertRegexp = (e.target.value);
      setAlertRegexp(alertRegexp);
      setConfig({alertRegexp});
    }

    elements.alertMethod.onchange = (e) => {
      let alertMethod = (e.target.value) || "alert";
      setAlertMethod(alertMethod);
      setConfig({alertMethod});
    }

    elements.logMethod.onchange = (e) => {
      let logMethod = (e.target.value) || "info";
      setLogMethod(logMethod);
      setConfig({logMethod});
    }

    elements.preHook.onchange = (e) => {
      const preHook = e.target.value || null;
      setPreHook(preHook);
      setConfig({preHook});
    }

    elements.afterHook.onchange = (e) => {
      let afterHook = (e.target.value) || null;
      setAfterHook(afterHook);
      setConfig({afterHook});
    }

    elements.lists.allowList.onchange = (e) => {
      let allowList = (e.target.value) || null;
      setAllowList(allowList);
      addToList("allowList", allowList.split("\n"));
    }

    elements.lists.blockList.onchange = (e) => {
      let blockList = (e.target.value) || null;
      setBlockList(blockList);
      addToList("blockList", blockList.split("\n"));
    }

    elements.lists.isUseAllowList.onclick = () => {
      const options = {
        isUseAllowList: !config.isUseAllowList,
        isUseBlockList: false,
        isUseForLocalhost: false
      }
      setListOptions(options);
      setConfig(options);
    }

    elements.lists.isUseBlockList.onclick = () => {
      const options = {
        isUseAllowList: false,
        isUseBlockList: !config.isUseBlockList,
        isUseForLocalhost: false
      }
      setListOptions(options);
      setConfig(options);
    }

    elements.lists.isUseForLocalhost.onclick = () => {
      const options = {
        isUseAllowList: false,
        isUseBlockList: false,
        isUseForLocalhost: !config.isUseForLocalhost
      }
      setListOptions(options);
      setConfig(options);
    }
  }

  init();
});
