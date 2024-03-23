"use client";

import BeatCard from "@/components/beatCard/BeatCard";
import BeatPlayer from "@/components/beatPlayer/BeatPlayer";
import { useRef, useState } from "react";

function BeatList({ data }) {
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

  const nextBeat = () => {
    const currentBeatIndex = data?.indexOf(
      data?.find((el) => el?._id === currentBeat?._id)
    );
    console.log("Current index: ", currentBeatIndex);
    if (currentBeatIndex === -1) {
      return;
    }

    let nextBeatIndex = currentBeatIndex + 1;

    if (nextBeatIndex > data?.length - 1) {
      nextBeatIndex = 0;
    }
    console.log("Next index: ", nextBeatIndex);
    console.log("Data length: ", data.length);

    initBeat(data?.at(nextBeatIndex));
  };

  const prevBeat = () => {
    const currentBeatIndex = data?.indexOf(
      data?.find((el) => el?._id === currentBeat?._id)
    );
    console.log("Current index: ", currentBeatIndex);
    if (currentBeatIndex === -1) {
      return;
    }

    let prevBeatIndex = currentBeatIndex - 1;

    if (prevBeatIndex < 0) {
      prevBeatIndex = data?.length - 1;
    }
    console.log("Prev index: ", prevBeatIndex);
    console.log("Data length: ", data.length);

    initBeat(data?.at(prevBeatIndex));
  };

  return (
    <>
      <div className="px-4 py-16 flex flex-col gap-4 items-center">
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
          nextBeat,
          prevBeat,
        }}
      />
    </>
  );
}

export default BeatList;
