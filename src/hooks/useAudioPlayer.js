function useAudioPlayer(audioElementRef) {
    const audioElement = audioElementRef;

    // function to set src
    function setSrc(src) {
        audioElement.src = src;
    }

    // function to set source object
    function setSrcObject(object) {
        console.log(audioElement);
        audioElement.srcObject = object;
    }

    // function to play
    function play() {
        audioElement.play();
    }

    // function to pause
    function pause() {
        audioElement.pause();
    }

    return [setSrc, setSrcObject, play, pause];
}

export default useAudioPlayer;
