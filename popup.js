// variables for storing input
var isOn = true;
var distractionText;
var musicText;

// On opening, load in the last set of input
document.addEventListener("DOMContentLoaded", function() {

  // retrieve saved content
  chrome.storage.local.get('savedContent', function(result) {

    // set up the text fields 
    distractionText = result['savedContent'][0];
    musicText = result['savedContent'][1];
    updateTextAreaPresentation();

    // set up the on-off button
    isOn = result['savedContent'][2];
    updateOnOffPresentation();

  });
});

// toggle on-off button
document.getElementById("on-off").onclick = function() {
  isOn = !isOn;
  save();
  updateOnOffPresentation();
};

// update button saves the input
document.getElementById("update-button").onclick = function() {
  distractionText = document.getElementById("distraction-field").value;
  musicText = document.getElementById("music-field").value;
  save();
};

// save function: uses browser's local memory
function save() {
  var toSave = [distractionText, musicText, isOn];
  chrome.storage.local.set({'savedContent': toSave});
}

// updates presentation of the on-off button
function updateOnOffPresentation() {
  if (isOn) {
    document.getElementById("on-off").innerHTML = "On";
    document.getElementById("on-off").style.border = "2px solid green";
    chrome.browserAction.setIcon({
      path : {
        19: "icon19g.png"
      }
    });

  } else {
    document.getElementById("on-off").innerHTML = "Off";
    document.getElementById("on-off").style.border = "2px solid red";
    // chrome.browserAction.setIcon({
    //     path: {19: "icon19r.png", 38: "france-38.png"},
    //     tabId: details.tabId
    // });

    chrome.browserAction.setIcon({
      path : {
        19: "icon19r.png"
      }
    });
  }
}

// updates presentation of the textareas
function updateTextAreaPresentation() {
  document.getElementById("distraction-field").innerHTML = distractionText;                                                 
  document.getElementById("music-field").innerHTML = musicText;
}

