(function(){
  var log = function(message){
    if (console && console.log) console.log(message);
  };

  var isValidURL = function(url){
    return !!(url + '').match(/(http|https):\/\/www\.twitch\.tv\/twitchplayspokemon/);
  };

  var inject = function(tabId){
    chrome.tabs.executeScript(tabId, {file: 'jquery.js'}, function(){
      chrome.tabs.insertCSS(tabId, {file: 'gamepad.css'});
      chrome.tabs.executeScript(tabId, {file: 'gamepad.js'});
    });
  };

  var onTabUpdated = function(tabId, changeInfo, tab){
    var isLoadingComplete = changeInfo.status == "complete";

    if (!isLoadingComplete) return;

    var url = changeInfo.url || tab.url;

    if (!isValidURL(url)) return;

    inject(tabId);
  };

  chrome.tabs.onUpdated.addListener(onTabUpdated);
})();
