import {initToaster} from './toaster.js';

const cosnoleAlert =  () => {
  const Toaster = initToaster();

  Toaster.add({
    methodName: "log",
    message: {
      title: `cosnole.alert`,
      messages: [
        {
          arg: "1",
          type: "string",
          parsed: "",
          isNonObject: true
        }
      ]
    },
  });

  Toaster.add({
    methodName: "info",
    message: {
      title: `cosnole.alert`,
      messages: [
        {
          arg: "You can see errors/warning/alerts and debug messages without opening browser's developer console!",
          type: "string",
          parsed: "",
          isNonObject: true
        }
      ]
    },
  });
  Toaster.add({
    methodName: "log",
    message: {
      title: `console.log`,
      messages: [
        {
          arg: 'This extension shows a toast message once console.log() is called.',
          type: "log",
          parsed: "",
          isNonObject: true
        }
      ]
    },
  });
  Toaster.add({
    methodName: "info",
    message: {title: `console.info`,
      messages: [
        {
          arg: 'or console.info() is called.',
          type: "info",
          parsed: "",
          isNonObject: true
        }
      ]
    },
  });
  Toaster.add({
    methodName: "warn",
    message: {
      title: `console.warn`,
      messages: [
        {
          arg: 'Or console.warn()',
          type: "warn",
          parsed: "",
          isNonObject: true
        }
      ]
    },
  });
  Toaster.add({
    methodName: "error",
    message: {
      title: `console.error`,
      messages: [
        {
          arg: 'or even the console.error()',
          type: "string",
          parsed: "",
          isNonObject: true
        }
      ]
    },
  });
  Toaster.add({
    methodName: "log",
    message: {
      title: `object alert!`,
      messages: [
        {
          arg: 'Toasts can show an',
          type: "string",
          parsed: "",
          isNonObject: true
        },
        {
          arg: {key: "name", value: "cosnole.alert"},
          type: "object",
          parsed: JSON.stringify({key: "name", value: "cosnole.alert"}),
          isNonObject: false
        },
        {
          arg: 'if it was passed as a param.',
          type: "string",
          parsed: "",
          isNonObject: true
        }
      ]
    },
  });

  Toaster.add({
    methodName: "log",
    message: {
      title: `copy message`,
      messages: [
        {
          arg: '                                          ⬆ \n                       You can copy the message',
          type: "string",
          parsed: "",
          isNonObject: true
        }
      ]
    },
  });

    Toaster.add({
    methodName: "log",
    message: {
      title: `transparent toast`,
      messages: [
        {
          arg: ' ⬆ \nClick on the title to make the toast transparent',
          type: "string",
          parsed: "",
          isNonObject: true
        }
      ]
    },
  });

}

cosnoleAlert();

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 60 || document.documentElement.scrollTop > 60) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-58px";
  }
}
