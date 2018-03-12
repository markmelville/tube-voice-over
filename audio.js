
var audioContext = new AudioContext();
var isAudioCaptured = false;
var isRecording = false;
var audioStream = null,
    audioInput = null,
    realAudioInput = null,
    inputPoint = null,
    audioRecorder = null;
var recIndex = 0;
var takes = {};

function reset() {
    if (isRecording) {
        audioRecorder.stop();
    }
    if (isAudioCaptured) {
        audioStream.getTracks().forEach(track => track.stop());
    }
    isAudioCaptured = false;
    isRecording = false;
    audioStream = null;
    audioInput = null;
    realAudioInput = null;
    inputPoint = null;
    audioRecorder = null;
    recIndex = 0;
    takes = {};
}

function capture() {
    if (!isAudioCaptured)
    {
        // https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
        navigator.mediaDevices
            .getUserMedia({ audio: true, video: false })
            .then(gotStream)
            .catch(function(err) {
                console.log(err);
            });
    } else {
        stopRecording();
        audioStream.getTracks().forEach(track => track.stop());
        isAudioCaptured = false;
    }
}

// https://github.com/cwilso/AudioRecorder/blob/master/js/main.js
function gotStream(stream) {
    audioStream = stream;
    inputPoint = audioContext.createGain();

    // Create an AudioNode from the stream.
    realAudioInput = audioContext.createMediaStreamSource(stream);
    audioInput = realAudioInput;
    audioInput.connect(inputPoint);

    audioRecorder = new Recorder( inputPoint );

    zeroGain = audioContext.createGain();
    zeroGain.gain.value = 0.0;
    inputPoint.connect( zeroGain );
    zeroGain.connect( audioContext.destination );

    isAudioCaptured = true;
    startRecording();
}

function startRecording() {
    audioRecorder.clear();
    console.log("starting recording");
    isRecording = true;
    audioRecorder.record();
}

function stopRecording() {
    audioRecorder.stop();
    console.log("stopping recording");
    isRecording = false;
    audioRecorder.getBuffers( gotBuffers );
}

function gotBuffers( buffers ) {
    audioRecorder.exportWAV( doneEncoding );
}

function doneEncoding( blob ) {
    var fileName = "myRecording" + ((recIndex<10)?"0":"") + recIndex + ".wav";
    var url = (window.URL || window.webkitURL).createObjectURL(blob);
    takes[fileName] = url;
    chrome.runtime.sendMessage({kind: "audioReady", "filename": fileName, "downloadUrl": url });
    recIndex++;
}