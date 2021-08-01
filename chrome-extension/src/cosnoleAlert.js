import {initToaster} from './toaster.js';

const DEFAULT_LOG_METHOD = 'warn';
const DEFAULT_ALERT_METHOD = 'alert';
const NONOBJECT_TYPES = ['number', "bigint", 'string', 'boolean', 'undefined'];

const cosnoleAlert =  (encodedConfig) => {
  window.cosnoleAlertConfig = JSON.parse(atob(encodedConfig));
  if (window.cosnoleAlertConfig?.isDisabled) {return null};

  const Toaster = initToaster();
  const originalConsoleObject = {
    log: console.log,
    warn: console.warn,
    info: console.info,
    error: console.error,
    table: console.table,
  };

  window.cosnoleAlertConfig?.customMethods.map((methodName) =>
    originalConsoleObject[methodName] = console[
      window.cosnoleAlertConfig?.logMethod || DEFAULT_LOG_METHOD
    ]
  );

  const formatAlertMessage = ({methodName, args}) => {
    window.cosnoleAlertConfig?.alertTrigger && args.shift();
    return `console.${methodName} message:\n${args}`;
  }

  const formatToastMessage = ({methodName, args}) => {
    window.cosnoleAlertConfig?.alertTrigger && args.shift();
    const messages = args.map((arg) => {
      return {
        arg, 
        type: typeof arg,
        parsed: JSON.stringify(arg),
        isNonObject: NONOBJECT_TYPES.includes(typeof arg),
      }
    })
    return {title: `console.${methodName}`, messages}
  }

  const showAlert = ({methodName, args}) => {
    const message = formatAlertMessage({methodName, args});
    window[window.cosnoleAlertConfig?.alertMethod || DEFAULT_ALERT_METHOD](message);
  }
 
  const showToast = ({methodName, args}) => {
    const message = formatToastMessage({methodName, args});
    Toaster.add({
      message, methodName, 
      timeout: window.cosnoleAlertConfig?.toastHideTimeout * 1000,
    });
  }

  const showMessage = ({methodName, args}) => {
    const isCustom = window.cosnoleAlertConfig?.customMethods.includes(methodName);
    const isRedefined = window.cosnoleAlertConfig?.redefinedMethods.includes(methodName);
    
    switch (window.cosnoleAlertConfig?.showToastsFor) {
      case "all":
        showToast({methodName, args});
        break;
      case "redefined":
        isRedefined && showToast({methodName, args}) 
        break;
      case "custom":
        isCustom && showToast({methodName, args});
        break;
    }
    switch (window.cosnoleAlertConfig?.showAlertsFor) {
      case "all":
        showAlert({methodName, args});
        break;
      case "redefined":
        isRedefined && showAlert({methodName, args}) 
        break;
      case "custom":
        isCustom && showAlert({methodName, args});
        break;
    }
  }

  const customConsoleAlert = ({methodName, args}) => {
    const isShowAlert = !window.cosnoleAlertConfig?.alertTrigger || args[0] === window.cosnoleAlertConfig?.alertTrigger;
    const isRunPreHook = typeof window.cosnoleAlertConfig?.preHook === 'function';
    const isRunAfterHook = typeof window.cosnoleAlertConfig?.afterHook === 'function';
    originalConsoleObject[methodName] && 
      originalConsoleObject[methodName](...args);

    if (isShowAlert) {
      if (!window.cosnoleAlertConfig?.isOnPause) {
      	isRunPreHook && window.cosnoleAlertConfig?.preHook({methodName, args});
        showMessage({methodName: methodName || window.cosnoleAlertConfig?.logMethod, args});
      	isRunAfterHook &&  window.cosnoleAlertConfig?.afterHook({methodName, args});
      }
    }
  }

  const redefineConsoleMethod = ({methodName, args}) => {
    if (window.cosnoleAlertConfig?.alertShowTimeout) {
      setTimeout(
        customConsoleAlert,
        window.cosnoleAlertConfig?.alertShowTimeout * 1000,
        {methodName, args}
      );
    } else {
      customConsoleAlert({methodName, args});
    }
  }

  [...window.cosnoleAlertConfig?.customMethods, ...window.cosnoleAlertConfig?.redefinedMethods].map((methodName) =>
    console[methodName] = (...args) => redefineConsoleMethod({args, methodName})
  )

  window.cosnoleAlertConfig?.customGlobalMethods.map((methodName) => {
    if (!(methodName in window)) {
      window[methodName] = (...args) => redefineConsoleMethod({args});
    }
  })
}

window.cosnoleAlert = cosnoleAlert;
