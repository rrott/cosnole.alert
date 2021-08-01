import {Config} from './config.js';

const DEFULT_CONFIG = {
  allowlist: [],
  blockList: [],
}
const APP_MODES = ["default", "toasts", "simple"];
const REDEFINED_METHODS_LIST = ["log", "warn", "info", "error", "table"];
const RESERVED_WORDS = [
  "abstract", "arguments", "await", "boolean", "break", "byte", "case", "catch", "char", 
  "class", "const", "continue", "debugger", "default", "delete", "do", "double", "else", 
  "enum", "eval", "export", "extends", "false", "final", "finally", "float", "for", 
  "function", "goto", "if", "implements", "import", "in", "instanceof", "int", "interface", 
  "let", "long", "native", "new", "null", "package", "private", "protected", "public", "return", 
  "short", "static", "super", "switch", "synchronized", "this", "throw", "throws", "transient", 
  "true", "try", "typeof", "var", "void", "volatile", "while", "with", "yield"
];

document.addEventListener('DOMContentLoaded', async () => {
  let config = await Config.getConfig();
  window.cosnoleAlertConfig = config;

  const elements = {
    header: {
      pauseButton: document.getElementById('pauseButton'),
      disableButton: document.getElementById('disableButton'),
      closeToastsButton: document.getElementById('closeToastsButton'),
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
  }

  const setIsOnPause = (isOnPause) => {
    const className = isOnPause ? 'buttons__pause_active' : 'buttons__pause';
    elements.header.pauseButton.innerHTML = isOnPause ? "[paused]" : "[pause]";
    elements.header.pauseButton.className = className;
  }

  const setIsDisabled = (isDisabled) => {
    const className = isDisabled ? 'buttons__disable_active' : 'buttons__disable';
    elements.header.disableButton.innerHTML = isDisabled ? "[disabled]" : "[disable]";
    elements.header.disableButton.className = className;
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
    setIsDisabled(config.isDisabled);
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
    setAlertMethod(config.alertMethod);
    setLogMethod(config.logMethod);
    setPreHook(config.preHook);
    setAfterHook(config.afterHook);
    setAllowList(config.allowList);
    setBlockList(config.blockList);
    setListOptions({
      isUseAllowList: config.isUseAllowList,
      isUseBlockList: config.isUseBlockList,
      isUseForLocalhost: config.isUseForLocalhost
    });
  }

  const init = () => {
    setInitialValues();
    
    // add handlers
    elements.header.resetConfigButton.onclick = async () => {
      await Config.resetConfig();
      config = await Config.getConfig();
      window.cosnoleAlertConfig = config;
      setInitialValues();
    }

    elements.header.pauseButton.onclick = () => {
      setIsOnPause(!config.isOnPause);
      setConfig({isOnPause: !config.isOnPause});
    }
    
    elements.header.disableButton.onclick = () => {
      setIsDisabled(!config.isDisabled);
      setConfig({isDisabled: !config.isDisabled});
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
      setConfig({allowList});
    }

    elements.lists.blockList.onchange = (e) => {
      let blockList = (e.target.value) || null;
      setBlockList(blockList);
      setConfig({blockList});
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
