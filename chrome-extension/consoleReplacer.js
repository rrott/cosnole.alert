import {DEFULT_CONFIG} from './constants.js';
import {addToastContainer} from './toaster.js';

const originalConsoleObject = {
  log: console.log,
  warn: console.warn,
  info: console.info,
  error: console.error,
}

const redefineConsoleMethods = (config) => {
	if (config.isDisabled) {return null}
  let toasts = addToastContainer();

  // adds custom methods to the originalConsoleObject
  // default method is set to "warn"
  config.customMethods.map((methodName) =>
    originalConsoleObject[methodName] = console[config.logMethod || 'warn']
  );

  // message to show in the alert() or toast()
  // converts arguments to a text if isStringifyInput is set to true
  const formatMessage = ({methodName, args}) => {
    config.alertTrigger && args.shift();
  	const message = config.isStringifyInput ? JSON.stringify(args) : args;
    return config.isShowAlertTitle ? `console.${methodName} message:\n${message}` : message;
  }

  // runs alert(), promt() or confirm(). Default is "alert"
  const showAlert = (message) => 
    window[config.alertMethod || "alert"](message);
 
  // shows small toast message in the right top corner
  const showToast = ({message, methodName}) => {
    toasts.add({
      message, methodName, 
      position: config.toastPosition,
      timeout: config.toastTimeout,
    });
  }

  const showMessage = ({methodName, args}) => {
    const message = formatMessage({methodName, args});
    switch (config.showToast) {
      case "all":  // show toast instead of alert()
        showToast({message, methodName});
        break;
      case "none": // always show alert()
        showAlert(message);
        break;
      case "redefined": // show toast for redefined instead of alert()
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

  // defines what to show and triggers the alert() and hooks.
  const consoleAlert = ({args, methodName}) => {
    const isShowAlert = !config.alertTrigger || args[0] === config.alertTrigger;
    
    // runs original console method for all but customGlobalFunctionName
  	methodName && originalConsoleObject[methodName](args);

    if (isShowAlert) {
      if (!config.isOnPause) {
      	typeof config.preHook == 'function' && config.preHook({methodName, args});
        showMessage({methodName, args})
      	typeof config.afterHook == 'function' &&  config.afterHook({methodName, args});
      }
    }
  }

  // shows custom message immediatelly or with a timeout
  const redefineConsoleMethod = ({methodName, args}) => {
    if (config.alertTimeout) {
      setTimeout(consoleAlert, config.alertTimeout, {methodName, args});
    } else {
      consoleAlert({methodName, args});
    }
  }

  // redefines original console object.
  [...config.customMethods, ...config.redefinedMethods].map((methodName) =>
    console[methodName] = (...args) => redefineConsoleMethod({args, methodName})
  )

  // ads custom method that will trigger allert().
  if (!!config.customGlobalFunctionName) {
    window[config.customGlobalFunctionName] = (...args) => redefineConsoleMethod({args})
  }
}

redefineConsoleMethods(DEFULT_CONFIG);
