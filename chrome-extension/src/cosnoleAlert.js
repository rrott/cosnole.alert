(() => {
  console.alert = (...args) => {
    const message = `console.alert message:\n${args}`;
    alert(message);
    console.info(message);
  }
})();
