
// the websites which are to be muted
var noisemakers = [
  /songza.com/, 
  /asoftmurmur.com/,
  /pandora.com/,
  /spotify.com/
];

// Run the main function whenever the user's tabs change
// ("onReplaced" is needed b/c "onUpdated" ignores reloading cached pages)
chrome.tabs.onUpdated.addListener(mainFunction);
chrome.tabs.onReplaced.addListener(mainFunction);
chrome.tabs.onRemoved.addListener(mainFunction);

function mainFunction() {

  // from storage, pull in the list of distraction websites
  var distractions = [];
  chrome.storage.local.get('distractionSites', function(result) {
    var distractionSites = result['distractionSites'];
    var arrayOfSites = distractionSites.split("\n");
    for (var i = 0; i < arrayOfSites.length; i++) {
      distractions.push(new RegExp(arrayOfSites[i]));
    }

    // get an array of all open tabs
    chrome.tabs.query({}, function(tabs){

    //Check for a match between open tabs and noisemakers
    //If there are noisemakers, list their ids
    var noisemakersPresent = false;
    var noisemakerIDs = [];
    noisemakers.forEach(function (noisElement) {
      tabs.forEach(function (tabElement) {
        if (noisElement.test(tabElement.url)) {
          noisemakerIDs.push((tabElement.id));
          noisemakersPresent = true;
        }
      });
    });

    // No noisemakers? Nothing else to worry about (for the moment).
    if (!noisemakersPresent) {
      return;
    }

    // check for a match between open tabs and distractions
    var distractionsPresent = distractions.some(function (distElement) {
      return tabs.some(function (tabElement) {
        return distElement.test(tabElement.url);
      });
    });

    // mute all noisemakers iff there is a distraction
    noisemakerIDs.forEach(function (noisemakerID) {
      chrome.tabs.update(noisemakerID, {muted: distractionsPresent});
    });

  });

  });
};