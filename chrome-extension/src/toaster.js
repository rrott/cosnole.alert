const initToaster = () => {
  let toastIndex = 0;
  const Toaster = {
    toasts: {},
    add: () => {},
  };
  if (document.readyState !== 'complete') {
    window.addEventListener("DOMContentLoaded", initToaster);
  }

  const toastContainer = document.createElement('div');
  toastContainer.className = 'cosnole-alert-toasts';
  toastContainer.classList.add('cosnole-alert-toasts_top-right');
  (document.body || document.documentElement).appendChild(toastContainer);

  Toaster.add = ({message, methodName, timeout}) => {
    const messageContainer = document.createElement('div');
    const messageTextContainer = document.createElement('span');
    const messageTitleContainer = document.createElement('pre');
    const messageObjectContainer = document.createElement('pre');
    const messageObjectTitleContainer = document.createElement('span');

    const closeButton = document.createElement('span');
    const copyButton = document.createElement('span');
    const toast = document.createElement('div');

    messageContainer.className = 'cosnole-alert-toast__message';
    messageTitleContainer.className = 'cosnole-alert-toast__message__title';
    messageTextContainer.className = 'cosnole-alert-toast__message__text';
    messageObjectContainer.className = 'cosnole-alert-toast__message__object';
    messageObjectTitleContainer.className = 'cosnole-alert-toast__message__object-title';

    const addObjectContainer = (msg) => {
      messageObjectTitleContainer.innerHTML = message.text;
      messageObjectContainer.innerHTML = message.origin;
      messageContainer.appendChild(messageObjectTitleContainer);
      messageContainer.appendChild(messageObjectContainer);

      messageObjectTitleContainer.onclick = () => {
        messageObjectContainer.className == 'cosnole-alert-toast__message__object'
        ? messageObjectContainer.className = 'cosnole-alert-toast__message__object_expanded'
        : messageObjectContainer.className = 'cosnole-alert-toast__message__object';
      };
    }

    const addTextContainer = (msg) => {
      messageTextContainer.innerHTML = message.text;
      messageContainer.appendChild(messageTextContainer);
    }

    messageTitleContainer.innerHTML = message.title;
    messageContainer.appendChild(messageTitleContainer);
    message.messages.map((msg) => {
      msg.type == "text" ? addTextContainer(msg) : addObjectContainer(msg)
    })

    closeButton.className = 'cosnole-alert-toast__close';
    closeButton.innerHTML = '[x]';

    copyButton.className = 'cosnole-alert-toast__copy';
    copyButton.innerHTML = '[copy]';
    copyButton.onclick = () => {
      const textarea = document.createElement('textarea');
      textarea.value = message;
      toast.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      toast.removeChild(textarea);
    }

    toast.className = 'cosnole-alert-toast';
    toast.classList.add(`cosnole-alert-toasts_${methodName}`);
    toast.id = `toast-${++toastIndex}`;
    
    toast.appendChild(copyButton);
    toast.appendChild(closeButton);
    toast.appendChild(messageContainer);

    toast.hide = () => {
      toast.classList.add('cosnole-alert-toasts_fade-out');
      toast.addEventListener('animationend', removeToast, false);
    };
    // toast.addEventListener('click', toast.hide);
      
    const removeToast = () => {
      document.getElementsByClassName('cosnole-alert-toasts')[0].removeChild(toast);
      delete Toaster.toasts[toast.id];
    }      
    document.getElementsByClassName('cosnole-alert-toasts')[0].appendChild(toast);
    
    if (timeout) {setTimeout(toast?.hide, timeout)}
    
    Toaster.toasts[toast.id] = toast;
    return toast;
  }

  return Toaster;
}

export {initToaster}