
function getIPAddress(callback, errorCallback) {
  var IPUrl = 'https://showextip.azurewebsites.net/'; // Any site used here must be present in manifest.json.
  var x = new XMLHttpRequest();
  x.open('GET', IPUrl);
  x.responseType = 'text';
  x.onload = function() {
    // Parse and process the response from Google Image Search.
    var response = x.response;
    if (!response) {
      errorCallback('No response.');
      return;
    }
	
	var pattern = /\b(([01]?\d?\d|2[0-4]\d|25[0-5])\.){3}([01]?\d?\d|2[0-4]\d|25[0-5])\b/;
	var foundIP = pattern.exec(response); // Extract the IP addresses from the response and assign to foundIP array.

    callback(foundIP[0]);
  };
  x.onerror = function() {
    errorCallback('Network error.');
  };
  x.send();
}


function renderRefreshing() {
	var img = document.createElement("img");
	img.src = "66.gif";
	var ipSpan = document.getElementById("status");
	ipSpan.replaceChild(img, ipSpan.childNodes[0]);
}

function renderText(statusText) {
	document.getElementById('status').textContent = statusText;
}


document.addEventListener('DOMContentLoaded', function() {
    renderRefreshing();

    getIPAddress(function(ipaddress) {

      renderText(ipaddress);

    }, function(errorMessage) {
      renderText('Unable to refresh. ' + errorMessage);
    });
});
