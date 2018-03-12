// util fx to send message to youtube page.
function sendToPage(message, callback) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var activeTab = tabs[0];
        chrome.tabs.sendMessage(activeTab.id, message, callback);
    });
}

// get page state
sendToPage({"action":"init"}, state => {
    if (state) {
        Object.keys(state.takes).forEach(name => audioReady(name, state.takes[name]));
        if (state.isAudioCaptured) {
            $("button").text("Stop");
        }
    }
});

// recieve messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.kind === "audioReady") {
        $("button").text("Record");
        audioReady(request.filename, request.downloadUrl);
    } else if (request.kind === "mics") {
        //$("button").text("Record");
        //audioReady(request.filename, request.downloadUrl);
    }
});

function audioReady(filename, downloadUrl) {
    var thing = $('<div><hr/><p>'+filename+'</p><a href="'+downloadUrl+'" download="'+filename+'">Download</a></div>').appendTo("#main");
}

// setup page events
$(function() {
    $("#record-audio").click(() => {
        var isRecording = $("button").text() === "Stop";
        $("button").text("Stop");
        sendToPage({"action":"capture","isRecording":isRecording});
    });
});