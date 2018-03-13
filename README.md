# tube-voice-over

Record a voice-over for a youtube video while it is playing.

## Setup

Clone or unpack to anywhere you desire on your machine. Go to Chrome Extensions `chrome://extensions/` and click "Load unpacked extension...".

Browse to a video on youtube and click the microphone button. Record as many takes as you want.

### Notes about Chrome Plugins

https://robots.thoughtbot.com/how-to-make-a-chrome-extension

content script runs in the context of web pages
browser action adds icons to the address bar
background scripts can run more stuff

https://developer.chrome.com/extensions/messaging

https://github.com/Rob--W/chrome-api/blob/master/patch-worker/patch-worker.js

//chrome.tabs.create({"url": "auth/index.html"});

### Audio Stuff

https://webrtc.github.io/samples/src/content/devices/input-output/
https://github.com/cwilso/AudioRecorder

## TODO

save in mono (1 h)
save as mp3 or mp4 (4 hr)
http://audior.ec/blog/recording-mp3-using-only-html5-and-javascript-recordmp3-js/
uploading files directly to Google Drive (8 hr)
https://developers.google.com/api-client-library/javascript/features/authentication
<script src="https://apis.google.com/js/api.js"></script>
https://developers.google.com/drive/v3/web/simple-upload
https://developers.google.com/drive/v3/reference/files/create

optional:
see if I can prevent the next clip from loading