
let settings = {}
chrome.storage.sync.get({ gradients: true, controls: false, auto: false }, (items) => {
	settings = items;
	})


chrome.storage.onChanged.addListener((changes, namespace) => {
	for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
		settings[key] = newValue
		}
	});



	var locos = [
		{"url":"amazon.com", "css":{"controls":".webPlayerUIContainer {display: none;}", "gradients":".fkpovp9 {display: none;}"}}, 
		{"url":"max.com", "css":{"controls":"div[class^='AutohiderContainer'] {display: none;}", "gradients":"div[class^='ProtectionLayerContainer'] {display: none;}"}}, 
		{"url":"netflix.com", "css":{"controls":".ltr-16tr625 {display: none;}", "gradients":".watch-video--back-container {display: none;}.watch-video--flag-container {display: none;}"}}, 
		{"url":"mgmplus.com", "css":{"controls":".bmpui-ui-uicontainer {opacity: 0;}", "gradients":".bmpui-ui-uicontainer {opacity: 0;}"}}, 
		{"url":"disneyplus.com", "css":{"controls":".btm-media-overlays-container {display: none;}", "gradients":".controls__header:before {background-image: none !important;}.controls__footer:before {background-image: none !important;}"}}, 

		{"url":"youtube.com", "css":{"controls":".btm-media-overlays-container {display: none;}", "gradients":".ytp-gradient-bottom {height: 0;}.ytp-gradient-top {height: 0;}"}}, 
		]
function reddenPage(settings, locos) {
	
	var myset = locos.find((elem) => window.location.hostname.toLowerCase().match(elem.url.toLowerCase()))
	if (myset) {
		const style = document.createElement('style');
		if (settings.controls) {
			style.innerHTML = myset.css.controls;
			} else if (settings.gradients) {
			style.innerHTML = myset.css.gradients;

			}
		document.body.appendChild(style);

		}
	}

function reddenPageold(settings) {

	if (window.location.hostname.toLowerCase().includes("amazon.com")) {
		if (settings.controls) {
			const style = document.createElement('style');
			style.innerHTML = `.webPlayerUIContainer {display: none;}`;
			document.body.appendChild(style);

			} else if (settings.gradients) {
			const style = document.createElement('style');
			style.innerHTML = `.fkpovp9 {display: none;}`;
			document.body.appendChild(style);
			}
		} else if (window.location.hostname.toLowerCase().includes("max.com")) {
		if (settings.controls) {
			const style = document.createElement('style');
			style.innerHTML = `div[class^='AutohiderContainer'] {display: none;}`;
			document.body.appendChild(style);

			} else if (settings.gradients) {
			const style = document.createElement('style');
			style.innerHTML = `div[class^='ProtectionLayerContainer'] {display: none;}`;
			document.body.appendChild(style);
			}
		} else if (window.location.hostname.toLowerCase().includes("netflix.com")) {
		if (settings.controls) {
			const style = document.createElement('style');
			style.innerHTML = `.ltr-16tr625 {display: none;}`;
			document.body.appendChild(style);
			} else if (settings.gradients) {
			const style = document.createElement('style');
			style.innerHTML = `.watch-video--back-container {display: none;}
					.watch-video--flag-container {display: none;}`;
			document.body.appendChild(style);
			}
		} else if (window.location.hostname.toLowerCase().includes("mgmplus.com")) {
		if (settings.controls) {
			const style = document.createElement('style');
			style.innerHTML = `.bmpui-ui-uicontainer {opacity: 0;}`;
			document.body.appendChild(style);
			} else if (settings.gradients) {
			const style = document.createElement('style');
			style.innerHTML = `.bmpui-ui-uicontainer {opacity: 0;}`;
			document.body.appendChild(style);
			}

		} else {
		}

	}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab)=>{
	if (settings.auto) {
		if (changeInfo.status == "complete") {
			const url = new URL(tab.url);
			var myset = locos.find((elem) => url.hostname.toLowerCase().match(elem.url))
			if (myset) {
				chrome.scripting.executeScript({
					target: { tabId: tab.id },
					function: reddenPage, 
					args : [ settings, locos]
					});

				}
			}
		}
	})


chrome.action.onClicked.addListener((tab) => {
	const url = new URL(tab.url);
	var myset = locos.find((elem) => url.hostname.toLowerCase().match(elem.url))
	if (myset) {
		chrome.scripting.executeScript({
			target: { tabId: tab.id },
			function: reddenPage, 
			args : [ settings, locos]
			});
		}
	}); 