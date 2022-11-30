/* eslint-disable no-unused-vars */
import { faFaceSmile, faMicrophone, faPaperPlane, faPlay, faStop, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import useAudioPlayer from '../../hooks/useAudioPlayer';
import useDropdownToggle from '../../hooks/useDropdownToggle';
import audioRecorder from '../../lib/audioRecorder';

const MessageInput = React.forwardRef(({ onSubmit, disabled }, ref) => {
    // adding emojis
    const [emojiDropdown, setEmojiDropdown, emojiDropdownRef] = useDropdownToggle(false);
    const emojis = [
        '😀',
        '😄',
        '😁',
        '😆',
        '😅',
        '🤣',
        '😂',
        '🙂',
        '🙃',
        '🫠',
        '😉',
        '😊',
        '😇',
        '🥰',
        '🤩',
        '🤑',
        '😜',
        '😋',
        '🤐',
        '🤐',
    ];

    function addEmoji(emoji) {
        ref.current.value += emoji;
    }

    // audio recording
    const [recordedFile, setRecordedFile] = useState();
    const [isRecording, setIsRecording] = useState();
    const [playerState, setPlayerState] = useState();

    const audioRef = useRef();
    const [setAudioSrc, setAudioSrcObj, playAudio, pauseAudio] = useAudioPlayer(audioRef.current);
    const [startRecording, stopRecording, cancelRecording] = audioRecorder();
    const playerProgressRef = useRef();

    // start clip progress
    function clipProgressStart(duration) {
        playerProgressRef.current.style.animation = `clipProgress ${duration}s linear`;
    }
    // pause clip  progress
    function clipProgressToggle() {
        const animationState = playerProgressRef.current.style.animationPlayState;
        playerProgressRef.current.style.webkitAnimationPlayState = animationState === 'paused' ? 'running' : 'paused';
        playerProgressRef.current.style.animationPlayState = animationState === 'paused' ? 'running' : 'paused';
    }

    // end clip  progress
    function clipProgressReset() {
        playerProgressRef.current.style.animation = 'none';
    }

    function recordingHandler() {
        // canel rocording
        if (isRecording) {
            cancelRecording();
            clipProgressReset();
            setIsRecording(false);
            return;
        }

        // start recording
        startRecording();
        clipProgressStart(10);
        setIsRecording(true);
        setPlayerState('recording');
    }

    async function playerHandler() {
        // stop recording and save audio ref
        if (playerState === 'recording') {
            const [audioBlob, audioDuration] = await stopRecording();
            setRecordedFile({
                file: audioBlob,
                duration: audioDuration,
            });
            setAudioSrc(URL.createObjectURL(audioBlob));
            setPlayerState('paused');
            return;
        }
        // pause audio
        if (playerState === 'playing') {
            pauseAudio();
            clipProgressToggle();
            setPlayerState('paused');
            return;
        }

        // play audio
        playAudio();
        clipProgressToggle();
        setPlayerState('playing');
    }

    return (
        <form className="px-5 flex items-center gap-3" onSubmit={onSubmit}>
            {/* input */}
            <div className="flex-1 relative">
                <input
                    className="px-3 py-3 border border-[#e9e9ef] outline-0 bg-[rgba(233,_233,_239,_.4)] text-dark-500
                placeholder:text-dark-500 rounded min-w-[230px] block w-full"
                    type="text"
                    placeholder="Enter your message"
                    ref={ref}
                />
                {/* clip player */}
                <div
                    className={`clip-player h-full bg-white absolute left-0 right-0 top-0 bottom-0 ${
                        isRecording ? '' : 'hidden'
                    }`}
                >
                    {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                    <audio src={null} ref={audioRef}></audio>
                    <div
                        className="clip-inner h-full rounded-full bg-gray-200 flex justify-between 
                    items-center px-1 realtive z-10 overflow-hidden"
                    >
                        <button
                            className="clip-control w-10 h-10 bg-white leading-10 rounded-full z-10"
                            type="button"
                            onClick={playerHandler}
                        >
                            {playerState === 'paused' ? (
                                <FontAwesomeIcon icon={faPlay} />
                            ) : (
                                <FontAwesomeIcon icon={faStop} />
                            )}
                        </button>
                        <div
                            className="clip-progress absolute left-0 right-0 top-0 bottom-0 bg-white-300 w-0"
                            ref={playerProgressRef}
                        ></div>
                        <div
                            className="clip-timer z-10 h-10 px-[10px] rounded-full bg-white flex items-center
                         justify-center"
                        >
                            <p>
                                <span>00.</span>
                                <span>00</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* emjois */}
            <div className="h-[40px] relative">
                <button
                    className="bg-white-500 px-3 text-[16px] block leading-[40px] rounded text-dark-400"
                    type="button"
                    onClick={setEmojiDropdown.toggle}
                >
                    <FontAwesomeIcon icon={faFaceSmile} />
                </button>
                <div
                    className={`dropdown top-auto bottom-[calc(100%_+_10px)] min-w-[160px] 
                    ${emojiDropdown ? 'active' : ''}`}
                    ref={emojiDropdownRef}
                >
                    <div className="grid grid-cols-4">
                        {emojis.map((emoji, index) => (
                            <span
                                className="inline-block h-[40px] text-center text-[20px] 
                            leading-[40px] hover:bg-white-500 cursor-pointer"
                                onClick={() => {
                                    addEmoji(emoji);
                                }}
                                // eslint-disable-next-line react/no-array-index-key
                                key={index + Math.random()}
                            >
                                {emoji}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
            {/* audio message */}
            <div className="relative">
                <button
                    className="bg-white-500 px-3 text-[16px] block leading-[40px] rounded text-dark-400"
                    type="button"
                    onClick={recordingHandler}
                >
                    {isRecording ? <FontAwesomeIcon icon={faXmark} /> : <FontAwesomeIcon icon={faMicrophone} />}
                </button>
            </div>
            {/* submit button */}
            <button
                className="py-3 pl-8 text-[13px] text-right text-white bg-blue inline-block rounded"
                type="submit"
                disabled={disabled}
            >
                Send
                <span className="inline-block mx-5">
                    <FontAwesomeIcon icon={faPaperPlane} />
                </span>
            </button>
        </form>
    );
});

export default MessageInput;
