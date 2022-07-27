console.debug('[d+keybind] *** Keybindings for D+ Loaded ***');

console.debug('[d+keybind] grabbing active tab');

var activeRowNum = null;
var activeItem = null;
var maxVideoRows = null;
var maxItemsInActiveRow = null;

function giveSelectedItemFocus() {
	let videoRows = document.querySelectorAll('.slick-list');
	maxVideoRows = videoRows.length;
	let activeRow = videoRows[activeRowNum];
	maxItemsInActiveRow = videoRows[activeRowNum].querySelectorAll('a').length;
	for (const el of videoRows) {
		el.dataset.dpluskeybind_row_selected = false;
	}
	activeRow.dataset.dpluskeybind_row_selected = true;

	activeRow.querySelectorAll('a')[activeItem].focus();

	console.debug(`[d+keybind] activeRow: ${activeRowNum} ; activeItem: ${activeItem} ; maxVideoRows: ${maxVideoRows} ; maxItemsInActiveRow: ${maxItemsInActiveRow}`);
}

function navigate(keyCode) {
	console.debug('[d+keybind] Key down: ' + keyCode);

	if (activeRowNum === null) {
		activeRowNum = 0;
		giveSelectedItemFocus();
		return;
	}

	switch (keyCode) {
		case 'ArrowUp':
			if (activeRowNum > 0) { activeRowNum--; }
			break;
		case 'ArrowDown':
			if (activeRowNum < maxVideoRows ) { activeRowNum++; }
			break;
		case 'ArrowLeft':
			if (activeItem > 0) { activeItem--; }
			break;
		case 'ArrowRight':
			if (activeItem < maxItemsInActiveRow ) { activeItem++; }
			break;
		default: 
			return;
	}

	giveSelectedItemFocus();
}

function main() {
	const stylesheetUrl = browser.extension.getURL("dplus_keybind.css");

	var styleElement = document.createElement('link');
	styleElement.type = 'text/css';
	styleElement.rel = 'stylesheet';
	styleElement.href = stylesheetUrl;

	document.head.appendChild(styleElement);

	document.addEventListener('keydown', (event) => {
		console.debug('[d+keybind] Key down: ' + event.code);
		navigate(event.code);
	});
}

try {
	main();
} catch (err) {
	console.error(err);
}

