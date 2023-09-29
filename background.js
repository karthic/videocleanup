
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
    {"url":"netflix.com", "css":{"controls":".watch-video--bottom-controls-container {display: none;}.watch-video--back-container {display: none;}.watch-video--flag-container {display: none;}", "gradients":".watch-video--back-container {display: none;}.watch-video--flag-container {display: none;}"}}, 
    {"url":"mgmplus.com", "css":{"controls":".bmpui-ui-uicontainer {opacity: 0;}", "gradients":".bmpui-ui-uicontainer {opacity: 0;}"}}, 
    {"url":"disneyplus.com", "css":{"controls":".btm-media-overlays-container {display: none;}", "gradients":".controls__header:before {background-image: none !important;}.controls__footer:before {background-image: none !important;}"}}, 
    {"url":"youtube.com", "css":{"controls":".html5-video-player :not(:first-child) {display:none;}", "gradients":".ytp-gradient-bottom {display:none;}.ytp-gradient-top {display:none;}.ytp-ce-element {display:none;}"}}, 

    {"url":"crackle.com", "css":{"controls":"#player-controls {display: none;}", "gradients":"#player-controls {background: none;}"}}, 
    {"url":"peacocktv.com", "css":{"controls":".playback-overlay__container {display: none;}.playback-header__container {display: none;}", "gradients":".playback-overlay__container.vod {background: none;}"}}, 

    {"url":"tubitv.com", "css":{"controls":".SHcqi {display: none;}", "gradients":".SHcqi .sknV3 {background-image: none;}.SHcqi .DB9bK {background-image: none;}"}}, 
    {"url":"pluto.tv", "css":{"controls":".video-player-control-bar-atc {display: none;}", "gradients":".video-player-control-bar-atc {background: none;}"}}, 
    {"url":"therokuchannel.roku.com", "css":{"controls":".vjs-has-started .vjs-control-bar {display: none;}.video-wrapper .overlay {display: none;}", "gradients":".video-wrapper .overlay {display: none;}"}}, 
    {"url":"play.xumo.com", "css":{"controls":".jw-controls {display: none;}.jw-controls-backdrop {display: none;}", "gradients":".jw-controls-backdrop {display: none;}"}}, 

    ]
function reddenPage(settings, locos) {
	
	var myset = locos.find((elem) => window.location.hostname.toLowerCase().match(elem.url.toLowerCase()))
	if (myset) {
        var alreadyhas = document.querySelector("#karthicremoval");
        if (alreadyhas) {
            alreadyhas.remove()
            } else {
            const style = document.createElement('style');
            style.id = "karthicremoval"    
            if (settings.controls) {
                style.innerHTML = myset.css.controls;
                } else if (settings.gradients) {
                style.innerHTML = myset.css.gradients;
    
                }
            document.body.appendChild(style);
    
            }
        
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