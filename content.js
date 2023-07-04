chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "summarize") {
      // Call the API to extract text from the current webpage
      var endpoint = "https://extractorapi.com/api/v1/extractor";
      var apiKey = "fa7c3134823d23a66da249cf6449e9c4a2e7b724";
      var url = window.location.href;
  
      var xhr = new XMLHttpRequest();
      xhr.open("GET", endpoint + "?apikey=" + apiKey + "&url=" + url);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);
            console.log(response); // Log the response for debugging
  
            if (response.status === "success") {
              sendResponse({ success: true, text: response.text });
            } else {
              sendResponse({ success: false, error: response.error });
            }
          } else {
            console.log(xhr.status); // Log the status for debugging
            sendResponse({ success: false, error: "Error occurred while making the API request. Status code: " + xhr.status });
          }
        }
      };
      xhr.onerror = function() {
        console.log("Network error occurred"); // Log the error for debugging
        sendResponse({ success: false, error: "Error occurred while making the API request. Network error." });
      };
      xhr.send();
  
      return true; // Indicates that the response will be sent asynchronously
    }
  });
  