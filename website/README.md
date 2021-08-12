## This directory contains source code of the cosnole.alert extension's web-site


**web-site:** [https://rrott.com/cosnole.alert](https://rrott.com/cosnole.alert)  

``toaster.js`` and ``toaster.css`` are copy-pasted from the ``chrome-extension`` directory and are used to show example of the Toaster's usage.
They are damn simple and can be used as a standalone Toaster app.

```javascript
import {initToaster} from './toaster.js';
import './toaster.css';

const Toaster = initToaster();
const messages = [
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
];

// add toast
Toaster.add({
  methodName: "log",
  message: {
    title: `Toast alert message`,
    messages
  },
});

```
**Note:** this Toaster was created especially for the `cosnole.alert` extension and its API can look strange and not quite useful.  
I will consider refactoring it to make it more flexible, but I do not see a reason to do this at the moment.

Browser's icons are from [browser-logos](https://github.com/alrra/browser-logos)  
All Browsers' logos and trademarks are the property of their respective owners.  
Everything else is available under the MIT license.
