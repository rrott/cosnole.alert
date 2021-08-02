const initToaster = () => {
  let toastIndex = 0;
  const Toaster = {
    toasts: {},
    add: () => {},
  };

  const toastContainer = document.createElement('div');
  toastContainer.className = 'cosnole-alert-toasts';
  toastContainer.classList.add('cosnole-alert-toasts_top-right');
  (document.body || document.documentElement).appendChild(toastContainer);

  Toaster.add = ({message, methodName, timeout}) => {
    const messageContainer = document.createElement('div');
    const messageTitleContainer = document.createElement('div');
    const messageBodyContainer = document.createElement('div');
    const closeButton = document.createElement('span');
    const copyButton = document.createElement('span');
    const toast = document.createElement('div');

    const removeToast = () => {
      document.getElementsByClassName('cosnole-alert-toasts')[0].removeChild(toast);
      delete Toaster.toasts[toast.id];
    }  

    toast.hide = () => {
      toast.classList.add('cosnole-alert-toasts_fade-out');
      toast.addEventListener('animationend', removeToast, false);
    };

    messageContainer.className = 'cosnole-alert-toast__message';
    messageTitleContainer.className = 'cosnole-alert-toast__message__title';
    messageBodyContainer.className = 'cosnole-alert-toast__message__body';
    messageTitleContainer.innerHTML = message.title;
    messageContainer.appendChild(messageTitleContainer);
    messageContainer.appendChild(messageBodyContainer);

    const addObjectContainer = (msg) => {
      const messageObjectTitleContainer = document.createElement('span');
      const messageObjectContainer = document.createElement('pre');
      let isExpanded = false;
      
      messageObjectContainer.className = 'cosnole-alert-toast__message__object';
      messageObjectTitleContainer.className = 'cosnole-alert-toast__message__object-title';
      messageObjectTitleContainer.innerHTML = `[${msg.type}] `;
      messageObjectContainer.innerHTML = msg.parsed;
      messageBodyContainer.appendChild(messageObjectTitleContainer);
      messageBodyContainer.appendChild(messageObjectContainer);

      messageObjectTitleContainer.onclick = () => {
        if (!isExpanded) {
          isExpanded = true;
          messageObjectTitleContainer.className = 'cosnole-alert-toast__message__object-title_expanded'
          messageObjectContainer.className = 'cosnole-alert-toast__message__object_expanded'
        } else {
          isExpanded = false;
          messageObjectTitleContainer.className = 'cosnole-alert-toast__message__object-title';
          messageObjectContainer.className = 'cosnole-alert-toast__message__object';
        }
      };
    }

    const addTextContainer = (msg) => {
      const messageTextContainer = document.createElement('div');
      messageTextContainer.className = 'cosnole-alert-toast__message__text';
      messageTextContainer.innerHTML = `${msg.arg} `;
      messageBodyContainer.appendChild(messageTextContainer);
    }

    message.messages.map((msg) => {
      msg.isNonObject ? addTextContainer(msg) : addObjectContainer(msg)
    })

    closeButton.className = 'cosnole-alert-toast__close';
    closeButton.innerHTML = '[x]';
    closeButton.addEventListener('click', toast.hide);

    copyButton.className = 'cosnole-alert-toast__copy';
    copyButton.innerHTML = '[copy]';
    copyButton.onclick = () => {
      const textarea = document.createElement('textarea');
      textarea.value = message.messages.map((msg) =>
        JSON.stringify(msg.parsed || msg.arg)
      ).join(" ");
      toast.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      toast.removeChild(textarea);
    }

    toast.id = `toast-${++toastIndex}`;
    toast.className = 'cosnole-alert-toast';
    toast.classList.add(`cosnole-alert-toasts_${methodName}`);
    toast.appendChild(copyButton);
    toast.appendChild(closeButton);
    toast.appendChild(messageContainer);
    
    toastContainer.appendChild(toast);
    
    if (timeout) {setTimeout(toast?.hide, timeout)}
    
    Toaster.toasts[toast.id] = toast;
    return toast;
  }

  return Toaster;
}

export {initToaster}