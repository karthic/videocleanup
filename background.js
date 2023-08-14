
let settings = {}
chrome.storage.sync.get({ gradients: true, controls: true, auto: false }, (items) => {
	settings = items;
	})


chrome.storage.onChanged.addListener((changes, namespace) => {
	for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
		settings[key] = newValue
		}
	});



function reddenPage(settings) {
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
			if (url.hostname.toLowerCase().includes("mgmplus.com") || url.hostname.toLowerCase().includes("amazon.com") || url.hostname.toLowerCase().includes("max.com") || url.hostname.toLowerCase().includes("netflix.com")) {
				chrome.scripting.executeScript({
					target: { tabId: tab.id },
					function: reddenPage, 
					args : [ settings]
					});

				}
			}
		}
	})


chrome.action.onClicked.addListener((tab) => {
	chrome.scripting.executeScript({
		target: { tabId: tab.id },
		function: reddenPage, 
		args : [ settings]
		});
	}); 