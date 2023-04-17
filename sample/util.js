export function waitFor(fn) {
	return new Promise(r => {
		const si = setInterval(() => {
			if (fn()) {
				clearInterval(si);
				r();
			}
		}, 100);
	});
}

export function createLogOutput(id = 'output') {
	const output = document.getElementById(id);
	return e => {
		output.value += `${e}\n`;
		setTimeout(() => output.scrollTo(0, output.scrollHeight), 100);
	};
}
