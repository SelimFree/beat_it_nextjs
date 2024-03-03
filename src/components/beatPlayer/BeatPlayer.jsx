"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { formatSeconds } from "../utils";

function BeatPlayer({ playerParams }) {
  const [audioTimeInfo, setAudioTimeInfo] = useState({
    duration: 0,
    currentTime: 0,
    animationPercentage: 0,
  });
  const audioContext = useRef(null);
  const source = useRef(null);
  const analyser = useRef(null);
  const dataArray = useRef(null);
  const visualiserRef = useRef(null);
  let animationFrameId;

  const handleTimeUpdate = (e) => {
    setTimeout(() => {
      setAudioTimeInfo((prev) => {
        return {
          ...prev,
          duration: e.target.duration,
          currentTime: e.target.currentTime,
          animationPercentage: Math.round(
            (e.target.currentTime / e.target.duration) * 100
          ),
        };
      });
    }, 500);
  };

  const handlePlayPause = () => {
    const audio = playerParams.audioRef.current;
    if (playerParams.isPlaying) {
      audio.pause();
      playerParams.setIsPlaying(false);
    } else {
      audio.play();
      playerParams.setIsPlaying(true);
    }
  };

  const renderFrame = () => {
    console.log("rendering");
    analyser.current.getByteFrequencyData(dataArray.current);

    const arr = [...dataArray.current];
    const sum = arr.reduce((acc, value) => acc + value, 0);
    const average = sum / arr.length;

    const scale = 1 + average / 500;

    animationFrameId = requestAnimationFrame(renderFrame);

    if (!visualiserRef.current) {
      cancelAnimationFrame(animationFrameId);
    } else {
      visualiserRef.current.style.transform = `scale(${scale > 1 ? scale : 1})`;
    }
  };

  const handleBeatInit = () => {
    playerParams.setIsPlaying(true);
    playerParams.audioRef.current.pause();
    playerParams.audioRef.current.currentTime = 0;

    if (!audioContext.current) {
      console.log("Creating new audio context");
      audioContext.current = new (window.AudioContext ||
        window.webkitAudioContext)();

      analyser.current = audioContext.current.createAnalyser();
      analyser.current.fftSize = 256;

      source.current = audioContext.current.createMediaElementSource(
        playerParams.audioRef.current
      );
      source.current.connect(analyser.current);
      analyser.current.connect(audioContext.current.destination);
    }

    dataArray.current = new Uint8Array(analyser.current.frequencyBinCount);

    playerParams.audioRef.current.play();
    renderFrame();
  };

  return (
    <div
      className={`fixed w-full lg:w-[20rem] h-full lg:h-[40rem] right-0 bottom-0 px-4 pb-16 pt-8 ${
        playerParams.isOpen ? "" : "translate-x-[120%]"
      } transition-transform duration-150 ease-out flex flex-col items-center justify-end bg-transparent-light-blue`}
    >
      <div className="relative w-full h-[90%] flex flex-col justify-center items-center gap-8 rounded-[10px] bg-white">
        <button
          className="absolute right-4 top-4 bg-transparent p-0 hover:bg-transparent lg:w-[1rem]"
          onClick={() => playerParams.onClose()}
        >
          <Image
            src="/assets/close.png"
            width={25}
            height={25}
            alt="Close button"
          />
        </button>
        <div className="relative mb-4 lg:w-[12rem]">
          <div ref={visualiserRef} id="visualizer"></div>
          <Image
            src={playerParams.currentBeat?.cover_url || ""}
            width={250}
            height={250}
            alt="Beat cover image"
            className={`rounded-full ${
              playerParams.isPlaying ? "animate-cover" : "animate-cover_paused"
            }`}
          />
        </div>
        <div className="flex flex-col items-center">
          <span className="font-semibold text-lg">
            {playerParams.currentBeat?.title}
          </span>
          <span className="font-semibold text-xs text-light-blue">
            {playerParams.currentBeat?.user}
          </span>
        </div>
        <div className="flex items-center justify-center gap-2">
          <span className="font-semibold text-light-blue w-10 lg:w-8 text-center lg:text-xs">
            {formatSeconds(audioTimeInfo.currentTime || 0)}
          </span>
          <div className="relative h-6 rounded-[20px] overflow-hidden border-2 border-light-blue">
            <input
              type="range"
              className="appearance-none w-52 lg:w-40 h-full bg-transparent-light-blue"
            />
            <div
              className={`absolute left-0 top-0 h-full w-0 bg-light-blue rounded-[20px]`}
              style={{ width: `${audioTimeInfo.animationPercentage}%` }}
            ></div>
          </div>
          <span className="font-semibold text-light-blue w-10 lg:w-8 text-center lg:text-xs">
            {formatSeconds(audioTimeInfo.duration || 0)}
          </span>
        </div>
        <div className="flex justify-center items-center gap-12">
          <button className="bg-transparent p-0 hover:bg-transparent lg:w-8">
            <Image
              src="/assets/left.png"
              width={40}
              height={40}
              alt="Previous song button"
            />
          </button>
          <button
            className="bg-transparent p-0 hover:bg-transparent lg:w-8"
            onClick={handlePlayPause}
          >
            {playerParams.isPlaying ? (
              <Image
                src="/assets/pause.png"
                width={40}
                height={40}
                alt="Pause song button"
              />
            ) : (
              <Image
                src="/assets/play.png"
                width={40}
                height={40}
                alt="Play song button"
              />
            )}
          </button>
          <button className="bg-transparent p-0 hover:bg-transparent lg:w-8">
            <Image
              src="/assets/right.png"
              width={40}
              height={40}
              alt="Next song button"
            />
          </button>
        </div>
      </div>
      <audio
        src={playerParams.currentBeat?.audio_url}
        ref={playerParams.audioRef}
        onLoadedMetadata={handleBeatInit}
        onTimeUpdate={handleTimeUpdate}
      ></audio>
    </div>
  );
}

export default BeatPlayer;