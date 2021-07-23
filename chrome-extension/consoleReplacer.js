import {DEFULT_CONFIG} from './constants.js';
import {initToaster} from './toaster.js';

const originalConsoleObject = {
  log: console.log,
  warn: console.warn,
  info: console.info,
  error: console.error,
}

const redefineConsoleMethods = (config) => {
	if (config.isDisabled) {return null}
  const Toaster = initToaster();

  config.customMethods.map((methodName) =>
    originalConsoleObject[methodName] = console[config.logMethod || 'warn']
  );

  const formatMessage = ({methodName, args}) => {
    config.alertTrigger && args.shift();
  	const message = config.isStringifyInput ? JSON.stringify(args) : args;
    return config.isShowAlertTitle ? `console.${methodName} message:\n${message}` : message;
  }

  const showAlert = (message) => 
    window[config.alertMethod || "alert"](message);
 
  const showToast = ({message, methodName}) => {
    Toaster.add({
      message, methodName, 
      timeout: config.toastTimeout,
    });
  }

  const showMessage = ({methodName, args}) => {
    const message = formatMessage({methodName, args});
    switch (config.showToast) {
      case "all":
        showToast({message, methodName});
        break;
      case "none":
        showAlert(message);
        break;
      case "redefined":
        config.redefinedMethods.includes(methodName)  
          ? showToast({message, methodName}) 
          : showAlert(message);
        break;
      case "custom":
        config.customMethods.includes(methodName) &&
          showToast({message, methodName});
        break;
      default:
        showAlert(message);
    }
  }

  const consoleAlert = ({args, methodName}) => {
    const isShowAlert = !config.alertTrigger || args[0] === config.alertTrigger;
    methodName && originalConsoleObject[methodName](args);

    if (isShowAlert) {
      if (!config.isOnPause) {
      	typeof config.preHook == 'function' && config.preHook({methodName, args});
        showMessage({methodName, args})
      	typeof config.afterHook == 'function' &&  config.afterHook({methodName, args});
      }
    }
  }

  const redefineConsoleMethod = ({methodName, args}) => {
    if (config.alertTimeout) {
      setTimeout(consoleAlert, config.alertTimeout, {methodName, args});
    } else {
      consoleAlert({methodName, args});
    }
  }

  [...config.customMethods, ...config.redefinedMethods].map((methodName) =>
    console[methodName] = (...args) => redefineConsoleMethod({args, methodName})
  )

  config.customGlobalFunctions.map((methodName) =>
    window[methodName] = (...args) => redefineConsoleMethod({args})
  )
}

redefineConsoleMethods(DEFULT_CONFIG);
