

// On opening, load the most recent user input into the text-areas
document.addEventListener("DOMContentLoaded", function() {

  chrome.storage.local.get('savedContent', function(result) {
    
    document.getElementById("distraction-field").innerHTML = result['savedContent'][0];
    document.getElementById("music-field").innerHTML = result['savedContent'][1];
  
  });
});

// when the 'update' button is clicked, store the input in a single array
document.getElementById("update-button").onclick = function() {
  
  var distractionText = document.getElementById("distraction-field").value;
  var musicText = document.getElementById("music-field").value;
  var toSave = [distractionText, musicText];
  
  chrome.storage.local.set({'savedContent': toSave});
};
