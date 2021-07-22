const addToastContainer = () => {
  let toastIndex = 0;
  const Toaster = {
    toasts: {},
    add: () => {},
  };

  const toastContainer = document.createElement('div');
  toastContainer.className = 'console-alert-toasts';
  toastContainer.classList.add('console-alert-toasts_top-right');
  document.body.appendChild(toastContainer);

  Toaster.add = ({message, methodName, timeout}) => {
    const messageContainer = document.createElement('pre');
    const copyButton = document.createElement('span');
    const toast = document.createElement('div');

    messageContainer.className = 'console-alert-toast__message';
    messageContainer.innerHTML = message;

    copyButton.className = 'console-alert-toast__copy';
    copyButton.innerHTML = 'copy';
    copyButton.onclick = () => {
      const textarea = document.createElement('textarea');
      textarea.value = message;
      toast.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      toast.removeChild(textarea);
    }

    toast.className = 'console-alert-toast';
    toast.classList.add(`console-alert-toasts_${methodName}`);
    toast.id = `toast-${++toastIndex}`;
    
    toast.appendChild(copyButton);
    toast.appendChild(messageContainer);

    toast.hide = () => {
      toast.classList.add('console-alert-toasts_fade-out');
      toast.addEventListener('animationend', removeToast, false);
    };
    toast.addEventListener('click', toast.hide);
      
    const removeToast = () => {
      document.getElementsByClassName('console-alert-toasts')[0].removeChild(toast);
      delete Toaster.toasts[toast.id];
    }      
    document.getElementsByClassName('console-alert-toasts')[0].appendChild(toast);
    
    if (timeout) {setTimeout(toast?.hide, timeout)}
    
    Toaster.toasts[toast.id] = toast;
    return toast;
  }

  return Toaster;
}

export {addToastContainer}