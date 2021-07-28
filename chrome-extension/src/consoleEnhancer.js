import {initToaster} from './toaster.js';

const consoleEnhancer =  (encodedConfig) => {
  const config = JSON.parse(atob(encodedConfig))
  window.cosnoleAlertConfig = config
  console.log('window.config', window.cosnoleAlertConfig)

  if (window.cosnoleAlertConfig?.isDisabled) {return null};
  const Toaster = initToaster()

  const originalConsoleObject = {
    log: console.log,
    warn: console.warn,
    info: console.info,
    error: console.error,
    table: console.table,
  }

  window.cosnoleAlertConfig?.customMethods.map((methodName) =>
    originalConsoleObject[methodName] = console[window.cosnoleAlertConfig?.logMethod || 'warn']
  );

  const formatMessage = ({methodName, args}) => {
    window.cosnoleAlertConfig?.alertTrigger && args.shift();
  	const message = window.cosnoleAlertConfig?.isStringifyInput ? JSON.stringify(args) : args;
    return window.cosnoleAlertConfig?.isShowAlertTitle ? `console.${methodName} message:\n${message}` : message;
  }

  const showAlert = (message) => 
    window[window.cosnoleAlertConfig?.alertMethod || "alert"](message);
 
  const showToast = ({message, methodName}) => {
    Toaster.add({
      message, methodName, 
      timeout: window.cosnoleAlertConfig?.toastTimeout,
    });
  }

  const showMessage = ({methodName, args}) => {
    const message = formatMessage({methodName, args});
    switch (window.cosnoleAlertConfig?.showToast) {
      case "all":
        showToast({message, methodName});
        break;
      case "none":
        showAlert(message);
        break;
      case "redefined":
        window.cosnoleAlertConfig?.redefinedMethods.includes(methodName)  
          ? showToast({message, methodName}) 
          : showAlert(message);
        break;
      case "custom":
        window.cosnoleAlertConfig?.customMethods.includes(methodName) &&
          showToast({message, methodName});
        break;
      default:
        showAlert(message);
    }
  }

  const consoleAlert = ({args, methodName}) => {
    const isShowAlert = !window.cosnoleAlertConfig?.alertTrigger || args[0] === window.cosnoleAlertConfig?.alertTrigger;
    const method = methodName || window.cosnoleAlertConfig?.logMethod;
    methodName && 
      originalConsoleObject[methodName] &&
      originalConsoleObject[methodName]("🔺", args);

    if (isShowAlert) {
      if (!window.cosnoleAlertConfig?.isOnPause) {
      	typeof window.cosnoleAlertConfig?.preHook == 'function' && window.cosnoleAlertConfig?.preHook({methodName, args});
        showMessage({methodName: method, args})
      	typeof window.cosnoleAlertConfig?.afterHook == 'function' &&  window.cosnoleAlertConfig?.afterHook({methodName, args});
      }
    }
  }

  const redefineConsoleMethod = ({methodName, args}) => {
    if (window.cosnoleAlertConfig?.alertTimeout) {
      setTimeout(consoleAlert, window.cosnoleAlertConfig?.alertTimeout, {methodName, args});
    } else {
      consoleAlert({methodName, args});
    }
  }

  [...window.cosnoleAlertConfig?.customMethods, ...window.cosnoleAlertConfig?.redefinedMethods].map((methodName) =>
    console[methodName] = (...args) => redefineConsoleMethod({args, methodName})
  )

  window.cosnoleAlertConfig?.customGlobalFunctions.map((methodName) =>
    window[methodName] = (...args) => redefineConsoleMethod({args})
  )
}

window.consoleEnhancer = consoleEnhancer;
