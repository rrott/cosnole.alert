(() => {
	const originalConsoleObject = {
	  log: console.log,
	  warn: console.warn,
	  info: console.info,
	  error: console.error,
	}

	console.events = [];

	["log", "warn", "info", "error"].map((methodName) => {
	  console[methodName] = (...args) => {
	  	console.events = [...console.events, {methos: methodName, args}];
	  	originalConsoleObject[methodName](...args);
	  }
	})
})();
