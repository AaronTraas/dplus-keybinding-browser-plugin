console.debug('[d+keybind] *** Keybindings for D+ Loaded ***');

console.debug('[d+keybind] grabbing active tab');

try {

	const stylesheetUrl = browser.extension.getURL("dplus_keybind.css");
	console.debug('[d+keybind] URL for CSS to insert: ' + stylesheetUrl);

	var styleElement = document.createElement('link');
	styleElement.type = 'text/css';
	styleElement.rel = 'stylesheet';
	styleElement.href = stylesheetUrl;
	console.debug('[d+keybind] style element: ', styleElement);

	document.head.appendChild(styleElement);
	console.debug('[d+keybind] style element appended');

	let lists = document.querySelectorAll('slick-list');

	activeList = lists[0];

	document.addEventListener('keydown', (event) => {
		console.debug('Key down: ' + event.code);
	});
} catch (err) {
	log.debug(err);
}

