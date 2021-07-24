const DEFULT_CONFIG = {
  alertTimeout: 0,
  alertTrigger: "",        // custom "stop-word" that triggers the alert
  alertMethod: "alert",    // "alert", "promt" or "confirm"
  logMethod: "warn",       // "log", "warn", "info" or "error"
  showToast: "all",        // "all", "none", "redefined", "custom" - shows small toast message in the right top corner
  toastTimeout: 0,         // auto-hide toasts
  isOnPause: false,        // if true, console object is redefined but no alerts are triggered
  isDisabled: false,       // if true, console object left as is
  isStringifyInput: false, // if true, converts arguments to text
  isShowAlertTitle: true,  // if false, sends arguments to alert() function as is 
  customMethods: ["alert"], // adds additional custom methods to the console object
  redefinedMethods: ["log", "warn", "info", "error"], // list of console object methods to redefine
  customGlobalFunctions: ['p'],   // if not empty, adds it as an alert() to the window object
  preHook: ({methodName, args}) => {}, // function to be run before the alert()
  afterHook: ({methodName, args}) => {}, // function to be run after the alert()
}

export {DEFULT_CONFIG};