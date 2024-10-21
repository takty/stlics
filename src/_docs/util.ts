export function waitFor(fn) {
	return new Promise(r => {
		const si = setInterval(() => {
			if (fn()) {
				clearInterval(si);
				r(null);
			}
		}, 100);
	});
}

export function createLogOutput(id: string = 'output') {
	const output = document.getElementById(id) as HTMLTextAreaElement;
	return e => {
		output.value += `${e}\n`;
		setTimeout(() => output.scrollTo(0, output.scrollHeight), 100);
	};
}
