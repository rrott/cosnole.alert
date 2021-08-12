# cosnole.alert
chrome extension to shows logs, errors and warnings as toast messages to help you catch bugs faster.
Extends browser's console object with the alert() function.

- it has 3 working modes:
  - default. in this mode the app injects <script> tag that is used to extend window.console object with additional functionality.
  - *simple* mode inject the <script> tag as well, but id does not apply any custom options and does not extend window.console object. 
    It simple adds additional alert() method to window object without toching `log`, `error` or other built-in methods.
  - toast-only - it does not inject <script> tag and so only toasts are available. 
    This mode is useful in case website has strong CSP policies and does not allow running scripts from 3rd-party <script> tags.
  

