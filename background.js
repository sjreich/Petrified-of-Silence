
// run the main function whenever the user's tabs change
// ("onReplaced" is needed b/c "onUpdated" ignores reloading cached pages)
chrome.tabs.onUpdated.addListener(mainFunction);
chrome.tabs.onReplaced.addListener(mainFunction);
chrome.tabs.onRemoved.addListener(mainFunction);

function mainFunction() {

  // from storage, pull in the list of distraction websites
  chrome.storage.local.get('savedContent', function(result) { 

    // if the extension is off, don't do anything
    var isOn = result['savedContent'][2];
    if (!isOn) {
      return;
    }

    // format the results of user input into arrays of regexes
    var distractions = formatText(result['savedContent'][0]);
    var music = formatText(result['savedContent'][1]);

    // get all open tabs
    chrome.tabs.query({}, function(tabs){

      // get an array of url ID's for the open music and distraction tabs
      openDistractions = collectMatches(distractions, tabs);
      openMusic = collectMatches(music, tabs);

      // mute all music if and only if there is a distraction
      openMusic.forEach(function (musicID) {
        chrome.tabs.update(musicID, {muted: openDistractions.length > 0});
      });

    });
  });
};

// converts the user-inputted string into an array of regexes
function formatText(string) {
  var outputArray = [];
  string.split("\n").forEach(function(url) {
    outputArray.push(new RegExp(url));
  });
  return outputArray;
}

// takes an array of regexes and an array of tabs, and 
// returns an array of tab-ID's for any matches between them
function collectMatches(regexArray, tabArray) {
  var outputArray = [];
  regexArray.forEach(function(regex) {
    tabArray.forEach(function(tab) {
      if (regex.test(tab.url)) {
        outputArray.push(tab.id);
      }
    });
  });
  return outputArray;
}






