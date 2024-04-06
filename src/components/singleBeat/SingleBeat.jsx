"use client";

import BeatCard from "@/components/beatCard/BeatCard";
import Comments from "@/components/beatCard/comments/Comments";
import BeatPlayer from "@/components/beatPlayer/BeatPlayer";
import { useRef, useState } from "react";

function SingleBeat({ data, user }) {

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
      <div className="px-4 py-16 flex flex-col gap-4 items-center">
        <BeatCard
          beat={data}
          editable={user?.email === data?.userId?.email}
          user={user?.email}
          playerParams={{
            isPlaying,
            isOpen,
            onOpen,
            currentBeat,
            initBeat,
            audioRef,
          }}
        />
        <Comments />
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
}

export default SingleBeat;
