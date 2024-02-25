"use client";

import BeatCard from "@/components/beatCard/BeatCard";
import BeatPlayer from "@/components/beatPlayer/BeatPlayer";
import { useRef, useState } from "react";

const data = [
  {
    user: "hithere@gmail.com",
    created_at: "12.12.2024, 14:32",
    title: "Cool banger",
    cover_url: "/assets/testimg.png",
    audio_url: "/assets/testaudio.mp3",
  },
  {
    user: "selim.altayev@gmail.com",
    created_at: "12.12.2024, 14:32",
    title: "Another cool banger",
    cover_url: "/assets/testimg2.png",
    audio_url: "/assets/testaudio2.mp3",
  },
];

const BeatsPage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentBeat, setCurrentBeat] = useState(null);

  const audioRef = useRef();

  const initBeat = (beat) => {
    setCurrentBeat((prev) => {
      return {
        ...prev,
        ...beat,
      };
    });
  };

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="px-4 pb-16 pt-16 flex flex-col gap-4 items-center">
        {data.map((el, i) => (
          <BeatCard
            key={i}
            beat={el}
            playerParams={{
              isPlaying,
              isOpen,
              onOpen,
              currentBeat,
              initBeat,
              audioRef,
            }}
          />
        ))}
      </div>
      <BeatPlayer
        playerParams={{
          isPlaying,
          setIsPlaying,
          isOpen,
          onClose,
          currentBeat,
          setCurrentBeat,
          audioRef,
        }}
      />
    </>
  );
};

export default BeatsPage;
