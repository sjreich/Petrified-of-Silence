// initially, load the text area with the most recent input
document.addEventListener("DOMContentLoaded", function() {
  chrome.storage.local.get('distractionSites', function(result) {
    document.getElementById("distraction-field").innerHTML = result['distractionSites'];
  });
});

// when the update button is clicked, store the input
document.getElementById("update-button").onclick = function() {
  var text = document.getElementById("distraction-field").value;
  chrome.storage.local.set({'distractionSites': text});
};