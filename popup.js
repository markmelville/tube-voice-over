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
        Object.keys(state.takes).forEach(name => {
            var data = state.takes[name]
            audioReady(data.title, data.sequence, data.extension, data.downloadUrl);
        });
        if (state.isAudioCaptured) {
            $("button").text("Stop");
        }
    }
});

// recieve messages
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.kind === "audioReady") {
        $("button").text("Record");
        audioReady(request.title, request.sequence, request.extension, request.downloadUrl);
    }
});

function audioReady(title, sequence, extension, downloadUrl) {
    var paddedNum = ("00" + sequence).substr(-2,2);
    var scrubbedTitle = title.replace(" ","_").replace("/","").replace(":","");
    var filename = scrubbedTitle + "-EN-" + paddedNum + extension;
    var thing = $('<div><hr/><p>'+filename+'</p><a style="float:right;" href="#">Upload</a><a href="'+downloadUrl+'" download="'+filename+'">Save File</a></div>').appendTo("#main");
}

// setup page events
$(function() {
    $("#record-audio").click(() => {
        var isRecording = $("button").text() === "Stop";
        $("button").text("Stop");
        sendToPage({"action":"capture","isRecording":isRecording});
    });
});