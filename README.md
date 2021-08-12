<p align="center">
  <img src="https://github.com/rrott/cosnole.alert/raw/main/chrome-extension/cosnole.png" width="75" height="75"/>
</p>

<h1 align="center">cosnole.alert</h1>

**cosnole.alert** is a web browser extension to shows logs, errors and warnings as toast messages to help you catch bugs faster.  
It extends browser's console object with the alert() function.

With this extension You can:  

- reflect console.log() calls in the **toast messages**.  
- trigger window.**alert()** on all console.**log()** calls.  
- use **console**.alert() instead of **window**.alert()  
- define **custom global methods** to call alert()  
- use **regexp** or a **"stop-word"** to call alert()  
- use **allow/block-lists** or enable it for **localhost** only.  
- use it to see console.log() events called in an **iframe**.  

**web-site:** [https://rrott.com/cosnole.alert](https://rrott.com/cosnole.alert)  
**blog-post:** [https://rrott.com/blog/security/cosnole.alert](https://rrott.com/blog/security/cosnole.alert)  

# Installation Instructions

## From the Chrome Web Store
TBD
## From the source code
**Google Chrome / Microsoft Edge / Brave** (or any other chromium-based browsers)

1. Download this repo as a [ZIP file from GitHub](https://github.com/rrott/cosnole.alert/archive/refs/heads/main.zip).  
2. Unzip the files and you should have a folder named `chrome-extension`.  
3. In Chrome/Edge/Brave go to the extensions page (`chrome://extensions` or `edge://extensions` or `brave://extensions`).  
4. Enable Developer Mode.  
5. Drag the `chrome-extension` folder anywhere on the page to import it(do not delete the folder afterwards).  

**Note:** Every time you open Chrome it may warn you about running extensions in developer mode, just click &#10005; to keep the extension enabled.  

## Installing Previous Versions
1. Download and extract one of the files from the [releases page](https://github.com/rrott/cosnole.alert/releases) on GitHub
1. In Chrome/Edge/Brave go to the extensions page (`chrome://extensions` or `edge://extensions` or `brave://extensions`). 
1. If you've installed **cosnole.log** from the web store, disable or remove that version
1. Enable Developer Mode. 
1. Click "Load unpacked extension..."
1. Select the directory where you extracted the extension(do not delete the folder afterwards)

## TODO:
1. Finish Toast Only mode
2. Add an option to make all the toast transparent by a menu-click or a hot-key
3. Add history to the pop-up
4. Show network events in the toaster
5. Add a modal to see tracert and objects shown in the toaster
6. Consider adding some additional controls to the toaster ui to filter toasts and update settings without reloading page
7. Consider adding other console events to the toaster
8. Port it to FireFox
9. Consider porting it to Safari
10. Add documentation and how-tos


### License. 

**cosnole.alert** extensions and the website are released under **MIT license**.  
Copyright (c) [Roman Rott](https://rrott.com) 

Browser's icons are from [browser-logos](https://github.com/alrra/browser-logos)  
All browsers' logos and trademarks are the property of their respective owners.  
Everything else is available under the MIT license.
