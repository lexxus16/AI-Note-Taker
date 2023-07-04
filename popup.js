document.addEventListener('DOMContentLoaded', function() {
  const copyButton = document.getElementById('copyButton');
  const downloadButton = document.getElementById('downloadButton');
  const summarizeButton = document.getElementById('summarizeButton');
  const notesContainer = document.getElementById('notesContainer');

  // Event listeners
  copyButton.addEventListener('click', copyNotes);
  downloadButton.addEventListener('click', downloadNotes);
  summarizeButton.addEventListener('click', summarizeText);

  // Functions
  function copyNotes() {
    const notesText = notesContainer.innerText;
    navigator.clipboard.writeText(notesText)
      .then(() => {
        console.log('Notes copied to clipboard!');
      })
      .catch((error) => {
        console.error('Failed to copy notes to clipboard:', error);
      });
  }

  function downloadNotes() {
    const notesText = notesContainer.innerText;
    const blob = new Blob([notesText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const downloadFilename = 'notes.txt';

    chrome.downloads.download({
      url: url,
      filename: downloadFilename
    }, function(downloadId) {
      console.log('Download started with ID:', downloadId);
    });
  }

  function summarizeText() {
    // Extract textual content from current webpage using API
    var Http = new XMLHttpRequest();
    var endpoint = "https://extractorapi.com/api/v1/extractor";
    var params = "apikey=YOUR_API_KEY&url=" + window.location.href;

    Http.open("GET", endpoint + "?" + params);
    Http.send();

    Http.onreadystatechange = function() {
      if (Http.readyState === 4 && Http.status === 200) {
        const extractedText = Http.responseText;
        // Send extractedText to another API for summarization
        // Handle the summarized response and display it in the notesContainer
        notesContainer.innerText = "Summarized Text: " + extractedText;
      }
    };
  }
});
