const DEFULT_CONFIG = {
  mode: "default",          // ["default", "toasts", "simple"]
  isOnPause: false,         // if true, console object is redefined but no alerts are triggered
  isDisabled: false,        // if true, console object left as is
  alertShowTimeout: null,   // sleep before triggering alert
  toastHideTimeout: null,   // auto-hide toasts
  alertTrigger: "",         // custom "stop-word" that triggers the alert
  alertMethod: "alert",     // "alert", "promt" or "confirm"
  logMethod: "warn",        // "log", "warn", "info" or "error"
  showToastsFor: "all",     // "all", "none", "redefined", "custom"
  showAlertsFor: "custom",  // "all", "none", "redefined", "custom"
  customMethods: ["alert"], // adds additional custom methods to the console object
  redefinedMethods: ["log", "warn", "info", "error", "table"], // list of console object methods to redefine
  customGlobalMethods: ['p'],   // if not empty, adds it as an alert() to the window object
  allowList: [],
  blockList: [],
  isUseAllowList: false,
  isUseBlockList: false,
  isUseForLocalhost: false,
  preHook: null, // function to be run before the alert()
  afterHook: null, // function to be run after the alert()
}
const CONFIG_KEY = 'cosnoleAlertConfig';
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

export {
	DEFULT_CONFIG, CONFIG_KEY,
	REDEFINED_METHODS_LIST, APP_MODES, RESERVED_WORDS,
}