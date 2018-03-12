// user navigates to a new video.
window.addEventListener("yt-navigate-start", reset);

var vid;

var mics = [];

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        console.log(request);
        if (request.action === "capture") {
            vid = $("video")[0];
            capture();
            if (!request.isRecording) {
                vid.currentTime = 0;
                vid.play();
                vid.addEventListener('ended',onEnd,false);
            } else {
                vid.pause();
                vid.removeEventListener('ended',onEnd,false);
            }
        } else if (request.action === "init") {
            navigator.mediaDevices.enumerateDevices().then(gotDevices);
            sendResponse({"isAudioCaptured":isAudioCaptured,"takes":takes});
        }
        
    }
);

function onEnd() {
    vid.pause();
    capture();
    vid.removeEventListener('ended',onEnd,false);
}


function gotDevices(deviceInfos) {
    // Handles being called several times to update labels. Preserve values.
    mics = deviceInfos.filter(i => i.kind === "audioinput");
    console.log(mics);
    chrome.runtime.sendMessage({kind: "mics", "mics": mics });
}