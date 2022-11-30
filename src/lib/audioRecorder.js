let audioBlobs = [];
let mediaRecorder = null;
let streamBeingCaptured = null;
let recordingStartTime = null;

// function to start recording
async function start() {
    let stream;

    // feature detection
    if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
        return Promise.reject(new Error('mediaDevices API or getUserMedia method is not supported in this browser.'));
    }
    // create an audio stream
    try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // save the time for find the duration
        recordingStartTime = Date.now();
        // eslint-disable-next-line no-undef
        // save the reference of the stream
        streamBeingCaptured = stream;
        // create a media recorder instance
        mediaRecorder = new MediaRecorder(stream);

        // add a dataavailable event listener in order to store the audio data Blobs when recording
        mediaRecorder.addEventListener('dataavailable', (event) => {
            audioBlobs.push(event.data);
        });
        // start the recording
        mediaRecorder.start();
    } catch (error) {
        console.log(error);
    }

    return stream;
}

function stopStream() {
    // stopping the capturing request by stopping all the tracks on the active stream
    streamBeingCaptured
        .getTracks() // get all tracks from the stream
        .forEach((track) /* of type MediaStreamTrack */ => track.stop()); // stop each one
}

function resetRecordingProperties() {
    mediaRecorder = null;
    streamBeingCaptured = null;
    audioBlobs = [];

    /* No need to remove event listeners attached to mediaRecorder as
    If a DOM element which is removed is reference-free (no references pointing to it), the element itself is picked
    up by the garbage collector as well as any event handlers/listeners associated with it.
    getEventListeners(audioRecorder.mediaRecorder) will return an empty array of events. */
}

function stop() {
    // return a promise that would return the blob or URL of the recording
    return new Promise((resolve) => {
        // save audio type to pass to set the Blob type
        const { mimeType } = mediaRecorder;
        let audioBlob;

        // listen to the stop event in order to create & return a single Blob object
        mediaRecorder.addEventListener('stop', () => {
            // create a single blob object, as we might have gathered a few Blob objects that needs to be joined as one
            audioBlob = new Blob(audioBlobs, { type: mimeType });
            const audioDuration = Math.floor((Date.now() - recordingStartTime) / 1000);
            resolve([audioBlob, audioDuration]);
            console.log(audioDuration);
            recordingStartTime = null;
            // resolve promise with the single audio blob representing the recorded audio
        });

        // stop all the tracks on the active stream in order to stop the stream
        stopStream();

        // reset API properties for next recording
        resetRecordingProperties(); // prsicon problem here
    });
}

function cancel() {
    // reset API properties for next recording
    resetRecordingProperties();
    recordingStartTime = null;
}

function audioRecorder() {
    return [start, stop, cancel];
}

export default audioRecorder;
