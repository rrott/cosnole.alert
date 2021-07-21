const addToastContainer = () => {
  let toastIndex = 0;
  const toastContainer = document.createElement('div');
  toastContainer.className = 'console-alert-toasts';
  document.body.appendChild(toastContainer);

  let Toaster = {
    add: () => {},
    setTimeout: () => {},
    toasts: {}
  };

  Toaster.add = ({message, position, methodName, timeout}) => {
    let toast = document.createElement('div');
    toast.id = `toast-${++toastIndex}`;
    toast.className = 'console-alert-toast';

    let pre = document.createElement('pre');
    pre.className = 'console-alert-toast__text';
    pre.innerHTML = message;
    toast.appendChild(pre);

    const className = position 
                      ? `console-alert-toasts_${position}` 
                      : 'console-alert-toasts_top-right';

    toastContainer.classList.add(className);
    toast.classList.add(`console-alert-toasts_${methodName}`);

    toast.hide = function () {
      toast.classList.add('console-alert-toasts_fade-out');
      toast.addEventListener('animationend', removeToast, false);
    };

    if (timeout) {setTimeout(toast.hide, timeout)}
  
    toast.addEventListener('click', toast.hide);

    const removeToast = () => {
      document.getElementsByClassName('console-alert-toasts')[0].removeChild(toast);
      delete Toaster.toasts[toast.id];
    }

    document.getElementsByClassName('console-alert-toasts')[0].appendChild(toast);
    Toaster.toasts[toast.id] = toast;
    return toast;
  }
  Toaster.setTimeout = (toastid, val) => {
    if (Toaster.toasts[toastid]) {
      setTimeout(Toaster.toasts[toastid].hide, val);
    }
  }
  return Toaster;
}

export {addToastContainer}