import {initToaster} from './toaster.js';
import {DEFAULT_LOG_METHOD, DEFAULT_ALERT_METHOD} from './constants.js';

const consnoleAlert =  (encodedConfig) => {
  window.cosnoleAlertConfig = JSON.parse(atob(encodedConfig));
  if (window.cosnoleAlertConfig?.isDisabled) {return null};

  const Toaster = initToaster();
  const originalConsoleObject = {
    log:   console.log,
    warn:  console.warn,
    info:  console.info,
    error: console.error,
    table: console.table,
  }

  // add custom methods to originalConsoleObject. link them to console.warn()
  window.cosnoleAlertConfig?.customMethods.map((methodName) =>
    originalConsoleObject[methodName] = console[window.cosnoleAlertConfig?.logMethod || DEFAULT_LOG_METHOD]
  );

  const formatMessage = ({methodName, args}) => {
    window.cosnoleAlertConfig?.alertTrigger && args.shift();
  	const message = window.cosnoleAlertConfig?.isStringifyInput ? JSON.stringify(args) : args;
    return  window.cosnoleAlertConfig?.isShowAlertTitle 
            ? `console.${methodName} message:\n${message}`
            : message;
  }

  const showAlert = ({message}) => 
    window[window.cosnoleAlertConfig?.alertMethod || DEFAULT_ALERT_METHOD](message);
 
  const showToast = ({methodName, message}) =>
    Toaster.add({
      message, methodName, 
      timeout: window.cosnoleAlertConfig?.toastHideTimeout,
    });

  const showMessage = ({methodName, message}) => {
    const isCustom = window.cosnoleAlertConfig?.customMethods.includes(methodName);
    const isRedefined = window.cosnoleAlertConfig?.redefinedMethods.includes(methodName);
    
    switch (window.cosnoleAlertConfig?.showToastsFor) {
      case "all":
        showToast({methodName, message});
        break;
      case "redefined":
        isRedefined && showToast({methodName, message}) 
        break;
      case "custom":
        isCustom && showToast({methodName, message});
        break;
    }
    switch (window.cosnoleAlertConfig?.showAlertsFor) {
      case "all":
        showAlert({methodName, message});
        break;
      case "redefined":
        isRedefined && showAlert({message, methodName}) 
        break;
      case "custom":
        isCustom && showAlert({message, methodName});
        break;
    }
  }

  const customConsoleAlert = ({methodName, args}) => {
    const isShowAlert = !window.cosnoleAlertConfig?.alertTrigger || args[0] === window.cosnoleAlertConfig?.alertTrigger;

    originalConsoleObject[methodName] && 
      originalConsoleObject[methodName](...args);

    if (isShowAlert) {
      if (!window.cosnoleAlertConfig?.isOnPause) {
      	typeof window.cosnoleAlertConfig?.preHook == 'function' && window.cosnoleAlertConfig?.preHook({methodName, args});
        showMessage({
          methodName: methodName || window.cosnoleAlertConfig?.logMethod,
          message: formatMessage({methodName, args})
        })
      	typeof window.cosnoleAlertConfig?.afterHook == 'function' &&  window.cosnoleAlertConfig?.afterHook({methodName, args});
      }
    }
  }

  const redefineConsoleMethod = ({methodName, args}) => {
    if (window.cosnoleAlertConfig?.alertShowTimeout) {
      setTimeout(customConsoleAlert, window.cosnoleAlertConfig?.alertShowTimeout, {methodName, args});
    } else {
      customConsoleAlert({methodName, args});
    }
  }

  [...window.cosnoleAlertConfig?.customMethods, ...window.cosnoleAlertConfig?.redefinedMethods].map((methodName) =>
    console[methodName] = (...args) => redefineConsoleMethod({args, methodName})
  )

  window.cosnoleAlertConfig?.customGlobalFunctions.map((methodName) =>
    window[methodName] = (...args) => redefineConsoleMethod({args})
  )
}

window.consnoleAlert = consnoleAlert;
