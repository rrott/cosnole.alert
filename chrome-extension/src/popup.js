import {Config} from './config.js';

const DEFULT_CONFIG = {
  alertShowTimeout: 0,      // sleep before triggering alert
  toastHideTimeout: 0,      // auto-hide toasts
  alertTrigger: "",         // custom "stop-word" that triggers the alert
  alertMethod: "alert",     // "alert", "promt" or "confirm"
  logMethod: "warn",        // "log", "warn", "info" or "error"
  showToastsFor: "all",     // "all", "none", "redefined", "custom"
  showAlertsFor: "none",    // "all", "none", "redefined", "custom"
  customMethods: ["alert"], // adds additional custom methods to the console object
  redefinedMethods: ["log", "warn", "info", "error", "table"], // list of console object methods to redefine
  customGlobalFunctions: ['p'],   // if not empty, adds it as an alert() to the window object
  allowlist: [],
  blockList: [],
  preHook: ({methodName, args}) => {}, // function to be run before the alert()
  afterHook: ({methodName, args}) => {}, // function to be run after the alert()
}
const APP_MODES = ["default", "toasts", "simple"];

document.addEventListener('DOMContentLoaded', async () => {
  let config = await Config.getConfig();
  window.cosnoleAlertConfig = config;
  
  const elements = {
    header: {
      pauseButton: document.getElementById('pauseButton'),
      disableButton: document.getElementById('disableButton'),
      closeToastsButton: document.getElementById('closeToastsButton'),
    }, 
    mode: {
      default: document.getElementById('defaultMode'),
      toasts: document.getElementById('toastsMode'),
      simple: document.getElementById('simpleMode'),         
    },
    blocks: {
      default: document.querySelectorAll(".default-mode"),
      toasts: document.querySelectorAll(".toasts-mode"),
      simple: []
    }

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

  const setMode = async (mode) => {
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

  const setConfig = async (options) => {
    config = {...config, ...options};
    await Config.setConfig(options);
  }

  const init = () => {
    // set initial values
    setIsOnPause(config.isOnPause);
    setIsDisabled(config.isDisabled);
    setMode(config.mode);

    // add handlers
    elements.header.pauseButton.onclick = async () => {
      setIsOnPause(!config.isOnPause);
      setConfig({isOnPause: !config.isOnPause});
    }
    elements.header.disableButton.onclick = async () => {
      setIsDisabled(!config.isDisabled);
      setConfig({isDisabled: !config.isDisabled});
    }
    addChnageModeHandlers();
  }

  init();
});
