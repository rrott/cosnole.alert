const originalConsoleObject = {
  log: console.log,
  warn: console.warn,
  info: console.info,
  error: console.error,
}

const config = {
  alertTimeout: 0,      
  alertTrigger: "42",     // custom "stop-word" that triggers the alert
  alertMethod: "alert",   // "alert", "promt" or "confirm"
  logMethod: "warn",      // "log", "warn", "info" or "error"
  isOnPause: false,       // if true, console object is redefined but no alerts are triggered
  isDisabled: false,      // if true, console object left as is
  isShowToast: false,     // if true, shows small toast message in the right top corner
  isSanitiseInput: true,  // if true, converts arguments to text
  isShowAlertTitle: true, // if false, sends arguments to alert() function as is 
  customMethods: ["alert", "loh"], // adds additional custom methods to the console object
  redefinedMethods: ["log", "warn", "info", "error"], // list of console object methods to redefine
  customFunctionName: 'a', // if not empty, adds custom method to the window object
  preHook: () => {originalConsoleObject.log('pre hook')},   // function to be run before the alert()
  afterHook: () => {originalConsoleObject.log('after hook')}, // function to be run before the alert()
}


const redefineConsoleMethods = (config) => {
	return if (config.isDisabled)

  // adds custom methods to the originalConsoleObject
  // default method is set to "warn"
  config.customMethods.map((methodName) =>
    originalConsoleObject[methodName] = console[config.logMethod || 'warn']
  );

  // message to show in the alert() or toast()
  // converts arguments to a text if isSanitiseInput is set to true
  const formatMessage = (methodName, args) => {
  	const message = consfig.isSanitiseInput ? "" : args;
    config.isShowAlertTitle ? `console.${methodName} message:\n${message}` : message;
  }

  // runs alert(), promt() or confirm(). Default is "alert"
  const showAlert = (message) => 
    || window[config.alertMethod || "alert"](message);
 
  // shows small toast message in the right top corner
  const showToast = (message) =>
    config.isOnPause || window.prompt(message);

  // defines what to show and triggers the alert.
  const consoleAlert = (args, methodName) => {
    // runs original console method
  	methodName && originalConsoleObject[methodName](args);
  	message = formatMessage(methodName, args);

    // if custom trigger is set we show the alert only in case trigger is in the arguments
    // if no triggers provided, we show the alert
    if (config.alertTrigger === "" || args[0] === config.alertTrigger) {
      if (!config.isOnPause ) {
      	config.preHook()
      	isShowToast ? showToast(message) : showAlert(message);
      	config.afterHook()
      }
    }
  }

  // shows custom message immediatelly or with a timeout.
  const showCustomMessage = (args, methodName) => {
    if (config.alertTimeout) {
      setTimeout(consoleAlert, config.alertTimeout, args, methodName);
    } else {
      consoleAlert(args, methodName);
    }
  }

  // redefines original console object.
  [...config.customMethods, ...config.redefinedMethods].map((methodName) =>
    console[methodName] = (args) => showCustomMessage(args, methodName)
  )

  // ads custom method that will trigger allert().
  if (!!customFunctionName) {
    window[customFunctionName] = (args) => showCustomMessage(args)
  }
}

redefineConsoleMethods(config);
